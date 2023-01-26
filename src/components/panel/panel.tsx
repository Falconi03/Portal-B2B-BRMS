import React, { useContext } from 'react';
import { PanelContext } from '../context/PanelContext';

import styles from './styles.scss'



function Panel(props: any) {

    const { expand, remove, reload } = useContext(PanelContext)


    return (
        <div>
            {(!remove &&
                <div className={'panel panel-inverse' + ' ' + (expand ? 'panel-expand ' : ' ') + (reload ? 'panel-loading ' : ' ') + (props.className ? props.className : '')}>
                    {props.children}
                </div>
            )}
        </div>
    )
}

function PanelHeader(props: any) {

    const {
        expand,
        setExpand,
        remove,
        setRemove,
        collapse,
        setCollapse,
        toggleReload
    } = useContext(PanelContext)

    return (
        <div className={'panel-heading ' + props.className}>
            <h4 className={"panel-title"}>{props.children}</h4>
            {(!props.noButton &&
                <div className="panel-heading-btn">
                    {/*<button className="btn btn-xs btn-icon btn-circle btn-light" onClick={() => setExpand(!expand)}><i className="fa fa-expand"></i></button>&nbsp;&nbsp;
                    <button className="btn btn-xs btn-icon btn-circle btn-success" onClick={toggleReload}><i className="fa fa-redo"></i></button>&nbsp;&nbsp;
                    <button className="btn btn-xs btn-icon btn-circle btn-warning" onClick={() => setCollapse(!collapse)}><i className="fa fa-minus"></i></button>&nbsp;&nbsp;
                    <button className="btn btn-xs btn-icon btn-circle btn-danger" onClick={() => setRemove(!remove)}><i className="fa fa-times"></i></button>*/}
                </div>
            )}
        </div>
    )
}

function PanelBody(props: any) {

    const {collapse, reload} = useContext(PanelContext)

    return (
        <div className={"panel-body " + (collapse ? 'd-none ' : ' ') + props.className}>
            {props.children}

            {(reload &&
                <div className="panel-loader">
                    <span className="spinner spinner-sm"></span>
                </div>
            )}
        </div>
    )
}

function PanelFooter(props: any) {
    return (
        <div className={"panel-footer " + props.className}>
            {props.children}
        </div>
    )
}

export { Panel, PanelHeader, PanelBody, PanelFooter };