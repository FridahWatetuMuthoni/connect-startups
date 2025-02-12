import Image from "next/image";
import Link from "next/link";
import React from "react";
import { StartUp } from "../../types/startup";

function StartupCard({ startup }: { startup: StartUp }) {
  const { _id, slug, category, title, pitch, datePublished, views, author } =
    startup;

  console.log(slug);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const date = new Date(datePublished).toLocaleDateString("en-US", options);

  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col bg-white w-full max-w-md md:max-w-lg lg:max-w-xl h-full">
      <Link href={`/startup/${_id}`}>
        <div className="relative">
          <Image
            className="w-full h-48 object-cover"
            src={startup.image}
            alt={title}
            width={500}
            height={200}
          />
          <div className="absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25 hover:opacity-10 transition duration-300"></div>
          <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            {category}
          </div>
        </div>
      </Link>

      <div className="px-6 py-4 flex flex-col flex-grow">
        <h2 className="font-medium text-lg text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out mb-2">
          <Link href={`/startup/${_id}`}> {title}</Link>
        </h2>
        <p className="text-gray-500 text-sm mb-4 flex-grow">
          <Link href={`/startup/${_id}`}> {pitch.slice(0, 150)}...</Link>
        </p>
        <div className="flex items-center space-x-3">
          <Link
            href={`/author/${author._id}`}
            className="flex items-center gap-2"
          >
            <Image
              className="rounded-full w-8 h-8 object-cover"
              src={author.image}
              alt={author.name}
              width={32}
              height={32}
            />
            <span className="text-sm font-medium text-gray-800">
              {author.name}
            </span>
          </Link>
        </div>
      </div>
      <div className="px-6 py-3 flex justify-between items-center bg-gray-100 text-sm text-gray-600">
        <span>{date}</span>
        <span className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="red"
            className="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
          {views}{" "}
        </span>
      </div>
      <div className="px-6 py-3 flex justify-between items-center bg-gray-200 mt-auto">
        <Link
          href={`/startup/${_id}`}
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
}

export default StartupCard;
