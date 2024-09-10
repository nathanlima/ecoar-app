import express from 'express';
import { getHistoricoTaxaPoupanca } from './web_data.mjs';
import { runSimulation } from './modelling.mjs';

const app = express();
const port = 3000; // Você pode mudar a porta se desejar

// Simulação e resultados
let results = runSimulation();

// Configuração das rotas do Express
app.get('/sim', (req, res) => {
  res.json(results);
});

app.get('/', (req, res) => {
  res.json("1,0.01;5,0.1;10,0.05");
});

app.get('/taxa', async (req, res) => {
  try {
    const taxas = await getHistoricoTaxaPoupanca(); // Espera a Promise ser resolvida
    let taxas_csv = "";
    let i = 0;
    taxas.forEach(valor => {
        if(i <= 50){
            taxas_csv += `${i},${valor};`;
            i++;
        }
            
    });
    res.json(taxas_csv);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter as taxas' });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
