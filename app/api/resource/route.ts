import { prismaClient } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const fetchresource = await prismaClient.resource.findMany();
    return NextResponse.json(fetchresource);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch resources " },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const resources = await req.json();
    if (!resources) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const { name, type, description, address, city, state, zipCode } =
      resources;

    const newresource = await prismaClient.resource.create({
      data: {
        name,
        type,
        description,
        address,
        city,
        state,
        zipCode,
      },
    });

    return NextResponse.json(newresource, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
