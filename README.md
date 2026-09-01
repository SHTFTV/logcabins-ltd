# LogCabins.ltd

LogCabins.ltd is an informational and lead-generation website for UK log cabins. It showcases cabin models, an interactive configurator, land plots, turnkey services, and planning guidance, and includes an AI-powered land advisory tool.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key. This is required for the AI Land Advisor feature -- without it, the advisor falls back to a generic, clearly-labeled non-personalized estimate.
3. Run the app in development mode:
   `npm run dev`

## Build & Run in Production

1. Build the client and server bundles:
   `npm run build`
2. Start the production server:
   `npm start`

## Scripts

- `npm run dev` -- start the local development server
- `npm run build` -- build the client (Vite) and server bundles
- `npm start` -- run the production server bundle
- `npm run preview` -- preview the built client
- `npm run lint` -- type-check the project with `tsc --noEmit`
