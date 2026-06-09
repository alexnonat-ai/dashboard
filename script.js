// Inicializar gráficos
document.addEventListener('DOMContentLoaded', function() {
    initializeSalesChart();
    initializeCategoryChart();
    initializeGrowthChart();
    initializeRegionChart();
    setupEventListeners();
});

// Gráfico de Vendas Mensais
function initializeSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Vendas 2026',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 42000, 48000],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de Distribuição de Categorias
function initializeCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Eletrônicos', 'Moda', 'Alimentos', 'Livros', 'Outros'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#e74c3c',
                    '#9b59b6'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Gráfico de Crescimento Anual
function initializeGrowthChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Crescimento Anual (%)',
                data: [10, 15, 25, 35, 45, 55, 65],
                backgroundColor: [
                    '#3498db',
                    '#3498db',
                    '#3498db',
                    '#2ecc71',
                    '#2ecc71',
                    '#2ecc71',
                    '#2ecc71'
                ],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de Performance por Região
function initializeRegionChart() {
    const ctx = document.getElementById('regionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
            datasets: [{
                label: 'Performance',
                data: [85, 72, 78, 95, 88],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Alternar entre seções
function showSection(sectionId) {
    // Remover exibição de todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Exibir a seção selecionada
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Atualizar menu ativo
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    event.target.closest('.menu-item').classList.add('active');

    // Reinicializar gráficos se necessário
    setTimeout(() => {
        if (sectionId === 'analytics') {
            const growthCtx = document.getElementById('growthChart');
            if (growthCtx && !growthCtx.chart) {
                initializeGrowthChart();
                initializeRegionChart();
            }
        }
    }, 100);
}

// Setup de event listeners
function setupEventListeners() {
    // Filtro de data
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            console.log('Data selecionada:', this.value);
            updateDashboard(this.value);
        });

        // Definir data atual como padrão
        const today = new Date().toISOString().split('T')[0];
        dateFilter.value = today;
    }

    // Botão de exportação
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportDashboard);
    }

    // Botões de geração de relatório
    const reportBtns = document.querySelectorAll('.report-card .btn-primary');
    reportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const reportTitle = this.closest('.report-card').querySelector('h3').textContent;
            generateReport(reportTitle);
        });
    });

    // Botão de salvar configurações
    const settingsBtn = document.querySelector('.settings-box .btn-primary');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', saveSettings);
    }
}

// Atualizar dashboard baseado na data
function updateDashboard(date) {
    console.log('Atualizando dashboard para:', date);
    // Aqui você pode adicionar lógica para atualizar dados baseado na data selecionada
    showNotification('Dashboard atualizado para ' + formatDate(date), 'success');
}

// Exportar dashboard
function exportDashboard() {
    const content = document.querySelector('.main-content').innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
            <head>
                <title>Dashboard - Exportação</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                ${content}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Gerar relatório
function generateReport(reportTitle) {
    console.log('Gerando relatório:', reportTitle);
    showNotification('Relatório "' + reportTitle + '" gerado com sucesso!', 'success');
    
    // Simular download
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = '#';
        link.download = reportTitle.toLowerCase().replace(' ', '_') + '.pdf';
        link.click();
    }, 500);
}

// Salvar configurações
function saveSettings() {
    const checkboxes = document.querySelectorAll('.settings-box input[type="checkbox"]');
    const settings = {
        notifications: checkboxes[0].checked,
        darkMode: checkboxes[1].checked,
        autoRefresh: checkboxes[2].checked
    };

    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    showNotification('Configurações salvas com sucesso!', 'success');
}

// Carregar configurações salvas
function loadSettings() {
    const settings = localStorage.getItem('dashboardSettings');
    if (settings) {
        const config = JSON.parse(settings);
        const checkboxes = document.querySelectorAll('.settings-box input[type="checkbox"]');
        checkboxes[0].checked = config.notifications;
        checkboxes[1].checked = config.darkMode;
        checkboxes[2].checked = config.autoRefresh;

        if (config.darkMode) {
            enableDarkMode();
        }
    }
}

// Ativar modo escuro
function enableDarkMode() {
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
}

// Desativar modo escuro
function disableDarkMode() {
    document.body.style.filter = 'none';
}

// Formatar data
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Carregar configurações ao iniciar
loadSettings();

// Atualizar dados periodicamente (a cada 30 segundos)
setInterval(() => {
    console.log('Atualizando dados do dashboard...');
    // Aqui você pode adicionar chamadas de API para atualizar dados em tempo real
}, 30000);
