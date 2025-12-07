export default defineEventHandler(async (event) => {
    try {
      const body = await readBody(event)
      // TODO: salvar no DB real
      return { ok: true, id: Math.floor(Math.random() * 100000), saved: body }
    } catch (err) {
      console.error('server/api/content error', err)
      return createError({ statusCode: 500, statusMessage: 'Erro interno' })
    }
  })
  