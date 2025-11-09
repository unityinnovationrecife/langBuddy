import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { requestId } = params;
    const { action } = await req.json();

    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!friendRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    if (friendRequest.receiverId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (action === "accept") {
      // Update the friend request status
      await prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: "ACCEPTED" },
      });

      // Create friend connections for both users
      await prisma.friends.createMany({
        data: [
          {
            userId: friendRequest.senderId,
            friendId: friendRequest.receiverId,
          },
          {
            userId: friendRequest.receiverId,
            friendId: friendRequest.senderId,
          },
        ],
      });

      return new NextResponse("Friend request accepted", { status: 200 });
    } else if (action === "reject") {
      await prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED" },
      });

      return new NextResponse("Friend request rejected", { status: 200 });
    }

    return new NextResponse("Invalid action", { status: 400 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}