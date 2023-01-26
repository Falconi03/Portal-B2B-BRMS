import React, { useReducer, useRef, useState } from "react";
import InputMask from 'react-input-mask'
import axios from 'axios';
import Config from '@/config'
import ReCAPTCHA from "react-google-recaptcha"

const initialState = {
    cadastro: {
        nome: '',
        email: '',
        telefone: '',
        token: '',
    },
    error: {
        nome: '',
        email: '',
        telefone: '',
        termo: '',
        recaptcha: '',
        cadastro: ''
    }
}

const ReducerCadastro = (state:any, action:any) => {
    switch (action.type) {
        case 'add_nome':
            return { ...state, nome: action.payload }
        case 'add_email':
            return { ...state, email: action.payload }
        case 'add_telefone':
            return { ...state, telefone: action.payload }
        case 'add_token':
            return { ...state, token: action.payload }
    }
}

const ReducerError = (state:any, action:any) => {
    switch (action.type) {
        case 'nome_error':
            if (action.payload.length < 4) {
                return { ...state, nome: 'Nome invalido' }
            } else {
                return { ...state, nome: '' }
            }
        case 'nome_focus':
            return { ...state, nome: '' }
        case 'email_error':
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(action.payload)) {
                return { ...state, email: 'E-mail invalido' }
            } else {
                return { ...state, email: '' }
            }
        case 'email_focus':
            return { ...state, email: '' }
        case 'telefone_error':
            if (action.payload.replace(/[^0-9]/g, '').length < 10) {
                return { ...state, telefone: 'Telefone invalido' }
            } else {
                return { ...state, telefone: '' }
            }
        case 'telefone_focus':
            return { ...state, telefone: '' }
        case 'termo_error':
            if (action.payload === false) {
                return { ...state, termo: 'Requer a autorização para continuar' }
            } else {
                return { ...state, termo: '' }
            }
        case 'termo_focus':
            return { ...state, termo: '' }
        case 'recaptcha_false':
            if (action.payload === '') {
                return { ...state, recaptcha: 'É necessário da validação do reCAPTCHA' }
            } else {
                return { ...state, recaptcha: '' }
            }
        case 'recaptcha_error':
            if (action.payload === 'Token inválido...') {
                return { ...state, recaptcha: 'Token inválido...' }
            } else {
                return { ...state, recaptcha: '' }
            }
        case 'recaptcha_null':
            if (action.payload === '') {
                return { ...state, recaptcha: 'É necessario da validação do reCAPTCHA' }
            } else {
                return { ...state, recaptcha: '' }
            }
        case 'clean_error':
            return { state: initialState.error }
        case 'cadastro':
            return { ...state, cadastro: '' }
        case 'cadastro_error':
            return { ...state, cadastro: 'Usuario já cadastrado' }

    }
}

