<template>
  <transition name="chat-fade">
    <div v-if="open" class="chat-container">
      
      <!-- HEADER -->
      <div class="chat-header">
        <div class="header-info">
          <img src="/educaAI.png" alt="Assistente" class="header-avatar" />
          <div>
            <strong>Lumi</strong>
            <div class="status">Online agora</div>
          </div>
        </div>
        <button class="close-btn" @click="open = false">✖</button>
      </div>

      <!-- BODY -->
      <div class="chat-body" ref="scrollArea">

        <!-- ⭐ Conversa -->
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="message-wrapper"
          :class="{ user: msg.from === 'user' }"
        >
          <!-- Avatar do bot -->
          <img
            v-if="msg.from === 'bot'"
            src="/educaAI.png"
            alt="Bot avatar"
            class="msg-avatar"
          />

          <div
            class="message-bubble"
            :class="msg.from === 'bot' ? 'assistant-message' : 'user-message'"
          >
            <div>{{ msg.text }}</div>

            <!-- Renderiza botões se houver -->
            <div v-if="msg.type === 'options'" class="quick-suggestions">
              <button v-for="(opt, j) in msg.options" :key="j" @click="sendQuick(opt)">
                {{ opt }}
              </button>
            </div>
          </div>
        </div>

        <!-- ✨ BOT DIGITANDO -->
        <div v-if="typing" class="typing-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>

        <!-- Botão voltar -->
        <div v-if="messages.length > 1" class="back-options">
          <button @click="showSuggestions">
            ⚡ Ver opções novamente
          </button>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="chat-footer">
        <input
          v-model="message"
          placeholder="Digite sua mensagem..."
          @keyup.enter="send"
        />
        <button class="send-btn" @click="send">➤</button>
      </div>

    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue"

const open = ref(false)
const message = ref("")
const typing = ref(false)
const scrollArea = ref(null)

const messages = ref([
  { from: "bot", text: "👋 Olá! eu sou o Lumi. Como posso te ajudar?", type: "options", options: [
      "Como funciona o EducaAI?",
      "Quais cursos existem?",
      "Quais são os planos e preços?",
      "Como falar com suporte?"
  ] }
])

/*
|--------------------------------------------------------------------------
| PERGUNTAS MOCKADAS
|--------------------------------------------------------------------------
*/
const faq = [
  {
    keywords: ["como funciona", "o que é", "explica", "plataforma"],
    answer:
      "O EducaAI é uma plataforma inteligente que ajuda estudantes e professores com ferramentas educacionais, respostas rápidas e conteúdos personalizados."
  },
  {
    keywords: ["curso", "cursos", "materiais", "conteúdo"],
    answer:
      "Você encontra todos os cursos na aba *Catálogo*, com trilhas, PDFs e videoaulas."
  },
  {
    keywords: ["plano", "preço", "valores", "assinatura"],
    answer:
      "Temos três planos disponíveis: Básico, Estudante e Profissional — cada um com benefícios exclusivos."
  },
  {
    keywords: ["suporte", "ajuda", "contato", "atendimento"],
    answer:
      "Nosso suporte funciona de segunda a sexta. Você pode enviar e-mail para suporte@educaai.com."
  }
]

function findMockedAnswer(text) {
  const lower = text.toLowerCase()

  for (const item of faq) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.answer
    }
  }

  return "Desculpe, ainda não aprendi sobre isso. Mas posso te ajudar com cursos, planos, suporte ou informações da plataforma! 😊"
}

/*
|--------------------------------------------------------------------------
| ENVIO DE MENSAGENS
|--------------------------------------------------------------------------
*/
function send() {
  if (!message.value.trim()) return

  const userText = message.value
  message.value = ""

  messages.value.push({ from: "user", text: userText })
  scrollDown()

  simulateBotReply(userText)
}

function sendQuick(text) {
  messages.value.push({ from: "user", text })
  scrollDown()
  simulateBotReply(text)
}

/*
|--------------------------------------------------------------------------
| RESPOSTA SIMULADA DO BOT + DIGITAÇÃO
|--------------------------------------------------------------------------
*/
function simulateBotReply(userText) {
  typing.value = true
  scrollDown()

  const response = findMockedAnswer(userText)

  setTimeout(() => {
    typing.value = false
    messages.value.push({ from: "bot", text: response })
    scrollDown()
  }, 1200)
}

