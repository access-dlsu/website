import { createMiddleware } from "@solidjs/start/middleware";
import { redirect } from "@solidjs/router";
import { readFileSync } from "fs";
import { resolve } from "path";

export default createMiddleware({
  onRequest: (event) => {
    const { pathname } = new URL(event.request.url);
    // Extract the shortened path from /link/[url]
    const match = pathname.match(/^\/link\/([^/]+)$/);
    if (match) {
      console.log("Found TinyURL link: " + match[1])
      const filePath = resolve(process.cwd(), "public/tinyurl.json");
      const shortenedUrls = JSON.parse(readFileSync(filePath, "utf-8"));
      const entry = shortenedUrls.find((s: { path: string }) => s.path === match[1]);
      if (entry) {
        return redirect(entry.url, 302);
      }
    }
  },
});
