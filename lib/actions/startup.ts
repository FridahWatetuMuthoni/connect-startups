"use server";
import { auth } from "../../auth";
import slugify from "slugify";
import { DefaultSession } from "next-auth";
import { writeClient } from "../../sanity/lib/write-client";

type ExtendedSession = DefaultSession & {
  authorId?: string;
};

function parse_server_response<T>(object: T) {
  return JSON.parse(JSON.stringify(object));
}

export const createPitch = async (state, form: FormData, pitch: string) => {
  const session = (await auth()) as ExtendedSession | null;

  if (!session) {
    return parse_server_response({ error: "Not signed in", status: "ERROR" });
  }

  //getting all the items apart from the pitch
  const { title, description, category, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });
  const datePublished = new Date();

  try {
    const startup = {
      title,
      slug: {
        _type: slug,
        current: slug,
      },
      description,
      category,
      image,
      pitch,
      author: {
        _type: "reference",
        _ref: session?.authorId,
      },
      datePublished,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parse_server_response({ ...result, error: "", status: "SUCCESS" });
  } catch (error) {
    console.log(error);
    return parse_server_response({ error, status: "ERROR" });
  }
};
