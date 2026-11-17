export function formatWhen(event) {
  return event.dateLabel;
}

export function eventPath(event) {
  return event.slug === "community-day" ? "/community-day" : `/events/${event.slug}`;
}

export function initials(name) {
  const cleaned = name.replace(/,?\s*PhD\.?/gi, "").replace(/\(.*?\)/g, "");
  const skip = new Set(["ur", "bin", "bint", "dr", "sir"]);
  const parts = cleaned
    .split(/[\s-]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !skip.has(part.toLowerCase().replace(".", "")));
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}
