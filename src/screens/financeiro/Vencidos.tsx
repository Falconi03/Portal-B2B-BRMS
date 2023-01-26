import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Page } from '@/components'
import Strings from '@/constants'
import TitulosReceber from '@/models/titulos-receber'
import { ActionCreators, StoreState } from '@/redux'
import { actionCreators as titulosReceberAC } from '@/redux/titulosreceber'
import selectors from '@/selectors'
import TableFull from '@/components/tables/TableFull'
import { Panel, PanelBody, PanelHeader } from '@/components/panel/panel'

interface DispatchProps {
  getTitulos: (page: number) => void
}

interface TitulosReceberStateProps {
  saldos: Array<TitulosReceber> | undefined
  paginas: number
  pending: boolean
}

export const TitulosReceberTable = (props: TitulosReceberStateProps & DispatchProps): JSX.Element => {
  const { saldos, getTitulos, pending } = props

  useEffect(() => {
    getTitulos(0)
  }, [])

  return (
    <Panel>
      <PanelHeader>
        Vencidos
      </PanelHeader>
      <PanelBody>
        {pending && (
          <div style={{ minHeight: '100px', display: 'flex', textAlign: 'center', color: '#111' }}>
            <p style={{ width: '100%', alignSelf: 'center', margin: '0' }}>
              <span style={{ paddingRight: '10px' }}><i className="fas fa-spinner fa-pulse"></i></span>
              {Strings.general.loading}
            </p>
          </div>
        )}
        {!pending &&
          <TableFull
            saldos={saldos}
            headers={Strings.receber.table.headers}
            excel="Vencidos"
            collumnSelect={true}
            collumnXl={[2]}
            collWidth='250px'
            search={true}
            download={true} />
        }
      </PanelBody>
    </Panel>
  )
}

const mapStateToProps = (state: StoreState) => ({
  saldos: selectors.titulosreceber.getTitulos(state),
  paginas: selectors.titulosreceber.getPaginas(state),
  pending: selectors.api.getPending(state, ActionCreators.titulosReceber.getVencidos),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getTitulos: (page: number) => dispatch(titulosReceberAC.getVencidos.call(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TitulosReceberTable)
