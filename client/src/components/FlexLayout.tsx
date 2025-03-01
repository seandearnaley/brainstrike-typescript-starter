import React from 'react';
import { css } from '@emotion/css';

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
        background-color: #f9f9f9;
        overflow: hidden;
        position: relative; /* Ensure proper stacking context */
      `}
    >
      <div
        className={css`
          flex: 0 0 250px;
          height: 100%;
          overflow: auto;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          z-index: 5; /* Ensure it's above middle content */
          background-color: #f5f5f5;
          
          @media (max-width: 1200px) {
            flex: 0 0 220px;
          }
          
          @media (max-width: 900px) {
            flex: 0 0 200px;
          }
        `}
      >
        {props.left}
      </div>
      <div
        className={css`
          flex: 1;
          height: 100%;
          overflow: auto;
          transition: all 0.3s ease;
          border-right: 1px solid #e0e0e0;
          background-color: #fdfdfd;
          z-index: 1;
        `}
      >
        <div
          className={css`
            padding: 16px;
            height: calc(100% - 32px);
            overflow: auto;
          `}
        >
          {props.middle}
        </div>
      </div>
      <div
        className={css`
          flex: 0 0 400px;
          height: 100%;
          overflow: auto;
          padding: 16px;
          background-color: #fafafa;
          transition: all 0.3s ease;
          z-index: 1;
          
          @media (max-width: 1200px) {
            flex: 0 0 350px;
          }
          
          @media (max-width: 900px) {
            flex: 0 0 300px;
          }
        `}
      >
        {props.right}
      </div>
    </div>
  );
};