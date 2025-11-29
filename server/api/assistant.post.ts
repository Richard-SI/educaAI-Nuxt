import { defineEventHandler, readBody } from 'h3'
import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ message: string }>(event)

  if (!body?.message) {
    return { reply: 'Mensagem inválida.' }
  }

  // 🟦 Modo MOCK — não chama API da OpenAI
  if (process.env.USE_MOCK === 'true') {
    return {
      reply: `🤖 (MOCK) Você perguntou: "${body.message}".  
O assistente está em modo de teste sem chamar a OpenAI.`
    }
  }

  // 🟩 Modo REAL — chama a API
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string
  })

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Você é o assistente oficial da plataforma EducAí.
Responda somente dúvidas sobre a plataforma, trilhas, login, aulas e suporte.
Se vier algo fora disso, oriente educadamente o usuário.
`
        },
        { role: "user", content: body.message }
      ]
    })

    return {
      reply: completion.choices[0].message?.content ?? "Não consegui gerar uma resposta."
    }

  } catch (error: any) {
    console.error("Assistant API error:", error)
    return { reply: "Ocorreu um erro ao processar sua solicitação." }
  }
})
