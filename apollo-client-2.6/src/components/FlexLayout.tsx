import React from 'react';
import { css } from 'emotion';

interface FlexLayoutProps {
  left: React.ReactElement;
  middle: React.ReactElement;
  right: React.ReactElement;
}

export const FlexLayout: React.FC<FlexLayoutProps> = (
  props: FlexLayoutProps,
): React.ReactElement => {
  return (
    <div
      className={css`
        display: flex;
      `}
    >
      <div
        className={css`
          flex: 1;
        `}
      >
        {props.left}
      </div>
      <div
        className={css`
          flex: 2;
        `}
      >
        {props.middle}
      </div>
      <div
        className={css`
          flex: 2;
        `}
      >
        {props.right}
      </div>
    </div>
  );
};
