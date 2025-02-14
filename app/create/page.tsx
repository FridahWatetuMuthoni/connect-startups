"use client";
import React, { useState, useActionState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "../../lib/validation";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "../../lib/actions/startup";

export default function StartupForm() {
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const initialState = {
    error: "",
    status: "INITIAL",
  };

  const handleFormSubmit = async (prevState, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);

      const result = await createPitch(prevState, formData, pitch);
      if (result.status == "SUCCESS") {
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        // setErrors(fieldErrors as unknown as Record<string, string>)
        return { ...prevState, errors: fieldErrors, status: "ERROR" };
      }
      return { errors: {}, status: "ERROR" };
    } finally {
    }
  };

  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    initialState
  );

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg md:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              Submit Your Startup
            </h2>
          </div>
          <form className="space-y-6" action={formAction}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              {state?.errors?.title && (
                <p className="text-red-500 text-sm my-3 italic">
                  {state?.errors.title[0]}
                </p>
              )}

              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                placeholder="Startup Title"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              {state?.errors?.description && (
                <p className="text-red-500 text-sm my-3 italic">
                  {state?.errors.description[0]}
                </p>
              )}

              <textarea
                id="description"
                name="description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                placeholder="Startup Description"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              {state?.errors?.category && (
                <p className="text-red-500 text-sm my-3 italic">
                  {state?.errors.category[0]}
                </p>
              )}

              <input
                type="text"
                id="category"
                name="category"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                placeholder="Startup category(Tech, Health, Education)"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="image"
              >
                Image URL
              </label>
              {state?.errors?.image && (
                <p className="text-red-500 text-sm my-3 italic">
                  {state?.errors.image[0]}
                </p>
              )}

              <input
                type="url"
                id="image"
                name="image"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                placeholder="Startup Image URL"
              />
            </div>
            <div className="container" data-color-mode="light">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="image"
              >
                Pitch
              </label>
              {state?.errors?.pitch && (
                <p className="text-red-500 text-sm my-3 italic">
                  {state?.errors.pitch[0]}
                </p>
              )}

              <MDEditor
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id="pitch"
                preview="edit"
                height={300}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  marginTop: "10px",
                }}
                textareaProps={{
                  placeholder:
                    "Briefly describe your idea and what problem it solves ",
                }}
                previewOptions={{
                  disallowedElements: ["style"],
                }}
              />
              <MDEditor.Markdown
                source={pitch}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              {isPending ? "Submitting ......." : "Submit Startup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
