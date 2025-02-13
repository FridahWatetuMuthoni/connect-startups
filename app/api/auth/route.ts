import { client } from "../../../sanity/lib/client";
import { writeClient } from "../../../sanity/lib/write-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, name, email, password1, password2 } = await req.json();

    if (!name || !email || !password1 || !password2) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password1 !== password2) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }
    const userexists = await client.fetch(
      `*[_type=='author' && id==$id && email==$email][]`,
      { id, email }
    );
    if (userexists) {
      return NextResponse.json(
        {
          message: "User already exist",
        },
        { status: 400 }
      );
    } else {
      const user = await writeClient.create({
        _type: "author",
        id,
        name,
        email,
        username: name,
        password: password1,
        bio: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s",
      });
      return NextResponse.json({
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
