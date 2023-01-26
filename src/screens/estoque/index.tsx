import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Page } from '@/components'
import Strings from '@/constants'
import EstoqueSaldo from '@/models/estoque-saldo'
import { ActionCreators, StoreState } from '@/redux'
import { actionCreators as estoqueAC } from '@/redux/estoque'
import selectors from '@/selectors'
import { Panel, PanelBody, PanelHeader } from '@/components/panel/panel';
import { PanelContextProvider } from '@/components/context/PanelContext'
import TableFull from '@/components/tables/TableFull'

interface DispatchProps {
  getSaldos: (page: number) => void
}

interface EstoqueStateProps {
  saldos: Array<EstoqueSaldo> | undefined
  pending: boolean
}


export const EstoqueScreen = (props: EstoqueStateProps & DispatchProps): JSX.Element => {


  const { saldos, getSaldos, pending } = props
  
  useEffect(() => {
    getSaldos(0)
  }, [])

  return (
    <Page title={Strings.estoque.title}>
      <PanelContextProvider>
        <Panel>
          <PanelHeader>
            {Strings.estoque.title}
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
                headers={Strings.estoque.table.headers}
                collumnSelect={true}
                excel="Estoque"
                search={true} />
            }
          </PanelBody>
        </Panel>
      </PanelContextProvider>
    </Page>
  )
}
const mapStateToProps = (state: StoreState) => ({
  saldos: selectors.estoque.getSaldos(state),
  pending: selectors.api.getPending(state, ActionCreators.estoque.getEstoqueSaldo),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getSaldos: (page: number) => dispatch(estoqueAC.getEstoqueSaldo.call(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EstoqueScreen)
