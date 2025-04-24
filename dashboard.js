// GeoHarvest Dashboard Javascript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initDashboard();
    initCharts();
    initMaps();
    setupEventListeners();
    loadAlerts();
    loadRecommendations();
    initWeatherWidget();
    setupDarkMode();
    initRealTimeUpdates();
    loadProducerPanel(); // Añadida la función para cargar el panel del productor
    setupAOSAnimations(); // Añadido para mantener coherencia con index
    setupHoverEffects(); // Añadido para mantener coherencia con index
});

// Initialize Dashboard Components
function initDashboard() {
    console.log('Dashboard initialized at:', new Date().toLocaleString());
    
    // Animated entrance for dashboard elements - mejorado con la misma estética del index
    gsap.from('.dashboard-content', {
        duration: 1.0,
        opacity: 0,
        y: 30,
        ease: 'power4.out'
    });
    
    gsap.from('.kpi-card', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
    });
    
    // Initialize interactive notifications
    const notificationBanner = document.querySelector('.notification-banner');
    if (notificationBanner) {
        const closeBtn = notificationBanner.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                gsap.to(notificationBanner, {
                    duration: 0.5,
                    height: 0,
                    opacity: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                    onComplete: () => {
                        notificationBanner.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // Animación de entrada para el header - similar al index
    gsap.from('.dashboard-header', {
        duration: 0.8,
        opacity: 0,
        y: -20,
        ease: 'power2.out'
    });
    
    // Añadir efecto de partículas en background si existe el contenedor
    const particlesContainer = document.querySelector('.dashboard-particles');
    if (particlesContainer) {
        initParticlesBackground();
    }
}

// Setup Charts con animaciones mejoradas como en index
function initCharts() {
    // Setup humidity chart with animation
    const humidityCtx = document.getElementById('humidity-chart');
    if (humidityCtx) {
        const humidityChart = new Chart(humidityCtx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Humedad del suelo (%)',
                    data: [45, 47, 43, 42, 55, 58, 52],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#3498db',
                    pointRadius: 4,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        titleFont: { weight: 'bold' }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Setup temperature chart
    const temperatureCtx = document.getElementById('temperature-chart');
    if (temperatureCtx) {
        const temperatureChart = new Chart(temperatureCtx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: [25, 27, 28, 26, 24, 26, 29],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#e74c3c',
                    pointRadius: 4,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Setup nutrients chart with radar
    const nutrientsCtx = document.getElementById('nutrients-chart');
    if (nutrientsCtx) {
        const nutrientsChart = new Chart(nutrientsCtx, {
            type: 'radar',
            data: {
                labels: ['N', 'P', 'K', 'Ca', 'Mg', 'S'],
                datasets: [{
                    label: 'Parcela actual',
                    data: [65, 75, 70, 80, 60, 55],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    borderWidth: 2,
                    pointBackgroundColor: '#3498db'
                }, {
                    label: 'Óptimo',
                    data: [70, 80, 75, 75, 70, 65],
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: '#2ecc71',
                    borderWidth: 2,
                    pointBackgroundColor: '#2ecc71'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                animation: {
                    duration: 2000
                }
            }
        });
    }
    
    // Setup satellite data chart
    const satelliteCtx = document.getElementById('satellite-chart');
    if (satelliteCtx) {
        const satelliteChart = new Chart(satelliteCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'NDVI',
                    data: [0.3, 0.35, 0.45, 0.6, 0.7, 0.8, 0.85, 0.8, 0.7, 0.5, 0.4, 0.3],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'EVI',
                    data: [0.2, 0.25, 0.35, 0.5, 0.65, 0.75, 0.8, 0.75, 0.6, 0.4, 0.3, 0.2],
                    borderColor: '#8e44ad',
                    backgroundColor: 'rgba(142, 68, 173, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2500
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 1,
                        ticks: {
                            stepSize: 0.2
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Setup credit score chart
    const creditScoreCtx = document.getElementById('credit-score-chart');
    if (creditScoreCtx) {
        const creditScoreChart = new Chart(creditScoreCtx, {
            type: 'doughnut',
            data: {
                labels: ['Excelente', 'Bueno', 'Regular', 'Bajo'],
                datasets: [{
                    data: [82, 18, 0, 0],
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FFC107',
                        '#F44336'
                    ],
                    borderColor: [
                        '#388E3C',
                        '#1976D2',
                        '#FFA000',
                        '#D32F2F'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000
                }
            }
        });
    }
}

// Initialize map
function initMaps() {
    const mapElement = document.getElementById('crop-map');
    
    if (!mapElement) return;
    
    // Create map
    const map = L.map(mapElement, {
        center: [19.432608, -99.133209], // Mexico City coordinates as default
        zoom: 15,
        zoomControl: false // We'll use our custom controls
    });
    
    // Add base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add custom controls handlers
    document.getElementById('map-zoom-in').addEventListener('click', () => {
        map.zoomIn();
    });
    
    document.getElementById('map-zoom-out').addEventListener('click', () => {
        map.zoomOut();
    });
    
    document.getElementById('map-locate').addEventListener('click', () => {
        map.locate({setView: true, maxZoom: 16});
    });
    
    // Add sample field polygons with different moisture levels
    const optimalMoistureStyle = {
        color: "#4CAF50",
        weight: 2,
        opacity: 0.7,
        fillOpacity: 0.4
    };
    
    const lowMoistureStyle = {
        color: "#FF9800",
        weight: 2,
        opacity: 0.7,
        fillOpacity: 0.4
    };
    
    const plagueAlertStyle = {
        color: "#F44336",
        weight: 2,
        opacity: 0.7,
        fillOpacity: 0.4
    };
    
    // Example coordinates for fields (would be replaced with real data)
    // Field with optimal moisture
    const field1 = L.polygon([
        [19.434, -99.132],
        [19.436, -99.130],
        [19.435, -99.128],
        [19.433, -99.130]
    ], optimalMoistureStyle).addTo(map);
    
    field1.bindPopup("<b>Parcela 1</b><br>Humedad: 52%<br>Estado: Óptimo");
    
    // Field with low moisture
    const field2 = L.polygon([
        [19.430, -99.133],
        [19.432, -99.131],
        [19.431, -99.129],
        [19.429, -99.131]
    ], lowMoistureStyle).addTo(map);
    
    field2.bindPopup("<b>Parcela 2</b><br>Humedad: 32%<br>Estado: Requiere riego");
    
    // Field with plague alert
    const field3 = L.polygon([
        [19.432, -99.136],
        [19.434, -99.134],
        [19.433, -99.132],
        [19.431, -99.134]
    ], plagueAlertStyle).addTo(map);
    
    field3.bindPopup("<b>Parcela 3</b><br>Alerta: Posible plaga detectada<br>Acción recomendada: Inspección");
    
    // Set bounds to show all fields
    const bounds = L.latLngBounds([
        [19.429, -99.136],
        [19.436, -99.128]
    ]);
    
    map.fitBounds(bounds);
    
    // Add pulsing effect to plague alert field
    function pulseField() {
        gsap.to(field3._path, {
            opacity: 0.3,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(field3._path, {
                    opacity: 0.7,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: pulseField
                });
            }
        });
    }
    
    pulseField();
}

// Setup event listeners for dashboard interactivity
function setupEventListeners() {
    // Toggle sidebar
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            const dashboardContent = document.querySelector('.dashboard-content');
            
            sidebar.classList.toggle('sidebar-collapsed');
            dashboardContent.classList.toggle('expanded-content');
        });
    }
    
    // User dropdown toggle
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.querySelector('.user-dropdown');
            dropdown.classList.toggle('show-dropdown');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            const dropdown = document.querySelector('.user-dropdown');
            if (dropdown.classList.contains('show-dropdown')) {
                dropdown.classList.remove('show-dropdown');
            }
        });
    }
    
    // Panel selector
    const panelOptions = document.querySelectorAll('.panel-option');
    if (panelOptions.length) {
        panelOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all options
                panelOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                option.classList.add('active');
                
                // Hide all panels
                document.querySelectorAll('.panel-content').forEach(panel => {
                    panel.classList.remove('active');
                });
                
                // Show selected panel
                const panelId = option.getAttribute('data-panel');
                document.getElementById(panelId + '-panel').classList.add('active');
                
                // Add entrance animation to the panel
                animatePanelEntrance();
            });
        });
    }
    
    // Sidebar panel toggles
    document.getElementById('producer-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('[data-panel="producer"]').click();
    });
    
    document.getElementById('bank-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('[data-panel="bank"]').click();
    });
    
    document.getElementById('buyer-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('[data-panel="buyer"]').click();
    });
    
    // Parcel selector
    const parcelSelector = document.getElementById('parcel-selector');
    if (parcelSelector) {
        parcelSelector.addEventListener('change', () => {
            const selectedParcel = parcelSelector.value;
            console.log(`Parcel changed to: ${selectedParcel}`);
            
            // Show loading animation
            showLoadingOverlay();
            
            // Simulate data loading
            setTimeout(() => {
                updateDashboardData(selectedParcel);
                hideLoadingOverlay();
                
                // Show success notification
                showNotification(`Datos de la parcela ${selectedParcel} cargados correctamente`, 'success');
            }, 800);
        });
    }
    
    // Añadir efecto de pulso a botones importantes - igual que en index
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-alert-action');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('pulse-animation');
            setTimeout(() => {
                this.classList.remove('pulse-animation');
            }, 1000);
        });
    });
}

