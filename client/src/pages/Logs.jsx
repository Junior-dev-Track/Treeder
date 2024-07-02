import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import logsIcon from '../assets/img/logs.png';
import closeIcon from '../assets/img/close.svg';

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
      <button className='round--btn round--btn__big' onClick={() => setModalIsOpen(true)}>
        <div className='btn__el'>
          <img src={logsIcon} alt="Logs" className='logs-icon' />
          <span className='btn--text'>Logs</span></div>
        </button>

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
        <button onClick={() => setModalIsOpen(false)}>
          <img src={closeIcon} alt="Close" style={{width: '34px', height: '34px'}} />
        </button>
      </Modal>
    </div>
  );
}

export default Logs;