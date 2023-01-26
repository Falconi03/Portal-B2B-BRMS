import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
/* import Calendar from 'react-calendar' */
import { TitulosAbertosPayload } from '@/models/titulos-receber'
import Strings from '@/constants'
import TitulosReceber from '@/models/titulos-receber'
import { ActionCreators, StoreState } from '@/redux'
import { actionCreators as titulosReceberAC } from '@/redux/titulosreceber'
import selectors from '@/selectors'
import TableFull from '@/components/tables/TableFull'
import { Panel, PanelBody, PanelHeader } from '@/components/panel/panel'
import { DropdownItem } from 'reactstrap';
import DropDown from '@/components/dropdown/Dropdown'

interface DispatchProps {
  getTitulos: (payload: TitulosAbertosPayload) => void
}

interface TitulosReceberStateProps {
  saldos: Array<TitulosReceber> | undefined
  paginas: number
  pending: boolean
}

enum TitulosAbertosFieldNames {
  dias = 'dias',
}

export const TitulosReceberAbertoTable = (props: TitulosReceberStateProps & DispatchProps): JSX.Element => {
  const { saldos, getTitulos, pending } = props
  const [dias, setDias] = useState('7')
  const [date, setDate] = useState([
    new Date(),
    new Date(),
  ]);

  useEffect(() => {
    getTitulos(new TitulosAbertosPayload({ 'dias': dias }[TitulosAbertosFieldNames.dias]))
  }, [dias])

  return (
    <>
      <DropDown name={'Mostrar ' + dias + ' dias'} bgColor='#20252a' color="white" size="sm" border="1px solid #6c757d" className='mb-md-3 d-flex'>
        <div className='d-flex' style={{maxWidth: '500px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap:'0.5rem', borderRight:'1px solid black'}}>
            {['7', '14', '21', '30', '60', '90', '360'].map((dia, id) => (
              <DropdownItem onClick={() => setDias(dia)} key={id}>
                <label key={id} >
                  Mostrar {dia} dias
                </label>
              </DropdownItem>
            ))}
          </div>
          {/* <div>
            <Calendar
              onChange={setDate}
              selectRange={true}
              defaultValue={date}
            />
          </div> */}
        </div>
      </DropDown>
      <Panel>
        <PanelHeader>
          A Vencer Próximos {dias} Dias
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
              excel="Titulos Abertos"
              collumnSelect={true}
              collumnXl={[2]}
              collWidth='250px'
              search={true}
              download={true} />
          }
        </PanelBody>
      </Panel>
    </>

  )
}

const mapStateToProps = (state: StoreState) => ({
  saldos: selectors.titulosreceber.getTitulos(state),
  paginas: selectors.titulosreceber.getPaginas(state),
  pending: selectors.api.getPending(state, ActionCreators.titulosReceber.getTitulosAbertos),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getTitulos: (payload: TitulosAbertosPayload) => dispatch(titulosReceberAC.getTitulosAbertos.call(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TitulosReceberAbertoTable)
