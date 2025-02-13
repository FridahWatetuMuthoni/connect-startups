import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "string",
    }),
    defineField({
      name: "password",
      type: "string",
    }),
    defineField({
      name: "githubId",
      type: "string",
    }),
    defineField({
      name: "googleId",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
