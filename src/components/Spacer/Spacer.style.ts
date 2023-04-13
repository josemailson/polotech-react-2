import styled from 'styled-components';
import { ISpacer } from './Spacer';

export const SpacerContainer = styled.div<ISpacer>`
  height: ${(props) => props.height || "0"};
  width: ${(props) => props.width || "0"};
`;
