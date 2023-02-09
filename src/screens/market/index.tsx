import React, { useContext, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import 'react-calendar/dist/Calendar.css';
import Carrossel from '@/components/carrossel';
import CardProdutos from '@/components/card_produtos/MiniCard';
import MarketPage from '@/components/marketPage';
import { actionCreators as produtosAC } from '@/redux/produtos'
import { SearchContext } from '@/components/context/SerchContext'


const img = [{ img: 'https://motorsports.vteximg.com.br/arquivos/K3-SV-BUBBLE.jpg?v=637843248198530000', link: 10 },
{ img: 'https://ls2.vteximg.com.br/arquivos/BANNER-EXPLORER-V2.jpg?v=637896821192230000', link: 11 },
{ img: 'https://norisk.vteximg.com.br/arquivos/BANNER-MOTION-v3.jpg?v=637889078978400000', link: 13 }]

const initialValues = [{ descricao: '', codigo: '' }]

const Market = (props: any) => {


    const produtos = props.produtos.produtos
    const carrossel = useRef<HTMLDivElement>(null)
    const prod = useRef<HTMLDivElement>(null)
    const [count, setCount] = useState(0)
    const { search, setSearch } = useContext(SearchContext)
    const [pageItens, SetPageItens] = useState(initialValues)
    const [num, setNum] = useState([0, 20])
    const prodFiltardos: { id: number, descricao: string, codigo: string }[] = []
    const idProdutos:number[] = []
    const [prodCarrossel, setProdCarrossel] = useState([0])


    produtos.map((item: { descricao: '', codigo: '', id: 0 }) => {
        if (item.descricao.toUpperCase().includes(search.toUpperCase()) || item.codigo.includes(search)) {
            return (
                prodFiltardos.push(item),
                idProdutos.push(item.id)
            )
        }
    })


    document.querySelector('.produtos-carrossel')?.addEventListener('wheel', (e: any) => {
        if (e.deltaY < 0) {
            e.target.scrollBy(1000, 0)
        } if (e.deltaY > 0) {
            e.target.scrollBy(-1000, 0)
        }
    })

    const carrosselNext = () => {

        if (carrossel.current) {
            if (count === (2)) {
                carrossel.current.scrollLeft = 0
                setCount(0)

            } else {
                carrossel.current.scrollLeft = Math.floor(carrossel.current.scrollLeft) + Math.floor(carrossel.current.offsetWidth)

                setCount(count + 1)
            }
        }
    }

    const carrosselPrev = () => {

        if (carrossel.current) {
            if (Math.floor(carrossel.current.scrollLeft) === 0) {
                carrossel.current.scrollLeft = carrossel.current.offsetWidth * (2)
                setCount(2)
            } else {
                carrossel.current.scrollLeft = Math.floor(carrossel.current.scrollLeft) - Math.floor(carrossel.current.offsetWidth)
                setCount(count - 1)
            }
        }
    }

    useEffect(() => {
        const timeout = setTimeout(carrosselNext, 5000)
        return () => {
            clearTimeout(timeout)
        }
    }, [count, search])

    useEffect(() => {
        setSearch('')
        props.getSaldos()
    }, [])

    useEffect(() => {
        SetPageItens(prodFiltardos.slice(num[0], num[1]))
        prodFiltardos.length > 0 && search.length === 0 && prodCarrossel.length < 20 ? gerarNumero() : null
    }, [produtos, num])

    useEffect(() => {
        setNum([0, 20])

    }, [search])

    const roll = () => {
        setTimeout(() => { prod.current ? window.scrollTo(0, prod.current.offsetTop - 124) : null }, 100)
    }

    const first = () => {
        roll()
        setNum([0, 20])
    }
    const prev = () => {
        roll()
        num[0] > 0 ? setNum([num[0] - 20, num[0]]) : setNum([0, 20])
    }
    const next = () => {
        roll()
        num[1] < prodFiltardos.length ? num[1] + 20 < prodFiltardos.length ? setNum([num[0] + 20, num[1] + 20]) : setNum([num[0] + 20, prodFiltardos.length]) : null
    }
    const last = () => {
        roll()
        setNum([prodFiltardos.length - (prodFiltardos.length - (Math.trunc(prodFiltardos.length / 20) * 20)), prodFiltardos.length])
    }

    const gerarNumero = () => {
        const numAleatorio: number[] = []
        for (; ;) {
            if (numAleatorio.length < 20) {
                let aleatorio = Math.random() * ((idProdutos.length + 1) - 1) + 1
                aleatorio = idProdutos[parseInt(String(aleatorio))]



                numAleatorio.includes(aleatorio) ?
                    gerarNumero() :
                    numAleatorio.push(+aleatorio)
            } else { break }
        }
        setProdCarrossel(numAleatorio)
    }


    return (
        <MarketPage>
            <div className='market'>
                {search.length === 0 ?
                    <>
                        <div className='row'>
                            <Carrossel
                                imagens={img}
                                btnSeta={true}
                                btnCircle={true}
                                progressBar={true}
                                link={false} />
                        </div>
                        <h1 style={{ borderBottom: '1px solid white' }}>OS MAIS VENDIDOS</h1>
                        <div className='d-flex' >
                            <div className='produtos-carrossel' ref={carrossel}>
                                {prodCarrossel.map((num) => {
                                    const produto = prodFiltardos.find((prod) => prod.id === num)
                                    return (
                                        <React.Fragment key={num}>
                                            {produto ?
                                                <CardProdutos produto={produto} />
                                                : null}
                                        </React.Fragment>

                                    )
                                })}
                            </div>
                            <div className='btn-carrossel-produto'  >
                                <button onClick={carrosselPrev}><i className="fa fa-angles-left"></i></button>
                            </div>
                            <div className='btn-carrossel-produto' >
                                <button onClick={carrosselNext}><i className="fa fa-angles-right"></i></button>
                            </div>
                        </div>
                        <h1 style={{ borderBottom: '1px solid white' }} ref={prod}>TODOS OS PRODUTOS</h1>
                        <div className='produtos'>
                            {pageItens.map((item, id) => {
                                if (item.descricao.toUpperCase().includes(search.toUpperCase())) {
                                    return (
                                        <React.Fragment key={id}>
                                            <CardProdutos produto={item} />
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </div>
                    </> :
                    <>
                        <h1 ref={prod}>{`Resultados da pesquisa: ${search.toUpperCase()}`}</h1>
                        <div className='produtos' >
                            {pageItens.map((item, id) => {
                                if (item.descricao.toUpperCase().includes(search.toUpperCase()) || item.codigo.includes(search)) {
                                    return (
                                        <React.Fragment key={id}>
                                            <CardProdutos produto={item} />
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </div>
                    </>}
                <div className='btn-paginacao'>
                    <ul className="pagination mb-0 justify-content-center p-3" style={{ display: prodFiltardos.length < 21 ? 'none' : '' }}>
                        <li className='page-item'>
                            <button
                                onClick={() => first()} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}
                                disabled={num[0] === 0 ? true : false}>
                                <i className="fa fa-angle-double-left"></i>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button
                                onClick={() => prev()} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}
                                disabled={num[0] === 0 ? true : false}>
                                <i className="fa fa-angle-left"></i>
                            </button>
                        </li>
                        <li className="page-item d-flex align-items-center px-2" style={{ background: '#20252a', borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                            <div style={{ color: 'white', fontWeight: '400' }}>
                                Página {Math.ceil(num[1] / 20)} de {Math.ceil(prodFiltardos.length / 20)}
                            </div>
                        </li>

                        <li className='page-item'>
                            <button
                                onClick={() => next()} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}
                                disabled={num[1] === prodFiltardos.length ? true : false}>
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button
                                onClick={() => last()} className='page-link' style={{ background: '#20252a', border: '1px solid black', color: 'white' }}
                                disabled={num[1] === prodFiltardos.length ? true : false}>
                                <i className="fa fa-angle-double-right"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </MarketPage >
    )

}
const mapStateToprops = (state: any) => {
    return {
        produtos: state.produtos
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    getSaldos: () => dispatch(produtosAC.getProdutos.call())
})


export default connect(mapStateToprops, mapDispatchToProps)(Market)