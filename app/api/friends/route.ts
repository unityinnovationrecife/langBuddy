import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { targetUserId } = await req.json();
    
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: session.user.id, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: session.user.id }
        ]
      }
    });

    if (existingRequest) {
      return new NextResponse("Friend request already exists", { status: 400 });
    }

    await prisma.friendRequest.create({
      data: {
        senderId: session.user.id,
        receiverId: targetUserId,
        status: "PENDING"
      }
    });

    return new NextResponse("Friend request sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const friendRequests = await prisma.friendRequest.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
          { receiverId: session.user.id }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true
          }
        }
      }
    });

    return NextResponse.json(friendRequests);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}