import React, { cloneElement, ReactNode } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import { DropdownItem } from 'reactstrap';
import DropDown from "../dropdown/Dropdown";
import zipcelx from "zipcelx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'

interface tableProps {
    saldos: any
    headers: any
    aligncenter?: number[]
    alignright?: number[]
    collumnSelect?: boolean
    collumnXl?: number[]
    collWidth?: string
    search?: boolean
    excel?: string
    editavel?: boolean
    download?: boolean
    footer?: boolean
    detalhes?: boolean
    children?: any
}


const TableFull = (props: tableProps) => {

    //*****PREPARAÇÃO DA TABELA****

    const xml = require('@/../styles/imagem/xml.jpeg');
    const headers = props.headers
    const saldos = props.saldos
    let head: any = []
    const excel = props.excel + "_" + new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).substring(0, 19).replace(/:/g, '').replace(' ', '_')



    for (var i in headers) {
        let obj = {
            Header: headers[i],
            accessor: i
        }
        head.push(obj)
    }

    const columns = React.useMemo(() => head, [])
    const data = React.useMemo(() => saldos, [saldos])

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
            filename: excel,
            sheet: {
                data: []
            }
        };

        const dataSet: any = config.sheet.data;

        headerGroups.map(headerGroup => {
            const headerRow: any = [];
            if (headerGroup.headers) {
                headerGroup.headers.map(column => {
                    if (column.Header === 'Danfe' || column.Header === 'XML' || column.Header === 'Boleto') {
                        null
                    } else {
                        headerRow.push(...getHeader(column));
                    }
                });
            }

            dataSet.push(headerRow);
        });

        if (rows.length > 0) {

            rows.map(row => {
                const dataRow: any = [];
                for (var value in row.values) {
                    if (value === 'danfe' || value === 'xml' || value === 'boleto') {
                        null
                    } else {
                        value = row.values[value]
                        if (typeof value === 'string' && value.substring(4, 5) === "-" && value.substring(7, 8) === "-") {
                            const newdata = new Date(value)
                            value = newdata.toLocaleDateString('pt-BR')

                            dataRow.push({
                                value,
                                type: typeof value === "number" ? "number" : value === "date" ? "date" : "string"
                            })
                        } else {

                            dataRow.push({
                                value,
                                type: typeof value === "number" ? "number" : value === "date" ? "date" : "string"
                            })
                        }
                    }
                }
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

    function formatDate(dateStr: any) {
        const ano = dateStr.substring(0, 4)
        const mes = dateStr.substring(5, 7)
        const dia = dateStr.substring(8, 10)
        return (`${dia}/${mes}/${ano}`)
    }

    return (
        <>
            <div className="out-table out-header">
                <div className="d-flex">
                    {props.collumnSelect ?
                        <div className='button-group'>
                            <DropDown size="sm" name="Colunas" border="1px solid #d0d6dd">
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
                {
                    props.search ?
                        <input placeholder="Filtro" onChange={handleFilterInputChange} />
                        : null
                }
            </div >
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
                                {props.detalhes ? <th className="w-150px">Detalhes</th> : null}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(
                            (row, i) => {
                                prepareRow(row);
                                return (
                                    <React.Fragment key={i}>
                                        {props.editavel ?
                                            <Popup
                                                trigger={
                                                    <tr {...row.getRowProps()} style={props.footer && rows.length < 11 && (rows.length - 1) === i ? { backgroundColor: 'black', WebkitTextFillColor: 'white' } : {}} key={i}>
                                                        {row.cells.map((cell, id) => {
                                                            if (props.aligncenter?.includes(id)) {
                                                                return (<td style={{ textAlign: 'center', cursor: 'pointer' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                                                            }
                                                            else if (props.alignright?.includes(id)) {
                                                                return (<td style={{ textAlign: 'end', cursor: 'pointer' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                                                            }
                                                            else {
                                                                if (Number.isFinite(cell.value)) {
                                                                    return (<td style={{ textAlign: 'end', cursor: 'pointer' }} {...cell.getCellProps()} key={id}>{cell.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</td>)
                                                                }
                                                                else if (typeof (cell.value) === 'string' && cell.value.substring(4, 5) === "-" && cell.value.substring(7, 8) === "-") {
                                                                    return (<td style={{ cursor: 'pointer' }} {...cell.getCellProps()} key={id} >{formatDate(cell.value)}</td>)
                                                                }
                                                                else {
                                                                    return (<td style={{ cursor: 'pointer' }} {...cell.getCellProps()} key={id}>{cell.value}</td>)
                                                                }
                                                            }
                                                        })}
                                                    </tr>
                                                } modal nested>
                                                {(close: any) =>
                                                    <div className="modal-popup">
                                                        <div className='modal-popup header' >
                                                            <h4 className="panel-title">cadastro</h4>
                                                            <div className="panel-heading-btn">
                                                                <button className="btn  btn-icon btn-circle btn-danger modal-popup button-close" onClick={close}><i className="fa fa-times"></i></button>
                                                            </div>
                                                        </div>
                                                        <PerfectScrollbar className={'app-sidebar-content'} options={{ suppressScrollX: true }}>
                                                            <div className="modal-popup content">
                                                                {cloneElement(props.children, row.original)}
                                                            </div>
                                                        </PerfectScrollbar>
                                                    </div>
                                                }
                                            </Popup>
                                            :
                                            <tr {...row.getRowProps()} style={props.footer && rows.length < 11 && (rows.length - 1) === i ? { backgroundColor: 'black', WebkitTextFillColor: 'white' } : {}} key={i}>
                                                {row.cells.map((cell, id) => {

                                                    if (props.download && cell.column.Header === "Danfe" && cell.value !== undefined && cell.value !== '') {
                                                        return (
                                                            <td {...cell.getCellProps()} key={id}>
                                                                <Link to={'/files/danfe/' + cell.value} target="_blank" download={"danfe_" + cell.row.values.numero + ".pdf"}><i className="far fa-lg fa-file-pdf d-flex justify-content-center text-danger" /></Link>
                                                            </td>)
                                                    }
                                                    else if (props.download && cell.column.Header === "XML" && cell.value !== undefined && cell.value !== '') {
                                                        return (
                                                            <td {...cell.getCellProps()} key={id}>
                                                                <Link to={'/files/xml/' + cell.value} className="d-flex justify-content-center" target="_blank" download={"xml_" + cell.row.values.numero + ".xml"}><img style={{ maxHeight: '1rem' }} src={xml} /></Link>
                                                            </td>)
                                                    }
                                                    else if (props.download && cell.column.Header === "Boleto" && cell.value !== undefined && cell.value !== '') {
                                                        return (
                                                            <td {...cell.getCellProps()} key={id}>
                                                                <Link to={'/files/boleto/' + cell.value} target="_blank" download={"boleto_" + cell.row.values.numero + cell.row.values.parcela + ".pdf"}><i className="far fa-lg fa-file-pdf d-flex justify-content-center text-danger" /></Link>
                                                            </td>)
                                                    }
                                                    else if (props.aligncenter?.includes(id)) {
                                                        return (<td style={{ textAlign: 'center' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                                                    }
                                                    else if (props.alignright?.includes(id)) {
                                                        return (<td style={{ textAlign: 'end' }} {...cell.getCellProps()} key={id}>{cell.render('Cell')}</td>)
                                                    }
                                                    else {
                                                        if (Number.isFinite(cell.value)) {
                                                            return (<td style={{ textAlign: 'end' }} {...cell.getCellProps()} key={id}>{cell.value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</td>)
                                                        }
                                                        else if (typeof (cell.value) === 'string' && cell.value.substring(4, 5) === "-" && cell.value.substring(7, 8) === "-") {
                                                            return (<td {...cell.getCellProps()} key={id} >{formatDate(cell.value)}</td>)
                                                        }
                                                        else {
                                                            return (<td {...cell.getCellProps()} key={id}>{cell.value}</td>)
                                                        }
                                                    }
                                                })}
                                            </tr>
                                        }
                                    </React.Fragment>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
            <>
                {rows.length > 10 && pageOptions.length > 1 ?
                    <div className=" out-table out-footer">
                        {rows.length > 10 ?
                            <DropDown name={'Mostrar ' + String(pageSize)} bgColor='white' color="black" size="sm" border="1px solid #dee2e6">
                                {[10, 50, 100].map((pageSize, id) => (
                                    <DropdownItem onClick={() => setPageSize(Number(pageSize))} key={id}>
                                        <label key={pageSize} >
                                            Mostrar {pageSize}
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
                                    <div style={{ color: "black", fontWeight: '400' }}>Pagina {pageIndex + 1} de {pageOptions.length}</div>
                                </li>
                                <li className="page-item"><button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}><i className="fa fa-angle-right"></i></button></li>
                                <li className="page-item"><button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><i className="fa fa-angle-double-right"></i></button></li>
                            </ul>
                            : null}
                    </div>
                    : null}
            </>
        </>
    )
}

export default TableFull;