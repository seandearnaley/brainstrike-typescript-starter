import React from 'react';
import { css } from 'emotion';

interface CategoryData {
  id: string;
  name: string | null;
  created: string | null; //ISOString
  updated: string | null; //ISOString
}

interface CategorySelectorProps {
  data: CategoryData[];
}

export const CategorySelector: React.FC<CategorySelectorProps> = (
  props: CategorySelectorProps,
): React.ReactElement => {
  return (
    <div
      className={css`
        background-color: silver;
      `}
    >
      <div>
        {props.data.map(data => {
          return <div key={data.id}>{data.name}</div>;
        })}
      </div>
    </div>
  );
};