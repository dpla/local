This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

What things you need to install the software and how to install them

* [NPM](https://www.npmjs.com/)
* [Node](https://nodejs.org/en/)

### Installing

Using your terminal, `cd` in to your favorite folder

Run `git clone https://github.com/dpla/local.git`

Once the project is cloned, run `cd local` to enter the directory

Run `npm install` to install `node_modules`

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Configuring a new DPLA Local instance

These are the main areas relevant to any Local instance:

- Environment Variables
- Static File Folder
- SCSS Theme
- Local Constants File

## Environment Variables

### .env

- DO NOT ADD SECRETS TO THIS FILE. This is a good place for defaults.

- If you want to add secrets use `.env.local` instead.

- `NEXT_PUBLIC_LOCAL_ID` determines what Local will be loaded in the given instance, since all Locals share the same codebase. Each Local must have a descriptive and unique ID (with no spaces, for example: `wisconsin` for Recollection Wisconsin). This variable also needs to be set up in `.env`.


### .env.local

This file is the place to add secrects. The variables in `.env.local` can only be accessed by the `pages/api` routes and should include:

- `API_KEY`: key used to access DPLA api
- `API_URL`: DPLA base url for api calls

## Static File Folder

Static files belonging to each Local need to be placed in a subfolder of the `static/` folder. The subfolder needs to be named with the `LOCAL_ID` (for example `static/wisconsin/` for Recollection Wisconsin). Files that go in this folder are:

- Local favicon file displayed in browser tabs (filename defined in the Constants file below)
- Local logo file displayed in the header and footer (filename defined in the Constants file below)
- `about.md` containing the text for the about page
- `homepage.md` containing the text for the home page
- `terms.md` containing the text for the terms and conditions page
- `home-hero-bg.jpg` with the hero image shown in the home page
- `manifest.json` with a manifest of files

## SCSS Theme

Locals use a theming system that allows basic color customization. This customization must follow [WCAG contrast and color requirements](https://webaim.org/articles/contrast/). Theme files follow a similar structure as the static file folder above but in the `stylesheets/themes/` folder and contain a single `theme.scss` file (for example `stylesheets/themes/wisconsin/theme.scss` for Recollection Wisconsin). The file itself contains the necessary color customizations for the Local.

In order for the local theme to overwrite the basic theme the `next.config.js` is set up to use experimental features. The `includePaths` is set up to find the theme based on the `NEXT_PUBLIC_LOCAL_ID`

```
module.exports = {
  // using the experimental tag allows for the capability to use sassOptions
  // currently, sassOptions is including the theme file for the local based on the LOCAL_ID

  experimental: { scss: true },
  sassOptions: {
    includePaths: [`./stylesheets/themes/${process.env.NEXT_PUBLIC_LOCAL_ID}`]
  }
}
```

## Local Constants File

Since all Local instances share the same codebase, there is a [`constants/local-data.js`](constants/local-data.js) file that contains the necessary configuration variables for an instance:

- `theme`: name of the SCSS file that contains the theme (should preferrably be the same as the `LOCAL_ID` for consistency)
- `name`: name of the Local, appearing throughout the site
- `favicon`: filename for the Local's `favicon` displayed in browser tabs
- `logo`: filename Local's logo shown in header and footer
- `description`: used in the `description` metadata field, sometimes displayed by search engines in their results
- `provider`: URL-encoded value used to restrict the search interface results to items belonging only to the specified `provider` (for example `%22Recollection%20Wisconsin%22` for Recollection Wisconsin)
- `locationFacet`: URL-encoded value used to restrict the search interface results to items with the specified `sourceResource.spatial.name` (for example `%22Wisconsin%22` for Recollection Wisconsin)
- `subjectFacet`: URL-encoded value used to restrict the search interface results to items with the specified `sourceResource.subject.name` (for example `%22Wisconsin%22` for Recollection Wisconsin)
- `hasAbout`: determines whether to show (`true`) or not (`false`) the “About” link in the top navigation
- `hasExhibits`: determines whether to show (`true`) or not (`false`) the “Exhibits” link in the top navigation
- `externalLink`: URL for the top navigation link with the Local's `name`

