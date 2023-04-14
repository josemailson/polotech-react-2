import styled from 'styled-components';
import { SpacerProps } from './Spacer';

export const SpacerContainer = styled.div<SpacerProps>`
  height: ${(props) => props.height || "0"};
  width: ${(props) => props.width || "0"};
`;
