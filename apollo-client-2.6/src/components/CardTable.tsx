import React from 'react';
import moment from 'moment';
import { css } from 'emotion';

interface CardTableData {
  id: string;
  number: number | null;
  label: string | null;
  created: string; //ISOString
  updated: string | null; //ISOString
}

interface CardTableColumnConfig {
  field: string;
  label: string;
}

interface CardTableProps {
  data: CardTableData[];
  columns: CardTableColumnConfig[];
  selected?: Record<string, CardTableData>;
}

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
      `}
    >
      <thead>
        <tr>
          {props.columns.map(col => (
            <th key={col.field}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map(data => {
          return (
            <tr key={data.id}>
              <td
                className={css`
                  text-align: center;
                `}
              >
                {data.number}
              </td>
              <td>
                <span>{data.id}</span>
              </td>
              <td>{data.label}</td>
              <td>{moment(data.created).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>
                {moment(data.updated ?? '').format('MMMM Do YYYY, h:mm:ss a')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