const Ls2 = () => {

    const [state1, dispatch1] = useReducer(ReducerCadastro, initialState.cadastro)
    const [state2, dispatch2] = useReducer(ReducerError, initialState.error)
    const [termo, setTermo] = useState(false)
    const [cadastro, setCadastro] = useState(false)
    const reRef: { current: any } = useRef()


    function onChange(value: string | null) {
        if (value) {
            dispatch1({ type: 'add_token', payload: value })
            dispatch2({ type: 'recaptcha_null', payload: value })
        }
    }

    const submit = (props: { nome: string, email: string, telefone: string, token: string }) => {
        dispatch2({ type: 'cadastro' })
        const { nome, email, telefone, token } = props
        if (termo === true && nome.length > 2 && telefone.replace(/[^0-9]/g, '').length > 9 && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && token !== '') {
            const bodyParameters = { nome: nome, email: email, telefone: telefone.replace(/[^0-9]/g, ''), marca: 'ls2', token: token }
            axios.post(`${Config.API_URL}black/user/`, bodyParameters)
                .then((res: any) => {
                    console.log(res.status)
                    setCadastro(true)

                })
                .catch((error: any) => {
                    console.log(error.response)
                    if (error.response.status === 412) {
                        if (error.response.data['Bad Request'] === 'Registro já existente na base...') {
                            dispatch2({ type: 'cadastro_error' })
                            dispatch1({ type: 'add_token', payload: '' })
                            reRef.current.reset()
                        }
                        if (error.response.data['Bad Request'] === 'Token inválido...') {
                            dispatch2({ type: 'recaptcha_error', payload: error.response.data['Bad Request'] })
                            reRef.current.reset()
                        }
                    }
                });
        } else {

            dispatch2({ type: 'nome_error', payload: nome })
            dispatch2({ type: 'email_error', payload: email })
            dispatch2({ type: 'telefone_error', payload: telefone })
            dispatch2({ type: 'termo_error', payload: termo })
            dispatch2({ type: 'recaptcha_null', payload: token })

        }
    }

    return (
        <div className="black-page">
            {cadastro ?
                <div style={{ color: 'white', textAlign: "center" }}>
                    <h1>Cadastro efetuado com sucesso!</h1>
                    <h1>Obrigado.</h1>
                </div>
                :
                <div className="black">
                    <img src='https://black.ls2.com.br/images/blackfriday_ls2.png' alt="" />
                    <div className="txt-black">
                        <p><b>Quer sair na frente sobre descontos da Black Friday?</b></p>
                        <p><b>Preencha o formulário e fique por dentro ;p</b></p>
                    </div>
                    <div className="formulario">
                        <div className="inp">
                            <span>Nome: </span>
                            <input type="text" value={state1.nome} onChange={(e) => dispatch1({ type: 'add_nome', payload: e.currentTarget.value })}
                                onFocus={() => dispatch2({ type: 'nome_focus' })}
                                onBlur={() => dispatch2({ type: 'nome_error', payload: state1.nome })} />
                        </div>
                        <p style={{ color: 'red' }}>{state2.nome}</p>
                        <div className="inp">
                            <span>E-mail: </span>
                            <input type="text" value={state1.email} onChange={(e) => dispatch1({ type: 'add_email', payload: e.currentTarget.value })}
                                placeholder='exemplo@exemplo.com'
                                onFocus={() => dispatch2({ type: 'email_focus' })}
                                onBlur={() => dispatch2({ type: 'email_error', payload: state1.email })} />
                        </div>
                        <p style={{ color: 'red' }}>{state2.email}</p>
                        <div className="inp">
                            <span>WhatsApp: </span>
                            <InputMask type="text" value={state1.telefone} onChange={(e) => dispatch1({ type: 'add_telefone', payload: e.currentTarget.value })}
                                mask='(99)99999-9999'
                                placeholder='(99)99999-9999'
                                onFocus={() => dispatch2({ type: 'telefone_focus' })}
                                onBlur={() => dispatch2({ type: 'telefone_error', payload: state1.telefone })} />
                        </div>
                        <p style={{ color: 'red' }}>{state2.telefone}</p>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="checkbox1" onClick={() => setTermo(!termo)}
                                onFocus={() => dispatch2({ type: 'termo_focus' })}
                                onBlur={() => dispatch2({ type: 'termo_error', payload: termo })} />
                            <label className="form-check-label" htmlFor="checkbox1">{"Sim, eu autorizo o recebimento de comunicações (WhatsApp, SMS, e-mail e ligação). "} <a href="https://www.ls2.com.br/institucional/politica-de-privacidade">Saiba mais</a> </label>
                            <p style={{ color: 'red' }}>{state2.termo}</p>
                        </div>
                        <ReCAPTCHA
                            sitekey="6LdFppIiAAAAAE-hSrxdRlieakE3PNX8oZwSliaJ"
                            onChange={onChange}
                            ref={reRef} />
                        <p style={{ color: 'red' }}>{state2.recaptcha}</p>
                        <p style={{ color: 'red' }}>{state2.cadastro}</p>
                        <button className="w-100 btn-warning btn-black" onClick={() => submit(state1)}>Enviar</button>
                    </div>
                </div>}
        </div>
    )
}
export default Ls2