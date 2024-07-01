import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import scoreIcon from '../assets/img/score.png';
import closeIcon from '../assets/img/close.svg';


const Scores = ({ score }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //console.log(score);
  const data = React.useMemo(() => {
    const sortedScore = [...score].sort((a, b) => b.NbTrees - a.NbTrees);
    return sortedScore.map((item, index) => ({ ...item, IdUsers: index + 1 }));
  }, [score]);

  const columns = React.useMemo(
    () => [
      { Header: 'Place', accessor: 'IdUsers' },
      { Header: 'Pseudo', accessor: 'Pseudo' },
      { Header: 'Trees', accessor: 'NbTrees' },
      { Header: 'Leaves', accessor: 'Leafs' },
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
      <button onClick={() => setModalIsOpen(true)}><img src={scoreIcon} alt="Score" style={{width: '31px', height: '22px', marginRight: '5px'}} />Score</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Scores</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => {
              const { key, ...props } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...props}>
                  {headerGroup.headers.map(column => {
                    const { key: columnKey, ...columnProps } = column.getHeaderProps();
                    return <th key={columnKey} {...columnProps}>{column.render('Header')}</th>;
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              const { key, ...props } = row.getRowProps();
              return (
                <tr key={key} {...props}>
                  {row.cells.map(cell => {
                    const { key, ...props } = cell.getCellProps();
                    return <td key={key} {...props}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => setModalIsOpen(false)}>
          <img src={closeIcon} alt="Close" style={{width: '34px', height: '34px'}} />
        </button>
      </Modal>
    </div>
  );
}

export default Scores;