import React from 'react'

import { UnauthenticatedPage } from '@/components'
import Strings from '@/constants'
import { LoginForm } from '@/forms'
const logo = require('@/../styles/imagem/br_branco-semfundo.png');
const backImg = require('@/../styles/imagem/ESTOQUE1.jpg') 

export const LoginScreen = (): JSX.Element => (
  <UnauthenticatedPage title={Strings.login.title}>
    <div className="login login-with-news-feed">
      <div className="news-feed">
        <div className="news-image" style={{ backgroundImage: `url(${backImg})`, width: '100%'}}></div>
        <div className="news-caption">
	  <h1 className="caption-title" style={{ marginLeft: '20px', marginTop: '13px', fontSize: '16px'}}><b>Efici&ecirc;ncia</b></h1>
	  <h1 className="caption-title" style={{ marginLeft: '20px', marginTop: '13px', fontSize: '16px'}}><b>Credibilidade</b></h1>
	  <h1 className="caption-title" style={{ marginLeft: '20px', marginTop: '13px', fontSize: '16px'}}><b>Dedica&ccedil;&atilde;o</b></h1>
	  <h1 className="caption-title" style={{ marginLeft: '20px', marginTop: '13px', fontSize: '16px'}}><b>Respeito</b></h1>
	  <h1 className="caption-title" style={{ marginLeft: '20px', marginBottom: '80px', fontSize: '16px'}}><b>Otimismo</b></h1>
          <h4 className="caption-title"><b>{Strings.general.brand}</b></h4>
        </div>
      </div>
      <div className="login-container">
        <div className="login-header mb-30px">
          <div className="brand fw-bolder fs-1 d-fles">
            <img src={logo} style={{maxHeight: '80px', paddingRight:'1rem'}}/>
            <span style={{minWidth: 'fit-content'}}>
              BR Motorsport
            </span>            
          </div>
        </div>
        <div className="login-content"></div>
        <LoginForm />
      </div>
    </div>

  </UnauthenticatedPage>


)

export default LoginScreen