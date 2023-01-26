import React, { useContext, useState} from 'react'
import { Route, Link } from 'react-router-dom'
import { Context } from '../context/Context'

type SidebarNavListProps = {
    expand: any;
    active: boolean;
    clicked: number;
    data: ({
        path: string;
        icon?: string | undefined;
        title: string;
        badge?: string | undefined;
        children?: undefined | ({
            path: string;
            title: string;
            highlight?: boolean | undefined;
            children?: undefined | ({
                path: string;
                title: string;
                children?: undefined | ({
                    path: string;
                    title: string;
                })[];
            })[];
        })[];
        label?: string | undefined;
        img?: string | undefined;
    }) | any;

}


export default function SidebarNavList(props: SidebarNavListProps) {

    const { handleExpand, active, clicked, appSidebarMinify } = useContext(Context)

    var icon = props.data.icon && <div className="menu-icon"><i className={props.data.icon}></i></div>;
    var img = props.data.img && <div className="menu-icon-img"><img src={props.data.img} alt="" /></div>;
    var caret = (props.data.children && !props.data.badge) && <div className="menu-caret fa fa-chevron-right"></div>;
    var label = props.data.label && <span className="menu-label ms-5px color:white">{props.data.label}</span>;
    var badge = props.data.badge && <div className="menu-badge">{props.data.badge}</div>;
    var highlight = props.data.highlight && <i className="fa fa-paper-plane text-theme"></i>;
    var title = props.data.title && <div className="menu-text">{props.data.title} {label} {highlight}</div>;
    const [child, setchild]= useState(0)

    return (
        <>
            <Route path={props.data.path} exact={props.data.exact} children={({ match }) => (
                <div className={"menu-item " + (match ? "active " : "") + ((props.active || (props.clicked === -1 && match) || props.data.search) ? 'expand ' : 'closed ') + (props.data.children ? "has-sub " : "")}>
                    {props.data.children ? (
                        <Link to={props.data.path}
                            className="menu-link"
                            onClick={props.expand}>{img} {icon} {title}{caret} {badge}</Link>
                    ) : (
                        <Link to={props.data.path} className="menu-link" >{img} {icon} {badge} {title}{caret}</Link>
                    )}
                    {props.data.children && (
                        <div className={"menu-submenu " + (((props.active || (props.clicked === -1 && match) || props.data.search) && !appSidebarMinify) ? 'd-block ' : 'd-none')}>
                            {props.data.children && props.data.children.map((submenu: any, i: any) => (
                                <Route path={submenu.path} exact={submenu.exact} key={i} children={({ match }) => (
                                    <SidebarNavList
                                        data={submenu}
                                        key={i}
                                        expand={(e: any) => handleExpand(e, i, match)}
                                        active={i === active}
                                        clicked={clicked}
                                    />
                                )} />
                            ))}
                        </div>
                    )}
                </div>
            )} />
        </>
    )
}