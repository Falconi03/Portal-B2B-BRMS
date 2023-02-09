import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'


interface CarrosselProps {
    imagens: { img: string, link: number }[],
    link?: boolean,
    btnSeta?: boolean,
    btnCircle?: boolean,
    progressBar?: boolean

}

const Carrossel = (props: CarrosselProps) => {


    const imagens = props.imagens

    const [count, setCount] = useState(0)
    const [progress, setProgress] = useState('')
    const carrossel = useRef<HTMLDivElement>(null)
    const [disabled, setDisable] = useState(false)
    const [timeCarrossel, setTimeCarrossel] = useState(false)


    const disabledFC = () => setDisable(false)

    const next = () => {

        setProgress('')
        if (carrossel.current) {
            if (count === (imagens.length - 1)) {
                carrossel.current.scrollLeft = 0
                setCount(0)

            } else {
                carrossel.current.scrollLeft = Math.floor(carrossel.current.scrollLeft) + Math.floor(carrossel.current.offsetWidth)

                setCount(count + 1)
            }
        }
        setDisable(true)


    }

    const prev = () => {
        setProgress('')
        if (carrossel.current) {
            if (Math.floor(carrossel.current.scrollLeft) === 0) {
                carrossel.current.scrollLeft = carrossel.current.offsetWidth * (imagens.length - 1)
                setCount(imagens.length - 1)
            } else {
                carrossel.current.scrollLeft = Math.floor(carrossel.current.scrollLeft) - Math.floor(carrossel.current.offsetWidth)
                setCount(count - 1)
            }
        }
        setDisable(true)

    }

    useEffect(() => {

        const cooldown = setTimeout(disabledFC, 500)
        const timeout = setTimeout(next, 5000)
        setProgress('progress-animation 5s infinite')
        return () => {
            clearTimeout(timeout)
            clearTimeout(cooldown)

        }
    }, [count])

    useEffect(() => {

        const cooldown = setTimeout(() => setTimeCarrossel(true), 100)
        return () => {
            clearTimeout(cooldown)
        }
    }, [])


    return (
        <div>
            <div className='carrossel-container' ref={carrossel} >
                {imagens.map((img, id) => {
                    return (
                        <img src={img.img} key={id} />
                    )
                })}
                <div className='carrossel' style={{ display: timeCarrossel ? '' : 'none', height: carrossel.current?.clientHeight, width: carrossel.current?.clientWidth }}>
                    {props.btnSeta ? <button className='btn-carrossel' onClick={prev} style={{ display: disabled ? 'none' : '' }}><i className="fa fa-angles-left"></i></button> : null}
                    {props.link ? <Link to={`/produto/${imagens[count].link}`} className='link' /> : <Link to='#' className='link' />}
                    {props.btnSeta ? <button className='btn-carrossel' onClick={next} style={{ display: disabled ? 'none' : '' }}><i className="fa fa-angles-right"></i></button> : null}
                    {props.progressBar ?
                        <div className="container">
                            <div className="container progress-bar" style={{ animation: progress }}></div>
                        </div> : null}
                </div>
            </div>

            {props.btnCircle ?
                <div className='circle-btns'>
                    {imagens.map((img, id) => {
                        return (
                            <button
                                style={{ background: count === id ? 'black' : 'gray' }}
                                className='circle-btn'
                                onClick={() => { setCount(id), setProgress(''), carrossel.current ? carrossel.current.scrollLeft = carrossel.current.offsetWidth * id : null }}
                                disabled={count === id ? true : false}
                                key={id}></button>
                        )
                    })}
                </div> : null}
        </div>
    )
}
export default Carrossel;