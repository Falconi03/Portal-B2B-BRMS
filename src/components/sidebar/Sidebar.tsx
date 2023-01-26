import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SidebarNav from './SidebarNav'
import { Context } from '../context/Context'

export default (props:{page:string}) => {
    const { closeSidebar } = useContext(Context)


    return (
        <>
            <div id="sidebar" className={'app-sidebar '}>
                <PerfectScrollbar className={'app-sidebar-content'} options={{ suppressScrollX: true }}>
                    <SidebarNav page={props.page}/>
                    <div className={'menu' + 'menu-caret'}>
                        <div className={'menu-item d-flex'}>
                            <button className={'app-sidebar-minify-btn ms-auto'} onClick={()=> closeSidebar()}>
                                <i className={'fa fa-angle-double-left'}></i>
                            </button>
                        </div>
                    </div>
                </PerfectScrollbar>
            </div>
            <div className={'app-sidebar-bg'}></div>
            <div className="app-sidebar-mobile-backdrop">
                <Link to="#" onClick={()=> closeSidebar()} className="stretched-link" />
            </div>
        </>
    )
}