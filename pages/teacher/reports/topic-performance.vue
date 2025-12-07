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
  
      <h1 class="text-2xl font-bold">Desempenho por Tópico</h1>
  
      <!-- FILTRO -->
      <select v-model="turma" class="border px-3 py-2 rounded">
        <option value="A">Turma A</option>
        <option value="B">Turma B</option>
        <option value="C">Turma C</option>
      </select>
  
      <!-- GRÁFICO -->
      <div class="bg-white p-6 border rounded">
        <canvas ref="chart"></canvas>
      </div>
  
      <!-- BOTÃO IA -->
      <button
        @click="analisarIA"
        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        🤖 Analisar com IA
      </button>
  
      <!-- RESULTADO IA -->
      <div v-if="analiseIA" class="bg-gray-50 border p-4 rounded">
        <strong>Análise da IA:</strong>
        <p class="whitespace-pre-line mt-2">
          {{ analiseIA }}
        </p>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { Chart } from 'chart.js/auto'
  
  const turma = ref('A')
  const chart = ref(null)
  let chartInstance = null
  const analiseIA = ref('')
  
  /* Dados fictícios */
  const dados = {
    A: [85, 70, 90, 60],
    B: [65, 80, 70, 75],
    C: [90, 88, 92, 85]
  }
  
  /* Renderiza gráfico */
  const renderChart = () => {
    if (chartInstance) chartInstance.destroy()
  
    chartInstance = new Chart(chart.value, {
      type: 'bar',
      data: {
        labels: ['IA', 'Python', 'Estatística', 'Redes Neurais'],
        datasets: [{
          label: `Turma ${turma.value}`,
          data: dados[turma.value],
          borderWidth: 1
        }]
      }
    })
  }
  
  onMounted(renderChart)
  watch(turma, renderChart)
  
  /* ANÁLISE COM OLLAMA */
  const analisarIA = async () => {
    analiseIA.value = 'Analisando com a IA...'
  
    const prompt = `
  Analise os dados de desempenho da Turma ${turma.value}:
  ${JSON.stringify(dados[turma.value])}
  Informe:
  - Pontos fortes
  - Pontos fracos
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
  