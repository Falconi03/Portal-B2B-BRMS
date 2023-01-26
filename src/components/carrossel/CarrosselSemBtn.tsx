import React, { useEffect, useRef, useState } from 'react';


interface CarrosselProps {
    imagens: { img: string }[]
}

const CarrosselSemBtn = (props: CarrosselProps) => {

    const imagens = props.imagens

    const [count, setCount] = useState(0)
    const carrossel = useRef<HTMLDivElement>(null)


    const next = () => {
        
        if (carrossel.current) {
            if (count === (imagens.length - 1)) {
                carrossel.current.scrollLeft = 0
                setCount(0)
                
            } else {
                carrossel.current.scrollLeft = Math.floor(carrossel.current.scrollLeft) + Math.floor(carrossel.current.offsetWidth)
                
                setCount(count + 1)
            }
        }


    }

    useEffect(() => {
        const timeout = setTimeout(next, 5000)
        return () => {
            clearTimeout(timeout)

        }
    }, [count])

    return (
        <div>
            <div className='carrossel-container' ref={carrossel} >
                {imagens.map((img, id) => {
                    return (                        
                        <img src={img.img}  key={id}/>                        
                    )
                })}
                <div className='carrossel' style={{ height: carrossel.current?.clientHeight , width: carrossel.current?.clientWidth }}/>
            </div>
            
        </div>
    )
}
export default CarrosselSemBtn;