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
  
      <h1 class="text-2xl font-bold">Dificuldades Comuns</h1>
  
      <!-- GRÁFICO -->
      <div class="bg-white p-6 border rounded">
        <canvas ref="chart"></canvas>
      </div>
  
      <!-- BOTÃO IA -->
      <button
        @click="analisarIA"
        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        🤖 Analisar Dificuldades com IA
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
  import { ref, onMounted } from 'vue'
  import { Chart } from 'chart.js/auto'
  
  const chart = ref(null)
  let chartInstance = null
  const analiseIA = ref('')
  
  /* DADOS FICTÍCIOS DE DIFICULDADES (%) */
  const dificuldades = {
    labels: ['Estatística', 'Redes Neurais', 'Python', 'Machine Learning', 'Banco de Dados'],
    valores: [78, 65, 45, 58, 40]
  }
  
  /* GRÁFICO */
  const renderChart = () => {
    chartInstance = new Chart(chart.value, {
      type: 'bar',
      data: {
        labels: dificuldades.labels,
        datasets: [
          {
            label: '% de Alunos com Dificuldade',
            data: dificuldades.valores
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    })
  }
  
  onMounted(renderChart)
  
  /* ANÁLISE COM OLLAMA */
  const analisarIA = async () => {
    analiseIA.value = 'Analisando dificuldades com a IA...'
  
    const prompt = `
  A seguir está a taxa de dificuldade dos alunos por assunto:
  
  Estatística: 78%
  Redes Neurais: 65%
  Python: 45%
  Machine Learning: 58%
  Banco de Dados: 40%
  
  Gere:
  - Ranking das maiores dificuldades
  - Possíveis causas
  - Recomendações pedagógicas práticas
  - Sugestão de reforços ou atividades
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
  