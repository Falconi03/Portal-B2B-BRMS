import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { useParams } from "react-router-dom"
import { actionCreators as carrinhoAC } from '@/redux/carrinho'
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import CardProdutos from "@/components/card_produtos";
import MarketPage from "@/components/marketPage";

interface Produto {
    codigo: string,
    descricao: string,
    id: number,
    preco_lista: number,
    descricao_produto: string,
    ficha_tecnica: string,
    detalhes: string,
    itens: [{
        descricao: string,
        codigo: string,
        itens: Estoque[],
    }]

}

interface Pedido {
    sku: string,
    quantidade: number,
    preco: number
}
interface Estoque {
    descricao: string,
    codigo_base: string,
    saldo_3: number,
    linha: boolean
}

interface PropsInput {
    carrinho: { itens: [] },
    estoque: Estoque,
    setPedido: any,
    produto: Produto

}


const Input = (props: PropsInput) => {

    const { carrinho, estoque, setPedido, produto } = props
    const [value, setValue] = useState<number | string>(0)


    if (carrinho) {
        carrinho.itens.map((produtoCarrinho: { sku: string, quantidade: number, preco: number }) => {
            if (estoque.codigo_base === produtoCarrinho.sku && value === 0) {
                if (produtoCarrinho.quantidade !== value) {
                    setValue(produtoCarrinho.quantidade)
                    setPedido({
                        sku: produtoCarrinho.sku,
                        quantidade: produtoCarrinho.quantidade,
                        preco: produtoCarrinho.preco
                    })
                }
            }
        })
    }
    return (
        <input
            min={0}
            disabled={estoque.linha || (estoque.saldo_3) > 0 ? false : true}
            key={estoque.codigo_base}
            type="number"
            value={value}
            onChange={(e) => {
                if (+e.currentTarget.value >= 0) {
                    if (+e.currentTarget.value > (estoque.saldo_3) && !estoque.linha) {
                        setValue(estoque.saldo_3);
                        setPedido({
                            sku: estoque.codigo_base,
                            quantidade: e.currentTarget.value === '' ? 0 : (estoque.saldo_3),
                            preco: produto.preco_lista
                        })
                    } else {
                        setValue(e.currentTarget.value);
                        setPedido({
                            sku: estoque.codigo_base,
                            quantidade: e.currentTarget.value === '' ? 0 : +e.currentTarget.value,
                            preco: produto.preco_lista
                        })
                    }
                }
            }} />
    )

}

