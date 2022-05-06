# Developer

<b>Name:</b> Christian do Prado Silva<br>
<b>Linkedin:</b> https://linkedin.com/in/christianprados<br>
<b>GitHub:</b> https://github.com/CHPrado<br>

<br>

# Setting up Posterr

## Install dependencies

In the project directory, you can run:

### `npm install` or `yarn install`

<br>

## Run Posterr

In the project directory, you can run:

### `npm start` or `yarn start`

<br>

# Poster

## Database

To simulate the database a file `(src/database/fakedata.db.ts)` containing data for the users and posts was created.
The default data is loaded to localhost and to React context by a useData hook `(src/hooks/useData.ts)` to manage states and data.

Logged User:

- The logged user is loaded as the first user from the fake database;

Posts:

Only one "table" was used for all types of posts. The column `repostId` is used to link a post being `reposted` or `quote-posted` to a new post.

- Posts with `repostId` and no text are considered `reposts`;
- Posts with `repostId` and text are considered `quote-posts`;

<br>

## API

A fakeApi service was created containing modules for posts `(src/services/fakeApi/modules/posts.ts)` and users `(src/services/fakeApi/modules/users.ts)`. Both modules contain async functions to simulate API calls.

<br>

# Planning

## Questions

- Why do we need to show original posts on the "Replies" feed? If we want to see those we could go to their specific feed.
- Thinking about the database structure, should a reply-post be considered a regular post?

If a `reply-post` can be considered a regular post the same `posts` table in the database could be used needing to add a new column `replyPostId`, for example, so we can link the new post with the one being replied, the same way it works with the `repostId` column.

If a `reply-post` should be a different kind of post then a new `reply-posts` table should be created with a `postId` column as a foreign key linking the `posts` table and a `userId` column as a foreign key linking the `users` table, and also the other regular columns as `text` and `createdAt`.

In the case of a new table there should be a new endpoint on the api to return `reply-posts` with available filters by postId, userId and createdAt, at least.

On the front-end on the user profile would be added a tabs component bellow the container with the user information. This would be two tabs, one to list all the user's original posts, and the second one for the original posts and the reply posts.

<br>

# Critique

## What to improve

- The route management was a little difficult to figure out how to make it work the way it was requested. The implementation probably is not the best, so more research could be done on this subject to find out a possible better solution;
- The `Post` componet is written as a recursive component. Because of that choice it was difficult to create propper stylezation for posts and sub-posts. There can be a better strategy that can be easier to implement and to mantain;

## Scaling

The first thing that would make the app crash would be the case of too many posts being requested from the API and rendered on the screen. So the first thing that could be done is to limit with a paginated request the amount of posts listed on the feed with a "see more" option. This would reduce the amount of data being requested and the amount of components being rendered.

More features could be added to make it more attractive to users like more ways to interact with other users like a private chat, for example. A user settings page could be added providing preferences about posts, other users, notifications, etc.
The app would have to provide the user the possibility to create more customizable posts by adding media like pictures or videos to make it more attractive.

Media like pictures and videos could not be stored in the database because of the limited storage and it would make the app slow when requesting this kind of data. A service that provides a good cloud storage with low latency access like AWS would be a good idea.
