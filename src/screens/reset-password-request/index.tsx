import React from 'react'

import { UnauthenticatedPage } from '@/components'
import Strings from '@/constants'
import { ResetPasswordRequestForm } from '@/forms'

export const ResetPasswordRequestScreen = (): JSX.Element => {

  const logo = require('@/../styles/imagem/br_branco-semfundo.png');
  const backImg = require('@/../styles/imagem/ESTOQUE1.jpg')

  return (
    <UnauthenticatedPage title={Strings.resetPassswordRequest.title}>      
      <div className="login login-with-news-feed">
        <div className="news-feed">
          <div className="news-image" style={{ backgroundImage: `url(${backImg})` }}></div>
          <div className="news-caption">
            <h4 className="caption-title">Portal do Cliente| <b>{Strings.general.brand}</b></h4>
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
          <p className="text-start">{Strings.resetPassswordRequest.subtitle}</p>
          <div className="login-content"></div>
          <ResetPasswordRequestForm />
        </div>
      </div>
    </UnauthenticatedPage>
  )
}

export default ResetPasswordRequestScreen
