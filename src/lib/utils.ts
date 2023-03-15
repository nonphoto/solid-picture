import { Sizeable } from "./types";

export function cssMedia(media: string, rules: string) {
  return `@media ${media} { ${rules} }`;
}

export function cssRule(
  rule: string,
  properties: [string, string | undefined][]
) {
  const propertiesString = properties
    .filter(([, value]) => value != null)
    .map(([name, value]) => `${name}: ${value}`)
    .join("; ");
  return `${rule} { ${propertiesString} }`;
}

export function maybe<T, U>(value: T, fn: (just: NonNullable<T>) => U) {
  return value != null ? fn(value) : undefined;
}

export function stylePx<T extends { toString: () => string }>(value: T) {
  return value.toString() + "px";
}

export function styleUrl<T extends { toString: () => string }>(value: T) {
  return `url(${value.toString()})`;
}

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
