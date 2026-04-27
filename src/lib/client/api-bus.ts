import { API_EVENTS } from "./events";
import type { ToggleReadEventDetail } from "./types";

document.addEventListener(API_EVENTS.TOGGLE_READ, function (e: Event) {
  const customEvent = e as CustomEvent<ToggleReadEventDetail>;
  const detail = customEvent.detail;
  if (!detail) return;

  fetch(`/api/entries/${detail.entryId}/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: detail.status }),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("API request failed");
      }
      document.dispatchEvent(
        new CustomEvent(API_EVENTS.TOGGLE_READ_SUCCESS, {
          detail: { entryId: detail.entryId, status: detail.status },
        }),
      );
    })
    .catch(function (error) {
      console.error("Failed to toggle read status", error);
      document.dispatchEvent(
        new CustomEvent(API_EVENTS.TOGGLE_READ_ERROR, {
          detail: { entryId: detail.entryId, status: detail.status, error },
        }),
      );
    });
});
