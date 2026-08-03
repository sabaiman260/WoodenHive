import { useEffect } from "react";

function setMetaTag(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

// Sets the document title and meta description/keywords for SEO.
// Usage: useSeo({ title, description, keywords })
export function useSeo({ title, description, keywords } = {}) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMetaTag("description", description);
    if (keywords) setMetaTag("keywords", keywords);
  }, [title, description, keywords]);
}
