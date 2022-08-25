This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About the App

Flicker app which searches the flicker database through their `Photo Search API` using `tags`. If the user is signed-in, multiple `tags` can be passed as a search query separated by `","`. On a successful response, images are displayed to the user.

## Deployed on Vercel

You can checkout the app on [Vercel](https://flickerapp.vercel.app/) if you don't want to run it locally.

> To use this app, user needs to sign-in with a google account.

## Getting Started

First, Run the development server:

```bash

npm run dev

# or

yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to visit the homepage. User needs to use `Google Account` to log-in.

> only signed-in users can access the search component
