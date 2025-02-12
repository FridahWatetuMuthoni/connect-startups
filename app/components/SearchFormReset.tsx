"use client";
import React from "react";
import { useRouter } from "next/navigation";

function SearchFormReset() {
  const router = useRouter();

  const handleReset = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
      router.push(`?query=${encodeURIComponent("")}`); // Updates the URL
    }
  };

  return (
    <button
      type="submit"
      className="inline-flex items-center gap-1 bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-r-md"
    >
      <svg
        className="text-gray-200 h-5 w-5 p-0 fill-current mr-3"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 56.966 56.966"
        xmlSpace="preserve"
      >
        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-200 h-5 w-5 p-0 fill-current scale-[1.8] border-l border-l-white ml-1"
        viewBox="0 0 16 16"
        onClick={handleReset}
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
    </button>
  );
}

export default SearchFormReset;
