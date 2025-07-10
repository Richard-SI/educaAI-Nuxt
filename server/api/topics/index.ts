// server/api/topics/index.ts
export default defineEventHandler(() => {
    return {
      '1': {
        id: 1,
        title: "Dúvida sobre Redes Neurais Convolucionais",
        content: "Alguém pode me ajudar a entender a arquitetura de uma CNN...",
        author: {
          name: "João Silva",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        postedAt: "Há 30 min",
        replies: Array(5),
        views: 42
      },
      '2': {
        id: 2,
        title: "Discussão: O Futuro da IA na Educação",
        content: "Compartilhe suas opiniões sobre como a IA pode revolucionar...",
        author: {
          name: "Professora Ana",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        postedAt: "Há 2 horas",
        replies: Array(12),
        views: 78
      }
    }
  })