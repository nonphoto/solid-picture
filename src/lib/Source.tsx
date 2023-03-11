import { ComponentProps, JSX } from "solid-js";
import { Sizeable } from "./types";

export type SourceProps = ComponentProps<"source"> & Partial<Sizeable>;

export class SourceReturn {
  props: SourceProps;

  constructor(props: SourceProps) {
    this.props = props;
  }
}

export default function Source(props: SourceProps) {
  return new SourceReturn(props) as unknown as JSX.Element;
}
