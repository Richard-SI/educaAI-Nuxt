<template>
  <transition name="chat-fade">
    <div v-if="open" class="chat-container">
      <!-- HEADER -->
      <div class="chat-header">
        <div class="header-info">
          <img src="/educaAI.png" alt="Assistente" class="header-avatar" />
          <div>
            <strong>EducaAI</strong>
            <div class="status">Online agora</div>
          </div>
        </div>
        <button class="close-btn" @click="open = false">✖</button>
      </div>

      <!-- MENSAGENS -->
      <div class="chat-body">
        <div class="assistant-message animate-in">
          👋 Olá! Como posso ajudar você hoje?
        </div>
      </div>

      <!-- RODAPÉ -->
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
import { ref, onMounted, onUnmounted } from "vue"

const open = ref(false)
const message = ref("")

function send() {
  if (!message.value.trim()) return

  alert("Pergunta enviada: " + message.value)
  message.value = ""
}

function openChat() {
  open.value = true
}

onMounted(() => {
  window.addEventListener("assistant-open", openChat)
})

onUnmounted(() => {
  window.removeEventListener("assistant-open", openChat)
})
</script>

<style scoped>

/* ==== TRANSIÇÃO DO CHAT ==== */
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}

.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

/* ==== CONTAINER PRINCIPAL ==== */
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
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
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
  width: 36px;
  height: 36px;
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
.close-btn:hover {
  opacity: 1;
}

/* ==== BODY ==== */
.chat-body {
  padding: 14px;
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.assistant-message {
  background: #f3f4ff;
  color: #333;
  padding: 10px 12px;
  border-radius: 10px;
  max-width: 85%;
  line-height: 1.4;
  border-left: 4px solid #4f46e5;
  animation: fade-in .4s ease both;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
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
