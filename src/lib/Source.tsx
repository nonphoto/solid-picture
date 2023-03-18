import { ComponentProps, JSX, splitProps } from "solid-js";
import { sourceSymbol } from "./symbols";
import { Sizeable } from "./types";

export type SourceProps = ComponentProps<"source"> &
  Partial<Sizeable> & {
    placeholderSrc?: string;
  };

export type SourceReturn = {
  props: SourceProps;
  [sourceSymbol]: any;
};

export function isSourceReturn(object: unknown): object is SourceReturn {
  return object != null && typeof object === "object" && sourceSymbol in object;
}

export default function Source(props: SourceProps) {
  return {
    props,
    [sourceSymbol]: true,
  } as unknown as JSX.Element;
}

export function SourceElement(props: SourceProps) {
  const [, otherProps] = splitProps(props, [
    "naturalWidth",
    "naturalHeight",
    "placeholderSrc",
  ]);
  return <source {...otherProps} />;
}
