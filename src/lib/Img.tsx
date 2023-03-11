import {
  ComponentProps,
  createUniqueId,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { SourceReturn } from "./Source";
import { Sizeable } from "./types";
import { styleAspectRatio } from "./utils";

export type ImgProps = ComponentProps<"img"> & Partial<Sizeable>;

export class ImgReturn {
  props: ImgProps;

  constructor(props: ImgProps) {
    this.props = props;
  }
}

export default function Img(props: ImgProps) {
  return new ImgReturn(props) as unknown as JSX.Element;
}

export function ImgElement(props: ImgProps & { sources: SourceReturn[] }) {
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
      )}; background-image: url(${
        otherProps.src
      }); background-repeat: no-repeat; background-size: cover`}</style>
      <Show when={localProps.sources.length > 0}>
        <style>
          {localProps.sources.map((source) =>
            source.props.media &&
            source.props.naturalWidth &&
            source.props.naturalHeight
              ? `@media ${
                  source.props.media
                } { :where(#${id()}) { aspect-ratio: ${styleAspectRatio(
                  source.props
                )}; } }`
              : ""
          )}
        </style>
      </Show>
      <img {...otherProps} id={id()} />
    </>
  );
}
