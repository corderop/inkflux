import type { ToggleReadEventDetail } from "./types";

export const API_EVENTS = {
  TOGGLE_READ: "inkflux:api:toggle-read",
  TOGGLE_READ_SUCCESS: "inkflux:api:toggle-read:success",
  TOGGLE_READ_ERROR: "inkflux:api:toggle-read:error",
} as const;

export interface InkfluxEventMap {
  [API_EVENTS.TOGGLE_READ]: CustomEvent<ToggleReadEventDetail>;
  [API_EVENTS.TOGGLE_READ_SUCCESS]: CustomEvent<ToggleReadEventDetail>;
  [API_EVENTS.TOGGLE_READ_ERROR]: CustomEvent<
    ToggleReadEventDetail & { error: unknown }
  >;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DocumentEventMap extends InkfluxEventMap {}
}