// Show loading overlay
function showLoadingOverlay() {
    // Create loading overlay if it doesn't exist
    if (!document.querySelector('.loading-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Cargando datos...</p>
        `;
        
        document.querySelector('.dashboard-content').appendChild(overlay);
    }
    
    // Show the overlay with animation
    gsap.to('.loading-overlay', {
        opacity: 1,
        display: 'flex',
        duration: 0.3
    });
}

// Hide loading overlay
function hideLoadingOverlay() {
    gsap.to('.loading-overlay', {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            const overlay = document.querySelector('.loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    });
}

// Update dashboard data based on selected parcel
function updateDashboardData(parcel) {
    // This would typically involve API calls to fetch actual data
    // Here we'll just simulate updates
    
    // Update KPI cards with animation
    updateKpiWithAnimation('Ingresos mensuales', '$' + (Math.floor(Math.random() * 50000) + 130000));
    updateKpiWithAnimation('Ahorro de agua', (Math.floor(Math.random() * 10) + 10) + '%');
    updateKpiWithAnimation('Aumento en rendimiento', (Math.random() * 5 + 9).toFixed(1) + '%');
    
    // Refresh charts with new random data
    refreshChartsWithNewData();
}

// Update KPI with animation
function updateKpiWithAnimation(label, newValue) {
    const kpiElements = document.querySelectorAll('.kpi-label');
    
    kpiElements.forEach(element => {
        if (element.textContent === label) {
            const valueElement = element.previousElementSibling;
            const oldValue = valueElement.textContent;
            
            // Animate the change
            gsap.to(valueElement, {
                duration: 0.5,
                opacity: 0,
                y: -10,
                ease: 'power2.out',
                onComplete: () => {
                    valueElement.textContent = newValue;
                    gsap.to(valueElement, {
                        duration: 0.5,
                        opacity: 1,
                        y: 0,
                        ease: 'power2.out'
                    });
                }
            });
        }
    });
}

// Refresh charts with new random data
function refreshChartsWithNewData() {
    Chart.instances.forEach(chart => {
        if (chart.canvas.id === 'humidity-chart') {
            chart.data.datasets[0].data = Array.from({length: 7}, () => Math.floor(Math.random() * 20) + 40);
            chart.update();
        } else if (chart.canvas.id === 'temperature-chart') {
            chart.data.datasets[0].data = Array.from({length: 7}, () => Math.floor(Math.random() * 10) + 20);
            chart.update();
        }
    });
}

// Load alerts from data source
function loadAlerts() {
    const alertsContainer = document.getElementById('alerts-container');
    if (!alertsContainer) return;
    
    // Datos de ejemplo para alertas (en producción vendría de la base de datos)
    const alertsData = [
        {
            type: 'warning',
            message: 'Nivel de humedad bajo en Sector Norte',
            time: '10:23',
            details: 'El nivel de humedad ha caído por debajo del 30% en los últimos 3 días.'
        },
        {
            type: 'danger',
            message: 'Posible plaga detectada en Parcela 3',
            time: '08:15',
            details: 'Imágenes por satélite muestran patrones consistentes con infestación de áfidos.'
        },
        {
            type: 'info',
            message: 'Ventana óptima para cosecha próxima',
            time: 'Ayer',
            details: 'Condiciones climáticas ideales previstas para los próximos 5 días.'
        },
        {
            type: 'success',
            message: 'Objetivo de rendimiento alcanzado',
            time: 'Ayer',
            details: 'La parcela este ha alcanzado el rendimiento objetivo 3 días antes de lo previsto.'
        }
    ];
    
    // Limpiar contenedor
    alertsContainer.innerHTML = '';
    
    // Añadir cada alerta con animación escalonada
    alertsData.forEach((alert, index) => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${alert.type}`;
        alertElement.innerHTML = `
            <div class="alert-header">
                <i class="fas fa-${alert.type === 'warning' ? 'exclamation-triangle' : 
                                  alert.type === 'danger' ? 'radiation' : 
                                  alert.type === 'info' ? 'info-circle' : 'check-circle'}"></i>
                <h4>${alert.message}</h4>
                <span class="alert-time">${alert.time}</span>
            </div>
            <p class="alert-details">${alert.details}</p>
            <div class="alert-actions">
                <button class="btn-sm btn-outline"><i class="fas fa-check"></i> Marcar como leído</button>
                <button class="btn-sm btn-outline"><i class="fas fa-ellipsis-h"></i></button>
            </div>
        `;
        
        // Configurar evento para marcar como leído
        const readBtn = alertElement.querySelector('.btn-sm');
        if (readBtn) {
            readBtn.addEventListener('click', function() {
                gsap.to(alertElement, {
                    opacity: 0.6,
                    height: 0,
                    padding: 0,
                    marginBottom: 0,
                    duration: 0.5,
                    onComplete: () => {
                        alertElement.remove();
                        showNotification('Alerta marcada como leída', 'success');
                        
                        // Actualizar contador de alertas
                        const alertCounter = document.querySelector('.alert-counter');
                        if (alertCounter) {
                            const currentCount = parseInt(alertCounter.textContent);
                            if (currentCount > 0) {
                                alertCounter.textContent = currentCount - 1;
                                if (currentCount - 1 === 0) {
                                    alertCounter.style.display = 'none';
                                }
                            }
                        }
                    }
                });
            });
        }
        
        alertsContainer.appendChild(alertElement);
        
        // Animación de entrada
        gsap.from(alertElement, {
            y: 20,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.15,
            ease: 'power1.out'
        });
    });
    
    // Actualizar contador de alertas
    const alertCounter = document.querySelector('.alert-counter');
    if (alertCounter) {
        alertCounter.textContent = alertsData.length;
        alertCounter.style.display = alertsData.length > 0 ? 'block' : 'none';
    }
}

