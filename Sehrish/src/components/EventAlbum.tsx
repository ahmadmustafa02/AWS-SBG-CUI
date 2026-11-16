"use client";

import { useEffect, useState } from "react";
import { apiConfigured, fetchEventPhotos, type Photo } from "@/lib/api";
import { PhotoGrid } from "./PhotoGrid";
import { StateBlock } from "./StateBlock";

type State = { kind: "loading" } | { kind: "error" } | { kind: "done"; photos: Photo[] };

/** Every photo from one event, loaded from the API. */
export function EventAlbum({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!apiConfigured) return;
    let cancelled = false;
    fetchEventPhotos(eventId)
      .then((res) => !cancelled && setState({ kind: "done", photos: res.photos }))
      .catch(() => !cancelled && setState({ kind: "error" }));
    return () => {
      cancelled = true;
    };
  }, [eventId]);

  if (!apiConfigured) {
    return (
      <StateBlock kind="coming-soon" title="This album isn't online yet">
        Photos appear here once the media team uploads them after the event. Albums are open to signed-in attendees of
        that event.
      </StateBlock>
    );
  }
  if (state.kind === "loading") return <StateBlock kind="loading" title="Loading the album" />;
  if (state.kind === "error") {
    return (
      <StateBlock kind="error" title="The album didn't load">
        You may need to sign in as an attendee of this event, or your connection dropped. Try again.
      </StateBlock>
    );
  }
  if (state.photos.length === 0) {
    return (
      <StateBlock kind="empty" title="No photos uploaded yet">
        The media team is still sorting through the shots. Check back soon.
      </StateBlock>
    );
  }
  return (
    <>
      <p className="eyebrow">{state.photos.length} photos</p>
      <PhotoGrid photos={state.photos} label={`${eventTitle} album`} />
    </>
  );
}
