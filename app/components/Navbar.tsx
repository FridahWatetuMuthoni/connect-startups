import Link from "next/link";
import React from "react";
import { auth, signOut } from "../../auth";
import Image from "next/image";

async function Navbar() {
  const session = await auth();
  console.log(session);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="mb-4 md:mb-0">
          <span className="text-3xl text-blue-600"> ✺ S-Hub</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {session && session?.user ? (
            <>
              <Link
                className="mr-5 hover:text-gray-900"
                href={`/user/${session?.user.id}`}
              >
                <div className="flex items-center">
                  <Image
                    className="rounded-full w-8 h-8 object-cover"
                    src={session?.user?.image || "/default.png"}
                    alt={session?.user?.name || "image"}
                    width={32}
                    height={32}
                  />
                  <span className="text-sm font-medium text-gray-800 ml-1">
                    {session?.user?.name}
                  </span>
                </div>
              </Link>

              <Link className="mr-5 hover:text-gray-900" href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base ">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                className="mr-5 inline-flex items-center  bg-blue-600 hover:bg-blue-500 text-white bg-primary border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0"
                href="/user/login"
              >
                <span>Login</span>
              </Link>
              <Link
                className="mr-5 inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0"
                href="/user/register"
              >
                <span>Register</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
