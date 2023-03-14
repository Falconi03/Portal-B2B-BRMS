import React, { useEffect, useRef, useState } from "react"
import { Link } from 'react-router-dom'


const CardProdutos = (props: any) => {

    const card = useRef(null)
    const produto = props.produto
    const [testeImg, setTesteImg] = useState(true)
    const [imagem1, setImagem1] = useState(<></>)
    const [imagem2, setImagem2] = useState(<></>)

    useEffect(() => {
        setImagem1(
            <img className='img1' src={`https://${window.location.hostname}/images/produto/${produto.codigo}-1.jpg`} onError={({ currentTarget }) => {
                setTesteImg(false)
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
            }} />
        )
        setImagem2(
            <img className='img2' src={`https://${window.location.hostname}/images/produto/${produto.codigo}-2.jpg`} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://${window.location.hostname}/images/produto/${produto.codigo}-1.jpg`
            }} />
        )
    }, [produto])

    return (
        <>
            <div
                key={produto.id}
                className='mini-card'
                ref={card} >
                <Link to={`/produto/${produto.id}`}>
                    {imagem1}
                    {testeImg ? imagem2 : <img className='img2' src={`https://${window.location.hostname}/images/produto-sem-imagem.jpg`} />}
                </Link>
                <div className='conteudo'>
                    <Link to={`/produto/${produto.id}`}>
                        <p className="titulo"><strong>{produto.descricao.slice(0, 45)}</strong></p>
                    </Link>
                    <div className='preco'>
                        <span>Preço: R${String(produto.preco_lista?.toFixed(2)).replace('.', ',')}</span>
                        <span>Preço Sugerido: R${String(produto.preco_sugerido?.toFixed(2)).replace('.', ',')}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardProdutos