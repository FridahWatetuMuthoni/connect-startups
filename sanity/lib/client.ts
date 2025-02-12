import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// useCdn: true means that sanity will cache data for 60 seconds and then revalidate the data
// useCdn: false means that sanity will revalidate the data every time the page is loaded
// preffered one is useCdn:true beacuse its faster
// but if you are using ISR or tag-based revalidation then you should use useCdn:false
