"use server";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";

export const credentials_login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const provider = "credentials";
  try {
    await signIn(provider, {
      email,
      password,
      callbackUrl: "/",
      redirect: true,
    });
    return { error: "", message: "SUCCESS", status: 200 };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "error", message: error.message, status: 401 };
    }

    throw error;
  }
};

export const social_login = async (provider: string, callback: string) => {
  await signIn(provider, { redirectTo: callback });
};

export const logout = async () => {
  await signOut();
};