// Load recommendations based on crop data and conditions
function loadRecommendations() {
    const recommendationsContainer = document.getElementById('recommendations-container');
    if (!recommendationsContainer) return;
    
    // Datos de ejemplo para recomendaciones (en producción serían generados por algoritmos)
    const recommendations = [
        {
            title: 'Ajustar programa de riego',
            description: 'Basado en las previsiones meteorológicas, se recomienda reducir el riego en un 15% durante los próximos 3 días.',
            impact: 'Alto',
            category: 'water'
        },
        {
            title: 'Momento óptimo para fertilización',
            description: 'Las condiciones actuales son ideales para aplicar fertilizante nitrogenado en el Sector Sur.',
            impact: 'Medio',
            category: 'fertilizer'
        },
        {
            title: 'Planificación de cosecha',
            description: 'Programar la cosecha para el próximo martes minimizaría las pérdidas por las lluvias pronosticadas.',
            impact: 'Alto',
            category: 'harvest'
        },
        {
            title: 'Rotación de cultivos',
            description: 'Para la próxima temporada, considere alternar con leguminosas para mejorar la estructura del suelo.',
            impact: 'Bajo',
            category: 'planning'
        }
    ];
    
    // Limpiar contenedor
    recommendationsContainer.innerHTML = '';
    
    // Añadir cada recomendación
    recommendations.forEach((rec, index) => {
        const recElement = document.createElement('div');
        recElement.className = 'recommendation-card';
        recElement.setAttribute('data-aos', 'fade-up');
        recElement.setAttribute('data-aos-delay', (index * 100).toString());
        
        const iconMap = {
            water: 'tint',
            fertilizer: 'seedling',
            harvest: 'tractor',
            planning: 'calendar-alt',
            pest: 'bug',
            soil: 'layer-group'
        };
        
        const impactClass = rec.impact === 'Alto' ? 'high-impact' : 
                           rec.impact === 'Medio' ? 'medium-impact' : 'low-impact';
        
        recElement.innerHTML = `
            <div class="recommendation-icon">
                <i class="fas fa-${iconMap[rec.category] || 'lightbulb'}"></i>
            </div>
            <div class="recommendation-content">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <div class="recommendation-meta">
                    <span class="impact-tag ${impactClass}">Impacto: ${rec.impact}</span>
                    <button class="btn-outline btn-sm">Implementar</button>
                </div>
            </div>
        `;
        
        // Evento para botón de implementar
        const implementBtn = recElement.querySelector('.btn-outline');
        if (implementBtn) {
            implementBtn.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-check"></i> Implementado';
                this.classList.add('implemented');
                this.disabled = true;
                showNotification('Recomendación marcada como implementada', 'success');
            });
        }
        
        recommendationsContainer.appendChild(recElement);
    });
    
    // Iniciar animaciones de AOS para esta sección
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Initialize the weather widget with current data
function initWeatherWidget() {
    const weatherWidget = document.getElementById('weather-widget');
    if (!weatherWidget) return;
    
    // En producción, estos datos vendrían de una API meteorológica
    const weatherData = {
        current: {
            temp: 24,
            condition: 'Soleado',
            humidity: 62,
            windSpeed: 8,
            icon: 'sun'
        },
        forecast: [
            { day: 'Mañana', temp: 26, icon: 'cloud-sun' },
            { day: 'Miércoles', temp: 29, icon: 'sun' },
            { day: 'Jueves', temp: 23, icon: 'cloud-rain' },
            { day: 'Viernes', temp: 22, icon: 'cloud-showers-heavy' }
        ]
    };
    
    // Actualizar el widget con los datos
    const currentTemp = weatherWidget.querySelector('.current-temp');
    if (currentTemp) currentTemp.textContent = `${weatherData.current.temp}°C`;
    
    const currentCondition = weatherWidget.querySelector('.current-condition');
    if (currentCondition) currentCondition.textContent = weatherData.current.condition;
    
    const currentIcon = weatherWidget.querySelector('.weather-icon i');
    if (currentIcon) {
        currentIcon.className = '';
        currentIcon.classList.add('fas', `fa-${weatherData.current.icon}`);
    }
    
    const humidityValue = weatherWidget.querySelector('.humidity-value');
    if (humidityValue) humidityValue.textContent = `${weatherData.current.humidity}%`;
    
    const windValue = weatherWidget.querySelector('.wind-value');
    if (windValue) windValue.textContent = `${weatherData.current.windSpeed} km/h`;
    
    // Actualizar pronóstico
    const forecastContainer = weatherWidget.querySelector('.weather-forecast');
    if (forecastContainer) {
        forecastContainer.innerHTML = '';
        weatherData.forecast.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'forecast-day';
            dayElement.innerHTML = `
                <span>${day.day}</span>
                <i class="fas fa-${day.icon}"></i>
                <span>${day.temp}°C</span>
            `;
            forecastContainer.appendChild(dayElement);
        }
    }
    
    // Animar entrada del widget
    gsap.from(weatherWidget, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// Setup dark mode toggle
function setupDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;
    
    // Verificar preferencia guardada
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    darkModeToggle.checked = isDarkMode;
    
    // Actualizar estado del toggle
    const updateToggleText = () => {
        const isDark = document.body.classList.contains('dark-mode');
        const toggleText = document.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = isDark ? 'Modo oscuro' : 'Modo claro';
        }
    };
    
    updateToggleText();
    
    // Manejar cambio de toggle
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('darkMode', this.checked);
        updateToggleText();
        
        // Animación de transición
        const panels = document.querySelectorAll('.panel');
        gsap.to(panels, {
            backgroundColor: this.checked ? '#2a2d3e' : '#ffffff',
            color: this.checked ? '#e0e0e0' : '#333333',
            duration: 0.5
        });
    });
}

