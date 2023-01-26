import React, { createContext, ReactNode, useState } from "react";

type ContextProps = {
    children: ReactNode

}

type ContextType = {
    setLoja: (newState: {
        ativo: string,
        bairro: string,
        cep: string,
        classificacao: string,
        cnpj: string,
        codigo: string,
        complemento: string,
        data_insert: string,
        data_update: string,
        desconto_maximo: number,
        email: string,
        email_portal: string,
        empresa: string,
        endereco: string,
        estado: string,
        filial: string,
        grupo_clientes: string,
        id: number,
        incricao_estadual: string,
        isento_st: boolean,
        loja: string,
        municipio: string,
        nome_fantasia: string,
        numero: string,
        observacao: string,
        razao_social: string,
        tabela_preco_1: string,
        tabela_preco_2: string,
        telefone: string,
        tipo: string,
        vendedor: string,
     }) => void,
    loja: {
        ativo: string,
        bairro: string,
        cep: string,
        classificacao: string,
        cnpj: string,
        codigo: string,
        complemento: string,
        data_insert: string,
        data_update: string,
        desconto_maximo: number,
        email: string,
        email_portal: string,
        empresa: string,
        endereco: string,
        estado: string,
        filial: string,
        grupo_clientes: string,
        id: number,
        incricao_estadual: string,
        isento_st: boolean,
        loja: string,
        municipio: string,
        nome_fantasia: string,
        numero: string,
        observacao: string,
        razao_social: string,
        tabela_preco_1: string,
        tabela_preco_2: string,
        telefone: string,
        tipo: string,
        vendedor: string,
    },
}

const initialValue = {
    setLoja: () => { },
    loja: {
        ativo: '',
        bairro: '',
        cep: '',
        classificacao: '',
        cnpj: '',
        codigo: '',
        complemento: '',
        data_insert: '',
        data_update: '',
        desconto_maximo: 0,
        email: '',
        email_portal: '',
        empresa: '',
        endereco: '',
        estado: '',
        filial: '',
        grupo_clientes: '',
        id: 0,
        incricao_estadual: '',
        isento_st: false,
        loja: '',
        municipio: '',
        nome_fantasia: 'Escolher Loja',
        numero: '',
        observacao: '',
        razao_social: '',
        tabela_preco_1: '',
        tabela_preco_2: '',
        telefone: '',
        tipo: '',
        vendedor: '',
    },
}


export const InfoClienteContext = createContext<ContextType>(initialValue);

export const InfoClienteContextProvider = ({ children }: ContextProps) => {
    const [loja, setLoja] = useState(initialValue.loja)

    return (
        <InfoClienteContext.Provider value={
            {
                loja,
                setLoja,
            }}>
            {children}
        </InfoClienteContext.Provider>
    )
}