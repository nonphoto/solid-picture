import {
  children,
  ComponentProps,
  splitProps,
  JSX,
  createMemo,
  For,
  createContext,
  Accessor,
} from "solid-js";
import { ImgElement, ImgProps, isImgReturn } from "./Img";
import {
  isSourceReturn,
  SourceElement,
  SourceProps,
  SourceReturn,
} from "./Source";

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
    resolvedChildren.toArray().reduce<{
      sources: SourceProps[];
      imgs: ImgProps[];
      other: JSX.Element[];
    }>(
      (acc, child) => {
        if (isSourceReturn(child)) {
          acc.sources.push(child.props);
        } else if (isImgReturn(child)) {
          acc.imgs.push(child.props);
        } else {
          acc.other.push(child);
        }
        return acc;
      },
      { sources: [], imgs: [], other: [] }
    )
  );

  return (
    <picture {...otherProps}>
      <For each={sortedChildren().sources}>
        {(sourceProps) => <SourceElement {...sourceProps} />}
      </For>
      <For each={sortedChildren().imgs}>
        {(imgProps) => (
          <ImgElement {...imgProps} sources={sortedChildren().sources} />
        )}
      </For>
      {...sortedChildren().other}
    </picture>
  );
}
