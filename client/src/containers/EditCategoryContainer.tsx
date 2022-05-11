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
    <div>
      <ContentEditable
        data-testid="update-category-content-div"
        innerRef={categoryNameDivInput}
        html={categoryName ?? ''} // innerHTML of the editable div
        disabled={categoryEditDisabled} // use true to disable edition
        onChange={handleChange} // handle innerHTML change
        className={cx({
          [css`
            display: inline-block;
            font-size: 2em;
            margin-block-start: 0.67em;
            margin-block-end: 0.67em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
            margin-right: 10px;
          `]: true,
          [css`
            background-color: #94e39f;
          `]: !categoryEditDisabled,
        })}
        tagName="span"
      />

      {categoryEditDisabled && (
        <button
          data-testid="update-category-edit-button"
          onClick={enableCategoryNameChange}
        >
          Edit
        </button>
      )}
      {!categoryEditDisabled && (
        <span>
          <button
            data-testid="update-category-save-button"
            onClick={saveCategoryNameChange}
          >
            Save Changes
          </button>
          <button
            data-testid="update-category-cancel-button"
            onClick={cancelCategoryNameChange}
          >
            Cancel Changes
          </button>
        </span>
      )}
      {data && data.updateCategory && (
        <span data-testid="update-category-messsage">
          {data.updateCategory.message}
        </span>
      )}
      {loading && <span>Updating...</span>}
      {error && <span>Error...</span>}
    </div>
  );
};

export { EditCategoryContainer, UpdateCategoryNameDocument };
