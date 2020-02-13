import React, { useState, useRef, useEffect } from 'react';

type EditCompData = string | undefined | null;

interface EditCompProps {
  data: EditCompData;
}
export const EditComp: React.FC<EditCompProps> = (
  props: EditCompProps,
): React.ReactElement => {
  const { data } = props;
  const [cellValue, setCellValue] = useState<EditCompData>(undefined);
  const [editModeState, setEditModeState] = useState(false);
  const [divStyle, setDivStyle] = useState({
    background: 'lightgray',
    width: '300px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
  });
  const prevVal = useRef<string | undefined>(undefined);
  const cellRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCellValue(data);
  }, [data]);

  useEffect(() => {
    if (editModeState && cellRef.current) cellRef.current.focus();
  }, [editModeState]);

  const onCl = () => {
    setEditModeState(true);
    if (cellRef.current) prevVal.current = cellRef.current.innerText;
    setDivStyle(p => ({ ...p, background: 'limegreen' }));
  };

  const keyDn = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (true) {
      case e.keyCode === 27: // ESC
        if (editModeState) {
          setEditModeState(false);
          setDivStyle(p => ({ ...p, background: 'lightgray' }));
          // using promise here allows set state to not be batched and run one at a time.
          Promise.resolve().then(() => {
            if (cellRef.current) {
              setCellValue(cellRef.current.innerText);
              setCellValue(prevVal.current);
            }
          });
        }
        break;
      default:
        void 0;
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>Type something here</div>
      <div
        style={divStyle}
        contentEditable={editModeState}
        suppressContentEditableWarning
        onClick={onCl}
        ref={cellRef}
        onKeyDown={keyDn}
      >
        {cellValue}
      </div>
    </div>
  );
};
