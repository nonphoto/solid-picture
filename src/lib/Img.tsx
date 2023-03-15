import { ComponentProps, createUniqueId, JSX, splitProps } from "solid-js";
import { SourceProps } from "./Source";
import { imgSymbol } from "./symbols";
import { Sizeable } from "./types";
import { cssMedia, cssRule, maybe, styleAspectRatio, styleUrl } from "./utils";

export type ImgProps = ComponentProps<"img"> &
  Partial<Sizeable> & { placeholderSrc: string };

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
    "placeholderSrc",
    "sources",
    "id",
  ]);

  const defaultId = createUniqueId();
  const id = () => localProps.id ?? `img-${defaultId}`;

  return (
    <>
      <style>
        {[
          cssRule(`:where(#${id()})`, [
            ["aspect-ratio", styleAspectRatio(localProps)],
            ["background-image", maybe(localProps.placeholderSrc, styleUrl)],
          ]),
          ...localProps.sources
            .filter((source) => source.media != null)
            .map((source) =>
              cssMedia(
                source.media!,
                cssRule(`:where(#${id()})`, [
                  ["aspect-ratio", styleAspectRatio(source)],
                  ["background-image", maybe(source.placeholderSrc, styleUrl)],
                ])
              )
            ),
        ].join(" ")}
      </style>
      <img {...otherProps} id={id()} />
    </>
  );
}
