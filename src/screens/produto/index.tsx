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
    saldo_2: number,
    reserva: number,
    reserva_brms: number
    linha: boolean
}

interface PropsInput {
    carrinho: { itens: [] },
    estoque: Estoque,
    setPedido: any,
    produto: Produto

}



const espec = {
    caracteristica: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    f_tecnica: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
    detalhes: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable."

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
            disabled={estoque.linha || (estoque.saldo_2 - estoque.reserva - estoque.reserva_brms) > 0 ? false : true}
            key={estoque.codigo_base}
            type="number"
            value={value}
            onChange={(e) => {
                if (+e.currentTarget.value >= 0) {
                    if (+e.currentTarget.value > (estoque.saldo_2 - estoque.reserva - estoque.reserva_brms) && !estoque.linha) {
                        setValue(estoque.saldo_2 - estoque.reserva - estoque.reserva_brms);
                        setPedido({
                            sku: estoque.codigo_base,
                            quantidade: e.currentTarget.value === '' ? 0 : (estoque.saldo_2 - estoque.reserva - estoque.reserva_brms),
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

    const [descricao, setDescricao] = useState(espec.caracteristica)
    const [produto, setProduto] = useState<Produto>({ preco_lista: 0, itens: [{ descricao: '', codigo: '', itens: [{ descricao: '', codigo_base: '', saldo_2: 0, reserva: 0, reserva_brms: 0, linha: true }] }], codigo: '', id: 0, descricao: '' })
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
                                    return (
                                        <React.Fragment key={corID}>
                                            <tr className="estoque-input">
                                                <td style={{ whiteSpace: 'pre' }}>{`${cor.descricao}: `}</td>
                                                {especTam.map((tam, id) => {
                                                    let estoque: Estoque | undefined = { descricao: '', codigo_base: '', saldo_2: 0, reserva: 0, reserva_brms: 0, linha: true }
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
                                                    let estoque: Estoque | undefined = { descricao: '', codigo_base: '', saldo_2: 0, reserva: 0, reserva_brms: 0, linha: true }
                                                    if (estoque = cor.itens.find((estoque) => tam === estoque.descricao)) {
                                                        return (
                                                            <td key={id}>{estoque.saldo_2 - estoque.reserva - estoque.reserva_brms}</td>
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
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="descricao">
                        <div className="btns-desc">
                            <button onClick={() => setDescricao(espec.caracteristica)}>Descrição</button>
                            <button onClick={() => setDescricao(espec.f_tecnica)}>Ficha Técnica</button>
                            <button onClick={() => setDescricao(espec.detalhes)}>Detalhes</button>
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