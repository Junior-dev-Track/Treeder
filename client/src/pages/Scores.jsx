import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import scoreIcon from '../assets/img/score.png';
import closeIcon from '../assets/img/close.svg';
import CustomModal from '../components/CustomModal.jsx';


const Scores = ({ score }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //console.log(score);
  const data = React.useMemo(() => {
    const sortedScore = [...score].sort((a, b) => b.NbTrees - a.NbTrees);
    return sortedScore.map((item, index) => ({ ...item, IdUsers: index + 1 }));
  }, [score]);

  const columns = React.useMemo(
    () => [
      { 
        Header: () => (
          <div>
            <img src={scoreIcon} alt="Score" style={{width: '31px', height: '22px'}} />
          </div>
        ), 
        accessor: 'IdUsers' 
      },
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
      <button className='round--btn round--btn__big' onClick={() => setModalIsOpen(true)}>
        <div className='btn__el'>
          <img src={scoreIcon} alt="Score" className='score-icon' />
          <span className='btn--text'>Score</span></div>
      </button>

      <CustomModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className='score-container'>
          <button className='close-btn' onClick={() => setModalIsOpen(false)}>
            <img className='closeIcon' src={closeIcon} alt="Close" />
          </button>

          <h2>Scores</h2>
          <table {...getTableProps()} className='table'>
            <thead>
              {headerGroups.map(headerGroup => {
                const { key, ...props } = headerGroup.getHeaderGroupProps();
                return (
                  <tr key={key} {...props}>
                    {headerGroup.headers.map(column => {
                      const { key: columnKey, ...columnProps } = column.getHeaderProps();
                      return <th key={columnKey} {...columnProps} className="th" >{column.render('Header')}</th>;
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
                      return <td key={key} {...props} className="td" >{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CustomModal>
    </div>
  );
}

export default Scores;