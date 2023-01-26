import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
/* import Calendar from 'react-calendar' */
import { TitulosPagosPayload } from '@/models/titulos-receber'
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
    getTitulos: (payload: TitulosPagosPayload) => void
}

interface TitulosReceberStateProps {
    saldos: Array<TitulosReceber> | undefined
    paginas: number
    pending: boolean
}

enum TitulosPagosFieldNames {
    dias = 'dias',
}




export const TitulosReceberTable = (props: TitulosReceberStateProps & DispatchProps): JSX.Element => {
    const { saldos, getTitulos, pending } = props
    const [dias, setDias] = useState('30')
    const [dataDe, setDataDe] = useState(new Date())
    const [dataAte, setDataAte] = useState(new Date())

    const newDataDe = (e: Date) => {
        if (e > dataAte) {
            setDataAte(e)
        }
        setDataDe(e)
        close()
    }

    const newDataAte = (e: Date) => {
        if (e < dataDe) {
            setDataDe(e)
        }
        setDataAte(e)
        close
    }

    useEffect(() => {
        getTitulos(new TitulosPagosPayload({ 'dias': dias }[TitulosPagosFieldNames.dias]))
    }, [dias])


    return (
        <>
            <DropDown name={'Mostrar ' + dias + ' dias'} bgColor='#20252a' color="white" size="sm" border="1px solid #6c757d" className='mb-md-3'>
                <div className='d-flex' style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderRight: '1px solid black' }}>
                        {['7', '14', '21', '30', '60', '90'].map((dia, id) => (
                            <DropdownItem onClick={() => setDias(dia)} key={id}>
                                <label key={id} >
                                    Mostrar {dia} dias
                                </label>
                            </DropdownItem>
                        ))}
                    </div>
                    {/* <div className='d-flex'>
                        <div style={{ borderRight: '1px solid black' }}>
                            <Calendar
                                value={dataDe}
                                onChange={newDataDe}
                            />
                        </div>
                        <div>
                            <Calendar
                                value={dataAte}
                                onChange={newDataAte}
                            />
                        </div>
                    </div> */}
                </div>
            </DropDown>
            <Panel>
                <PanelHeader>
                    Baixados Últimos {dias} dias
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
                            headers={Strings.receber.table2.headers}
                            excel="Titulos Pagos"
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
    pending: selectors.api.getPending(state, ActionCreators.titulosReceber.getTitulosPagos),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    getTitulos: (payload: TitulosPagosPayload) => dispatch(titulosReceberAC.getTitulosPagos.call(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TitulosReceberTable)
