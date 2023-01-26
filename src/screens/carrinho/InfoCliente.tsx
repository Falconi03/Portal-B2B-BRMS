import { InfoClienteContext } from "@/components/context/InfoCliente";
import React, { useContext } from "react";

const InfoCliente = () => {

    const { loja } = useContext(InfoClienteContext)

    return (
        <div className="orcamento" style={{ paddingBottom: '3rem' }}>
            {loja.nome_fantasia !== 'Escolher Loja' ?
                <>
                    <span className="titulo"><label className="fa fa-info-circle" />Informações do cliente</span>
                    <div className="detalhes-pedido w-100">
                        <div>
                            <ul>
                                <li>
                                    <span>Razão social:</span>
                                    <span className="dados">{loja.razao_social}</span>
                                </li>
                                <li>
                                    <span>Nome fantasia:</span>
                                    <span className="dados">{loja.nome_fantasia}</span>
                                </li>
                                <li>
                                    <span>CNPJ:</span>
                                    <span className="dados">{loja.cnpj}</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span>Estado:</span>
                                    <span className="dados">{loja.estado}</span>
                                </li>
                                <li>
                                    <span>Municipio:</span>
                                    <span className="dados">{loja.municipio}</span>
                                </li>
                                <li>
                                    <span>Bairro:</span>
                                    <span className="dados">{loja.bairro}</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <span>CEP:</span>
                                    <span className="dados">{loja.cep}</span>
                                </li>
                                <li>
                                    <span>Enderço:</span>
                                    <span className="dados">{loja.endereco}</span>
                                </li>
                                <li>
                                    <span>Código - Loja:</span>
                                    <span className="dados">{loja.codigo} - {loja.loja}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
                :
                <span className="titulo" style={{ color: '#ff0000' }}><label className="fa fa-times-circle" />Selecione uma loja</span>
            }
        </div>
    )
}
export default InfoCliente