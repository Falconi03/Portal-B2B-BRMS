/* eslint-disable max-lines */
export default {
  general: {
    reserved: '© Br Motorsport All Right Reserved 2022',
    brand: 'BR Motorsport - Portal do Cliente',
    emptyString: ' ',
    back: 'Voltar',
    login: 'Login',
    logout: 'Sair',
    loading: 'Carregando...',
  },
  inputs: {
    genericError: 'Por favor, verifique o valor inserido.',
    fieldRequired: 'Este campo é obrigatório.',
    emailError: 'Insira um e-mail válido.',
    validation: {
      getMinChar: (min: number): string => `Esse campo precisa ter no mínimo ${min} caracteres.`,
      getMaxChar: (max: number): string => `Esse campo precisa ter no máximo ${max} caracteres.`,
    },
  },
  dashboard: {
    title: 'Dashboard',
    text: 'Essa é uma informação da API privada: ',
  },
  estoque: {
    title: 'Estoque',
    table: {
      headers: {
        codigo: 'Código',
        descricao: 'Descrição',
        percentual_ipi: 'Percentual Ipi',
        codigo_ncm: 'NCM',
        codigo_barras: 'Código Barras',
        preco: 'Preço',
        preco_sugerido: 'Preço Sugerido',
        saldo: 'Saldo',
      },
    },
  },
  banco: {
    title: 'Banco',
    table: {
      headers: {
        id: 'Id',
        company: 'Companhia',
        branch: 'Filial',
        date: 'Data',
        value: 'Valor',
        record_id: 'Id de Registro',
        checknum: 'Numero de Checagem',
        record_type: 'Tipo de Registro',
        memo: 'Memo',
        administrator: 'Administradora',
        establishment: 'Estabelecimento',
        flag: 'Bandeiras',
        operation_type: 'Tipo de Operação',
        concil_key: 'Chave Concil',
        file: 'Arquivo',
        line: 'Linha',
        date_insert: 'Data de Inserção'
      },
    },
  },
  files: {
    title: 'Arquivos',
    table: {
      headers: {
        id: 'Id',
        name: 'Nome',
      },
    },
  },
  arquivosImportados: {
    title: 'Arquivos importados',
    table: {
      headers: {
        arquivo: 'Arquivo',
        data_importacao: 'Data Importação',
        hr_importacao: 'Hora Importação',
        status: 'Status',
      },
    },
  },
  arquivosImportados2: {
    title: 'Arquivos importados',
    table: {
      headers: {
        arquivo: 'Arquivo',
        data_importacao: 'Data Importação',
        hr_importacao: 'Hora Importação',
        status: 'Status',
        child: 'Child'
      },
    },
  },
  receber: {
    title: 'Receber',
    table: {
      headers: {
        filial: 'Filial',
        cnpj: 'CNPJ',
        nome: 'Nome',
        prefixo: 'Prefixo',
        numero: 'NF',
        parcela: 'Parcela',
        valor: 'Valor',
        saldo: 'Saldo',
        emissao: 'Emissão',
        vencimento: 'Vencimento',
        danfe: 'Danfe',
        xml: 'XML',
        boleto: 'Boleto',
      },
    },
    table2: {
      headers: {
        filial: 'Filial',
        cnpj: 'CNPJ',
        nome: 'Nome',
        prefixo: 'Prefixo',
        numero: 'NF',
        parcela: 'Parcela',
        valor: 'Valor',
        saldo: 'Saldo',
        emissao: 'Emissão',
        vencimento: 'Vencimento',
        baixa: 'Baixa',
        danfe: 'Danfe',
        xml: 'XML',        
      },
    }
  },
  login: {
    title: 'Entrar no sistema',
    form: {
      email: {
        label: 'E-mail',
        placeholder: 'E-mail',
      },
      password: {
        label: 'Senha',
        placeholder: 'Senha',
      },
      submit: 'Entrar',
    },
  },
  resetPassswordRequest: {
    title: 'Esqueci a minha senha',
    subtitle: 'Insira seu e-mail para reconfigurar a sua senha:',
    form: {
      email: {
        label: 'E-mail',
        placeholder: 'E-mail',
      },
      submit: 'Enviar',
    },
    success: 'Um e-mail foi enviado com instruções para reconfigurar a sua senha.',
  },
  resetPassswordChange: {
    title: 'Reconfigurar a senha',
    subtitle: 'Insira abaixo uma nova senha para a sua conta.',
    form: {
      password: {
        label: 'Senha',
        placeholder: 'Senha',
        error:
          'A senha deverá possuir pelo menos um caractere maiúsculo, um minúsculo, um número e um caractere especial.',
      },
      passwordConfirmation: {
        label: 'Confirmar a senha',
        placeholder: 'Confirmar a senha',
        error: 'Insira a mesma senha do campo anterior.',
      },
      submit: 'Salvar a nova senha',
      back: 'Ir para o login',
    },
    success: 'A senha foi reconfigurada com sucesso, realize o login.',
  },
  teste: {
    title: 'Teste',
    table: {
      headers: {
        id: 'Código',
        nome: 'Nome',
        sobrenome: 'Sobrenome',
        cpf: 'CPF',
        endereco: 'Endereço',
        numero: 'Numero',
        cep: 'CEP',
        complemento: 'Complemento',
        company: 'Empresa',
        branch: 'Filial',
      },
    },
  },
  filial: {
    title: 'Filiais',
    table: {
      headers: {
        id: 'Código',
        cnpj: 'CNPJ',
        razao_social: 'Razão Social',
        nome_fantasia: 'Nome Fantasia',
      },
    },
  },
  administradora: {
    title: 'Administradoras',
    table: {
      headers: {
        id: 'Código',
        nome: 'Nome',
      },
    },
  },
  bandeira: {
    title: 'Bandeiras',
    table: {
      headers: {
        id: 'Código',
        nome: 'Nome',
      },
    },
  },
}
