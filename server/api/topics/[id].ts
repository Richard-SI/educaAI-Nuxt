// server/api/topics/[id].ts
export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')
    
    // Dados mockados - substitua por sua lógica de banco de dados
    const topics = {
      '1': {
        id: 1,
        title: "Dúvida sobre Redes Neurais Convolucionais",
        content: "Olá pessoal, estou começando meus estudos em redes neurais convolucionais...",
        author: {
          name: "João Silva",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          level: "Iniciante"
        },
        postedAt: "Há 30 min",
        votes: { up: 8, down: 1 },
        replies: [
          {
            id: 1,
            content: "Olá João, vou tentar explicar de forma simples...",
            author: {
              name: "Maria Oliveira",
              avatar: "https://randomuser.me/api/portraits/women/63.jpg",
              level: "Especialista"
            },
            postedAt: "Há 25 min",
            votes: { up: 12, down: 0 }
          }
        ]
      },
      '2': {
        id: 2,
        title: "Discussão: O Futuro da IA na Educação",
        content: "Compartilhe suas opiniões sobre como a IA pode revolucionar...",
        author: {
          name: "Professora Ana",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          level: "Especialista"
        },
        postedAt: "Há 2 horas",
        votes: { up: 24, down: 3 },
        replies: []
      }
    }
  
    return topics[id] || createError({ statusCode: 404, statusMessage: 'Tópico não encontrado' })
  })