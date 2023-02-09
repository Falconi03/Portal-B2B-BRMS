import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import MarketPage from "@/components/marketPage";
import { Button } from "@/components";
import PedidosPdf from "@/components/pdf/PedidosPdf";
import selectors from '@/selectors'
import { connect } from 'react-redux'
import { StoreState } from '@/redux'
import Popup from 'reactjs-popup';
import { actionCreators as carrinhoAC } from '@/redux/carrinho'
import { toast } from "react-toastify";


const initialValue = {
    id: 0,
    date_update: '',
    itens: [{
        descricao: '',
        preco: '',
        quantidade: 0,
        sku: ''
    }],
    status: ''
}

const Detalhes = (props: any) => {

    const { id } = useParams<{ id?: string }>()
    const [pedido, setPedido] = useState(initialValue)
    const [qnt, setQnt] = useState('0')
    const user = props.user


    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${Config.API_URL}pedido/pedido_historico/`, config)
            .then((res: any) => {
                const resposta = (res.data.results)
                setPedido(resposta.find((ped: { id: number }) => String(ped.id) === id))
            })
            .catch((error: any) => {
                console.log(error.response)
            });

    }, [])

    let total = 0

    const RefPedido = (pedido: { sku: string, quantidade: number, preco: number }) => {
        if (+pedido.quantidade > 0) {
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
                    props.getSaldos()
                });
        } else {
            null
        }
    }


    const RefCompra = () => {
        if (props.carrinho.carrinho[0].itens.length > 0) {
            const bodyParameters = { status: 'cancelado' }
            axios.put(`${Config.API_URL}pedido/pedido_encerrar/`, bodyParameters, config)
                .then((res: any) => {
                    console.log(res.status)
                    props.getSaldos()
                    pedido.itens.map((produtoPedido, prodid) => {
                        const bodyParameters = { sku: produtoPedido.sku, quantidade: produtoPedido.quantidade, preco: produtoPedido.preco }
                        setTimeout(() => {
                            axios.post(`${Config.API_URL}pedido/pedido_item/`, bodyParameters, config)
                                .then((res: any) => {
                                    console.log(res.status)
                                    if (prodid === (pedido.itens.length - 1)) {
                                        props.getSaldos()
                                        toast.success("Novos itens foram adicionados no seu carrinho.", {
                                            position: "top-right",
                                            autoClose: 4000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: false,
                                            progress: undefined
                                        });
                                    }
                                })
                                .catch((error: any) => {
                                    console.log(error.response)
                                    if (prodid === (pedido.itens.length - 1)) {
                                        props.getSaldos()
                                    }
                                    if (error.response.status === 401) {
                                        window.location.reload()
                                    }
                                    if (error.response.status === 400) {
                                    }
                                    toast.error("Algo deu errado. Tente novamente!.", {
                                        position: "top-right",
                                        autoClose: 4000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: false,
                                        progress: undefined
                                    });

                                })
                        }, 500)
                    })
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
        } else {
            pedido.itens.map((produtoPedido, prodid) => {
                const bodyParameters = { sku: produtoPedido.sku, quantidade: produtoPedido.quantidade, preco: produtoPedido.preco }
                axios.post(`${Config.API_URL}pedido/pedido_item/`, bodyParameters, config)
                    .then((res: any) => {
                        console.log(res.status)
                        if (prodid === (pedido.itens.length - 1)) {
                            props.getSaldos()
                        }
                    })
                    .catch((error: any) => {
                        console.log(error.response)
                        if (prodid === (pedido.itens.length - 1)) {
                            props.getSaldos()
                        }
                        if (error.response.status === 401) {
                            window.location.reload()
                        }
                        if (error.response.status === 400) {
                        }
                    })
            })
        }



    }



    return (
        <MarketPage>
            {pedido ?
                <div className="historico">
                    <h1>FINALIZADO EM: {new Date(pedido.date_update).toLocaleString()}</h1>
                    <div>
                        <h2>Status: {pedido.status}</h2>
                        <div className="table-responsive produtos-historico">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>PRODUTO</th>
                                        <th>PREÇO</th>
                                        <th>QUANTIDADE</th>
                                        <th>SUBTOTAL</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedido.itens.map((produtoPedido, id: number) => {
                                        total += Number(produtoPedido.preco) * produtoPedido.quantidade
                                        return (
                                            <tr key={id}>
                                                <td>
                                                    <img src={`https://${window.location.hostname}/images/produto/${produtoPedido.sku.substring(0, 17)}-1.jpg`} style={{ width: '50px', height: '50px' }} onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
                                                    }} />
                                                </td>
                                                <td>{produtoPedido.descricao}</td>
                                                <td>R$ {String((+produtoPedido.preco).toFixed(2)).replace('.', ',')}</td>
                                                <td>{produtoPedido.quantidade}</td>
                                                <td>R$ {String((+produtoPedido.preco * produtoPedido.quantidade).toFixed(2)).replace('.', ',')}</td>
                                                <td style={{ width: '220px' }}>
                                                    <Popup
                                                        trigger={
                                                            <button className="btn btn-primary w-100 btn-warning"><i className="fa fa-repeat p-1" />Comprar novamente</button>
                                                        } modal nested>
                                                        {(close: any) =>
                                                            <div className="modal-popup">
                                                                <div className='modal-popup header' >
                                                                    <h4 className="panel-title" style={{ margin: '10px' }}>Comprar Novamente</h4>
                                                                    <div className="panel-heading-btn">
                                                                        <button className="btn  btn-icon btn-circle btn-danger modal-popup button-close" onClick={close}><i className="fa fa-times"></i></button>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-popup content">
                                                                    <div className="table-responsive produtos-historico">
                                                                        <table className="table">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th colSpan={2}>PRODUTO</th>
                                                                                    <th>PREÇO</th>
                                                                                    <th>QUANTIDADE</th>
                                                                                    <th>TOTAL</th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr style={{ verticalAlign: 'middle' }}>
                                                                                    <td>
                                                                                        <img src={`https://${window.location.hostname}/images/produto/${produtoPedido.sku.substring(0, 17)}-1.jpg`} style={{ width: '50px', height: '50px' }} onError={({ currentTarget }) => {
                                                                                            currentTarget.onerror = null; // prevents looping
                                                                                            currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
                                                                                        }} />
                                                                                    </td>
                                                                                    <td>{produtoPedido.descricao}</td>
                                                                                    <td>R$ {String((+produtoPedido.preco).toFixed(2)).replace('.', ',')}</td>
                                                                                    <td className='input-number'>
                                                                                        <button onClick={() => setQnt(String(+qnt - 1))} disabled={+qnt < 1 ? true : false}>-</button>
                                                                                        <input type="number" value={qnt} onChange={(e) => {
                                                                                            setQnt(e.currentTarget.value);
                                                                                        }} />
                                                                                        <button onClick={() => setQnt(String(+qnt + 1))}>+</button>
                                                                                    </td>
                                                                                    <td>R$ {String((+produtoPedido.preco * +qnt).toFixed(2)).replace('.', ',')}</td>
                                                                                    <td>
                                                                                        <Button
                                                                                            title='Adicionar ao Carrinho'
                                                                                            type="submit"
                                                                                            className="w-100 btn-success"
                                                                                            onClick={() => {
                                                                                                RefPedido({
                                                                                                    sku: produtoPedido.sku,
                                                                                                    quantidade: +qnt,
                                                                                                    preco: +produtoPedido.preco
                                                                                                });
                                                                                                close();
                                                                                            }}
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </Popup>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="total">
                            <span style={{ color: 'darkred' }}>TOTAL: R$ {String((total).toFixed(2)).replace('.', ',')}</span>
                            <Button
                                type="submit"
                                className="w-100 btn-dark"
                                onClick={() => PedidosPdf(pedido, user)}>
                                <i className="far fa-file-pdf p-1" />Gerar PDF
                            </Button>
                            <Button
                                type="submit"
                                className="w-100 btn-success"
                                onClick={() => { RefCompra() }}>
                                <i className="fa fa-repeat p-1" />Refazer Compra
                            </Button>
                        </div>
                    </div>
                </div> : null}
        </MarketPage>

    )
}

const mapStateToProps = (state: StoreState) => ({
    user: selectors.user.getUser(state),
    carrinho: state.carrinho,

})
const mapDispatchToProps = (dispatch: any) => ({
    getSaldos: () => { dispatch(carrinhoAC.getCarrinhoProdutos.call()) }

})

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes)