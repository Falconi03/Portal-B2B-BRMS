import React, { useContext, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import TopMenuNavList from './top-menu-nav-list.jsx';
import menus from './menu.jsx';
import DropDown from '../dropdown/Dropdown'
import { DropdownItem } from 'reactstrap';
import { SearchContext } from '../context/SerchContext'
import { InfoClienteContext } from '../context/InfoCliente'


const TopMenuNav = (props: any) => {

	const [active, setActive] = useState(-1)
	const { loja, setLoja } = useContext(InfoClienteContext)
	const { search, setSearch } = useContext(SearchContext)
	const carrinho = props.carrinho.carrinho[0] ? props.carrinho.carrinho[0].itens : null
	const infoCliente = props.infoCliente.infoCliente ? props.infoCliente.infoCliente : null

	const handleExpand = (e: MouseEvent, i: number) => {
		e.preventDefault();
		setActive(active === i ? -1 : i)
	}

	if(infoCliente.length === 1){
		setLoja(infoCliente[0])
	}

	return (
		<>
			<div className='voltar'>
				<Link to='/market'>
					<span>
						<i className="fa fa-angles-left"></i> <span> Loja</span>
					</span>
				</Link>
			</div>
			<div className='esc-loja'>
				<DropDown
					name={`${loja.cnpj} - ${loja.nome_fantasia}`}
					className='dropdown primary w-100'
					size='md'>
					{infoCliente?.map((lojas: any, id: number) => {
						return (
							<DropdownItem key={id} onClick={() => setLoja(lojas)}>{lojas.cnpj} - {lojas.nome_fantasia}</DropdownItem>
						)
					})}
				</DropDown>
			</div>
			<div className="topMenu" >
				{menus.map((menu, i) => (
					<Route path={menu.path} key={i} children={({ match }) => (
						<TopMenuNavList
							data={menu}
							key={i}
							expand={(e: MouseEvent) => handleExpand(e, i)}
						/>
					)} />
				))}
			</div>
			<div className="search">
				{window.location.pathname === '/market' ?
					<>
						<span>Busca: </span>
						<input type="text" value={search} onChange={(e) => {
							setSearch(e.target.value)
						}} />
					</>
					: null
				}
			</div>
			<div className='cart'>
				<Link to='/carrinho'>
					<div className={carrinho ? carrinho.length > 0 ? "badge" : 'd-none' : 'd-none'}>{carrinho ? carrinho.length : null}</div>
					<i className="fa fa-cart-shopping"></i>
				</Link>
			</div>

		</>
	)
}
const mapStateToProps = (state: any) => {

	return {
		carrinho: state.carrinho,
		infoCliente: state.infoCliente
	}
}
export default connect(mapStateToProps)(TopMenuNav)