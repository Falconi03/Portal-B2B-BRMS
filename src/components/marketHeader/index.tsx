import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import Strings from '@/constants'
import Routes from '@/constants/routes'
import { Context } from '../context/Context'
import { User } from '@/models'
import { StoreState } from '@/redux'
import selectors from '@/selectors'
import DropDown from '../dropdown/Dropdown'

const logo = require('@/../styles/imagem/br_branco-semfundo.png');
const imguser = require('@/../styles/imagem/user.png');



export const MarketHeader = (props:any): JSX.Element => {

    const carrinho = props.carrinho.carrinho[0] ? props.carrinho.carrinho[0].itens : null
    const { user } = props
    const { toggleAppSidebarMobile, appSidebarMobileToggled } = useContext(Context)

    return (
        <>
            <div id="header" className={'app-header'}>
                <div className="navbar-header">
                    <a className='navbar-brand col-lg-2 me-0 px-3' href={Routes.Home} style={{ color: 'white', fontWeight: 'bold' }}>
                        <img src={logo} /> <b>{Strings.general.brand}</b>
                    </a>
                    <button type="button" className="navbar-mobile-toggler" onClick={() => toggleAppSidebarMobile(!appSidebarMobileToggled)}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='header-cart' >
                        <Link to='/carrinho'>
                            <div className={carrinho ? carrinho.length > 0 ? "badge" : 'd-none' : 'd-none'}>{carrinho ? carrinho.length : null}</div>
                            <i className="fa fa-cart-shopping"></i>
                        </Link>
                    </div>
                    <div style={{ paddingRight: '1rem', alignSelf: 'center' }} className="dropdown navbar-user">
                        <DropDown name={<>
                            <img src={imguser} className="dropdown-img" />
                            <span className="d-none d-md-inline" style={{ color: 'white', fontWeight: 'bold' }}>{user?.last_name}</span>
                        </>
                        }
                            className='dropdown primary'
                            size='sm'
                            border='transparent'>
                            <DropdownItem><a href="#" className="dropdown-item">Visualizar Perfil</a></DropdownItem>
                            <DropdownItem><a href="/historico" className="dropdown-item">Meus Pedidos</a></DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem><a href={Routes.Logout} className="dropdown-item">Log Out</a></DropdownItem>
                        </DropDown>
                    </div>
                </div>

            </div>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    user: selectors.user.getUser(state),
    carrinho: state.carrinho
})

export default connect(mapStateToProps)(MarketHeader)