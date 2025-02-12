# Database Schema

## Startup Database Schema

Startup:

- id (primary key)
- Slug
- Author
- Views
- Description
- Category
- Image
- Pitch
- datePublished

## Author Database Schema

### Github, Google, Credentials

- id (primary key)
- name
- username
- email
- image
- bio

## Playlist

- Title
  i. Editors Picks
  ii. Startup of the day
  iii. Honors
  iv. Startup of the month
  v. People's Favourite
- Slug
- Select Startups

## App Flow

- When the App is opened
  App ===> NextAuth ===> Create a session

- If a session does not exist

App ===> [Github, Credentials, Google] ===> Authenticate ===> User ===> Create a session

- If a session and user exists

User ===> Sanity ===> Find User === Return User
User ===> Sanity ===> Find User === New User
