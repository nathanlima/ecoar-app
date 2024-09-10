import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getHistoricoTaxaPoupanca() {
    // URL da página que contém a tabela
    const url = 'https://brasilindicadores.com.br/poupanca/';

    try {
        // Faz a requisição HTTP para obter o HTML da página
        const { data } = await axios.get(url);
        
        // Carrega o HTML na instância do cheerio
        const $ = cheerio.load(data);

        // Inicializa um array para armazenar as taxas
        let taxas = [];

        // Seleciona a terceira tabela com a classe "indice-table"
        const tabela = $('.indice-table').eq(2);

        // Seleciona todas as linhas do corpo da tabela
        const linhas = tabela.find('tbody tr');

        linhas.each((index, linha) => {
            // Seleciona todas as células dentro de uma linha, ignorando a primeira (ano) e a última (acumulado no ano)
            const colunas = $(linha).find('td').not(':first-child').not(':last-child');

            // Inicializa uma lista temporária para armazenar as taxas da linha atual
            let taxasLinha = [];

            colunas.each((i, coluna) => {
                const valor = $(coluna).text().trim();
                // Verifica se o valor é uma taxa válida (diferente de '---')
                if (valor !== '---') {
                    // Remove o símbolo de porcentagem e substitui a vírgula por ponto para converter em número
                    const taxaNumerica = parseFloat(valor.replace('%', '').replace(',', '.'));
                    taxasLinha.push(taxaNumerica);
                }
            });

            // Adiciona as taxas da linha atual ao array principal
            taxas = taxas.concat(taxasLinha.reverse());
        });

        // Exibe o array de taxas no console
        console.log(taxas);
        console.log("funcionou");

        return taxas;
    } catch (error) {
        console.error('Erro ao obter as taxas:', error);
        return [];
    }
}
