import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import logsIcon from '../assets/img/logs.png';
import closeIcon from '../assets/img/close.svg';
import CustomModal from '../components/CustomModal.jsx';

const Logs = ({ logs }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const data = React.useMemo(() => logs.map(log => ({
    ...log,
    Date: formatDate(log.Date)
  })), [logs]);

  const columns = React.useMemo(
    () => [
      { Header: 'Date', accessor: 'Date' },
      { Header: 'Pseudo', accessor: 'Pseudo' },
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

  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }

  return (
    <div>
      <button className='round--btn round--btn__big' onClick={() => setModalIsOpen(true)}>
        <div className='btn__el'>
          <img src={logsIcon} alt="Logs" className='logs-icon' />
          <span className='btn--text'>Logs</span></div>
        </button>

      <CustomModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className='score-container'>
          <button className='close-btn' onClick={() => setModalIsOpen(false)}>
            <img className='close-icon' src={closeIcon} alt="Close" />
          </button>

          <h2>Logs</h2>
          <table {...getTableProps()} className='table' >
            <thead>
              {headerGroups.map(headerGroup => {
                const { key: keyHeaderGroup, ...propsHeaderGroup } = headerGroup.getHeaderGroupProps();
                return (
                  <tr key={keyHeaderGroup} {...propsHeaderGroup}>
                    {headerGroup.headers.map(column => {
                      const { key: keyColumn, ...propsColumn } = column.getHeaderProps();
                      return <th key={keyColumn} {...propsColumn} className="th" >{column.render('Header')}</th>;
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
                      return <td key={keyCell} {...propsCell} className="td" >{cell.render('Cell')}</td>;
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

export default Logs;