import React from "react"
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

interface Pedido {
    id: number,
    date_update:string,
    itens:{
        descricao: string,
        preco:string,
        quantidade: number
    }[],
    status:string
}

interface User{
    email:string,
    last_name:string
}

const PedidosPdf = (pedido:Pedido, user:User) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let total = 0
    const fileName = pedido.status === 'orcamento' ? `Orçamento_${pedido.id}` : `Pedido_${pedido.id}`


    const produtos = pedido.itens.map((produto) => {
        total += Number(produto.preco) * produto.quantidade
        return [
            { text: produto.descricao, fontSize: 8 },
            { text: `R$ ${String((+produto.preco).toFixed(2)).replace('.', ',')}`, fontSize: 8, alignment: 'center' },
            { text: `${produto.quantidade} Un`, fontSize: 8, alignment: 'center' },
            { text: `R$ ${String((+produto.preco * produto.quantidade).toFixed(2)).replace('.', ',')}`, fontSize: 8, alignment: 'center' },
        ]
    })

    const pdfHeader = [{}]

    const PdfContent = [
        {
            table: {
                headerRows: 4,
                widths: ['*', 'auto', 'auto', 'auto'],
                body: [
                    [{ text: [{ text: 'BR MOTORSPORT – B2B', bold: true }, `\nOrçamento Nº ${pedido.id}`], colSpan: 4, alignment: 'center', style: 'tableHeader' }, {}, {}, {}],
                    [{ text: [{ text: 'Representada: ', bold: true }, 'BR MOTORSPORT – B2B / BR Motorsport Comercio Importação e Exportação LTDA'], colSpan: 4 }, {}, {}, {}],
                    [{ text: [{ text: 'Cliente: ', bold: true }, user.last_name,{ text: '\nE-mail: ', bold: true }, user.email], colSpan: 4,margin:[0,5,0,5] }, {}, {}, {}],
                    [
                        { text: 'PRODUTO', style: 'tableHeader', fontSize: 9, bold: true },
                        { text: 'PREÇO', style: 'tableHeader', fontSize: 9, bold: true, alignment: 'center' },
                        { text: 'QUANTIDADE', style: 'tableHeader', fontSize: 9, bold: true, alignment: 'center' },
                        { text: 'SUBTOTAL', style: 'tableHeader', fontSize: 9, bold: true, alignment: 'center' },
                    ],
                    ...produtos,
                    [{
                        text: `Valor total: R$ ${String((total).toFixed(2)).replace('.', ',')}`,
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        colSpan:4
                    },{},{},{}],
                    [{
                        text: [{text: 'Status:', bold: true}, `\n ${pedido.status === 'orcamento' ? 'Orçamento' : 'Finalizado'}`],
                        fontSize: 10,
                        colSpan:2
                    },{},{
                        text: [ {text:'Data/Hora:',bold: true}, `\n ${new Date(pedido.date_update).toLocaleString()}`],
                        fontSize: 10,                        
                        colSpan:2
                    },{}],
                    [{
                        heights:20,
                        text:'',
                        colSpan:4,
                        margin:[0,10,0,0]
                    },{},{},{}],


                ]
            },
            layout: {
                hLineWidth: function (i:number, node:{table:{body:[]}}) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                },
                vLineWidth: function (i:number, node:{table:{widths:[]}}) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: function (i:number, node:{table:{body:[]}}) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                },
                vLineColor: function (i:number, node:{table:{widths:[]}}) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },
                // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                // paddingLeft: function(i, node) { return 4; },
                // paddingRight: function(i, node) { return 4; },
                // paddingTop: function(i, node) { return 2; },
                // paddingBottom: function(i, node) { return 2; },
                // fillColor: function (rowIndex, node, columnIndex) { return null; }
            },


        }
    ]

    function pdfFooter(currentPage:number, pageCount:number) {
        return [
            {
                text: `Pagina ${currentPage} / ${pageCount}`,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const pdfDoc = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [pdfHeader],
        content: [PdfContent],
        footer: pdfFooter
    }

    pdfMake.createPdf(pdfDoc).download(fileName)

}
export default PedidosPdf