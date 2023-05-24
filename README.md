This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running locally

First, clone the repo in whatever directory you want:

```bash
git clone git@github.com:rcabre95/dog-finder.git
```

Next, download the dependencies:

```bash
npm install
```

Then, set up your environment variables. Create a file in the root directory called `.env.local`. Inside of this file you need to create 4 variables:

- Note: I am assuming you are running on port 3000. If this is not the case please replace 3000 with whatever port number you are using.

```env
NEXT_PUBLIC_FETCH_URL={Paste in the fetch api url and remove braces. Make sure there is no slash at the end.}
NEXT_PUBLIC_DEBUG_LVL=LOW
NEXT_PUBLIC_HOME_URL=http://localhost:3000
OUTLOOK_EMAIL={Enter in the email i provided and remove braces}
OUTLOOK_PASSWORD={Enter in the password i provided and remove braces}
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Geolocation

Geolocation class found in `/lib/utils/distance.ts` was derived from [this article](http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates#Latitude).

### About the massive bundle size

I know, I know. It's huge. But it's only huge because I wanted those silly dog gifs. It would be a reasonable size if I excluded them, but where's the fun in that? I will later update them into `.mov` or another file in the future to reduce its size.
