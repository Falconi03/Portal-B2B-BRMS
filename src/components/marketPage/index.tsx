import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { actionCreators as carrinhoAC } from '@/redux/carrinho'
import { actionCreators as infoClienteAC } from '@/redux/info-cliente'
import { ContextProvider } from '../context/Context'
import TopMenu from '../topMenu//top-menu.jsx';
import Footer from '../footer';
import MarketHeader from '../marketHeader';
import { SearchContext } from '../context/SerchContext';
import SidebarNew from '../sidebar/SidebarNew';
import DropDown from '../dropdown/Dropdown'
import { DropdownItem } from 'reactstrap';
import { InfoClienteContext } from '../context/InfoCliente';
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'

export type PageProps = {
  children: React.ReactNode | null
  getSaldos: any
  infoClienteProp: any
  carrinhoProp: any
}

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

const MarketPage = ({ infoClienteProp, getSaldos, children, carrinhoProp }: PageProps): JSX.Element => {

  const { search, setSearch } = useContext(SearchContext)
  const { loja, setLoja } = useContext(InfoClienteContext)
  const infoCliente = infoClienteProp.infoCliente ? infoClienteProp.infoCliente : null
  const carrinho = carrinhoProp.carrinho[0] ? carrinhoProp.carrinho[0] : null

  const token = getAuth()
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token?.access
    }
  }

  useEffect(() => {
    getSaldos()
  }, [])

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
      <ContextProvider>
        <div className='min-vh-100 d-flex flex-column justify-content-between'>
          <div>
            <div className="app app-header-fixed app-sidebar-fixed">
              <MarketHeader />
            </div>
            <div className='top-menu'>
              <TopMenu />
            </div>
            <div className='app-sidebar market'>
              <SidebarNew page='market' />
            </div>
            <div className='search-voltar' style={{ justifyContent: window.location.pathname !== '/market' ? 'center' : 'space-between' }}>
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
              <div className="search">
                {window.location.pathname === '/market' ?
                  <>
                    <span>Busca: </span>
                    <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                  </>
                  : null
                }
              </div>
            </div>
            <div className='escolher-loja'>
              <DropDown
                name={`${loja.cnpj} - ${loja.nome_fantasia}`}
                className='dropdown primary w-100'
                size='md'>
                {infoCliente?.map((lojas: any, id: number) => {
                  return (
                    <DropdownItem key={id} onClick={() => {
                      setLoja(lojas)
                      trocarLoja(lojas)
                    }} >{lojas.cnpj} - {lojas.nome_fantasia}</DropdownItem>
                  )
                })}
              </DropDown>
            </div>
            <div style={{ marginLeft: '0' }} className='app-content'>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </ContextProvider>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    carrinhoProp: state.carrinho,
    infoClienteProp: state.infoCliente
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  getSaldos: () => {
    dispatch(carrinhoAC.getCarrinhoProdutos.call())
    dispatch(infoClienteAC.getInfoCliente.call())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage)
