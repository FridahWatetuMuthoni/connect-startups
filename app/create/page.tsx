"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function StartupForm() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    views: "",
    description: "",
    category: "",
    image: "",
    pitch: "",
  });

  const [pitch, setPitch] = useState("");

  const isPending = false;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg md:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              Submit Your Startup
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                onChange={handleChange}
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
              <textarea
                id="description"
                name="description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                placeholder="Startup Description"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                onChange={handleChange}
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
              <input
                type="url"
                id="image"
                name="image"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                required
                onChange={handleChange}
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
