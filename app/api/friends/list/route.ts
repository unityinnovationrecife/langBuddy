import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const friends = await prisma.friends.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
      },
    });

    // Get the friend's details instead of the user's own details
    const friendDetails = await Promise.all(
      friends.map(async (friend) => {
        const friendUser = await prisma.user.findUnique({
          where: { id: friend.friendId },
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        });
        return friendUser;
      })
    );

    return NextResponse.json(friendDetails.filter(Boolean));
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}