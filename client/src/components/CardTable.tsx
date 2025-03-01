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
    <div className={css`
      overflow: auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-height: 70vh;
      margin: 16px 0;
      background-color: white;
      position: relative;
    `}>
      <table
        className={css`
          border-collapse: collapse;
          width: 100%;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          
          th {
            position: sticky;
            top: 0;
            background-color: #3f51b5;
            color: white;
            font-weight: 500;
            text-align: left;
            padding: 12px 16px;
            z-index: 1;
          }
          
          td {
            padding: 12px 16px;
            border-bottom: 1px solid rgba(224, 224, 224, 1);
            font-size: 0.875rem;
            
            &.id-cell {
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.75rem;
              color: #5c6bc0;
            }

            &.number-cell {
              font-weight: 500;
              text-align: center;
              color: #303f9f;
            }

            &.label-cell {
              font-weight: 400;
            }

            &.date-cell {
              color: #757575;
              font-size: 0.75rem;
            }
          }
          
          tr {
            transition: background-color 0.2s ease;
            
            &:hover {
              cursor: pointer;
              background-color: rgba(63, 81, 181, 0.08);
            }
          }
          
          tr:nth-of-type(odd) {
            background-color: rgba(0, 0, 0, 0.02);
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
          {props.data.length === 0 ? (
            <tr>
              <td colSpan={tableColumns.length} style={{ textAlign: 'center', padding: '32px 16px' }}>
                No cards available for this category
              </td>
            </tr>
          ) : (
            props.data.map((data) => {
              return (
                <tr
                  key={data.id}
                  onClick={(): void => props.onSelectCard(data.id ?? null)}
                >
                  <td className="number-cell">
                    {data.number}
                  </td>
                  <td className="id-cell">
                    {data.id}
                  </td>
                  <td className="label-cell">
                    {data.label || 'Untitled'}
                  </td>
                  <td className="date-cell">
                    {format(new Date(data.created), 'MMM dd, yyyy, h:mm a')}
                  </td>
                  <td className="date-cell">
                    {data.updated
                      ? format(new Date(data.updated), 'MMM dd, yyyy, h:mm a')
                      : 'Not updated'}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};