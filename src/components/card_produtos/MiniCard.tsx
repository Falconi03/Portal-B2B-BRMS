import React, { useEffect, useRef, useState } from "react"
import { Link } from 'react-router-dom'


const CardProdutos = (props: any) => {

    const card = useRef(null)
    const produto = props.produto
    const [img, setImg] = useState(<></>)
    const [img2, setImg2] = useState(true)
    

    useEffect(() => {
        setImg(
            <img src={`https://${window.location.hostname}/images/produto/${produto.codigo}-1.jpg`} onError={({ currentTarget }) => {
                setImg2(false)
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
            }} />
        )
    }, [produto])

    return (
        <>
            <div
                key={produto.id}
                className='mini-card'
                ref={card} onMouseOver={() => img2 ? setImg(
                    <img src={`https://${window.location.hostname}/images/produto/${produto.codigo}-2.jpg`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `https://${window.location.hostname}/images/produto/${produto.codigo}-1.jpg`;
                    }} />
                ) : null}
                onMouseOut={() => setImg(
                    <img src={`https://${window.location.hostname}/images/produto/${produto.codigo}-1.jpg`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `https://${window.location.hostname}/images/produto-sem-imagem.jpg`;
                    }} />
                )} >
                <Link to={`/produto/${produto.id}`}>
                    {img}
                </Link>
                <div className='conteudo'>
                    <Link to={`/produto/${produto.id}`}>
                        <p className="titulo"><strong>{produto.descricao}</strong></p>
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