// Initialize real-time data updates
function initRealTimeUpdates() {
    // Simular actualizaciones en tiempo real (en producción, esto sería websockets)
    const cropDataElement = document.getElementById('crop-health-data');
    const yieldDataElement = document.getElementById('yield-prediction-data');
    
    if (!cropDataElement || !yieldDataElement) return;
    
    // Actualizar datos cada cierto tiempo
    setInterval(() => {
        // Actualización aleatoria de datos de salud de cultivos
        if (Math.random() > 0.7) {
            const healthChange = (Math.random() * 4 - 2).toFixed(1);
            gsap.to(cropDataElement, {
                innerHTML: parseFloat(cropDataElement.textContent) + parseFloat(healthChange),
                duration: 1,
                snap: { innerHTML: 0.1 },
                onUpdate: () => {
                    // Cambiar color basado en el valor
                    const value = parseFloat(cropDataElement.textContent);
                    if (value > 85) cropDataElement.style.color = '#4caf50';
                    else if (value > 70) cropDataElement.style.color = '#8bc34a';
                    else if (value > 50) cropDataElement.style.color = '#ffc107';
                    else cropDataElement.style.color = '#f44336';
                }
            });
        }
        
        // Actualización aleatoria de datos de predicción de rendimiento
        if (Math.random() > 0.8) {
            const yieldChange = (Math.random() * 2 - 0.5).toFixed(1);
            gsap.to(yieldDataElement, {
                innerHTML: parseFloat(yieldDataElement.textContent) + parseFloat(yieldChange),
                duration: 1,
                snap: { innerHTML: 0.1 }
            });
        }
    }, 5000);
}

