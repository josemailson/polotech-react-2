import React from "react";
import { SpacerContainer } from "./Spacer.style";

export interface ISpacer {
    height: string;
    width: string;
  }

  const Spacer: React.FC<ISpacer> = ({height, width}) => (
    <SpacerContainer height={height} width={width}/>
  );

export default Spacer;