const Produto = (props: any) => {

    const { id } = useParams<{ id?: string }>()

    const carrinho = props.carrinho.carrinho[0] ? props.carrinho.carrinho[0] : null

    let subtotal = 0

    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }

    const [produto, setProduto] = useState<Produto>({ preco_lista: 0, descricao_produto: "", ficha_tecnica: "", detalhes: "", itens: [{ descricao: '', codigo: '', itens: [{ descricao: '', codigo_base: '', saldo_3: 0, linha: true }] }], codigo: '', id: 0, descricao: '' })
    const [descricao, setDescricao] = useState(produto.descricao_produto.length > 0 ? produto.descricao_produto : "Estamos trabalhando nessa descrição")
    const [pedido, setPedido] = useState<Pedido>({ sku: '', quantidade: 0, preco: 0 })



    useEffect(() => {
        window.scrollTo(0, 0)
        axios.get(`${Config.API_URL}produto/lista_produto_2/?id=${id}`, config)
            .then((res: any) => {
                const resposta = (res.data.results[0])
                setProduto(resposta)
            })
            .catch((error: any) => {
                console.log(error.response)
            });

    }, [])

    useEffect(() => {
        const produtoQtd = carrinho ? carrinho.itens.find((produto: { sku: string }) => produto.sku === pedido.sku) : null
        if (produtoQtd && +pedido.quantidade === produtoQtd.quantidade || pedido.sku === '') {
            null
        } else {
            const bodyParameters = pedido
            axios.post(`${Config.API_URL}pedido/pedido_item/`, bodyParameters, config)
                .then((res: any) => {
                    console.log(res.status)
                    props.getSaldos()
                })
                .catch((error: any) => {
                    props.getSaldos()
                    console.log(error.response)
                    if (error.response.status === 401) {
                        console.log("reload1")
                        window.location.reload()
                    }
                });
        }

    }, [pedido])


    if (carrinho) {
        carrinho.itens.map((produtoCarrinho: { sku: string, preco: number, quantidade: number }) => {
            subtotal += +produtoCarrinho.preco * produtoCarrinho.quantidade
        })
    }

    const especTam: string[] = []

    produto.itens.map((tamanhos) => {
        tamanhos.itens.map((tamanho, id) => {
            if (!especTam.find((tam) => tam === tamanho.descricao)) {
                especTam.push(tamanho.descricao)

            }
        })
    })
    especTam.sort()

    return (
        <MarketPage>
            <div className="produto">
                <CardProdutos produto={produto} />
                <div className="informacoes">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tamanhos: </th>
                                    {especTam.map((tamanhos, id) => {
                                        return (
                                            <th key={id}>{tamanhos}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {produto.itens.map((cor, corID: number) => {
                                    if (cor.itens.length > 0) {
                                        return (
                                            <React.Fragment key={corID}>
                                                <tr className="estoque-input">
                                                    <td style={{ whiteSpace: 'pre' }}>{`${cor.descricao}: `}</td>
                                                    {especTam.map((tam, id) => {
                                                        let estoque: Estoque | undefined = { descricao: '', codigo_base: '', saldo_3: 0, linha: true }
                                                        if (estoque = cor.itens.find((estoque) => tam === estoque.descricao)) {
                                                            return (
                                                                <td key={id}>
                                                                    <Input carrinho={carrinho} estoque={estoque} setPedido={setPedido} produto={produto} />
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={id}>
                                                                    <input
                                                                        type="number"
                                                                        disabled />
                                                                </td>
                                                            )
                                                        }
                                                    })}
                                                </tr>
                                                <tr className="estoque" style={{ backgroundColor: "#0000000d" }}>
                                                    <td>Estoque: </td>
                                                    {especTam.map((tam, id) => {
                                                        let estoque: Estoque | undefined = { descricao: '', codigo_base: '', saldo_3: 0, linha: true }
                                                        if (estoque = cor.itens.find((estoque) => tam === estoque.descricao)) {
                                                            return (
                                                                <td key={id}>{estoque.saldo_3}</td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={id}></td>
                                                            )
                                                        }
                                                    })}
                                                </tr>
                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="descricao">
                        <div className="btns-desc">
                            <button
                                onClick={() => setDescricao(produto.descricao_produto.length > 0 ? produto.descricao_produto : "Estamos trabalhando nessa descrição")}
                                style={descricao === produto.descricao_produto || descricao === "Estamos trabalhando nessa descrição" ? {
                                    border: '1px solid #e77600',
                                    boxShadow: '0 0 3px 2px #e4791180',
                                } : {}}
                            >Descrição</button>
                            <button
                                onClick={() => setDescricao(produto.ficha_tecnica.length > 0 ? produto.ficha_tecnica : "Estamos trabalhando nessa ficha técinica")}
                                style={descricao === produto.ficha_tecnica || descricao === "Estamos trabalhando nessa ficha técinica" ? {
                                    border: '1px solid #e77600',
                                    boxShadow: '0 0 3px 2px #e4791180',
                                } : {}}
                            >Ficha Técnica</button>
                            <button
                                onClick={() => setDescricao(produto.detalhes.length > 0 ? produto.detalhes : "Estamos trabalhando nesse detalhe")}
                                style={descricao === produto.detalhes || descricao === "Estamos trabalhando nesse detalhe" ? {
                                    border: '1px solid #e77600',
                                    boxShadow: '0 0 3px 2px #e4791180',
                                } : {}}
                            >Detalhes</button>
                        </div>
                        <div className="txt-desc">
                            {descricao}
                        </div>
                    </div>
                </div>
            </div>
        </MarketPage>

    )
}

const mapStateToprops = (state: any) => {
    return {
        carrinho: state.carrinho
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    getSaldos: () => dispatch(carrinhoAC.getCarrinhoProdutos.call())
})


export default connect(mapStateToprops, mapDispatchToProps)(Produto)