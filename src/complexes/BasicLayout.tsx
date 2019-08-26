import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BasicHeaderOuter = styled.div`
  background-color: var(--color-theme-bg);
  color: var(--color-theme-fg);
  font-size: 0.8rem;
  line-height: 1.8em;

  & a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BasicHeader: FC = () => (
  <BasicHeaderOuter>
    <div className="container">
      <Link to="/" aria-label="Home">CSS Quiz J</Link>
    </div>
  </BasicHeaderOuter>
);

const BasicBody = styled.div.attrs({
  className: 'container',
})``;

type Prop = React.ComponentPropsWithRef<'div'>;

const BasicLayout: FC<Prop> = (props) => {
  return (
    <div {...props} className={`BasicLayout ${props.className}`}>
      <BasicHeader/>
      <BasicBody>
        {props.children}
      </BasicBody>
    </div>
  );
};

export default BasicLayout;
