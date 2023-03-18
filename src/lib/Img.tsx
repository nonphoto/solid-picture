import { createMediaQuery } from "@solid-primitives/media";
import {
  Accessor,
  ComponentProps,
  createMemo,
  createUniqueId,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { SourceProps } from "./Source";
import { imgSymbol } from "./symbols";
import { Sizeable } from "./types";
import {
  cssMedia,
  cssRule,
  isVideo,
  maybe,
  styleAspectRatio,
  styleUrl,
} from "./utils";

export type ImgProps = ComponentProps<"img"> &
  Partial<Sizeable> & { placeholderSrc?: string };

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

export function VideoElement(
  props: ComponentProps<"video"> & { srcset?: string }
) {
  const [localProps, otherProps] = splitProps(props, ["src", "srcset"]);
  return (
    <video
      {...otherProps}
      src={localProps.src ?? localProps.srcset}
      autoplay
      playsinline
      muted
      loop
    />
  );
}

export function ImgElement(props: ImgProps & { sources: SourceProps[] }) {
  const [localProps, otherProps] = splitProps(
    props,
    [
      "naturalWidth",
      "naturalHeight",
      "placeholderSrc",
      "sources",
      "src",
      "srcset",
      "id",
    ],
    ["width", "height", "style", "class", "classList"]
  );

  const defaultId = createUniqueId();
  const id = () => localProps.id ?? `img-${defaultId}`;

  const queries = createMemo(() =>
    localProps.sources.map<[SourceProps, Accessor<boolean>]>((source) => [
      source,
      source.media ? createMediaQuery(source.media!) : () => true,
    ])
  );

  const currentSource = createMemo(
    () => queries().find(([, match]) => match())?.[0]
  );

  const isVideoSource = () => currentSource() && isVideo(currentSource()?.type);

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
      <Show
        when={isVideoSource()}
        fallback={
          <img
            {...otherProps}
            src={localProps.src}
            srcset={localProps.srcset}
            id={id()}
          />
        }
      >
        <VideoElement
          {...otherProps}
          src={currentSource()?.src}
          srcset={currentSource()?.srcset}
          id={id()}
        />
      </Show>
    </>
  );
}
