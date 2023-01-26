import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import SidebarNavList from './SidebarNavList'
import Menu from './menu'
import MenuMarket from './menuMarket'
import { Context } from '../context/Context'



export default (props: { page: string }) => {


    const menu = props.page === 'portal' ? Menu : MenuMarket
    const { handleExpand, active, clicked } = useContext(Context)

    return (
        <>
            <div id='sidebar-nav' className="menu">
                <div className="menu-header"></div>
                {menu.map((menus: any, i: any) => (
                    <Route path={menus.path} exact={menus.exact} key={i} children={({ match }) => (
                        <SidebarNavList
                            data={menus}
                            key={i}
                            expand={(e: MouseEvent) => handleExpand(e, i, match)}
                            active={i === active}
                            clicked={clicked}
                        />
                    )} />
                ))}
                <div className="menu-item active expand" style={{ paddingTop: '2rem' }}>
                    {props.page === 'portal' ?
                        <a className="menu-link" href="/market" style={{ border: '1px solid #00acac', background: 'transparent' }}>
                            <div className="menu-icon">
                                <i className="fa fa-store"></i>
                            </div>
                            <div className="menu-text"><b>FAÇA SEU PEDIDO</b></div>
                        </a>
                        : null}
                </div>
            </div>
        </>
    )
}