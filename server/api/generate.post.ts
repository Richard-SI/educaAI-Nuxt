export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const prompt = `
Você é um professor experiente. Crie um recurso educacional didático:

Título: ${body.title}
Tipo: ${body.type || 'texto'}
Tema/Palavras-chave: ${body.theme}
Duração estimada: ${body.duration || '-'}
Descrição: ${body.description || '-'}

Estruture em:
- Introdução curta
- Tópicos explicados
- Passos práticos
- 2 exercícios com respostas

Retorne apenas o conteúdo pronto.
  `

  try {
    const response = await $fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: {
        model: 'llama3', // pode trocar se usar outro modelo
        prompt,
        stream: false
      }
    })

    return {
      ok: true,
      text: response.response
    }
  } catch (err) {
    console.error('Erro ao chamar Ollama:', err)

    return {
      ok: false,
      error: 'Erro ao conectar ao Ollama local'
    }
  }
})
