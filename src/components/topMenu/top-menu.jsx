import React, { useContext } from 'react';
import TopMenuNav from './top-menu-nav.tsx';
import { Context } from '../context/Context'

const TopMenu = () => {

	const { menuMarket } = useContext(Context)

	return (
		<>
			<div id="top-menu" className={'app-top-menu ' + (menuMarket? 'show-menu-market ':'hide-menu-market ')} >
				<TopMenuNav />
			</div>
		</>
	)
}


export default TopMenu;