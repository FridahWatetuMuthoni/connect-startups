"server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_TOKEN; // REQUIRED for writing/updating

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token,
});

if (!token) {
  throw new Error("Write token not found");
}
