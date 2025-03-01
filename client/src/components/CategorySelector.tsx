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
  selectedCategory?: string | null;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  data,
  onSelectCategory,
  selectedCategory,
}: CategorySelectorProps): React.ReactElement => {
  return (
    <div
      className={css`
        background-color: #f5f5f5;
        height: 100%;
        overflow: auto;
        border-right: 1px solid #e0e0e0;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
      `}
    >
      <div className={css`
        padding: 16px;
        margin: 0;
        background-color: #3f51b5;
        color: white;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 10;
      `}>
        <h3 className={css`
          margin: 0;
          font-weight: 500;
          font-size: 1.25rem;
        `}>Categories</h3>
      </div>
      
      {data.length === 0 ? (
        <div className={css`
          padding: 24px 16px;
          text-align: center;
          color: #757575;
          font-style: italic;
        `}>
          No categories available
        </div>
      ) : (
        <ul
          className={css`
            padding: 8px 0;
            margin: 0;
            list-style-type: none;
          `}
        >
          {data.map((_data) => {
            const isSelected = selectedCategory === _data.id;
            return (
              <li
                key={_data.id}
                onClick={(): void => onSelectCategory(_data.id)}
                className={css`
                  color: ${isSelected ? '#3f51b5' : '#424242'};
                  background-color: ${isSelected ? 'rgba(63, 81, 181, 0.08)' : 'transparent'};
                  cursor: pointer;
                  padding: 12px 16px;
                  margin: 4px 8px;
                  border-radius: 4px;
                  transition: all 0.2s ease;
                  display: flex;
                  align-items: center;
                  font-weight: ${isSelected ? '500' : '400'};
                  border-left: ${isSelected ? '4px solid #3f51b5' : '4px solid transparent'};

                  &:hover {
                    color: ${isSelected ? '#3f51b5' : '#3f51b5'};
                    background-color: ${isSelected ? 'rgba(63, 81, 181, 0.12)' : 'rgba(63, 81, 181, 0.04)'};
                  }
                `}
              >
                {_data.name || 'Untitled Category'}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};