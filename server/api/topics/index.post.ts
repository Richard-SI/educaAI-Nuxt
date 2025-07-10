export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    // Validação básica
    if (!body.title || !body.category || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Título, categoria e conteúdo são obrigatórios'
      })
    }
    
    // Simulação de criação no banco de dados
    const newTopic = {
      id: Date.now().toString(),
      title: body.title,
      category: body.category,
      content: body.content,
      tags: body.tags || [],
      author: {
        name: "Usuário Logado", // Substituir por dados reais do usuário
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        level: "Membro"
      },
      postedAt: new Date().toISOString(),
      votes: {
        up: 0,
        down: 0
      },
      replies: [],
      views: 0
    }
    
    // Aqui você normalmente salvaria no banco de dados
    // db.topics.insert(newTopic)
    
    return newTopic
  })