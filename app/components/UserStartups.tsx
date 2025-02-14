import React from "react";
import StartupCard from "./StartupCard";
import { STARTUP_QUERY_BY_AUTHOR } from "../../sanity/lib/queries";
import { client } from "../../sanity/lib/client";
import { StartUp } from "../../types/startup";

async function UserStartups({ id }: { id: string }) {
  const data = await client.fetch(STARTUP_QUERY_BY_AUTHOR, { id });

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 justify-self-start ">
      <h1 className="text-3xl mt-4 mb-8 text-center">Your Startups</h1>
      {data.length === 0 ? (
        <div className="relative cursor-pointer mt-10">
          <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg " />
          <div className="relative p-6 bg-white  border-2 border-indigo-500  rounded-lg ">
            <div className="flex items-center">
              <h3 className="my-2 text-lg font-bold text-gray-800  text-center">
                No startups
              </h3>
            </div>
            <p className="text-gray-600 ">
              There are no startups created at this time. Please check back
              later.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((startup: StartUp) => (
            <StartupCard key={startup._id} startup={startup} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserStartups;