/*
|--------------------------------------------------------------------------
| MOSTRAR SUGESTÕES NOVAMENTE
|--------------------------------------------------------------------------
*/
function showSuggestions() {
  messages.value.push({
    from: "bot",
    type: "options",
    text: "Claro! Aqui estão algumas opções que posso ajudar novamente 👇",
    options: [
      "Como funciona o EducaAI?",
      "Quais cursos existem?",
      "Quais são os planos e preços?",
      "Como falar com suporte?"
    ]
  })
  scrollDown()
}

/*
|--------------------------------------------------------------------------
| ABRIR VIA EVENTO GLOBAL
|--------------------------------------------------------------------------
*/
function openChat() {
  open.value = true
  nextTick(scrollDown)
}

function scrollDown() {
  nextTick(() => {
    if (scrollArea.value) {
      scrollArea.value.scrollTop = scrollArea.value.scrollHeight
    }
  })
}

onMounted(() => {
  window.addEventListener("assistant-open", openChat)
})

onUnmounted(() => {
  window.removeEventListener("assistant-open", openChat)
})
</script>

<style scoped>
/* ==== TRANSIÇÃO ==== */
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}
.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

/* ==== CONTAINER ==== */
.chat-container {
  position: fixed;
  bottom: 8rem;
  right: 1.5rem;
  width: 330px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 8px 26px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 99999;
  animation: popup-in .25s ease forwards;
}

@keyframes popup-in {
  from { opacity: 0; transform: translateY(15px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ==== HEADER ==== */
.chat-header {
  background: #4f46e5;
  color: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  background: white;
}

.status {
  font-size: 11px;
  opacity: 0.85;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity .2s;
}
.close-btn:hover { opacity: 1; }

/* ==== BODY ==== */
.chat-body {
  padding: 14px;
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ==== Sugestões rápidas (botões dentro da mensagem) ==== */
.quick-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.quick-suggestions button {
  border: 1px solid #4f46e5;
  background: white;
  color: #4f46e5;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all .2s;
}

.quick-suggestions button:hover {
  background: #4f46e5;
  color: white;
}

/* ==== Mensagens ==== */
.message-wrapper {
  display: flex;
  animation: fade-in .35s ease both;
}

.message-wrapper.user {
  justify-content: flex-end;
}

.msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 6px;
  align-self: flex-start;
  animation: fade-in .35s ease both;
}

.message-bubble {
  padding: 10px 12px;
  border-radius: 10px;
  max-width: 85%;
  line-height: 1.4;
}

.assistant-message {
  background: #f3f4ff;
  border-left: 4px solid #4f46e5;
}

.user-message {
  background: #e9e9e9;
  border-right: 4px solid #aaa;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ==== BOT DIGITANDO ==== */
.typing-indicator {
  display: inline-flex;
  gap: 4px;
  padding: 8px 14px;
  background: #eee;
  border-radius: 20px;
  width: fit-content;
  margin-left: 6px;
  animation: fade-in .4s ease both;
}

.dot {
  width: 6px;
  height: 6px;
  background: #666;
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}

.dot:nth-child(2) { animation-delay: .2s }
.dot:nth-child(3) { animation-delay: .4s }

@keyframes blink {
  0%   { opacity: 0.2 }
  50%  { opacity: 1 }
  100% { opacity: 0.2 }
}

/* ==== Botão voltar ==== */
.back-options {
  text-align: center;
  margin: 4px 0 8px;
}

.back-options button {
  background: #f4f4ff;
  color: #4f46e5;
  border: 1px solid #dcdcff;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: .2s;
}

.back-options button:hover {
  background: #e6e6ff;
}

/* ==== FOOTER ==== */
.chat-footer {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-top: 1px solid #eee;
}

.chat-footer input {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border .25s, box-shadow .25s;
}

.chat-footer input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
}

.send-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 9px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: transform .2s ease, background .2s;
}

.send-btn:hover {
  transform: translateY(-2px);
  background: #3f3acd;
}

.send-btn:active {
  transform: scale(0.95);
}
</style>
