import { useParams, createAsync, query } from "@solidjs/router";

type ShortenedUrl = { path: string; url: string };

const getShortenedUrls = query(
  async () => {
    "use server";
    const { readFileSync } = await import("fs");
    const { resolve } = await import("path");
    const filePath = resolve(process.cwd(), "public/tinyurl.json");
    return JSON.parse(readFileSync(filePath, "utf-8")) as ShortenedUrl[];
  },
  "shortenedUrls"
);

export default function LinkRedirect() {
  const shortenedUrls = createAsync(() => getShortenedUrls());
  const params = useParams();
  const entry = () => shortenedUrls()?.find((s) => s.path === params.url);

  // Fallback client-side redirect if SSR did not redirect
  if (typeof window !== "undefined" && entry()) {
    const isExternal = /^https?:\/\//.test(entry()!.url);
    if (isExternal) {
      window.location.replace(entry()!.url);
    } else {
      window.location.href = entry()!.url;
    }
    return <div>Redirecting...</div>;
  }

  if (!shortenedUrls()) {
    return <div>Loading...</div>;
  }

  if (!entry()) {
    return <div>Shortened URL not found.</div>;
  }

  return <div>Redirecting...</div>;
}