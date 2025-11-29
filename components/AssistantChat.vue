<template>
  <div>
    <!-- botão flutuante (opcional) omitido se você já tem AssistantBot) -->
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <strong>Assistente EducaAI</strong>
        <button @click="close" aria-label="Fechar">✕</button>
      </div>

      <div class="chat-body" ref="bodyRef">
        <div v-for="(m,i) in messages" :key="i" :class="m.role==='user'?'msg-user':'msg-assistant'">
          {{ m.content }}
        </div>
      </div>

      <div class="chat-footer">
        <input v-model="input" @keydown.enter="send" placeholder="Pergunte sobre a plataforma..." />
        <button @click="send">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useFetch } from '#app'

const isOpen = ref(false)
const messages = ref([{ role: 'assistant', content: 'Olá! Sou o assistente EducaAI — pergunte sobre a plataforma.' }])
const input = ref('')
const bodyRef = ref(null)

function open() {
  isOpen.value = true
  nextTick(() => scrollBottom())
}
function close() {
  isOpen.value = false
}
function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) nextTick(() => scrollBottom())
}

function scrollBottom() {
  if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
}

async function send() {
  const text = input.value && input.value.trim()
  if (!text) return
  messages.value.push({ role: 'user', content: text })
  input.value = ''
  scrollBottom()

  try {
    const { data } = await useFetch('/api/assistant', { method: 'POST', body: { message: text } })
    const reply = data?.value?.reply ?? 'Não consegui responder.'
    messages.value.push({ role: 'assistant', content: reply })
    nextTick(() => scrollBottom())
  } catch {
    messages.value.push({ role: 'assistant', content: 'Erro ao conectar com o assistente.' })
    nextTick(() => scrollBottom())
  }
}

// listener client-only
function onToggleEvent() { toggle() }

onMounted(() => {
  window.addEventListener('assistant-toggle', onToggleEvent)
})
onUnmounted(() => {
  window.removeEventListener('assistant-toggle', onToggleEvent)
})
</script>

<style scoped>
.chat-window { position: fixed; right: 1.25rem; bottom: 7.5rem; width: 320px; max-height: 420px; background:#fff; border-radius:12px; box-shadow:0 18px 50px rgba(2,6,23,.18); display:flex; flex-direction:column; overflow:hidden; z-index:10000; }
.chat-header{ display:flex; justify-content:space-between; align-items:center; padding:10px; background:linear-gradient(90deg,#0ea5e9,#3b82f6); color:white }
.chat-body{ padding:12px; overflow-y:auto; flex:1; background:#f8fafc }
.msg-assistant{ background:white; padding:8px 10px; border-radius:10px; margin-bottom:8px; max-width:85% }
.msg-user{ background:#e0f2fe; padding:8px 10px; border-radius:10px; margin-bottom:8px; align-self:flex-end; max-width:85% }
.chat-footer{ display:flex; gap:8px; padding:10px; border-top:1px solid rgba(0,0,0,0.04) }
.chat-footer input{ flex:1; padding:8px 10px; border-radius:8px; border:1px solid rgba(0,0,0,0.06) }
</style>
