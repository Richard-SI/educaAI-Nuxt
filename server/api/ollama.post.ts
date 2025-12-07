export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'phi3',
        prompt: body.prompt,
        stream: false
      })
    })
  
    return await res.json()
  })
  