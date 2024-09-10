import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import xlsx from 'xlsx';
import { fileURLToPath } from 'url';

// Necessário para ESM (módulos)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Habilita o CORS para todas as origens
app.use(cors());

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo
  }
});

// Filtro para garantir que apenas arquivos .xls sejam aceitos
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/vnd.ms-excel' ||
    file.originalname.endsWith('.xls') ||
    file.originalname.endsWith('.xlsx')
  ) {
    cb(null, true); // Aceitar o arquivo
  } else {
    cb(new Error('Por favor, envie um arquivo Excel (.xls ou .xlsx)'), false); // Rejeitar o arquivo
  }
};

// Inicializa o multer com as configurações definidas
const upload = multer({ storage: storage, fileFilter: fileFilter });

var colunaB = [];
var colunaC = [];
var colunaE = [];
var colunaF = [];
var colunaH = [];
var colunaI = [];
var colunaK = [];
var colunaL = [];
var colunaN = [];
var colunaO = [];
var colunaQ = [];
var colunaR = [];
var colunaT = [];
var colunaU = [];
var colunaW = [];
var colunaX = [];
var colunaZ = [];
var colunaAA = [];

// Endpoint para receber o arquivo Excel e processá-lo
app.post('/uploadFile', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  // Caminho do arquivo recebido
  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  try {
    // Lê o arquivo Excel
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Considerando que o dado está na primeira aba
    const sheet = workbook.Sheets[sheetName];

    // Converte a planilha em JSON para facilitar a manipulação
    const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Arrays para armazenar as colunas B, C, E, F, H, I
    colunaB = [];
    colunaC = [];
    colunaE = [];
    colunaF = [];
    colunaH = [];
    colunaI = [];
    colunaK = [];
    colunaL = [];
    colunaN = [];
    colunaO = [];
    colunaQ = [];
    colunaR = [];
    colunaT = [];
    colunaU = [];
    colunaW = [];
    colunaX = [];
    colunaZ = [];
    colunaAA = [];

    // Itera sobre as linhas do arquivo Excel (começando na linha 2 para ignorar o cabeçalho)
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      colunaB.push(row[0]); // Coluna B (índice 1)
      colunaC.push(row[1]); // Coluna C (índice 2)
      colunaE.push(row[3]); // Coluna E (índice 4)
      colunaF.push(row[4]); // Coluna F (índice 5)
      colunaH.push(row[6]); // Coluna H (índice 7)
      colunaI.push(row[7]); // Coluna I (índice 8)
      colunaK.push(row[9]);
      colunaL.push(row[10]);
      colunaN.push(row[12]);
      colunaO.push(row[13]);
      colunaQ.push(row[15]);
      colunaR.push(row[16]);
      colunaT.push(row[18]);
      colunaU.push(row[19]);
      colunaW.push(row[21]);
      colunaX.push(row[22]);
      colunaZ.push(row[24]);
      colunaAA.push(row[25]);
    }

    // Exemplo: Responder com os arrays extraídos
    res.json({
      colunaB,
      colunaC,
      colunaE,
      colunaF,
      colunaH,
      colunaI,
      colunaK,
      colunaL,
      colunaN,
      colunaO,
      colunaQ,
      colunaR,
      colunaT,
      colunaU,
      colunaW,
      colunaX,
      colunaZ,
      colunaAA
    });
  } catch (error) {
    console.error('Erro ao processar o arquivo Excel:', error);
    res.status(500).send('Erro ao processar o arquivo.');
  }
});
app.get('/getParticipantesAtivos', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaB[i]},${colunaC[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });

  app.get('/getParticipantesCadastrados', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaE[i]},${colunaF[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });


  app.get('/getColetaPet', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaH[i]},${colunaI[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });


  app.get('/getColetaVidro', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaK[i]},${colunaL[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });


  app.get('/getColetaAluminio', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaN[i]},${colunaO[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });


  app.get('/getColetaPapel', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaQ[i]},${colunaR[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });


  app.get('/getColetaSacola', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaT[i]},${colunaU[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });


  app.get('/getRejeitos', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaW[i]},${colunaX[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });


  app.get('/getTotalResiduos', (req, res) => {
    let retorno = '';
  
    for (let i = 0; i < colunaB.length; i++) {
      retorno += `${colunaZ[i]},${colunaAA[i]};`;
    }
  
    // Remove o último ponto-e-vírgula
    if (retorno.endsWith(';')) {
      retorno = retorno.slice(0, -1);
    }
  
    res.json(retorno);
  });

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
