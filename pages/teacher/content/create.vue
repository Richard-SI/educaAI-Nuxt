<template>
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-2xl md:text-3xl font-bold mb-4">Adicionar novo recurso educacional</h1>
  
      <div class="bg-white border rounded-lg shadow-sm p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Título</label>
          <input v-model="form.title" type="text" class="w-full border px-3 py-2 rounded" placeholder="Ex: Introdução à IA" />
        </div>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Tipo</label>
            <select v-model="form.type" class="w-full border px-3 py-2 rounded">
              <option value="">Selecione</option>
              <option value="video">Vídeo</option>
              <option value="texto">Texto</option>
              <option value="atividade">Atividade</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">Duração estimada</label>
            <input v-model="form.duration" type="text" class="w-full border px-3 py-2 rounded" placeholder="Ex: 15 min" />
          </div>
        </div>
  
        <div>
          <label class="block text-sm font-medium mb-1">Tema / Palavras-chave</label>
          <input v-model="form.theme" type="text" class="w-full border px-3 py-2 rounded" placeholder="Ex: Machine Learning, regressão" />
        </div>
  
        <div>
          <label class="block text-sm font-medium mb-1">Descrição (excerto)</label>
          <textarea v-model="form.description" rows="4" class="w-full border px-3 py-2 rounded" placeholder="Breve descrição para o resumo do conteúdo"></textarea>
        </div>
  
        <div class="flex gap-3 items-center">
          <button
            @click="generateWithAI"
            :disabled="loadingAI || !form.title || !form.theme"
            class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            <span v-if="loadingAI">🤖 Gerando…</span>
            <span v-else>🤖 Gerar com IA</span>
          </button>
  
          <button
            @click="saveContent"
            :disabled="saving"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            <span v-if="saving">💾 Salvando…</span>
            <span v-else>💾 Salvar Recurso</span>
          </button>
  
          <NuxtLink to="/teacher" class="ml-auto text-sm text-gray-600 hover:underline">Voltar</NuxtLink>
        </div>
  
        <div v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</div>
  
        <div v-if="form.generatedContent" class="bg-gray-50 border rounded p-4">
          <h3 class="font-semibold mb-2">Conteúdo gerado</h3>
          <pre class="whitespace-pre-wrap text-sm">{{ form.generatedContent }}</pre>
        </div>
  
        <div v-if="saveSuccess" class="text-sm text-green-600">Conteúdo salvo com sucesso! ✅</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    title: '',
    type: '',
    duration: '',
    theme: '',
    description: '',
    generatedContent: ''
  })
  
  const loadingAI = ref(false)
  const saving = ref(false)
  const saveSuccess = ref(false)
  const errorMessage = ref('')
  
  /* Helper: tenta pegar useOllama (se tiver) */
  let sendMessageComposable = null
  try {
    const maybe = useOllama?.()
    if (maybe && typeof maybe.sendMessage === 'function') {
      sendMessageComposable = maybe.sendMessage
    }
  } catch (e) {
    // ignore
  }
  
  /**
   * Geração IA (robusta)
   * 1) se existe sendMessageComposable -> usa (composable client)
   * 2) senão, chama endpoint /api/ai/generate (server)
   * 3) se endpoint falhar, gera fallback local
   */
  const generateWithAI = async () => {
    if (!form.value.title || !form.value.theme) {
      errorMessage.value = 'Preencha título e tema para gerar com a IA.'
      return
    }
    errorMessage.value = ''
    loadingAI.value = true
    saveSuccess.value = false
  
    try {
      // 1) client composable
      if (sendMessageComposable) {
        console.log('[AI] usando useOllama.sendMessage')
        const prompt = buildPrompt()
        const resp = await sendMessageComposable(prompt)
        form.value.generatedContent = normalizeResponse(resp)
        loadingAI.value = false
        return
      }
  
      // 2) server proxy
      console.log('[AI] chamando /api/ai/generate')
      const payload = {
        title: form.value.title,
        type: form.value.type,
        duration: form.value.duration,
        theme: form.value.theme,
        description: form.value.description
      }
  
      const res = await $fetch('/api/ai/generate', {
        method: 'POST',
        body: payload
      })
  
      if (res?.ok && res?.text) {
        form.value.generatedContent = res.text
        loadingAI.value = false
        return
      } else {
        console.warn('[AI] resposta inesperada do servidor', res)
        // fallback para local
        form.value.generatedContent = fallbackDraft()
        loadingAI.value = false
        return
      }
    } catch (err) {
      console.error('[AI] erro gerar', err)
      // fallback: gerar rascunho local para não deixar em branco
      form.value.generatedContent = fallbackDraft()
      errorMessage.value = 'Erro ao gerar com a IA. Foi gerado um rascunho local.'
    } finally {
      loadingAI.value = false
    }
  }
  
  const buildPrompt = () => {
    return `Você é um professor experiente. Crie um recurso educacional didático:
  Título: ${form.value.title}
  Tipo: ${form.value.type || 'texto'}
  Tema/Palavras-chave: ${form.value.theme}
  Duração estimada: ${form.value.duration || '-'}
  Descrição: ${form.value.description || '-'}
  
  Estruture em: introdução curta, tópicos com explicações, passos práticos e 2 exercícios com respostas.
  Retorne apenas o texto do recurso.`
  }
  
  const normalizeResponse = (r) => {
    if (!r) return ''
    if (typeof r === 'string') return r
    // se retornar objeto (possível com alguns composables), tente extrair
    if (r.text) return r.text
    return JSON.stringify(r)
  }
  
  const fallbackDraft = () => {
    return `RASCUNHO: ${form.value.title}\nTema: ${form.value.theme}\n\nDescrição: ${form.value.description || '-'}\n\nTópicos:\n1) Introdução ao tema...\n2) Conceitos importantes...\n\nExercícios:\n1) Pergunta exemplo — Resposta: ...\n2) Pergunta exemplo — Resposta: ...`
  }
  
  /* saveContent continua chamando /api/content (mock) */
  const saveContent = async () => {
    if (!form.value.title) {
      errorMessage.value = 'Título é obrigatório.'
      return
    }
    saving.value = true
    errorMessage.value = ''
    saveSuccess.value = false
  
    try {
      const payload = {
        title: form.value.title,
        type: form.value.type,
        duration: form.value.duration,
        theme: form.value.theme,
        description: form.value.description,
        content: form.value.generatedContent
      }
      const res = await $fetch('/api/content', {
        method: 'POST',
        body: payload
      })
      if (res?.ok) {
        saveSuccess.value = true
      } else {
        throw new Error(res?.error || 'Resposta inesperada do servidor')
      }
    } catch (err) {
      console.error('Erro salvar', err)
      errorMessage.value = err?.message || String(err)
    } finally {
      saving.value = false
    }
  }
  </script>
  
  <style scoped>
  /* estilos leves */
  </style>
  