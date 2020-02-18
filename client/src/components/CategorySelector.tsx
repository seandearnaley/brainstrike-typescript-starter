import React from 'react';
import { css } from 'emotion';

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
        background-color: silver;
        height: 100%;
        overflow: auto;
        li {
          color: black;
          cursor: pointer;
          padding: 5px;
        }
        li:hover {
          color: white;
          background-color: black;
        }
      `}
    >
      <ul
        className={css`
          padding: 5px;
        `}
      >
        {data.map(_data => {
          return (
            <li key={_data.id} onClick={(): void => onSelectCategory(_data.id)}>
              {_data.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
