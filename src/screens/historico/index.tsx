import React, { useEffect, useState } from "react";
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import MarketPage from "@/components/marketPage";
import { Button } from "@/components";
import PedidosPdf from "@/components/pdf/PedidosPdf";
import selectors from '@/selectors'
import { User } from '@/models'
import { connect } from 'react-redux'
import { StoreState } from '@/redux'
import { Link } from 'react-router-dom'
import { Panel, PanelBody, PanelHeader } from "@/components/panel/panel";

interface HeaderStateProps {
    user: User | undefined
}

const initialValue = [{ date_update: '', id: 0, itens: [{ descricao: '', preco: '', quantidade: 0 }], status: '' }]


const Historico = (props: HeaderStateProps) => {

    const user = props.user ? props.user : { email: '', last_name: '' }
    const [historico, setHistorico] = useState(initialValue)
    const [pageItens, SetPageItens] = useState(initialValue)
    const [num, setNum] = useState([0, 10])

    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }

    useEffect(() => {
        axios.get(`${Config.API_URL}pedido/pedido_historico/`, config)
            .then((res: any) => {
                console.log(res.status)
                setHistorico(res.data.results)

            })
            .catch((error: any) => {
                console.log(error.response)
            });
    }, [])

    useEffect(() => {
        SetPageItens(historico.slice(num[0], num[1]))

    }, [historico, num])


    return (
        <MarketPage>
            <h1>MEUS PEDIDOS</h1>
            {pageItens.map((pedido, id) => {
                let total = 0
                {
                    pedido.itens.map((produtoPedido) => {
                        total += Number(produtoPedido.preco) * produtoPedido.quantidade
                    })
                }
                return (
                    <React.Fragment key={id}>
                        <Panel>
                            <PanelHeader>
                                <div className="d-flex justify-content-between ">
                                    <span>#Pedido N° {pedido.id}</span>
                                    <span>Status: <span className="status">{pedido.status}</span></span>
                                </div>
                            </PanelHeader>
                            <PanelBody>
                                <div className="d-flex justify-content-between">
                                    <div className="dados-historico" >
                                        <p><b>Data: </b> {new Date(pedido.date_update).toLocaleString()}</p>
                                        <p><b>Valor Total: </b> R$ {String((total).toFixed(2)).replace('.', ',')}</p>
                                    </div>
                                    <div className="btns-historico">
                                        <Link to={`/detalhes/${pedido.id}`}>
                                            <Button
                                                className="w-100 btn-success m-2">
                                                Detalhes do Pedido
                                            </Button>
                                        </Link>
                                        <Button
                                            type="submit"
                                            className="w-100 btn-dark m-2"
                                            onClick={() => PedidosPdf(pedido, user)}>
                                            <i className="far fa-file-pdf p-1" />Gerar PDF
                                        </Button>
                                    </div>
                                </div>
                            </PanelBody>
                        </Panel>
                    </React.Fragment>
                )
            })}
            <div className="btn-paginacao">
                <ul className="pagination mb-0 justify-content-center p-3" style={{ display: historico.length < 11 ? 'none' : '' }}>
                    <li className='page-item'>
                        <button onClick={() => setNum([0, 10])} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}>
                            <i className="fa fa-angle-double-left"></i>
                        </button>
                    </li>
                    <li className='page-item'>
                        <button onClick={() => num[0] > 0 ? setNum([num[0] - 10, num[0]]) : setNum([0, 10])} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}>
                            <i className="fa fa-angle-left"></i>
                        </button>
                    </li>
                    <li className="page-item d-flex align-items-center px-2" style={{ background: '#20252a', borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                        <div style={{ color: 'white', fontWeight: '400' }}>
                            Página {Math.ceil(num[1] / 10)} de {Math.ceil(historico.length / 10)}
                        </div>
                    </li>

                    <li className='page-item'>
                        <button onClick={() => num[1] < historico.length ? num[1] + 10 < historico.length ? setNum([num[0] + 10, num[1] + 10]) : setNum([num[0] + 10, historico.length]) : null} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}>
                            <i className="fa fa-angle-right"></i>
                        </button>
                    </li>
                    <li className='page-item'>
                        <button onClick={() => setNum([historico.length - (historico.length - (Math.trunc(historico.length / 10) * 10)), historico.length])} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}>
                            <i className="fa fa-angle-double-right"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </MarketPage>
    )
}
const mapStateToProps = (state: StoreState) => ({
    user: selectors.user.getUser(state),

})

export default connect(mapStateToProps)(Historico)