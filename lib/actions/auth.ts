"use server";
import { signIn, signOut } from "../../auth";

export const login = async (provider: string, callback: string) => {
  await signIn(provider, { redirectTo: callback });
};

export const logout = async () => {
  await signOut();
};
