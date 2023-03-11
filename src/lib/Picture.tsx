import {
  children,
  ComponentProps,
  splitProps,
  JSX,
  createMemo,
  For,
  createContext,
  Accessor,
  createEffect,
  getOwner,
} from "solid-js";
import { ImgElement, ImgReturn } from "./Img";
import { SourceReturn } from "./Source";

type PictureChild = SourceReturn | JSX.Element;

export type PictureProps = ComponentProps<"picture"> & {
  children: PictureChild | PictureChild[];
};

export type PictureContextData = { sources: Accessor<SourceReturn[]> };

export const PictureContext = createContext<PictureContextData>({
  sources: () => [],
});

export default function Picture(props: PictureProps) {
  const [localProps, otherProps] = splitProps(props, ["children"]);

  const resolvedChildren = children(() => localProps.children);

  const sortedChildren = createMemo(() =>
    resolvedChildren
      .toArray()
      .reduce<[SourceReturn[], ImgReturn[], JSX.Element[]]>(
        (acc, child) => {
          if (child instanceof SourceReturn) {
            acc[0].push(child);
          } else if (child instanceof ImgReturn) {
            acc[1].push(child);
          } else {
            acc[2].push(child);
          }
          return acc;
        },
        [[], [], []]
      )
  );

  createEffect(() => {
    console.log("sortedChildren", sortedChildren());
  });

  return (
    <picture {...otherProps}>
      <For each={sortedChildren()[0]}>
        {(sourceReturn) => <source {...sourceReturn.props} />}
      </For>
      <For each={sortedChildren()[1]}>
        {(imgReturn) => (
          <ImgElement {...imgReturn.props} sources={sortedChildren()[0]} />
        )}
      </For>
      {...sortedChildren()[2]}
    </picture>
  );
}
