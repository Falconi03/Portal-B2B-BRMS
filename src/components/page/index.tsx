import React from 'react'

import Header from '../header/Header'
import { ContextProvider } from '../context/Context'
import SidebarNew from '../sidebar/SidebarNew';
import { CadastroContextProvider } from '../../context/CadastroContext';
import Footer from '../footer';
const logo = require('@/../styles/imagem/logo.svg');

export type PageProps = {
  title: string
  children: React.ReactNode | null
}

const Page = ({ title, children }: PageProps): JSX.Element => (
  <>
    <ContextProvider>
      <div className='min-vh-100 d-flex flex-column justify-content-between'>
        <div>
          <div className="app app-header-fixed app-sidebar-fixed">
            <Header />
          </div>
          <div className='app-sidebar'>
            <SidebarNew page='portal'/>
          </div>
          <div className='app-content'>
            <h1 className="h2">{title}</h1>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </ContextProvider>
  </>
)

export default Page
