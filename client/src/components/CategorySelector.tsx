import React from 'react';
import { css } from '@emotion/css';

interface CategoryData {
  id: string;
  name: string | null | undefined;
  created: string | null; //ISOString
  updated: string | null; //ISOString
}

interface CategorySelectorProps {
  data: CategoryData[];
  onSelectCategory: (id: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  data,
  onSelectCategory,
}: CategorySelectorProps): React.ReactElement => {
  return (
    <div
      className={css`
        background-color: #f5f5f5;
        height: 100%;
        overflow: auto;
        border-right: 1px solid #ddd;
        
        h3 {
          padding: 10px;
          margin: 0;
          background-color: #333;
          color: white;
          text-align: center;
        }
        
        li {
          color: #333;
          cursor: pointer;
          padding: 10px;
          border-bottom: 1px solid #eee;
          transition: all 0.2s ease;
        }
        
        li:hover {
          color: white;
          background-color: #555;
        }
      `}
    >
      <h3>Categories</h3>
      {data.length === 0 ? (
        <p className={css`padding: 10px; text-align: center;`}>
          No categories available
        </p>
      ) : (
        <ul
          className={css`
            padding: 0;
            margin: 0;
            list-style-type: none;
          `}
        >
          {data.map((_data) => {
            return (
              <li key={_data.id} onClick={(): void => onSelectCategory(_data.id)}>
                {_data.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
