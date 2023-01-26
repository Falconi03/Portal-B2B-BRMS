import React, {useContext} from 'react'
import { Context } from '../context/Context'
import Sidebar from './Sidebar'


export default (props:{page:string}) => {
    const {appSidebarMobileToggled } = useContext(Context)
    

    return (
        <>
            <div className={
                'app ' +
                (appSidebarMobileToggled ? 'app-sidebar-mobile-toggled ' : '')} >
                <Sidebar page={props.page}/>
            </div >
        </>
    )
}