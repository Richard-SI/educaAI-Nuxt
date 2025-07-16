<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <div
            class="fixed inset-y-0 left-0 w-64 bg-blue-800 text-white transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out z-50">
            <div class="flex items-center justify-center h-16 px-4 bg-blue-900">
                <span class="text-xl font-bold">Painel Admin</span>
            </div>
            <nav class="mt-5">
                <div class="px-4 py-2 text-blue-200 uppercase text-xs font-semibold">Menu Principal</div>
                <NuxtLink to="/admin" class="flex items-center px-4 py-3 text-white bg-blue-700">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                        </path>
                    </svg>
                    Dashboard
                </NuxtLink>

                <button @click="toggleUserMenu"
                    class="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-blue-700">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                            </path>
                        </svg>
                        Gestão de Usuários
                    </div>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                <div v-show="userMenuOpen" class="bg-blue-900">
                    <NuxtLink to="/admin/users/admins"
                        class="block px-4 py-2 pl-12 text-sm text-white hover:bg-blue-800">Administradores</NuxtLink>
                    <NuxtLink to="/admin/users/teachers"
                        class="block px-4 py-2 pl-12 text-sm text-white hover:bg-blue-800">Professores</NuxtLink>
                    <NuxtLink to="/admin/users/students"
                        class="block px-4 py-2 pl-12 text-sm text-white hover:bg-blue-800">Alunos</NuxtLink>
                </div>

                <NuxtLink to="/admin/content" class="flex items-center px-4 py-3 text-white hover:bg-blue-700">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                    Conteúdos Educacionais
                </NuxtLink>

                <NuxtLink to="/admin/settings" class="flex items-center px-4 py-3 text-white hover:bg-blue-700">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Configurações do Sistema
                </NuxtLink>

                <NuxtLink to="/admin/metrics" class="flex items-center px-4 py-3 text-white hover:bg-blue-700">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                    Métricas da Plataforma
                </NuxtLink>
            </nav>
        </div>

        <!-- Mobile sidebar backdrop -->
        <div v-show="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-40 bg-black opacity-50 md:hidden">
        </div>

        <!-- Main content -->
        <div class="md:ml-64">
            <!-- Top navbar -->
            <header class="bg-white shadow">
                <div class="flex items-center justify-between h-16 px-4">
                    <button @click="sidebarOpen = !sidebarOpen" class="md:hidden text-gray-500 focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>

                    <div class="flex items-center space-x-4">
                        <button class="text-gray-500 focus:outline-none">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                                </path>
                            </svg>
                        </button>

                        <div class="relative">
                            <button @click="profileMenuOpen = !profileMenuOpen"
                                class="flex items-center space-x-2 focus:outline-none">
                                <img class="w-8 h-8 rounded-full object-cover" src="https://randomuser.me/api/portraits/men/11.jpg"
                                    alt="Avatar do usuário">
                                <span class="hidden md:inline">Admin</span>
                            </button>

                            <div v-show="profileMenuOpen" @click.away="profileMenuOpen = false"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meu
                                    Perfil</a>
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configurações</a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page content -->
            <main class="p-6">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">Painel de Administração</h1>
                    <p class="text-gray-600">Gerencie todos os aspectos da plataforma educacional</p>
                </div>

                <!-- Stats cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500">Total de Usuários</p>
                                <h3 class="text-2xl font-bold">1,254</h3>
                                <p class="text-green-500 text-sm">+12% desde o último mês</p>
                            </div>
                            <div class="bg-blue-100 p-3 rounded-full">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500">Conteúdos Publicados</p>
                                <h3 class="text-2xl font-bold">324</h3>
                                <p class="text-green-500 text-sm">+8 novos esta semana</p>
                            </div>
                            <div class="bg-green-100 p-3 rounded-full">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500">Atividade Recente</p>
                                <h3 class="text-2xl font-bold">1,482</h3>
                                <p class="text-green-500 text-sm">+23% desde ontem</p>
                            </div>
                            <div class="bg-yellow-100 p-3 rounded-full">
                                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500">Taxa de Engajamento</p>
                                <h3 class="text-2xl font-bold">78%</h3>
                                <p class="text-red-500 text-sm">-2% desde a última semana</p>
                            </div>
                            <div class="bg-purple-100 p-3 rounded-full">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main sections -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Recent users -->
                    <div class="lg:col-span-2 bg-white rounded-lg shadow">
                        <div class="p-6 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-800">Últimos Usuários Cadastrados</h2>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nome</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tipo</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Data</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ações</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="user in recentUsers" :key="user.id">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10">
                                                    <img class="h-10 w-10 rounded-full" :src="user.avatar"
                                                        :alt="user.name">
                                                </div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                                                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUserTypeClass(user.type)}`">
                                                {{ user.type }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.date }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`">
                                                {{ user.status }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button class="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                                            <button class="text-red-600 hover:text-red-900">Remover</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="p-4 border-t border-gray-200">
                            <NuxtLink to="/admin/users" class="text-blue-600 hover:text-blue-800 font-medium">Ver todos
                                os usuários</NuxtLink>
                        </div>
                    </div>

                    <!-- Quick actions -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="p-6 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-800">Ações Rápidas</h2>
                        </div>
                        <div class="p-6">
                            <button @click="showUserModal = true"
                                class="w-full flex items-center justify-between px-4 py-3 mb-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                <span>Adicionar Novo Usuário</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </button>

                            <button @click="showContentModal = true"
                                class="w-full flex items-center justify-between px-4 py-3 mb-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                <span>Criar Novo Conteúdo</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </button>

                            <button @click="showAnnouncementModal = true"
                                class="w-full flex items-center justify-between px-4 py-3 mb-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                                <span>Publicar Anúncio</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z">
                                    </path>
                                </svg>
                            </button>

                            <button @click="showReportModal = true"
                                class="w-full flex items-center justify-between px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                                <span>Gerar Relatório</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Recent content -->
                <div class="mt-6 bg-white rounded-lg shadow">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h2 class="text-lg font-semibold text-gray-800">Conteúdos Recentes</h2>
                            <NuxtLink to="/admin/content" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                Ver todos</NuxtLink>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Título</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Autor</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Categoria</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Data</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Visualizações</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="content in recentContent" :key="content.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ content.title }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ content.author }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {{ content.category }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ content.date }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ content.views }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                                        <button class="text-red-600 hover:text-red-900">Remover</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Metrics overview -->
                <div class="mt-6 bg-white rounded-lg shadow">
                    <div class="p-6 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-800">Métricas da Plataforma</h2>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 class="text-md font-medium text-gray-800 mb-4">Uso da Plataforma (Últimos 7 dias)
                                </h3>
                                <div class="h-64">
                                    <ChartUsoPlataforma :chart-data="usageData" />
                                </div>
                            </div>

                            <div>
                                <h3 class="text-md font-medium text-gray-800 mb-4">Distribuição de Usuários</h3>
                                <div class="h-64">
                                    <DoughnutChart :chart-data="userDistributionData" />
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-medium text-gray-700 mb-2">Taxa de Retenção</h4>
                                <div class="flex items-center">
                                    <div class="text-3xl font-bold text-blue-600 mr-3">78%</div>
                                    <div class="text-sm">
                                        <span class="text-green-600">↑ 5%</span> desde o mês passado
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-medium text-gray-700 mb-2">Tempo Médio de Sessão</h4>
                                <div class="flex items-center">
                                    <div class="text-3xl font-bold text-green-600 mr-3">24min</div>
                                    <div class="text-sm">
                                        <span class="text-green-600">↑ 2min</span> desde a semana passada
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-medium text-gray-700 mb-2">Conteúdos Concluídos</h4>
                                <div class="flex items-center">
                                    <div class="text-3xl font-bold text-purple-600 mr-3">1,245</div>
                                    <div class="text-sm">
                                        <span class="text-green-600">↑ 18%</span> desde ontem
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6">
                            <button
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                                Exportar Dados Completos
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- Modals -->
        <!-- Add User Modal -->
        <div v-if="showUserModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                    </path>
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Adicionar Novo Usuário</h3>
                                <div class="mt-2">
                                    <form class="space-y-4">
                                        <div>
                                            <label for="user-type" class="block text-sm font-medium text-gray-700">Tipo
                                                de Usuário</label>
                                            <select id="user-type"
                                                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                                <option>Administrador</option>
                                                <option>Professor</option>
                                                <option>Aluno</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="user-name" class="block text-sm font-medium text-gray-700">Nome
                                                Completo</label>
                                            <input type="text" id="user-name"
                                                class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                        </div>
                                        <div>
                                            <label for="user-email"
                                                class="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" id="user-email"
                                                class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                        </div>
                                        <div>
                                            <label for="user-password"
                                                class="block text-sm font-medium text-gray-700">Senha Temporária</label>
                                            <input type="password" id="user-password"
                                                class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Salvar
                        </button>
                        <button @click="showUserModal = false" type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Content Modal -->
        <div v-if="showContentModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Criar Novo Conteúdo</h3>
                                <div class="mt-2">
                                    <form class="space-y-4">
                                        <div>
                                            <label for="content-title"
                                                class="block text-sm font-medium text-gray-700">Título</label>
                                            <input type="text" id="content-title"
                                                class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                        </div>
                                        <div>
                                            <label for="content-type"
                                                class="block text-sm font-medium text-gray-700">Tipo de Conteúdo</label>
                                            <select id="content-type"
                                                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                                                <option>Artigo</option>
                                                <option>Vídeo</option>
                                                <option>Quiz</option>
                                                <option>Exercício</option>
                                                <option>Material Complementar</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="content-category"
                                                class="block text-sm font-medium text-gray-700">Categoria</label>
                                            <select id="content-category"
                                                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                                                <option>Matemática</option>
                                                <option>Português</option>
                                                <option>Ciências</option>
                                                <option>História</option>
                                                <option>Geografia</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="content-description"
                                                class="block text-sm font-medium text-gray-700">Descrição</label>
                                            <textarea id="content-description" rows="3"
                                                class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Arquivos</label>
                                            <div
                                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div class="space-y-1 text-center">
                                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor"
                                                        fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg>
                                                    <div class="flex text-sm text-gray-600">
                                                        <label for="file-upload"
                                                            class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                                                            <span>Carregar arquivo</span>
                                                            <input id="file-upload" name="file-upload" type="file"
                                                                class="sr-only">
                                                        </label>
                                                        <p class="pl-1">ou arraste e solte</p>
                                                    </div>
                                                    <p class="text-xs text-gray-500">PNG, JPG, PDF, MP4 até 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Publicar
                        </button>
                        <button @click="showContentModal = false" type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChartUsoPlataforma from '@/components/charts/UsoPlataforma.vue'
import ChartDistribuicaoUsuarios from '@/components/charts/DistribuicaoUsuarios.vue'
import DoughnutChart from '@/components/charts/DistribuicaoUsuarios.vue'
import BarChart from '@/components/charts/UsoPlataforma.vue'

export default {
    middleware: 'auth',
    layout: 'admin',
    data() {
        return {
            sidebarOpen: false,
            userMenuOpen: false,
            profileMenuOpen: false,
            showUserModal: false,
            showContentModal: false,
            showAnnouncementModal: false,
            showReportModal: false,
            recentUsers: [
                {
                    id: 1,
                    name: 'João Silva',
                    email: 'joao@escola.com',
                    avatar: this.getUserAvatar(1),
                    type: 'Professor',
                    date: '10/05/2025',
                    status: 'Ativo'
                },
                {
                    id: 2,
                    name: 'Maria Souza',
                    email: 'maria@escola.com',
                    avatar: this.getUserAvatar(2),
                    type: 'Administrador',
                    date: '09/05/2025',
                    status: 'Ativo'
                },
                {
                    id: 3,
                    name: 'Pedro Oliveira',
                    email: 'pedro@escola.com',
                    avatar: this.getUserAvatar(3),
                    type: 'Aluno',
                    date: '08/05/2025',
                    status: 'Pendente'
                },
                {
                    id: 4,
                    name: 'Ana Costa',
                    email: 'ana@escola.com',
                    avatar: this.getUserAvatar(4),
                    type: 'Professor',
                    date: '07/05/2025',
                    status: 'Ativo'
                },
                {
                    id: 5,
                    name: 'Carlos Mendes',
                    email: 'carlos@escola.com',
                    avatar: this.getUserAvatar(5),
                    type: 'Aluno',
                    date: '06/05/2025',
                    status: 'Ativo'
                },

            ],
            recentContent: [
                {
                    id: 1,
                    title: 'Introdução à Álgebra Linear',
                    author: 'Prof. João Silva',
                    category: 'Matemática',
                    date: '10/05/2025',
                    views: 245
                },
                {
                    id: 2,
                    title: 'Revolução Industrial',
                    author: 'Prof. Ana Costa',
                    category: 'História',
                    date: '09/05/2025',
                    views: 187
                },
                {
                    id: 3,
                    title: 'Estruturas de Dados Básicas',
                    author: 'Prof. Maria Souza',
                    category: 'Informática',
                    date: '08/05/2025',
                    views: 312
                },
                {
                    id: 4,
                    title: 'Biomas Brasileiros',
                    author: 'Prof. Carlos Mendes',
                    category: 'Geografia',
                    date: '07/05/2025',
                    views: 156
                },
                {
                    id: 5,
                    title: 'Química Orgânica - Introdução',
                    author: 'Prof. Pedro Oliveira',
                    category: 'Ciências',
                    date: '06/05/2025',
                    views: 278
                }
            ],
            metrics: {
                retentionRate: '78%',
                avgSessionTime: '24min',
                completedContents: '1,245'
            }
        }
    },
    methods: {
        toggleUserMenu() {
            this.userMenuOpen = !this.userMenuOpen
        },
        getUserTypeClass(type) {
            const types = {
                'Administrador': 'bg-purple-100 text-purple-800',
                'Professor': 'bg-blue-100 text-blue-800',
                'Aluno': 'bg-green-100 text-green-800'
            }
            return types[type] || 'bg-gray-100 text-gray-800'
        },
        getUserAvatar(id) {
            const avatars = [
                'https://randomuser.me/api/portraits/men/32.jpg',
                'https://randomuser.me/api/portraits/women/44.jpg',
                'https://randomuser.me/api/portraits/men/22.jpg',
                'https://randomuser.me/api/portraits/women/63.jpg',
                'https://randomuser.me/api/portraits/men/55.jpg'
            ]
            return avatars[id - 1] || 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
    }
}
</script>

<style scoped>
/* Transições suaves para menus dropdown */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* Estilos para links ativos no menu */
.router-link-exact-active {
    @apply bg-blue-700;
}
</style>