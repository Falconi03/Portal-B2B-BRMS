import React, { useContext, useEffect } from 'react'
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

export type PageProps = {
  children: React.ReactNode | null
  getSaldos: any
  infoClienteProp: any
}

const MarketPage = ({ infoClienteProp, getSaldos, children }: PageProps): JSX.Element => {

  const { search, setSearch } = useContext(SearchContext)
  const { loja, setLoja } = useContext(InfoClienteContext)
  const infoCliente = infoClienteProp.infoCliente ? infoClienteProp.infoCliente : null

  useEffect(() => {
    getSaldos()
  }, [])

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
                    <DropdownItem key={id} onClick={() => setLoja(lojas)} >{lojas.cnpj} - {lojas.nome_fantasia}</DropdownItem>
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
    carrinho: state.carrinho,
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
