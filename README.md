# EducaAI - Plataforma de Aprendizado com IA 🤖📚

[![Licença](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Framework](https://img.shields.io/badge/Nuxt-3-green.svg)](https://nuxt.com)
[![LLM](https://img.shields.io/badge/LLM-Llama_3-orange)](https://llama.meta.com)
[![Phi-3](https://img.shields.io/badge/Microsoft-Phi--3-blue)](https://www.microsoft.com/en-us/research/blog/phi-3/)

Plataforma educacional com chat integrado a modelos de IA locais (Llama 3 e Phi-3) para respostas personalizadas.

> **Nota:** Para o chat funcionar, é necessário executar o Llama localmente em outro terminal.

## 🎯 Funcionalidades

- 💬 Chat educacional com IA (usando Llama 3 ou Phi-3 localmente)
- 📚 Geração de conteúdos educacionais
- 🚀 Interface moderna com Nuxt 3
- 🔍 Busca contextualizada
- 🌐 PWA (Progressive Web App)

## ⚙️ Pré-requisitos

- Node.js v18+
- Python 3.10+ (para modelos de IA)
- Ollama (para rodar Llama localmente) - [Instalação](https://ollama.ai/)
- Git

## 🔧 Configuração dos Modelos

- Baixe o modelo Phi-3 (3.8B parâmetros)  -> ollama pull phi3
- Execute o modelo em um terminal -> ollama run phi3

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/Richard-SI/educaAI-Nuxt.git
cd educaAI-Nuxt

