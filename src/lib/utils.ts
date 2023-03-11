import { Sizeable } from "./types";

export function styleAspectRatio({
  naturalWidth,
  naturalHeight,
}: Partial<Sizeable>) {
  return naturalWidth && naturalHeight
    ? `${naturalWidth} / ${naturalHeight}`
    : "auto";
}

export function aspectRatio({
  naturalWidth,
  naturalHeight,
}: Partial<Sizeable>) {
  return naturalWidth && naturalHeight
    ? naturalHeight / naturalWidth
    : undefined;
}

export function sizes(values: [number, string][]) {
  return values
    .sort(([a], [b]) => b - a)
    .map(([key, value]) => `(min-width: ${key}px) ${value}`)
    .concat(["100vw"])
    .join(", ");
}
