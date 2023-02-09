import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import CarrosselCard from "../carrossel/CarrosselCard"
import Popup from 'reactjs-popup';
import PerfectScrollbar from 'react-perfect-scrollbar'

const semImg = require('@/../styles/imagem/produto-sem-imagem.jpg')

const CardProdutos = (props: any) => {

    const [corProduto, setCorProduto] = useState(0)
    const [imagem, setImagem] = useState(1)

    const produto = props.produto


    const img = [
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-1.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-2.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-3.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-4.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-5.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-6.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-7.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-8.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-9.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-10.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-11.jpg`,
        `https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-12.jpg`,
    ]

    return (
        <>
            {produto ?
                <div key={produto?.id} className='card'>
                    {produto?.itens ?
                        <div className="card-img">
                            <div className="mini-images">
                                {img.map((imagem, id) => {
                                    return (
                                        <img className={'mini-img ' + imagem} src={imagem} key={id} onMouseOver={() => setImagem(id + 1)} onError={({ currentTarget }) => {
                                            currentTarget.className = 'd-none';
                                        }} />
                                    )
                                })}
                            </div>
                            <Popup
                                trigger={
                                    <img
                                        className='img-principal'
                                        src={`https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-${imagem}.jpg`}
                                        onError={({ currentTarget }) => {
                                            currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
                                        }} />} modal nested>
                                {(close: any) =>
                                    <div className="card w-100 ">
                                        <div className="img-popup">
                                        <PerfectScrollbar className={'app-sidebar-content'} options={{ suppressScrollX: true }} style={{ height: '90vh', width:'10%' }}>
                                                <div className="mini-images w-100">
                                                    {img.map((imagem, id) => {
                                                        return (
                                                            <img className={'mini-img ' + imagem} src={imagem} key={id} onMouseOver={() => setImagem(id + 1)} onError={({ currentTarget }) => {
                                                                currentTarget.className = 'd-none';
                                                            }} />
                                                        )
                                                    })}
                                                </div>
                                            </PerfectScrollbar>
                                            <div className="img-principal">
                                                <img
                                                    src={`https://${window.location.hostname}/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-${imagem}.jpg`}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
                                                    }} />
                                            </div>

                                        </div>
                                    </div>

                                }
                            </Popup>
                        </div>
                        : null}
                    <div className='conteudo'>
                        <div className="buttons">
                            {produto?.itens.map((cor: any, id: number) => {
                                return (
                                    <button key={id} onClick={() => setCorProduto(id)}>{cor.descricao}</button>
                                )
                            })}
                        </div>
                        <Link to={`/produto/${produto?.id}`}>
                            <h1 className="titulo">{produto?.descricao}</h1>
                        </Link>
                        <div className='preco'>
                            <span className="valores">
                                <p className="valores-texto">Valor do Produto: </p><p>R${String(produto.preco_lista?.toFixed(2)).replace('.', ',')}</p>
                            </span>
                            <span className="valores">
                                <p className="valores-texto">Valor do ICMS ST: </p><p>R${String(0.0.toFixed(2)).replace('.', ',')}</p>
                            </span>
                            <span className="valores">
                                <p className="valores-texto">Valor do IPI: </p><p>R${String(0.0.toFixed(2)).replace('.', ',')}</p>
                            </span>
                            <span className="valores">
                                <p className="valores-texto"><b>Valor do Produto + Impostos: </b></p><p><b>R${String(produto.preco_lista?.toFixed(2)).replace('.', ',')}</b></p>
                            </span>
                            <span className="valores">
                                <p className="valores-texto"><b>Preço Sugerido: </b></p><p><b>R${String(produto.preco_sugerido?.toFixed(2)).replace('.', ',')}</b></p>
                            </span>
                        </div>
                    </div>
                </div> : null}
        </>
    )
}
export default CardProdutos