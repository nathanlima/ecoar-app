import { Model } from "simulation";

// server.js
import express from 'express';
const app = express();
const port = 3000; // Você pode mudar a porta se desejar

let m = new Model({
  timeStart: 0,
  timeLength: 20,
  timeUnits: "Months"
});

// Start with 7 billion people in the "people" stock
let patrimonio = m.Stock({
  name: "Patrimonio",
  initial: 100
});

// Use a net growth rate of 2% a year
let taxa = m.Variable({
  name: "Taxa",
  value: 0.01
});

// The population growth each year is the number of people times the growth rate
// Please note that we refer to the value of other primitives in the model with the
// [name] syntax.
let incremento = m.Flow(null, patrimonio, {
  rate: "[Patrimonio] * [Taxa]"
});

// For the netGrowth flow to be able to reference the growthRate, we need to link the primitives
m.Link(taxa, incremento);

m.simulate()

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