// Setup AOS animations
function setupAOSAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: false,
            mirror: true,
            offset: 50
        });
    }
}

// Setup hover effects for interactive elements
function setupHoverEffects() {
    // Hover effects para las tarjetas de cultivos
    const cropCards = document.querySelectorAll('.crop-card');
    cropCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                duration: 0.3
            });
        });
    });
    
    // Hover effects para los botones de acción
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('i'), {
                scale: 1.2,
                rotate: '10deg',
                duration: 0.2
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('i'), {
                scale: 1,
                rotate: '0deg',
                duration: 0.2
            });
        });
    });
}

// Initialize background particles
function initParticlesBackground() {
    const particlesContainer = document.getElementById('particles-background');
    if (!particlesContainer) return;
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-background', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: '#a3e635' },
                opacity: { value: 0.3, random: true },
                size: { value: 5, random: true },
                move: { 
                    enable: true, 
                    speed: 1, 
                    direction: 'none', 
                    random: true, 
                    out_mode: 'out' 
                },
                line_linked: { enable: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'bubble' },
                    onclick: { enable: true, mode: 'repulse' }
                },
                modes: {
                    bubble: { distance: 200, size: 6, opacity: 0.4 },
                    repulse: { distance: 200, duration: 0.4 }
                }
            }
        });
    }
}

