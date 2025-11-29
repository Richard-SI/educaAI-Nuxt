<template>
  <transition name="fade">
    <div v-if="open" class="chat-box">
      <div class="chat-header">
        Assistente EducaAI
        <button class="close-btn" @click="open = false">✖</button>
      </div>

      <div class="chat-body">
        <p>👋 Olá! Como posso ajudar você no site?</p>
      </div>

      <div class="chat-footer">
        <input
          v-model="message"
          placeholder="Digite sua pergunta..."
          @keyup.enter="send"
        />
        <button @click="send">➤</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
.chat-box {
  position: fixed;
  bottom: 7rem;
  right: 1rem;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  z-index: 99999;
}

.chat-header {
  padding: 10px;
  background: #4f46e5;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  border-radius: 12px 12px 0 0;
}

.chat-body {
  padding: 12px;
  min-height: 80px;
}

.chat-footer {
  padding: 10px;
  display: flex;
  gap: 6px;
}

.chat-footer input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.chat-footer button {
  padding: 6px 10px;
  background: #4f46e5;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>
