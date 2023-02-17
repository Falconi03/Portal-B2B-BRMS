import React, { useContext, useEffect, useState } from "react"
import { connect } from 'react-redux'
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import { actionCreators as carrinhoAC } from '@/redux/carrinho'
import { actionCreators as produtosAC } from '@/redux/produtos'
import { Button } from "@/components"
import MarketPage from "@/components/marketPage"
import { SearchContext } from "@/components/context/SerchContext";
import PedidosPdf from "@/components/pdf/PedidosPdf";
import selectors from '@/selectors'
import Popup from 'reactjs-popup';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { toast } from "react-toastify";
/* import Calendar from 'react-calendar' */
import DropDown from '@/components/dropdown/Dropdown'
import { string } from "prop-types";
import InfoCliente from "./InfoCliente";
import { InfoClienteContext } from "@/components/context/InfoCliente";


const Itens = (props: any) => {

    const produtoCarrinho = props.produtoCarrinho


    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }

    const inc = (sku: string, quantidade: number, preco: number) => {
        const bodyParameters = { sku: sku, quantidade: quantidade + 1, preco: preco }
        axios.post(`${Config.API_URL}pedido/pedido_item/`, bodyParameters, config)
            .then((res: any) => {
                console.log(res.status)
                props.getSaldos()

            })
            .catch((error: any) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    window.location.reload()
                }
                if (error.response.status === 400) {
                    props.getSaldos()
                }
            });
    }

    const dec = (sku: string, quantidade: number, preco: number) => {
        const bodyParameters = { sku: sku, quantidade: quantidade - 1, preco: preco }
        axios.post(`${Config.API_URL}pedido/pedido_item/`, bodyParameters, config)
            .then((res: any) => {
                console.log(res.status)
                props.getSaldos()

            })
            .catch((error: any) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    window.location.reload()
                }
                if (error.response.status === 400) {
                    props.getSaldos()
                }
            });
    }

    const setPedido = (pedido: {}) => {
        const bodyParameters = pedido
        axios.post(`${Config.API_URL}pedido/pedido_item/`, bodyParameters, config)
            .then((res: any) => {
                console.log(res.status)
                props.getSaldos()

            })
            .catch((error: any) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    window.location.reload()
                }
                if (error.response.status === 400) {
                    props.getSaldos()
                }
            });
    }

    const del = (pedido: {}) => {
        const bodyParameters = pedido
        axios.post(`${Config.API_URL}pedido/pedido_item/`, bodyParameters, config)
            .then((res: any) => {
                console.log(res.status)
                props.getSaldos()

            })
            .catch((error: any) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    window.location.reload()
                }
                if (error.response.status === 400) {
                    props.getSaldos()
                }
            });
    }

    const [qnt, setQnt] = useState(produtoCarrinho.quantidade)
    const { search, setSearch } = useContext(SearchContext)

    useEffect(() => {
        setSearch('')
    }, [])

    useEffect(() => {
        setQnt(produtoCarrinho.quantidade)
    }, [produtoCarrinho])

    if (produtoCarrinho.descricao.toUpperCase().includes(search.toUpperCase())) {
        return (
            <>
                <td>
                    <img src={`https://${window.location.hostname}/images/produto/${produtoCarrinho.sku.substring(0, 17)}-1.jpg`} style={{ width: '50px', height: '50px' }} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
                    }} />
                </td>
                <td>{produtoCarrinho.descricao}</td>
                <td>{produtoCarrinho.sku}</td>
                <td>R$ {String((+produtoCarrinho.preco).toFixed(2)).replace('.', ',')}</td>
                <td>
                    <button onClick={() => dec(produtoCarrinho.sku, produtoCarrinho.quantidade, produtoCarrinho.preco)}>-</button>
                    <input type="number" value={qnt} onChange={(e) => {
                        setQnt(e.currentTarget.value);
                        setPedido({
                            sku: produtoCarrinho.sku,
                            quantidade: +e.currentTarget.value,
                            preco: produtoCarrinho.preco
                        });
                    }} />
                    <button onClick={() => inc(produtoCarrinho.sku, produtoCarrinho.quantidade, produtoCarrinho.preco)}>+</button>
                </td>
                <td>R$ {String((produtoCarrinho.preco * produtoCarrinho.quantidade).toFixed(2)).replace('.', ',')}</td>
                <td><i className="fa fa-xmark" style={{ color: 'red', cursor: 'pointer' }} onClick={() =>
                    del({
                        sku: produtoCarrinho.sku,
                        quantidade: 0,
                        preco: produtoCarrinho.preco
                    })} /></td>
            </>
        )
    } else { return (null) }
}