// Animate panel entrance
function animatePanelEntrance() {
    const panels = document.querySelectorAll('.panel');
    if (panels.length === 0) return;
    
    // Staggered entrance animation
    gsap.from(panels, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });
    
    // Escalar ligeramente para dar efecto de "pop"
    panels.forEach((panel, index) => {
        gsap.from(panel, {
            scale: 0.95,
            duration: 0.4,
            delay: 0.3 + (index * 0.1),
            ease: 'back.out(1.5)'
        });
    });
}

// Show notification message
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'error' ? 'exclamation-circle' : 
                           type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    gsap.fromTo(notification, 
        { right: '-300px', opacity: 0 },
        { right: '20px', opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
    
    // Animar salida después de un tiempo
    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            y: -10,
            duration: 0.5,
            onComplete: () => notification.remove()
        });
    }, 5000);
}

// Función para cargar los datos del panel del productor
function loadProducerPanel() {
    console.log('Cargando el panel del productor...');
    
    // Asegurarse de que el panel del productor esté visible por defecto
    const producerPanel = document.getElementById('producer-panel');
    if (!producerPanel) {
        console.error('No se encontró el panel del productor');
        return;
    }
    
    // Activar el panel del productor por defecto si no está activo
    if (!producerPanel.classList.contains('active')) {
        producerPanel.classList.add('active');
    }
    
    // Asegurar que el botón del productor esté activo
    const producerButton = document.querySelector('[data-panel="producer"]');
    if (producerButton && !producerButton.classList.contains('active')) {
        producerButton.classList.add('active');
    }
    
    // Cargar datos del productor desde demo-data.js
    loadProducerData();
    
    // Animar entrada del panel
    animateProducerPanelEntrance();
}

