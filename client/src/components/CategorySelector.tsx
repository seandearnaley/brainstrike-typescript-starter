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
        button {
          color: black;
          cursor: pointer;
        }
        button:hover {
          color: blue;
        }
      `}
    >
      <div
        className={css`
          padding: 5px;
        `}
      >
        {data.map(_data => {
          return (
            <div key={_data.id}>
              <button onClick={(): void => onSelectCategory(_data.id)}>
                {_data.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
