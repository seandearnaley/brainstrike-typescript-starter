import React, { useEffect, useState, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import {
  useUpdateCategoryNameMutation,
  UpdateCategoryNameDocument,
} from '../generated/graphql';
import { cx, css } from '@emotion/css';

interface EditCategoryContainerProps {
  id?: string;
  originalCategoryName?: string | null;
}

const EditCategoryContainer: React.FC<EditCategoryContainerProps> = ({
  id,
  originalCategoryName,
}: EditCategoryContainerProps) => {
  const [updateCategoryMutation, { data, loading, error }] =
    useUpdateCategoryNameMutation();
  const prevCategoryValue = useRef<string | null | undefined>(undefined);
  const categoryNameDivInput = useRef<HTMLDivElement>(null);
  const [categoryEditDisabled, setCategoryEditDisabled] = useState(true);
  const [categoryName, setCategoryName] = useState<string | null | undefined>(
    null,
  );

  useEffect(() => {
    setCategoryName(originalCategoryName);
  }, [originalCategoryName, id]);

  const enableCategoryNameChange = () => {
    if (categoryNameDivInput.current)
      prevCategoryValue.current = categoryNameDivInput.current.innerText;
    setCategoryEditDisabled(false);
  };

  const handleChange = (evt: ContentEditableEvent) => {
    setCategoryName(evt.target.value);
  };

  const saveCategoryNameChange = () => {
    setCategoryEditDisabled(true);
    if (!id) return;
    updateCategoryMutation({
      variables: {
        id,
        input: {
          name: categoryName,
        },
      },
    });
  };

  const cancelCategoryNameChange = () => {
    setCategoryName(prevCategoryValue.current);
    setCategoryEditDisabled(true);
  };

  return (
    <div className={css`
      flex: 1;
    `}>
      <h2 className={css`
        margin: 0;
        color: #3f51b5;
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 16px;
      `}>Category Details</h2>
      
      <div className={css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      `}>
        <ContentEditable
          data-testid="update-category-content-div"
          innerRef={categoryNameDivInput as React.RefObject<HTMLElement>}
          html={categoryName ?? ''}
          disabled={categoryEditDisabled}
          onChange={handleChange}
          className={cx({
            [css`
              font-size: 1.5rem;
              font-weight: 500;
              color: #212121;
              margin-right: 12px;
              padding: 4px 8px;
              border-radius: 4px;
              transition: background-color 0.2s;
              outline: none;
            `]: true,
            [css`
              background-color: #e8eaf6;
              border: 1px solid #c5cae9;
            `]: !categoryEditDisabled,
          })}
          tagName="span"
        />
        
        {categoryEditDisabled ? (
          <button
            data-testid="update-category-edit-button"
            onClick={enableCategoryNameChange}
            className={css`
              background-color: #e0e0e0;
              color: #424242;
              border: none;
              border-radius: 4px;
              padding: 4px 12px;
              font-size: 0.875rem;
              cursor: pointer;
              transition: background-color 0.2s;
              
              &:hover {
                background-color: #bdbdbd;
              }
            `}
          >
            Edit
          </button>
        ) : (
          <div className={css`
            display: flex;
            gap: 8px;
          `}>
            <button
              data-testid="update-category-save-button"
              onClick={saveCategoryNameChange}
              className={css`
                background-color: #3f51b5;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 4px 12px;
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
                
                &:hover {
                  background-color: #303f9f;
                }
              `}
            >
              Save
            </button>
            <button
              data-testid="update-category-cancel-button"
              onClick={cancelCategoryNameChange}
              className={css`
                background-color: #e0e0e0;
                color: #424242;
                border: none;
                border-radius: 4px;
                padding: 4px 12px;
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
                
                &:hover {
                  background-color: #bdbdbd;
                }
              `}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      
      {data && data.updateCategory && (
        <div
          data-testid="update-category-messsage"
          className={css`
            margin-top: 8px;
            color: #43a047;
            font-size: 0.875rem;
            padding: 8px 12px;
            background-color: #e8f5e9;
            border-radius: 4px;
            display: inline-block;
          `}
        >
          {data.updateCategory.message}
        </div>
      )}
      
      {loading && (
        <div className={css`
          margin-top: 8px;
          color: #3f51b5;
          font-size: 0.875rem;
        `}>
          Updating...
        </div>
      )}
      
      {error && (
        <div className={css`
          margin-top: 8px;
          color: #f44336;
          font-size: 0.875rem;
          padding: 8px 12px;
          background-color: #ffebee;
          border-radius: 4px;
        `}>
          Error: {error.message}
        </div>
      )}
    </div>
  );
};

export { EditCategoryContainer, UpdateCategoryNameDocument };