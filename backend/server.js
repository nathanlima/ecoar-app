// server.js
const express = require('express');
const app = express();
const port = 3000; // Você pode mudar a porta se desejar

// Aqui estamos assumindo que 'simulation' é um módulo fictício
// Substitua por pacotes reais ou configure o módulo corretamente
const m = require('simulation');
const { table, plot } = require('simulation-viz-console');

// Configuração do modelo
// Start with 7 billion people in the "people" stock
let people = m.Stock({
  name: "People",
  initial: 7e9
});

// Use a net growth rate of 2% a year
let growthRate = m.Variable({
  name: "Growth Rate",
  value: 0.02
});

// The population growth each year is the number of people times the growth rate
let netGrowth = m.Flow(null, people, {
  rate: "[People] * [Growth Rate]"
});

// For the netGrowth flow to be able to reference the growthRate, we need to link the primitives
m.Link(growthRate, netGrowth);

// Simula o modelo
let results = m.simulate();

// Configuração das rotas do Express
app.get('/sim', (req, res) => {
  res.json(results);
});

app.get('/', (req, res) => {
  res.json("1,0.01;5,0.1;10,0.05");
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

