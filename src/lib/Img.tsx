import {
  ComponentProps,
  createUniqueId,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { SourceProps } from "./Source";
import { imgSymbol } from "./symbols";
import { Sizeable } from "./types";
import { styleAspectRatio } from "./utils";

export type ImgProps = ComponentProps<"img"> & Partial<Sizeable>;

export type ImgReturn = { props: ImgProps; [imgSymbol]: any };

export function isImgReturn(object: unknown): object is ImgReturn {
  return object != null && typeof object === "object" && imgSymbol in object;
}

export default function Img(props: ImgProps) {
  return {
    props,
    [imgSymbol]: true,
  } as unknown as JSX.Element;
}

export function ImgElement(props: ImgProps & { sources: SourceProps[] }) {
  const [localProps, otherProps] = splitProps(props, [
    "naturalWidth",
    "naturalHeight",
    "sources",
    "id",
  ]);

  const defaultId = createUniqueId();
  const id = () => localProps.id ?? `picture-${defaultId}`;

  return (
    <>
      <style>{`:where(#${id()}) { aspect-ratio: ${styleAspectRatio(
        localProps
      )}; background-image: url(${otherProps.src});`}</style>
      <Show when={localProps.sources.length > 0}>
        <style>
          {localProps.sources.map(
            (source) =>
              `@media ${
                source.media
              } { :where(#${id()}) { aspect-ratio: ${styleAspectRatio(
                source
              )}; background-image: url(${source.src}) } }`
          )}
        </style>
      </Show>
      <img {...otherProps} id={id()} />
    </>
  );
}
