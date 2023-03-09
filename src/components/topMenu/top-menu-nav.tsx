import React, { useContext, useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import { connect } from 'react-redux'
import TopMenuNavList from './top-menu-nav-list.jsx';
import menus from './menu.jsx';
import DropDown from '../dropdown/Dropdown'
import { DropdownItem } from 'reactstrap';
import { SearchContext } from '../context/SerchContext'
import { InfoClienteContext } from '../context/InfoCliente'

const initialValueLoja = {
	ativo: '',
	bairro: '',
	cep: '',
	classificacao: '',
	cnpj: '',
	codigo: '',
	complemento: '',
	data_insert: '',
	data_update: '',
	desconto_maximo: 0,
	email: '',
	email_portal: '',
	empresa: '',
	endereco: '',
	estado: '',
	filial: '',
	grupo_clientes: '',
	id: 0,
	incricao_estadual: '',
	isento_st: false,
	loja: '',
	municipio: '',
	nome_fantasia: 'Escolher Loja',
	numero: '',
	observacao: '',
	razao_social: '',
	tabela_preco_1: '',
	tabela_preco_2: '',
	telefone: '',
	tipo: '',
	vendedor: '',
  }

const TopMenuNav = (props: any) => {

	const [active, setActive] = useState(-1)
	const { loja, setLoja } = useContext(InfoClienteContext)
	const { search, setSearch } = useContext(SearchContext)
	const carrinho = props.carrinho.carrinho[0] ? props.carrinho.carrinho[0] : null
	const infoCliente = props.infoCliente.infoCliente ? props.infoCliente.infoCliente : null

	const token = getAuth()
	const config = {
		headers: {
			'Authorization': 'Bearer ' + token?.access
		}
	}

	const handleExpand = (e: MouseEvent, i: number) => {
		e.preventDefault();
		setActive(active === i ? -1 : i)
	}

	if (infoCliente.length === 1) {
		setLoja(infoCliente[0])
	}

	useEffect(() => {
		if (carrinho && infoCliente) {
		infoCliente.find((lojas: { codigo: '', loja: '' }) => lojas.loja === carrinho.loja && lojas.codigo === carrinho.codigo) ?
			setLoja(infoCliente.find((lojas: { codigo: '', loja: '' }) => lojas.loja === carrinho.loja && lojas.codigo === carrinho.codigo))
			: null
		}
	}, [carrinho, infoCliente])

	const trocarLoja = (lojas: { loja: string, codigo: string }) => {
		if (carrinho) {
			const bodyParameters = {
				transportadora: String(carrinho.transportadora),
				condicaopagamento: String(carrinho.condicaopagamento),
				inf_adicionais:carrinho.inf_adicionais,
				tipo_frete: carrinho.tipo_frete,
				loja: lojas.loja,
				codigo: lojas.codigo
			}
			axios.post(`${Config.API_URL}pedido/pedido/`, bodyParameters, config)
				.then((res: any) => {
					console.log(res.status)

				})
				.catch((error: any) => {
					console.log(error.response)
					if (error.response.status === 401) {
						window.location.reload()
					}
				})
		}
	}

	return (
		<>
			<div className='voltar'>
				{window.location.pathname === '/market' ?
					<Link to='/home'>
						<span>
							<i className="fa fa-angles-left"></i> <span> Portal</span>
						</span>
					</Link>
					:
					<Link to='/market'>
						<span>
							<i className="fa fa-angles-left"></i> <span> Loja</span>
						</span>
					</Link>
				}
			</div>
			<div className='esc-loja'>
				<DropDown
					name={`${loja.cnpj} - ${loja.nome_fantasia}`}
					className='dropdown primary w-100'
					size='md'>
					{infoCliente?.map((lojas: any, id: number) => {
						return (
							<DropdownItem key={id} onClick={() => {
								setLoja(lojas)
								trocarLoja(lojas)
							}}>{lojas.cnpj} - {lojas.nome_fantasia}</DropdownItem>
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
					<div className={carrinho ? carrinho.itens.length > 0 ? "badge" : 'd-none' : 'd-none'}>{carrinho ? carrinho.itens.length : null}</div>
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