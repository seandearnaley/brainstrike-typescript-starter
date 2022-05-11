import React from 'react';
import { format } from 'date-fns';
import { css } from '@emotion/css';

interface CardTableData {
  id: string | undefined;
  number: number | null | undefined;
  label: string | null | undefined;
  created: string; //ISOString
  updated: string | null; //ISOString
}

interface CardTableProps {
  data: CardTableData[];
  selected?: Record<string, CardTableData>;
  onSelectCard: (id: string | null) => void;
}

// NOTE: field not used yet
const tableColumns = [
  { field: 'number', label: 'Number' },
  { field: 'id', label: 'ID' },
  { field: 'label', label: 'Label' },
  { field: 'created', label: 'Created' },
  { field: 'updated', label: 'Updated' },
];

export const CardTable: React.FC<CardTableProps> = (
  props: CardTableProps,
): React.ReactElement => {
  return (
    <table
      className={css`
        border-collapse: collapse;
        th {
          text-align: left;
        }
        td,
        th {
          border: 1px solid black;
          padding: 5px;
          & span {
            color: blue;
          }
        }
        tr: hover {
          cursor: pointer;
          background-color: silver;
        }
      `}
    >
      <thead>
        <tr>
          {tableColumns.map((col) => (
            <th key={col.field}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((data) => {
          return (
            <tr
              key={data.id}
              onClick={(): void => props.onSelectCard(data.id ?? null)}
            >
              <td
                className={css`
                  text-align: center;
                `}
              >
                {data.number}
              </td>
              <td>
                <span
                  className={css`
                    font-size: 10px;
                  `}
                >
                  {data.id}
                </span>
              </td>
              <td>{data.label}</td>
              <td>{format(new Date(data.created), 'MM/dd/yyyy, h:mm:ss a')}</td>
              <td>
                {format(new Date(data.updated ?? ''), 'MM/dd/yyyy, h:mm:ss a')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
