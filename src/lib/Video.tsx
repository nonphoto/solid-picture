import {
  children,
  ComponentProps,
  createMemo,
  createUniqueId,
  For,
  JSX,
  splitProps,
} from "solid-js";
import { isSourceReturn, SourceElement, SourceProps } from "./Source";
import { Sizeable } from "./types";
import { cssMedia, cssRule, maybe, styleAspectRatio, styleUrl } from "./utils";

export type VideoProps = ComponentProps<"video"> &
  Partial<Sizeable> & {
    placeholderPoster?: string;
  };

export default function Video(props: VideoProps) {
  const [localProps, otherProps] = splitProps(props, [
    "children",
    "naturalWidth",
    "naturalHeight",
    "placeholderPoster",
    "id",
  ]);

  const defaultId = createUniqueId();
  const id = () => localProps.id ?? `video-${defaultId}`;

  const resolvedChildren = children(() => localProps.children);
  const sortedChildren = createMemo(() =>
    resolvedChildren.toArray().reduce<{
      sources: SourceProps[];
      other: JSX.Element[];
    }>(
      (acc, child) => {
        if (isSourceReturn(child)) {
          acc.sources.push(child.props);
        } else {
          acc.other.push(child);
        }
        return acc;
      },
      { sources: [], other: [] }
    )
  );

  return (
    <>
      <style>
        {[
          cssRule(`:where(#${id()})`, [
            ["aspect-ratio", styleAspectRatio(localProps)],
            ["background-image", maybe(localProps.placeholderPoster, styleUrl)],
          ]),
          ...sortedChildren()
            .sources.filter((source) => source.media != null)
            .map((source) =>
              cssMedia(
                source.media!,
                cssRule(`:where(#${id()})`, [
                  ["aspect-ratio", styleAspectRatio(source)],
                  [
                    "background-image",
                    maybe(source.placeholderPoster, styleUrl),
                  ],
                ])
              )
            ),
        ].join(" ")}
      </style>
      <video {...otherProps} id={id()}>
        <For each={sortedChildren().sources}>
          {(sourceProps) => <SourceElement {...sourceProps} />}
        </For>
        {sortedChildren().other}
      </video>
    </>
  );
}
