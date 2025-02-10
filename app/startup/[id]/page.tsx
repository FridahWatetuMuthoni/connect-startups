import Link from "next/link";
import React from "react";
import Image from "next/image";
import startups from "@/data";

type StartUp = {
  id: number;
  image: string;
  category: string;
  datePublished: string;
  views: number;
  username: string;
  userProfile: string;
  title: string;
  description: string;
};

function StartupDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const startup: StartUp = startups.filter(
    (startup) => startup.id === Number(id)
  )[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Image at the top */}
      <div className="relative w-full h-64">
        <Image
          className="w-full h-full object-cover rounded-t-lg"
          src={startup.image}
          alt={startup.title}
          width={800}
          height={400}
        />
        <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm">
          {startup.category}
        </div>
      </div>

      {/* Title & Meta Info */}
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {startup.title}
        </h1>
        <div className="text-sm text-gray-600 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              className="rounded-full w-8 h-8 object-cover"
              src={startup.userProfile}
              alt={startup.username}
              width={32}
              height={32}
            />
            <span>{startup.username}</span>
          </div>
          <div className="flex items-center justify-center gap-5">
            {startup.datePublished}
            <span className="flex items-center justify-center gap-1">
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
              {startup.views}{" "}
            </span>{" "}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-4 text-gray-700 leading-relaxed">
        <p>{startup.description}</p>
      </div>

      {/* Back to Home Button */}
      <div className="p-4">
        <Link
          href="/"
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default StartupDetail;
