import React from 'react'
import { render } from 'react-dom'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'


import { PrivateRoute } from '@/components'
import Routes from '@/constants/routes'
import history from '@/helpers/history'
import configureStore from '@/redux'
import App from '@/screens'
import Home from './screens/home'
/* import Dashboard from '@/screens/dashboard' */
import Estoque from '@/screens/estoque'
import Financeiro from '@/screens/financeiro'
import Login from '@/screens/login'
import Logout from '@/screens/logout'
import ResetPasswordChange from '@/screens/reset-password-change'
import ResetPasswordRequest from '@/screens/reset-password-request'
/* import Upload from './screens/upload-dragNdrop'
import Banco from './screens/banco' */
import NotFound from './screens/not-found'
import Produto from './screens/produto'
import BancoImagem from './screens/banco-imagem'
import Market from './screens/market'
import Carrinho from './screens/carrinho'
/* import Teste from './screens/teste' */
/* import Ls2 from './screens/black/ls2'
import Norisk from './screens/black/norisk' */
import Historico from './screens/historico'
import Detalhes from './screens/detalhes'
import { CadastroContextProvider } from './context/CadastroContext'
import {  SearchContextProvider } from './components/context/SerchContext'
import {  InfoClienteContextProvider } from './components/context/InfoCliente'

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-quill/dist/quill.snow.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'flag-icon-css/css/flag-icons.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'bootstrap-social/bootstrap-social.css';
import 'bootstrap-daterangepicker/daterangepicker.css';



require('./index.css')
require('@/../styles/react.scss')
require('@/../node_modules/bootstrap/scss/bootstrap')
require('@/../styles/default/styles')



// Normalize must load first or it will overwrite our styles
require('bootstrap/dist/css/bootstrap.css')
require('normalize.css/normalize.css')
require('react-toastify/dist/ReactToastify.css')
require('@/../styles/fonts.scss')
require('@/../styles/defaults.scss')

const provider = (
  <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
    <Provider store={configureStore()}>
      <CadastroContextProvider>
        <SearchContextProvider>
        <InfoClienteContextProvider>
          <Router history={history}>
            <App>
              <Switch>
                <Route exact path='/'><Redirect to='/home' /></Route>
                 <Route exact path={Routes.ResetPasswordChange} component={ResetPasswordChange} />
                 <Route exact path={Routes.ResetPasswordRequest} component={ResetPasswordRequest} />
                 <Route exact path={Routes.Login} component={Login} />
                <PrivateRoute exact path={Routes.Logout} component={Logout} />
                <PrivateRoute exact path={Routes.Home} component={Home} />
                <PrivateRoute exact path={Routes.BancoImagem} component={BancoImagem} />
                <PrivateRoute exact path={Routes.Estoque} component={Estoque} />
                <PrivateRoute exact path={Routes.Financeiro} component={Financeiro} />
                <PrivateRoute exact path={Routes.Market} component={Market} />
                <PrivateRoute exact path={Routes.Carrinho} component={Carrinho} />
                <PrivateRoute exact path={Routes.Historico} component={Historico} />
                <PrivateRoute path={Routes.Produto} component={Produto} />
                <PrivateRoute path={Routes.Detalhes} component={Detalhes} />
                {/* <PrivateRoute exact path={Routes.Ls2} component={Ls2} />
                <PrivateRoute exact path={Routes.Norisk} component={Norisk} /> 
                <PrivateRoute exact path={Routes.Teste} component={Teste} />*/}
                <Route path='*'><NotFound /></Route>
              </Switch>
              <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={7000} />
            </App>
          </Router>
        </InfoClienteContextProvider>
        </SearchContextProvider>
      </CadastroContextProvider>
    </Provider>
  </IntlProvider>
)

const app = document.getElementById('app')
if (app) render(provider, app)
