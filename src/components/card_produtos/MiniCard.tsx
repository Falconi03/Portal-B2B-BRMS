import React, { useEffect, useRef, useState } from "react"
import { Link } from 'react-router-dom'


const CardProdutos = (props: any) => {

    const card = useRef(null)
    const produto = props.produto 
    const [img, setImg] = useState('')

    useEffect(() => {        
            setImg(`http://clienteportal2.brms.com.br/images/produto/${produto.codigo}-1.jpg`)
    }, [produto])

    return (
        <>
            <div
                key={produto.id}
                className='mini-card'
                ref={card} onMouseOver={() => setImg(`http://clienteportal2.brms.com.br/images/produto/${produto.codigo}-2.jpg`)} 
                onMouseOut={() => setImg(`http://clienteportal2.brms.com.br/images/produto/${produto.codigo}-1.jpg`)} >
                <Link to={`/produto/${produto.id}`}>
                    <img src={img} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = 'http://clienteportal2.brms.com.br/images/produto-sem-imagem.jpg';
                    }} />
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