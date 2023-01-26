import React from "react";

interface PostItProps {
    color: string
    simbol: string
    titulo: string
    valor: string
    /* height: string
    width: string */
}


const PostIt = (props: PostItProps) => {
    return (
            <div className="widget widget-stats" style={{ background: props.color }}>
                <div className="stats-icon stats-icon-lg"><i className={`${props.simbol} fa-fw`}></i></div>
                <div className="stats-content" >
                    <div className="stats-title">
                        <h2>{props.titulo}</h2>
                    </div>
                    <div className="stats-number">{props.valor}</div>
                </div>
                <div className="stats-link">
                    <a >View Detail <i className="fa fa-arrow-alt-circle-right"></i></a>
                </div>
            </div>
    )
}
export default PostIt