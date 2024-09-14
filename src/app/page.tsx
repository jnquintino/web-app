"use client";

import {useState} from "react";

export default function Home() {
  // Estados para armazenar o texto do input e o resultado
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com a chamada para a API
  const handleAnalyze = async () => {
    setIsLoading(true); // Iniciando o carregamento
    try {
      const response = await fetch('http://localhost:8000/analyze?phrase=' + encodeURIComponent(inputText), {
        method: 'GET',
      });
      if (response.ok) {
        const result = await response.text(); // Pega a resposta como texto (JSON string)
        setOutputText(result); // Define o resultado no estado
      } else {
        setOutputText('Erro ao processar a frase.');
      }
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      setOutputText('Erro ao se conectar com o servidor.');
    }
    setIsLoading(false); // Finalizando o carregamento
  };

    return (
      <div style={{ padding: '20px' }}>
        <h1>Analisador de Texto</h1>
        <div>
          <label htmlFor="inputText">Insira o texto para análise:</label>
          <textarea
              id="inputText"
              rows={10}
              style={{ width: '100%', margin: '10px 0', color: 'black' }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)} // Atualiza o estado com o input
          />
        </div>
        <div>
          <button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? 'Analisando...' : 'Analisar Texto'}
          </button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="outputText">Resultado da Análise:</label>
          <textarea
              id="outputText"
              rows={10}
              style={{ width: '100%', margin: '10px 0', color: 'black' }}
              value={outputText}
              readOnly // Define o textarea como somente leitura
          />
        </div>
      </div>
  );
}
