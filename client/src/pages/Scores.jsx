import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';


const Scores = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const data = React.useMemo(
    () => [
      { place: 1, pseudo: 'Player1', trees: 10, leaves: 50 },
      { place: 2, pseudo: 'Player2', trees: 8, leaves: 40 },
      // ...
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: 'Place', accessor: 'place' },
      { Header: 'Pseudo', accessor: 'pseudo' },
      { Header: 'Trees', accessor: 'trees' },
      { Header: 'Leaves', accessor: 'leaves' },
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
      <button onClick={() => setModalIsOpen(true)}>Score</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Scores</h2>
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

export default Scores;