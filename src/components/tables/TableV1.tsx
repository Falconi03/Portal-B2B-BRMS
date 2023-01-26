import React, { useState } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import { PanelBody } from '../panel/panel';
import { DropdownItem } from 'reactstrap';
import DropDown from "../dropdown/Dropdown";
import zipcelx from "zipcelx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


interface tableProps {
    saldos: any
    headers: any
    aligncenter?: number[]
    alignright?: number[]
    collumnSelect?: boolean
    collumnXl?: number[]
    collWidth?: number
    search?: boolean
    excel?: boolean
}

const SubTable = (props: any) => {

    const row = props.row
    const [show, hide] = useState('hide')
    const [openBtn, SetOpenBtn] = useState('')
    const [subRows, setSubRows] =useState({})
    var subTableNum = props.subTableNum


    function button() {
        if (show === 'hide') {
            hide('show')
            SetOpenBtn('open')
        } else {
            hide('hide')
            SetOpenBtn('')
        }
    }
    subTableNum = subTableNum + 1
    
    console.log(row)

    return (
        <>
            {/* {!props.father || props.father === 'show' && */}
                <tr {...row.getRowProps()} className={props.show} style={{ paddingLeft: `${subTableNum}rem` }}>
                    {row.cells.map((cell: any, id: number) => {
                        if (cell.column.Header !== 'Child') {
                            if (props.aligncenter?.includes(id)) {
                                return (<td style={{ textAlign: 'center' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                            } if (props.alignright?.includes(id)) {
                                return (<td style={{ textAlign: 'end' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                            } else {
                                return (<td {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                            }
                         }/* else{
                            setSubRows(cell.value)
                        } */
                    })}
                </tr>{/* } */}
            {/* {subRows ? 
                setSubRows({})   
            :null
            } */}
        </>
    )
}

const TableV1 = (props: tableProps) => {

    //*****PREPARAÇÃO DA TABELA****

    const headers = props.headers
    const saldos = props.saldos
    let head: any = []

    for (var i in headers) {
        let obj = {
            Header: headers[i],
            accessor: i
        }
        head.push(obj)
    }

    const columns = React.useMemo(() => head, [])
    const data = React.useMemo(() => saldos, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page,

        allColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = useTable({ columns, data, initialState: { pageIndex: 0 }, }, useGlobalFilter, useSortBy, usePagination)

    //******FILTRO******

    const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setGlobalFilter(value);
    };

    //*******EXCEL*********

    function getHeader(column: any) {

        return [
            {
                value: column.Header,
                type: "string"
            }
        ];

    }

    function getExcel() {
        const config = {
            filename: "ReportExcel",
            sheet: {
                data: []
            }
        };

        const dataSet: any = config.sheet.data;

        headerGroups.map(headerGroup => {
            const headerRow: any = [];
            if (headerGroup.headers) {
                headerGroup.headers.map(column => {
                    headerRow.push(...getHeader(column));
                });
            }

            dataSet.push(headerRow);
        });

        if (rows.length > 0) {
            rows.map(row => {
                const dataRow: any = [];

                Object.values(row.values).map(value =>
                    dataRow.push({
                        value,
                        type: typeof value === "number" ? "number" : "string"
                    })
                );

                dataSet.push(dataRow);
            });
        } else {
            dataSet.push([
                {
                    value: "No data",
                    type: "string"
                }
            ]);
        }

        return zipcelx(config);
    }


    return (
        <PanelBody>
            <div style={{ justifyContent: 'space-between', display: 'flex', color: '#000', alignItems: 'center' }}>
                <div className="d-flex">
                    {props.collumnSelect ?
                        <div className='button-group'>
                            <DropDown size="sm" name="Collumns" border="1px solid #d0d6dd">
                                {allColumns.map((column, id) => (
                                    <DropdownItem key={id}>
                                        <div>
                                            <label>
                                                <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                                {column.id}
                                            </label>
                                        </div>
                                    </DropdownItem>
                                ))}
                            </DropDown>
                        </div>
                        : null}
                    {props.excel ?
                        <button className="btn btn-secondary buttons-print btn-sm button-group" style={{ border: '1px solid #d0d6dd' }} onClick={getExcel}><i className="fa fa-file-excel" style={{ paddingRight: '0.5rem' }}></i>Excel</button>
                        : null}
                </div>
                {props.search ?
                    <input placeholder="Filtro" onChange={handleFilterInputChange} />
                    : null}
            </div>
            <div className="table-responsive" style={{ margin: '1rem 0' }}>
                <table className="table table-striped table-bordered mb-0" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, id) => (
                            <tr style={{ verticalAlign: "middle" }} {...headerGroup.getHeaderGroupProps()} key={id}>
                                {headerGroup.headers.map((column, id) => (
                                    <th className="w-150px" {...column.getHeaderProps(column.getSortByToggleProps())} key={id}>
                                        <div className="d-flex align-items-center" style={props.collumnXl?.includes(id) ? { minWidth: props.collWidth } : {}}>
                                            <span>{column.render('Header')}</span>
                                            <span className="ms-auto">
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? <i className="fa fa-sort-down fa-fw fs-14px text-blue"></i>
                                                        : <i className="fa fa-sort-up fa-fw fs-14px text-blue"></i>
                                                    : <i className="fa fa-sort fa-fw fs-14px opacity-3"></i>
                                                }
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(
                            (row, i) => {
                                prepareRow(row);
                                return (
                                    <>
                                        <SubTable row={row} id={i} />
                                        {/* <Popup
                                        key={i}
                                        trigger={
                                            <tr {...row.getRowProps()} style={{ cursor: 'pointer' }}>
                                                {row.cells.map((cell, id) => {
                                                    if (props.aligncenter?.includes(id)) {
                                                        return (<td style={{ textAlign: 'center' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                                                    } if (props.alignright?.includes(id)) {
                                                        return (<td style={{ textAlign: 'end' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                                                    } else {
                                                        return (<td {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                                                    }
                                                })}
                                            </tr>
                                        } modal nested>
                                        {(close: any) => {
                                            return (
                                                <div className="modal-popup">
                                                    <button className="modal-popup close" onClick={close}>
                                                        <i className="fa fa-xmark"></i>
                                                    </button>
                                                    <div className="modal-popup header"> <h2> Modal Title </h2> </div>
                                                    <div className="modal-popup content">
                                                        <ul>
                                                            {row.cells.map((cell, id) => {
                                                                return (
                                                                    <li key={id}>{cell.render('Cell')}</li>
                                                                )

                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </Popup> */}
                                    </>

                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', alignItems: 'center' }}>
                {rows.length > 10 ?
                    <DropDown name={'Show ' + String(pageSize)} bgColor='white' color="black" size="sm" border="1px solid #dee2e6">
                        {[10, 50, 100].map((pageSize, id) => (
                            <DropdownItem onClick={() => setPageSize(Number(pageSize))} key={id}>
                                <label key={pageSize} >
                                    Show {pageSize}
                                </label>
                            </DropdownItem>
                        ))}
                    </DropDown>
                    : null}
                {pageOptions.length > 1 ?
                    <ul className="pagination mb-0" style={{ justifyContent: 'center' }}>
                        <li className="page-item"><button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}><i className="fa fa-angle-double-left"></i></button></li>
                        <li className="page-item"><button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}><i className="fa fa-angle-left"></i></button></li>
                        <li className="page-item d-flex align-items-center px-2">
                            <div style={{ color: "black", fontWeight: '400' }}>Page {pageIndex + 1} of {pageOptions.length}</div>
                        </li>
                        <li className="page-item"><button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}><i className="fa fa-angle-right"></i></button></li>
                        <li className="page-item"><button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><i className="fa fa-angle-double-right"></i></button></li>
                    </ul>
                    : null}
            </div>
        </PanelBody>
    )
}

export default TableV1;