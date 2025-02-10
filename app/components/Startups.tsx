import React from "react";
import StartUpHeader from "./StartUpHeader";
import StartupCard from "./StartupCard";
import startups from "@/data";

function Startups() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <StartUpHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  );
}

export default Startups;
