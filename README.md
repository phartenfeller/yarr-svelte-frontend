# Svelte Tailwind Template

This is a project template for [Svelte](https://svelte.dev) apps with [TailwindCSS](https://tailwindcss.com/).

## Includes

- Svelte
- TailwindCSS
- ESLint
- Prettier

## Get started

Install the dependencies:

```bash
npm install
or
yarn
```

Start coding:

```bash
npm run dev
or
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000) and change the site.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
or
yarn build
```

## Dev

### Run yarr with Docker

```sh
docker run -d --name='yarr-rss' -v $(pwd)/data:/data -p 7070:7070 arsfeld/yarr:latest
```

Go to [localhost:7070](http://localhost:7070) and add some feeds / folders.

### Set up proxy

Unfortunately we need to run some kind of proxy to get rid of cors headers:

```sh
node ./dev/corsproxy.js
```

### Start frontend

```sh
yarn dev
```
