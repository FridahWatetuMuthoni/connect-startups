import React from "react";
import StartUpHeader from "./StartUpHeader";
import StartupCard from "./StartupCard";
// import startups from "@/data";
import { client } from "../../sanity/lib/client";
import { STARTUP_QUERY } from "../../sanity/lib/queries";
// import { sanityFetch, SanityLive } from "../../sanity/lib/live";
import { StartUp } from "../../types/startup";

async function Startups({ query }: { query: string | undefined | string[] }) {
  //Data is cached for 60 seconds before you can fetch from the source again
  const data = await client.fetch(STARTUP_QUERY, { search: query });

  //data is live, when you create a new startup, data shows imediatelty
  // const { data } = await sanityFetch({
  //   query: STARTUP_QUERY,
  //   params: { search: query },
  // });

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <StartUpHeader query={query} />
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
      {/* <SanityLive /> */}
    </>
  );
}

export default Startups;
