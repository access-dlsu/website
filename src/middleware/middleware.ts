import { createMiddleware } from "@solidjs/start/middleware";
import { redirect } from "@solidjs/router";
import { readFileSync } from "fs";
import { resolve } from "path";

// Cache for shortened URLs
let shortenedUrls: Array<{ path: string; url: string }> | null = null;

function getShortenedUrls() {
  if (!shortenedUrls) {
    const filePath = resolve(process.cwd(), "public/tinyurl.json");
    shortenedUrls = JSON.parse(readFileSync(filePath, "utf-8"));
  }
  return shortenedUrls;
}

export default createMiddleware({
  onRequest: (event) => {
    const { pathname } = new URL(event.request.url);
    // Extract the shortened path from /[url]
    const match = pathname.split('/', 2)[1];
    const shortenedUrls = getShortenedUrls();
    const entry = shortenedUrls!.find((s) => s.path === match);
    if (entry) {
      console.log("Found TinyURL link: " + match)
      return redirect(entry.url, 302);
    }
  },
});
