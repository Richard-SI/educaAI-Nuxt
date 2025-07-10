export const useOllama = () => {
    const sendMessage = async (prompt: string) => {
      try {
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'phi3', // Altere para o modelo que baixou
            prompt,
            stream: false, // Para resposta completa de uma vez
          }),
        })
  
        if (!response.ok) {
          throw new Error('Falha na comunicação com Ollama')
        }
  
        const data = await response.json()
        return data.response
      } catch (error) {
        console.error('Erro ao chamar Ollama:', error)
        return 'Desculpe, ocorreu um erro ao processar sua pergunta.'
      }
    }
  
    return {
      sendMessage,
    }
  }