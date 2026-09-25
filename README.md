# The Archive

A personal book collection built with Express, EJS, MongoDB/Mongoose, Tailwind's browser utility runtime, and custom CSS. Add, view, edit, filter and remove volumes.

## Run locally

1. Run `npm install`.
2. Create `.env` in this directory with `MONGO_URI=your_mongodb_connection_string` and optionally `PORT=3005`.
3. Run `npm start` and visit `http://localhost:3005/books` (or your configured port).

The collection and detail pages are server rendered. Filtering and the delete confirmation run in the browser. The CSS book covers use book data and need no image assets. Fonts and the Tailwind browser runtime load from a CDN; internet access is needed for these resources. Custom styling remains in `public/styles.css`.
