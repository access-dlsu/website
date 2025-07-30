import { createMiddleware } from "@solidjs/start/middleware";
import { redirect } from "@solidjs/router";

// Import the shortened URLs statically for edge compatibility
import shortenedUrlsData from "/private/tinyurl.json";

type ShortenedUrl = { path: string; url: string };
const shortenedUrls = shortenedUrlsData as ShortenedUrl[];

export default createMiddleware({
  onRequest: (event) => {
    const { pathname } = new URL(event.request.url);
    // Extract the shortened path from /[url]
    const match = pathname.split('/', 2)[1];
    const entry = shortenedUrls.find((s) => s.path.toLowerCase() === match.toLowerCase());
    if (entry) {
      console.log("Found TinyURL link: " + match)
      return redirect(entry.url, 301);
    }
  },
});
