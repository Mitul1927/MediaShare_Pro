import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import File from "@/models/File";

export async function GET(
  _req: Request,
  { params }: { params: { shareId: string } }
) {
  await connectToDatabase();

  const file = await File.findOne({
    shareId: params.shareId,
    isPublic: true,
  });

  if (!file) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(file);
}