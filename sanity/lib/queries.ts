import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(
  `*[_type == 'startup' && (
      !defined($search) || $search == "" || title match $search || category match $search || author->name match $search
    )] | order(datePublished desc) {
      _id,
      title,
      slug,
      datePublished,
      author -> {
        _id, 
        name, 
        image, 
        bio
      },
      views,
      description,
      pitch,
      category,
      image
  }`
);

export const STARTUP_QUERY_WITH_ID = defineQuery(
  `
  *[_type == 'startup' && _id == $id][0] {
      _id,
      title,
      slug,
      datePublished,
      author -> {
        _id, 
        name, 
        image, 
        bio
      },
      views,
      pitch,
      category,
      image
  }
  `
);

export const AUTHOR_QUERY_WITH_ID = defineQuery(
  `
    *[_type == 'author' && _id == $id][0] {
    _id, 
      name, 
      image, 
      bio
    }
  `
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == 'author' && githubId == $githubId][0] {
  _id,
  name,
  username,
  email,
  image,
  bio
  }
  `);

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
  *[_type == 'author' && googleId == $googleId][0]{
  _id,
  name,
  username,
  email,
  image,
  bio
  }
  `);

export const STARTUP_QUERY_BY_AUTHOR = defineQuery(
  `*[_type == 'startup' && author._ref == $id ] | order(datePublished desc) {
      _id,
      title,
      slug,
      datePublished,
      author -> {
        _id, 
        name, 
        image, 
        bio
      },
      views,
      description,
      pitch,
      category,
      image
  }`
);
