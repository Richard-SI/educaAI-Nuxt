<template>
    <div class="max-w-6xl mx-auto p-6 space-y-6">
  
      <!-- BOTÃO VOLTAR -->
      <NuxtLink
        to="/teacher"
        class="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
      >
        <i class="fas fa-arrow-left"></i>
        Voltar ao Painel
      </NuxtLink>
  
      <h1 class="text-2xl font-bold">Comparativo de Turmas</h1>
  
      <!-- GRÁFICO -->
      <div class="bg-white p-6 border rounded">
        <canvas ref="chart"></canvas>
      </div>
  
      <!-- BOTÃO IA -->
      <button
        @click="analisarIA"
        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        🤖 Análise Comparativa com IA
      </button>
  
      <!-- RESULTADO IA -->
      <div v-if="analiseIA" class="bg-gray-50 border p-4 rounded">
        <strong>Resumo IA:</strong>
        <p class="whitespace-pre-line mt-2">
          {{ analiseIA }}
        </p>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Chart } from 'chart.js/auto'
  
  const chart = ref(null)
  let chartInstance = null
  const analiseIA = ref('')
  
  /* Renderiza gráfico */
  const renderChart = () => {
    chartInstance = new Chart(chart.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr'],
        datasets: [
          { label: 'Turma A', data: [70, 80, 85, 90] },
          { label: 'Turma B', data: [60, 75, 78, 82] },
          { label: 'Turma C', data: [85, 88, 90, 95] }
        ]
      }
    })
  }
  
  onMounted(renderChart)
  
  /* ANÁLISE COM OLLAMA */
  const analisarIA = async () => {
    analiseIA.value = 'Analisando com a IA...'
  
    const prompt = `
  Compare o desempenho das turmas com base nos dados:
  Turma A: 70, 80, 85, 90
  Turma B: 60, 75, 78, 82
  Turma C: 85, 88, 90, 95
  
  Gere:
  - Ranking das turmas
  - Pontos fortes
  - Pontos de melhoria
  - Recomendações pedagógicas
    `
  
    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'phi3',
          prompt,
          stream: false
        })
      })
  
      const data = await res.json()
      analiseIA.value = data.response || 'IA não retornou resposta.'
    } catch (err) {
      console.error(err)
      analiseIA.value = 'Erro ao conectar com a IA.'
    }
  }
  </script>
  