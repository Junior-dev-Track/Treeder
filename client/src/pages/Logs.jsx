import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';

const Logs = ({ logs }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const data = React.useMemo(() => logs, [logs]);

  const columns = React.useMemo(
    () => [
      { Header: 'Pseudo', accessor: 'Pseudo' },
      { Header: 'Date', accessor: 'Date' },
      { Header: 'Log', accessor: 'Log' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Logs</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Player Logs</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => {
              const { key: keyHeaderGroup, ...propsHeaderGroup } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={keyHeaderGroup} {...propsHeaderGroup}>
                  {headerGroup.headers.map(column => {
                    const { key: keyColumn, ...propsColumn } = column.getHeaderProps();
                    return <th key={keyColumn} {...propsColumn}>{column.render('Header')}</th>;
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              const { key: keyRow, ...propsRow } = row.getRowProps();
              return (
                <tr key={keyRow} {...propsRow}>
                  {row.cells.map(cell => {
                    const { key: keyCell, ...propsCell } = cell.getCellProps();
                    return <td key={keyCell} {...propsCell}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Logs;