import styled from 'styled-components';
import { ICheckboxProps } from './CheckBox';

export const CheckboxContainer = styled.div`
  display: flex;
  vertical-align: middle;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 0.2rem;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })<ICheckboxProps>`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 0.6rem;
  height: 0.6rem;
  padding: 0;
  border: 0;
`;

export const StyledCheckbox = styled.div<ICheckboxProps>`
  display: flex;
  width: 1.6rem;
  height: 1.6rem;
  background: ${props => (props.checked ? 'salmon' : 'papayawhip')};
  border-radius: 0.2rem;
  transition: all 150ms;
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`;