// Cargar datos del productor desde el archivo demo-data
function loadProducerData() {
    try {
        // Verificar si tenemos acceso a los datos de demostración
        if (typeof demoData !== 'undefined' && demoData.producer) {
            updateProducerDashboard(demoData.producer);
        } else {
            // Datos de ejemplo si no se puede cargar demo-data.js
            const fallbackData = {
                name: "Juan Rodríguez",
                farm: "Finca Los Naranjos",
                crops: ["Maíz", "Frijol", "Café"],
                parcels: 3,
                totalArea: 15.4,
                monthlyIncome: 156000,
                waterSavings: "18%",
                yieldIncrease: "12.5%"
            };
            updateProducerDashboard(fallbackData);
        }
    } catch (error) {
        console.error('Error al cargar los datos del productor:', error);
        showNotification('Error al cargar datos del productor', 'error');
    }
}

// Actualizar el dashboard del productor con los datos
function updateProducerDashboard(data) {
    // Actualizar KPIs
    updateKpiWithAnimation('Ingresos mensuales', '$' + data.monthlyIncome);
    updateKpiWithAnimation('Ahorro de agua', data.waterSavings);
    updateKpiWithAnimation('Aumento en rendimiento', data.yieldIncrease);
    
    // Actualizar nombre del productor en el dashboard
    const producerNameElement = document.getElementById('producer-name');
    if (producerNameElement) {
        producerNameElement.textContent = data.name;
    }
    
    // Actualizar nombre de la finca
    const farmNameElement = document.getElementById('farm-name');
    if (farmNameElement) {
        farmNameElement.textContent = data.farm;
    }
    
    // Actualizar selector de parcelas
    const parcelSelector = document.getElementById('parcel-selector');
    if (parcelSelector) {
        // Limpiar opciones existentes
        parcelSelector.innerHTML = '';
        
        // Añadir nuevas opciones basadas en los datos
        for (let i = 1; i <= data.parcels; i++) {
            const option = document.createElement('option');
            option.value = `Parcela ${i}`;
            option.textContent = `Parcela ${i}`;
            parcelSelector.appendChild(option);
        }
    }
    
    console.log('Panel del productor actualizado con éxito');
}

// Animar entrada del panel del productor
function animateProducerPanelEntrance() {
    const producerPanel = document.getElementById('producer-panel');
    if (!producerPanel) return;
    
    const elements = producerPanel.querySelectorAll('.kpi-card, .widget');
    
    // Animar entrada de los elementos del panel
    gsap.from(elements, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });
}