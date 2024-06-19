import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';

const Logs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const data = React.useMemo(
    () => [
      // Remplacez ceci par vos données réelles
      { date: '2022-01-01', time: '12:00', pseudo: 'Player1', log: 'Log text 1' },
      { date: '2022-01-02', time: '13:00', pseudo: 'Player2', log: 'Log text 2' },
      // ...
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: 'Pseudo', accessor: 'pseudo' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Time', accessor: 'time' },
      { Header: 'Log', accessor: 'log' },
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
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
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