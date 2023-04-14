import React from "react";
import { SpacerContainer } from "./Spacer.style";

export type SpacerProps = {
  height?: string;
  width?: string;
}

const Spacer = ({ height, width }: SpacerProps) => (
  <SpacerContainer height={height} width={width} />
);

export default Spacer;