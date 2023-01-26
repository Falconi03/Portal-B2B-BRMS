import React from "react";
import { Page } from "@/components";

const backImg0 = require('@/../styles/imagem/banner-b2b.jpg')
/* const backImg1 = require('@/../styles/imagem/banner-b2b-v1.jpg')
const backImg2 = require('@/../styles/imagem/banner-sal-v1.jpg')
const backImg3 = require('@/../styles/imagem/banner-sal-v2.jpg') */

const Home = () => {
	return (
		<Page title="Home">
			<div className="home">
				<div>
					<img src={backImg0} style={{ width: '100%' }} />
					<div className="home container1">
						<h1>{'O B2B é um portal onde você cliente BR Motorsport consegue efetuar seus pedidos de forma rápida e fácil.'}</h1>
						<h1>{'Em caso de dúvidas entre em contato através do email: '}<b>{'e.souza@brms.com.br'}</b></h1>
					</div>
				</div>
				<div className="home container2">
					<h1>{'Para melhor aterdermos, a '}<strong>{'BR Motorsport'}</strong>{' seguirá um novo procedimento para solicitação de garantia.'}</h1>
					<h1>{'Informamos que a patir de agora, todas as solicitações para o '}<strong>{'SAL'}</strong>{', deverão ser enviadas mediante o preenchimento do furmulário no link abaixo:'}</h1>
					<a href="https://atendimento.brms.com.br/form/5827/" target="_blank" >{'https://atendimento.brms.com.br/form/5827/'}</a>
					<h1>{'Após o envio do formulário, será gerado um número de ticket para acompanhar os detalhes da sua solicitação.'}</h1>
					<h1 style={{ color: 'red' }}><strong>{'ATENÇÃO:'}</strong>{' Não serão atendidos os pedidos enviados para o e-mail: '}<b>{'sal@brms.com.br'}</b></h1>
				</div>
			</div>
		</Page>
	)
}
export default Home