const Carrinho = (props: any) => {



    const user = props.user
    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }
    const [transportadoras, setTransportadoras] = useState([{ nome_reduzido: '', id: 0 }])
    const [condPag, setCondPag] = useState([{ descricao: '', id: 0 }])
    const [transportadoraOrc, setTransportadoraOrc] = useState({ nome_reduzido: '', id: 0 })
    const [condPagOrc, setCondPagOrc] = useState({ descricao: '', id: 0 })
    const [frete, setFrete] = useState('CIF')
    const [infoAdicionais, setInfoAdicionais] = useState('')
    const { loja } = useContext(InfoClienteContext)




    useEffect(() => {
        props.getSaldos()
        axios.get(`${Config.API_URL}transportadora/lista_transportadora/?limit=1000`, config).then((res: any) => {
            setTransportadoras(res.data.results)
            setTransportadoraOrc(res.data.results.find((res: { id: number }) => res.id === 565))


        })
        axios.get(`${Config.API_URL}condicaopagamento/lista_condicao_pagamento/`, config).then((res: any) => {
            setCondPag(res.data.results)
            setCondPagOrc(res.data.results.find((res: { id: number }) => res.id === 305))

        })
    }, [])

    let total = 0

    const carrinho = props.carrinho.carrinho[0] ? props.carrinho.carrinho[0] : null

    useEffect(() => {
        if (carrinho) {
            transportadoras.find((res: { nome_reduzido: string, id: number }) => {
                if(res.id === carrinho.transportadora){
                    setTransportadoraOrc(res)
                }})
                condPag.find((res: { descricao: string, id: number }) => {
                if(res.id === carrinho.condicaopagamento){
                    setCondPagOrc(res)
                }})
            setInfoAdicionais(carrinho.inf_adicionais)
            setFrete(carrinho.tipo_frete)
        }
    }, [carrinho])

    const finalizarPedido = () => {

        const bodyParameters = { status: 'finalizado' }
        axios.put(`${Config.API_URL}pedido/pedido_encerrar/`, bodyParameters, config)
            .then((res: any) => {
                console.log(res.status)
                props.getSaldos()
                toast.success("Pedido efetuado com sucesso.", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined
                });

            })
            .catch((error: any) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    window.location.reload()
                }
                if (error.response.status === 400) {
                    props.getSaldos()
                }
            });
    }
    const cancelarPedido = () => {

        const bodyParameters = { status: 'cancelado' }
        axios.put(`${Config.API_URL}pedido/pedido_encerrar/`, bodyParameters, config)
            .then((res: any) => {
                console.log(res.status)
                props.getSaldos()

            })
            .catch((error: any) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    window.location.reload()
                }
                if (error.response.status === 400) {
                    props.getSaldos()
                }
            });
    }

    const altInfoPedido = (info: {}) => {
        const bodyParameters = info
        axios.post(`${Config.API_URL}pedido/pedido/`, bodyParameters, config)
            .then((res: any) => {
                console.log(res.status)
                props.getSaldos()

            })
            .catch((error: any) => {
                console.log(error.response)
            });
    }

    function formatDate(dateStr: any) {
        const ano = dateStr.substring(0, 4)
        const mes = dateStr.substring(5, 7)
        const dia = dateStr.substring(8, 10)
        return (`${dia}/${mes}/${ano}`)
    }


    return (
        <MarketPage>
            <div>
                {carrinho && carrinho.itens.length > 0 ?
                    <div className="carrinho">
                        <h1>MEU CARRINHO</h1>
                        <InfoCliente />
                        <div>
                            <div className="table-responsive produtos-carrinho">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>PRODUTO</th>
                                            <th>CÓDIGO</th>
                                            <th>PREÇO</th>
                                            <th>QUANTIDADE</th>
                                            <th>TOTAL</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carrinho.itens.map((produtoCarrinho: { preco: string, quantidade: number }, id: number) => {
                                            total += +produtoCarrinho.preco * produtoCarrinho.quantidade
                                            return (
                                                <tr key={id}>
                                                    <Itens produtoCarrinho={produtoCarrinho} getSaldos={props.getSaldos} />
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="orcamento">
                                <span className="titulo"><label className="fa fa-info-circle" />Detalhes do orçamento</span>
                                <div className="detalhes-pedido">
                                    <div>
                                        <ul>
                                            <li>
                                                <span>Nº do pedido:</span>
                                                <span className="dados">{carrinho.id}</span>
                                            </li>
                                            <li>
                                                <span>Data de emissão:</span>
                                                <span className="dados">{formatDate(new Date().toISOString())}</span>
                                            </li>
                                            <li>
                                                <span>Tipo de pedido:</span>
                                                <span className="dados">Venda</span>
                                            </li>
                                            <li>
                                                <span>Informações adicionais:</span>
                                                <span className="dados">{infoAdicionais}</span>
                                            </li>
                                            <Popup
                                                trigger={
                                                    <Button
                                                        type="submit"
                                                        className="w-100 btn-dark"
                                                    ><i className="fa fa-pencil-alt p-1" />Alterar detalhes do orçamento</Button>
                                                } modal nested>
                                                {(close: any) =>
                                                    <div className="modal-popup">
                                                        <div className='modal-popup header' >
                                                            <h4 className="panel-title" style={{ margin: '10px' }}>Detalhes do Pedido</h4>
                                                            {/* <div className="panel-heading-btn">
                                                                <button className="btn  btn-icon btn-circle btn-danger modal-popup button-close" onClick={close}><i className="fa fa-times"></i></button>
                                                            </div> */}
                                                        </div>
                                                        <PerfectScrollbar className={'app-sidebar-content'} options={{ suppressScrollX: true }}>
                                                            <div className="modal-popup content">
                                                                <div className="dados-pedido">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">*Número do pedido</label>
                                                                        <input type="text" className="form-control" value={carrinho.id} readOnly />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Data de emissão</label>
                                                                        <div className="input-group">
                                                                            <input type="text" value={formatDate(new Date().toISOString())} className="form-control" readOnly />
                                                                            <button type="button" className="btn popup-btn" data-bs-toggle="dropdown">
                                                                                <label className="form-label fa fa-calendar-days"></label>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">*Tipo do pedido</label>
                                                                        <input type="text" className="form-control" value="VENDA" readOnly />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">*Número PV Protheus</label>
                                                                        <input type="text" className="form-control" readOnly />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">*Tipo de frete</label>
                                                                        <select className="form-select" value={frete} onChange={(e) => setFrete(e.target.value)}>
                                                                            <option value='CIF'>CIF</option>
                                                                            <option value='FOB'>FOB</option>
                                                                        </select>
                                                                    </div>

                                                                </div>
                                                                <div className="dados-pedido">
                                                                    <h1 >PAGAMENTOS</h1>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">*Condiçoes de pagamento</label>
                                                                        <select className="form-select" value={condPagOrc.descricao}
                                                                            onChange={(e) => setCondPagOrc(condPag.find((res: { descricao: string }) => res.descricao === e.target.value)!)}>
                                                                            {condPag.map((pag, id) => {
                                                                                return (
                                                                                    <option value={pag.descricao} key={id} >
                                                                                        {pag.descricao}
                                                                                    </option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="dados-pedido">
                                                                    <h1 >ENTREGA</h1>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Valor do frete</label>
                                                                        <input type="text" className="form-control" value={carrinho.valor_frete} readOnly />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">*Transportadora</label>
                                                                        <select className="form-select" value={transportadoraOrc.nome_reduzido}
                                                                            onChange={(e) => setTransportadoraOrc(transportadoras.find((res: { nome_reduzido: string }) => res.nome_reduzido === e.target.value)!)}>
                                                                            {transportadoras.map((transportadora, id) => {
                                                                                return (
                                                                                    <option value={transportadora.nome_reduzido} key={id} >
                                                                                        {transportadora.nome_reduzido}
                                                                                    </option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Codigo rastreio</label>
                                                                        <input type="text" className="form-control" value={carrinho.rastreio} readOnly />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Endereço de entrega</label>
                                                                        <select className="form-select">
                                                                            <option>{loja.cep} - {loja.endereco}</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="dados-pedido">
                                                                    <h1 >INFORMAÇÕES ADICIONAIS</h1>
                                                                    <div className="mb-3 w-100">
                                                                        <textarea className="form-control" rows={3} onChange={(e) => setInfoAdicionais(e.target.value)} value={infoAdicionais} />
                                                                    </div>
                                                                </div>
                                                                <div className="w-100 mt-3 text-center">
                                                                    <Button
                                                                        type="submit"
                                                                        className="w-25 btn-success"
                                                                        onClick={() => {
                                                                            altInfoPedido({
                                                                                tipo_frete: frete,
                                                                                inf_adicionais: infoAdicionais,
                                                                                condicaopagamento: condPagOrc.id,
                                                                                transportadora: transportadoraOrc.id
                                                                            })
                                                                            close();
                                                                        }}>
                                                                        <i className="far fa-save p-1" />Salvar
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </PerfectScrollbar>
                                                    </div>
                                                }
                                            </Popup>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                                <span>Cond. de pagamento:</span>
                                                <span className="dados">{condPagOrc.descricao}</span>
                                            </li>
                                            <li>
                                                <span>Tipo de frete:</span>
                                                <span className="dados">{frete}</span>
                                            </li>
                                            <li>
                                                <span>Valor do frete:</span>
                                                <span className="dados">{carrinho.valor_frete}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                                <span>Transportadora:</span>
                                                <span className="dados">{transportadoraOrc.nome_reduzido}</span>
                                            </li>
                                            <li>
                                                <span>Codigo rastreio:</span>
                                                <span className="dados">{carrinho.rastreio}</span>
                                            </li>
                                            <li>
                                                <span>End. de entrega:</span>
                                                <span className="dados">{loja.cep} - {loja.endereco}</span>
                                            </li>
                                            <li>
                                                <span>Número PV Protheus:</span>
                                                <span className="dados"></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="total">
                                    <span>SUBTOTAL: R$ {String((total).toFixed(2)).replace('.', ',')}</span>
                                    {/* <span>FRETE: R$ 60,00</span> */}
                                    <span style={{ color: 'darkred' }}>TOTAL: R$ {String((total).toFixed(2)).replace('.', ',')}</span>
                                    <Popup
                                        trigger={
                                            <button className="btn btn-primary w-100 btn-success" disabled={loja.nome_fantasia !== 'Escolher Loja' ? false : true}>Fechar Orçamento</button>
                                        } modal nested>
                                        {(close: any) =>
                                            <div className="modal-popup">
                                                <div className='modal-popup header' >
                                                    <h4 className="panel-title" style={{ margin: '10px' }}>Confirmação do Orçamento</h4>
                                                    <div className="panel-heading-btn">
                                                        <button className="btn  btn-icon btn-circle btn-danger modal-popup button-close" onClick={close}><i className="fa fa-times"></i></button>
                                                    </div>
                                                </div>
                                                <PerfectScrollbar className={'app-sidebar-content'} options={{ suppressScrollX: true }} style={{ height: '60vh' }}>
                                                    <div className="modal-popup content">
                                                        <div className="table-responsive produtos-historico">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th colSpan={2}>PRODUTO</th>
                                                                        <th>SKU</th>
                                                                        <th>PREÇO</th>
                                                                        <th>QUANTIDADE</th>
                                                                        <th>TOTAL</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {carrinho.itens.map((produtoCarrinho: { preco: string, quantidade: number, descricao: string, sku: string }, id: number) => {
                                                                        return (
                                                                            <tr key={id}>
                                                                                <td>
                                                                                    <img src={`https://${window.location.hostname}/images/produto/${produtoCarrinho.sku.substring(0, 17)}-1.jpg`} style={{ width: '50px', height: '50px' }} onError={({ currentTarget }) => {
                                                                                        currentTarget.onerror = null; // prevents looping
                                                                                        currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
                                                                                    }} />
                                                                                </td>
                                                                                <td>{produtoCarrinho.descricao}</td>
                                                                                <td>{produtoCarrinho.sku}</td>
                                                                                <td>R$ {String((+produtoCarrinho.preco).toFixed(2)).replace('.', ',')}</td>
                                                                                <td>{produtoCarrinho.quantidade}</td>
                                                                                <td>R$ {String((+produtoCarrinho.preco * produtoCarrinho.quantidade).toFixed(2)).replace('.', ',')}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            <h1 style={{ color: 'darkred', textAlign: 'end' }}>TOTAL: R$ {String((total).toFixed(2)).replace('.', ',')}</h1>
                                                        </div>
                                                        <Button
                                                            title='Confirmar Orçamento'
                                                            type="submit"
                                                            className="w-100 btn-success"
                                                            onClick={() => finalizarPedido()}
                                                        />
                                                    </div>
                                                </PerfectScrollbar>
                                            </div>
                                        }
                                    </Popup>
                                    {loja.nome_fantasia !== 'Escolher Loja' ? null : <span style={{ color: '#dc3545', fontSize: 'small', width: '100%' }}>Selecione uma loja antes de finalizar o orçamento</span>}
                                    <Button
                                        title='Apagar Orçamento'
                                        type="submit"
                                        className="w-100 btn-danger"
                                        onClick={() => cancelarPedido()}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-100 btn-dark"
                                        onClick={() => PedidosPdf(carrinho, user)}
                                    ><i className="far fa-file-pdf p-1" />Gerar PDF</Button>
                                </div>
                            </div>
                        </div>
                    </div > :
                    <div>
                        <h1>Seu carrinho está vazio.</h1>
                    </div>}
            </div >
        </MarketPage >
    )
}

const mapStateToprops = (state: any) => {
    return {
        carrinho: state.carrinho,
        produtos: state.produtos,
        user: selectors.user.getUser(state),
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    getSaldos: () => { dispatch(carrinhoAC.getCarrinhoProdutos.call()), dispatch(produtosAC.getProdutos.call()) }

})


export default connect(mapStateToprops, mapDispatchToProps)(Carrinho)