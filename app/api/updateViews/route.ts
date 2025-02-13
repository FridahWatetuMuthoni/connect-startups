import { writeClient } from "../../../sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    console.log(`Updating views for startup ID: ${id}`);

    const updatedStartup = await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json(
      {
        success: true,
        message: "Views updated successfully",
        updatedViews: updatedStartup.views,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sanity update error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
