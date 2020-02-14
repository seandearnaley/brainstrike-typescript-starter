import React, { useEffect, useState, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { GetCategoryWithCardsQuery } from '../generated/graphql';
import { cx, css } from 'emotion';

interface EditCategoryContainerProps {
  data: GetCategoryWithCardsQuery;
}

export const EditCategoryContainer: React.FC<EditCategoryContainerProps> = ({
  data,
}: EditCategoryContainerProps) => {
  const prevCategoryValue = useRef<string | null | undefined>(undefined);
  const categoryNameDivInput = useRef<HTMLDivElement>(null);

  const [categoryEditDisabled, setCategoryEditDisabled] = useState(true);
  const [categoryName, setCategoryName] = useState<string | null | undefined>(
    null,
  );

  useEffect(() => {
    setCategoryName(data?.category?.name);
  }, [data]);

  const enableCategoryNameChange = () => {
    if (categoryNameDivInput.current)
      prevCategoryValue.current = categoryNameDivInput.current.innerText;

    setCategoryEditDisabled(false);
  };

  const handleChange = (evt: ContentEditableEvent) => {
    setCategoryName(evt.target.value);
  };

  const saveCategoryNameChange = () => {
    // if (categoryNameDivInput.current) {
    //   setCategoryName(categoryNameDivInput.current.innerText);
    // }

    // do save
    setCategoryEditDisabled(true);
  };

  const cancelCategoryNameChange = () => {
    setCategoryName(prevCategoryValue.current);
    setCategoryEditDisabled(true);
  };

  return (
    <div>
      <ContentEditable
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
        <button onClick={enableCategoryNameChange}>Edit</button>
      )}
      {!categoryEditDisabled && (
        <span>
          <button onClick={saveCategoryNameChange}>Save Changes</button>
          <button onClick={cancelCategoryNameChange}>Cancel Changes</button>
        </span>
      )}
    </div>
  );
};
