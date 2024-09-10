import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Vamos usar axios para fazer o upload do arquivo
import "./App.css";

const App = () => {
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null); // Referência para o input de arquivo

  // Função para alterar o conteúdo com base na ação
  const changeContent = (acao) => {
    switch (acao) {
      case "acao_inicio":
        setContent(
          <div className="botoes-container">
            <div className="botoes_acao_tela_inicial" onClick={() => fileInputRef.current.click()}>
              <img src="/excel_icon.png" alt="Ícone Excel" className="button-icon" />
              Enviar arquivo .xls
            </div>
            <div className="botoes_acao_tela_inicial">
              <img src="/db_icon.png" alt="Ícone DB" className="button-icon" />
              Ler dados atuais
            </div>
          </div>
        );
        break;
      case "enviar_dados":
        setContent(<p>Aguardando arquivo XLS...</p>); // Pode ser um texto ou outra coisa que você queira mostrar
        break;
      default:
        setContent(<p>Bem-vindo</p>);
        break;
    }
  };

  // Função para lidar com o clique no <h1>
  const handleClick = () => {
    changeContent("acao_inicio");
  };

  // Função para lidar com o upload de arquivo
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".xls")) {
      uploadFile(file); // Enviar o arquivo para o servidor
    } else {
      alert("Por favor, selecione um arquivo .xls");
    }
  };

  // Função para enviar o arquivo para o servidor
  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setContent(<p>Upload realizado com sucesso!</p>);
        console.log(response.data);
      })
      .catch((error) => {
        setContent(<p>Erro ao enviar o arquivo.</p>);
        console.error("Erro no upload do arquivo:", error);
      });
  };

  // Executa handleClick assim que o componente é montado
  useEffect(() => {
    handleClick();
  }, []); // O array vazio significa que o useEffect só é executado uma vez após o primeiro render

  return (
    <div className="app">
      <div className="top-bar">
        <h1 onClick={handleClick}>ECOAR</h1>
      </div>
      <div className="content">
        {/* Aqui o conteúdo muda dinamicamente */}
        {content}
      </div>
      <input
        type="file"
        accept=".xls"
        ref={fileInputRef}
        style={{ display: "none" }} // Oculta o input de arquivo
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default App;
