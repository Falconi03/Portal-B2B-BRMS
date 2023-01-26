import React, { useEffect, useState } from 'react'
import { Page } from '@/components'
import Vencidos from './Vencidos'
import TitulosAbertos from './TitulosAbertos'
import TitulosPagos from './TitulosPagos'
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'


export const FinanceiroScreen = (): JSX.Element => {

  const [table1, setTable1] = useState(true)
  const [table2, setTable2] = useState(false)
  const [table3, setTable3] = useState(false)
  const [valorAberto, setValorAberto] = useState (0)
  const [valorVencido, setValorVencido] = useState (0)

  const token = getAuth()
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token?.access
    }
  }

  useEffect(() => {
    axios.get(`${Config.API_URL}titulosreceber/valoraberto/`, config).then((res: any) => {
      const resultados = (res.data.results)
      let total = 0      
      resultados.map((resultado: {saldo:number})=>{
        total += resultado.saldo
      })
      setValorAberto(total)
      
    })
    axios.get(`${Config.API_URL}titulosreceber/valorvencido/`, config).then((res: any) => {
      const resultados = (res.data.results)
      let total = 0      
      resultados.map((resultado: {saldo:number})=>{
        total += resultado.saldo
      })
      setValorVencido(total)
    })
  }, [])

  function showTable1() {
    setTable1(true)
    setTable2(false)
    setTable3(false)
  }
  function showTable2() {
    setTable2(true)
    setTable1(false)
    setTable3(false)
  }
  function showTable3() {
    setTable3(true)
    setTable1(false)
    setTable2(false)
  }

  return (
    <Page title='Boletos'>
      <div className='row' style={{ justifyContent: 'space-around' }}>
        <div className='col-xl-4 col-md-4 col-sm-6'>
          <button
            className='btn widget-stats btn-color bg-danger'
            style={{ fontSize: '20px' }}
            onClick={() => showTable1()}
            disabled={table1 ? true : false}>
            <div className='stats-info'>
              <p>Vencidos</p>
              <p>R$ {valorVencido.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
            </div>
          </button>
        </div>
        <div className='col-xl-4 col-md-4 col-sm-6'>
          <button
            className=' btn widget-stats btn-color bg-warning'
            style={{  fontSize: '20px'}}
            onClick={() => showTable2()}
            disabled={table2 ? true : false}>
            <div className='stats-info'>
              <p>A Vencer</p>
              <p>R$ {valorAberto.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
            </div>
          </button>
        </div>
        <div className='col-xl-4 col-md-4 col-sm-6'>
          <button
            className='btn widget-stats btn-color bg-success'
            style={{ fontSize: '20px'}}
            onClick={() => showTable3()}
            disabled={table3 ? true : false}>
            <div className='stats-info'>
              <p>Baixados</p>
            </div>
          </button>
        </div>
      </div>
      <div>
        {table1 ?
          <Vencidos />
          : null}
        {table2 ?
          <TitulosAbertos />
          : null}
        {/* {table3 ?
          <TitulosAbertos />
          : null} */}
        {table3 ?
          <TitulosPagos />
          : null}
      </div>
    </Page>
  )
}



export default FinanceiroScreen
