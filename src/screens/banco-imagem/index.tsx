import React, { useRef } from "react";
import { Page } from "@/components";

const Img0 = require('@/../styles/imagem/dropbox/agv.jpg')
const Img1 = require('@/../styles/imagem/dropbox/dainese.jpg')
const Img2 = require('@/../styles/imagem/dropbox/ls2.jpg')
const Img3 = require('@/../styles/imagem/dropbox/norisk.jpg')
const Img4 = require('@/../styles/imagem/dropbox/race-tech.jpg')

const BancoImagem = () => {

    const url = 'https://www.dropbox.com/sm/password?cont=https%3A%2F%2Fwww.dropbox.com%2Fsh%2F45n1gthhvmco7eh%2FAADSZDrYliEOctJBQBJrqI6Za%3Fdl%3D0&content_id=AUz8giBnGc6dLndofpV1A6HQRHr6_ntGtow'
    const agv = 'https://www.dropbox.com/sh/45n1gthhvmco7eh/AABEPXyGSjch_vb5p9V0b3Vta/AGV?dl=0&subfolder_nav_tracking=1'
    const dainese = 'https://www.dropbox.com/sh/45n1gthhvmco7eh/AAB05uAFBKrPoQwqvMIZ2zUVa/Dainese?dl=0&subfolder_nav_tracking=1'
    const ls2 = 'https://www.dropbox.com/sh/45n1gthhvmco7eh/AAB-P2gUrsRI_pLkwVFjVQbJa/LS2?dl=0&subfolder_nav_tracking=1'
    const norisk = 'https://www.dropbox.com/sh/45n1gthhvmco7eh/AACjFgJaU3sXS8tprKtoRmDaa/Norisk?dl=0&subfolder_nav_tracking=1'
    const racetech = 'https://www.dropbox.com/sh/45n1gthhvmco7eh/AAAxI5Nm49YaPs3KbSI9Vkm2a/Race%20Tech?dl=0&subfolder_nav_tracking=1'

    return (
        <Page title="Banco de Imagem">
            <div className="banco-img">
            <a href={agv} target="_blank"><img src={Img0}/></a>
            <a href={dainese} target="_blank"><img src={Img1}/></a>
            <a href={ls2} target="_blank"><img src={Img2}/></a>
            <a href={norisk} target="_blank"><img src={Img3}/></a>
            <a href={racetech} target="_blank"><img src={Img4}/></a>
            </div>
            <div className="senha">
                <h1>Senha de aceso a todos os links acima <b>lojistabrms</b></h1>
            </div>
        </Page>
    )
}
export default BancoImagem