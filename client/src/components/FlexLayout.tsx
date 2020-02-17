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
        height: 100%;
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
          height: 100%;
          overflow: auto;
        `}
      >
        <div
          className={css`
            padding: 5px;
          `}
        >
          {props.middle}
        </div>
      </div>
      <div
        className={css`
          flex: 2;
          padding: 5px;
        `}
      >
        {props.right}
      </div>
    </div>
  );
};
