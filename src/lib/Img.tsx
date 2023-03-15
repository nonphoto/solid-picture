import { ComponentProps, createUniqueId, JSX, splitProps } from "solid-js";
import { SourceProps } from "./Source";
import { imgSymbol } from "./symbols";
import { Sizeable } from "./types";
import {
  cssMedia,
  cssRule,
  maybe,
  styleAspectRatio,
  stylePx,
  styleUrl,
} from "./utils";

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
      <style>
        {[
          cssRule(`:where(#${id()})`, [
            ["aspect-ratio", styleAspectRatio(localProps)],
            ["max-width", maybe(localProps.naturalWidth, stylePx)],
            ["max-height", maybe(localProps.naturalHeight, stylePx)],
            ["background-image", maybe(otherProps.src, styleUrl)],
          ]),
          localProps.sources
            .filter((source) => source.media != null)
            .map((source) =>
              cssMedia(
                source.media!,
                cssRule(`:where(#${id()})`, [
                  ["aspect-ratio", styleAspectRatio(source)],
                  ["max-width", maybe(source.naturalWidth, stylePx)],
                  ["max-height", maybe(source.naturalHeight, stylePx)],
                  ["background-image", maybe(source.src, styleUrl)],
                ])
              )
            ),
        ]}
      </style>
      <img {...otherProps} id={id()} />
    </>
  );
}
