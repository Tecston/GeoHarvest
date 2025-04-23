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

// Load alerts into alerts container with enhanced animations
function loadAlerts() {
    const alertsContainer = document.getElementById('alerts-container');
    
    if (!alertsContainer) return;
    
    const alerts = [
        {
            type: 'danger',
            icon: 'fa-bug',
            title: 'Alerta de plaga',
            message: 'Posible plaga detectada en la Parcela 3. Se recomienda inspección inmediata.',
            time: '10 minutos'
        },
        {
            type: 'warning',
            icon: 'fa-water',
            title: 'Nivel bajo de humedad',
            message: 'La Parcela 2 requiere irrigación. El nivel de humedad está por debajo del umbral recomendado.',
            time: '30 minutos'
        },
        {
            type: 'info',
            icon: 'fa-temperature-high',
            title: 'Temperatura elevada',
            message: 'Se pronostica una ola de calor para los próximos 3 días. Considere ajustar el riego.',
            time: '1 hora'
        }
    ];
    
    // Clear container first
    alertsContainer.innerHTML = '';
    
    // Add each alert with a delay and mejorada como en index
    alerts.forEach((alert, index) => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${alert.type} hover-lift`;
        alertElement.innerHTML = `
            <div class="alert-icon pulse-subtle">
                <i class="fas ${alert.icon}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
                <span class="alert-time"><i class="fas fa-clock"></i> Hace ${alert.time}</span>
            </div>
            <div class="alert-actions">
                <button class="btn-alert-dismiss hover-lift">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        alertsContainer.appendChild(alertElement);
        
        // Animación mejorada como en index con GSAP
        gsap.from(alertElement, {
            duration: 0.7,
            opacity: 0,
            x: 40,
            delay: index * 0.3,
            ease: 'power3.out'
        });
        
        // Add dismiss functionality
        alertElement.querySelector('.btn-alert-dismiss').addEventListener('click', () => {
            gsap.to(alertElement, {
                duration: 0.5,
                height: 0,
                opacity: 0,
                padding: 0,
                marginBottom: 0,
                ease: 'power2.inOut',
                onComplete: () => {
                    alertElement.remove();
                }
            });
        });
    });
}

// Load AI recommendations con animaciones mejoradas para consistencia
function loadRecommendations() {
    const recContainer = document.getElementById('recommendations-container');
    
    if (!recContainer) return;
    
    const recommendations = [
        {
            type: 'primary',
            icon: 'fa-brain',
            title: 'Optimización de riego',
            message: 'Basado en los datos satelitales, se recomienda reducir el riego en la Parcela 1 en un 15% para optimizar el uso de agua sin afectar el rendimiento.',
            time: '15 minutos'
        },
        {
            type: 'success',
            icon: 'fa-leaf',
            title: 'Mejora de nutrientes',
            message: 'Análisis reciente muestra deficiencia de potasio. Se recomienda aplicación de fertilizante potásico en la próxima semana.',
            time: '2 horas'
        },
        {
            type: 'info',
            icon: 'fa-money-bill-wave',
            title: 'Oportunidad de mercado',
            message: 'Precios del maíz proyectados al alza (8%) en los próximos 30 días. Considere retrasar la venta si es posible.',
            time: '5 horas'
        }
    ];
    
    // Clear container first
    recContainer.innerHTML = '';
    
    // Add each recommendation with enhanced animations matching index
    recommendations.forEach((rec, index) => {
        const recElement = document.createElement('div');
        recElement.className = `alert alert-${rec.type} hover-lift`;
        recElement.innerHTML = `
            <div class="alert-icon">
                <i class="fas ${rec.icon}"></i>
            </div>
            <div class="alert-content">
                <h4>${rec.title}</h4>
                <p>${rec.message}</p>
                <span class="alert-time"><i class="fas fa-clock"></i> Hace ${rec.time}</span>
            </div>
            <div class="alert-actions">
                <button class="btn-alert-action pulse-animation hover-lift">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-alert-dismiss hover-lift">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        recContainer.appendChild(recElement);
        
        // Enhanced animation matching index style
        gsap.from(recElement, {
            duration: 0.7,
            opacity: 0,
            x: 40,
            delay: index * 0.3 + 0.3,
            ease: 'power3.out'
        });
        
        // Add action functionality with improved animations
        recElement.querySelector('.btn-alert-action').addEventListener('click', () => {
            showNotification('Recomendación implementada correctamente', 'success');
            
            // Enhanced confirmation animation
            gsap.to(recElement, {
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                duration: 0.5,
                ease: 'power2.inOut'
            });
            
            const actionBtn = recElement.querySelector('.btn-alert-action');
            actionBtn.innerHTML = '<i class="fas fa-check-double"></i>';
            actionBtn.classList.add('confirmed');
            
            // Add confetti/success animation
            gsap.fromTo(actionBtn, 
                { rotation: 0, scale: 1 },
                { 
                    rotation: 360, 
                    scale: 1.2, 
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        gsap.to(actionBtn, {
                            scale: 1,
                            duration: 0.3
                        });
                    }
                }
            );
            
            actionBtn.disabled = true;
        });
        
        // Add dismiss functionality
        recElement.querySelector('.btn-alert-dismiss').addEventListener('click', () => {
            gsap.to(recElement, {
                duration: 0.5,
                height: 0,
                opacity: 0,
                padding: 0,
                marginBottom: 0,
                ease: 'power3.inOut',
                onComplete: () => {
                    recElement.remove();
                }
            });
        });
    });
}

// Initialize weather widget with same animation style as index
function initWeatherWidget() {
    const weatherContainer = document.querySelector('.weather-indicators');
    
    if (!weatherContainer) return;
    
    // Sample weather data
    const weatherData = {
        current: {
            temp: 26,
            humidity: 65,
            uv: 7,
            windSpeed: 12
        },
        forecast: [
            { day: 'Hoy', icon: 'sun', temp: 26 },
            { day: 'Mañana', icon: 'cloud-sun', temp: 24 },
            { day: 'Mie', icon: 'cloud', temp: 23 }
        ]
    };
    
    // Construct weather widget
    const weatherHTML = `
        <div class="current-weather">
            <div class="weather-icon">
                <i class="fas fa-sun"></i>
            </div>
            <div class="weather-data">
                <div class="temp">${weatherData.current.temp}°C</div>
                <div class="weather-details">
                    <span><i class="fas fa-tint"></i> ${weatherData.current.humidity}%</span>
                    <span><i class="fas fa-wind"></i> ${weatherData.current.windSpeed} km/h</span>
                </div>
            </div>
        </div>
        <div class="forecast">
            ${weatherData.forecast.map(day => `
                <div class="forecast-day">
                    <div class="day">${day.day}</div>
                    <div class="icon"><i class="fas fa-${day.icon}"></i></div>
                    <div class="temp">${day.temp}°</div>
                </div>
            `).join('')}
        </div>
    `;
    
    weatherContainer.innerHTML = weatherHTML;
    
    // Enhance animations to match index style
    gsap.from('.current-weather', {
        duration: 0.7,
        opacity: 0,
        y: 20,
        ease: 'power3.out'
    });
    
    gsap.from('.forecast-day', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power3.out'
    });
}

// Setup dark mode toggle with enhanced animations
function setupDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (!darkModeToggle) return;
    
    // Check user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial mode
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle dark mode on click
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Change icon
        darkModeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        
        // Enhanced animation for transition
        gsap.to('.dark-mode-toggle i', {
            duration: 0.7,
            rotation: '+=360',
            ease: 'power3.inOut'
        });
        
        // Update chart themes
        updateChartThemes(isDark);
    });
}

// Update chart themes based on dark mode
function updateChartThemes(isDark) {
    Chart.instances.forEach(chart => {
        // Update grid colors
        if (chart.options.scales && chart.options.scales.y) {
            chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        }
        
        // Update text colors
        if (chart.options.plugins && chart.options.plugins.legend) {
            chart.options.plugins.legend.labels.color = isDark ? '#ddd' : '#666';
        }
        
        // Update tick colors
        if (chart.options.scales) {
            if (chart.options.scales.y) {
                chart.options.scales.y.ticks = {
                    color: isDark ? '#aaa' : '#666'
                };
            }
            if (chart.options.scales.x) {
                chart.options.scales.x.ticks = {
                    color: isDark ? '#aaa' : '#666'
                };
            }
        }
        
        chart.update();
    });
}

// Animate panel entrance with improved animations
function animatePanelEntrance() {
    gsap.from('.panel-content.active .kpi-card', {
        duration: 0.7,
        opacity: 0,
        y: 30,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    gsap.from('.panel-content.active .widget', {
        duration: 0.8,
        opacity: 0,
        y: 40,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power3.out'
    });
}

// Configurar AOS (Animate On Scroll) para mantener coherencia con index
function setupAOSAnimations() {
    // Verificar si AOS ya está disponible en la página
    if (typeof AOS !== 'undefined') {
        // Inicializar AOS con la configuración similar a index
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Añadir atributos AOS a elementos del dashboard si no existen
        const elementsToAnimate = document.querySelectorAll('.widget, .kpi-card, .panel-header');
        let delay = 50;
        
        elementsToAnimate.forEach(element => {
            if (!element.hasAttribute('data-aos')) {
                element.setAttribute('data-aos', 'fade-up');
                element.setAttribute('data-aos-delay', delay.toString());
                delay += 50;
            }
        });
    }
}

// Inicializar los efectos de hover para mantener coherencia con index
function setupHoverEffects() {
    // Añadir clase hover-lift a elementos interactivos
    const interactiveElements = document.querySelectorAll('.kpi-card, .btn-primary, .panel-option, .widget-header');
    
    interactiveElements.forEach(element => {
        if (!element.classList.contains('hover-lift')) {
            element.classList.add('hover-lift');
        }
    });
    
    // Inicializar Tilt.js para efectos 3D en tarjetas si está disponible
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.kpi-card'), {
            max: 5,
            speed: 400,
            glare: true,
            'max-glare': 0.1,
            scale: 1.03
        });
    }
}

// Inicializa el fondo de partículas similar a index.html
function initParticlesBackground() {
    const container = document.querySelector('.dashboard-particles');
    if (!container || typeof THREE === 'undefined') return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create particles - similar al index pero con menos partículas para no sobrecargar el dashboard
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 800;

    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position in 3D space
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material with custom shader
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x157A6E,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    // Animation loop with subtle movement - más suave para dashboard
    function animate() {
        requestAnimationFrame(animate);
        particleSystem.rotation.x += 0.0003;
        particleSystem.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

// Show notification with enhanced animations matching index
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} hover-lift`;
    notification.innerHTML = `
        <div class="notification-icon pulse-subtle">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        </div>
        <div class="notification-content">
            ${message}
        </div>
        <button class="notification-close hover-lift">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.querySelector('.notification-container').appendChild(notification);
    
    // Show with enhanced animation matching index style
    gsap.fromTo(notification, 
        { 
            opacity: 0, 
            y: -40,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
        }
    );
    
    // Add close handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

// Close notification with enhanced animation
function closeNotification(notification) {
    gsap.to(notification, {
        opacity: 0,
        x: 100,
        scale: 0.9,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
            notification.remove();
        }
    });
}

// Initialize real-time updates with subtle animations
function initRealTimeUpdates() {
    // Simulate real-time sensor data updates
    setInterval(() => {
        // Random small changes to chart data
        Chart.instances.forEach(chart => {
            if (chart.canvas.id === 'humidity-chart') {
                chart.data.datasets[0].data = chart.data.datasets[0].data.map(val => {
                    let change = Math.random() * 2 - 1; // -1 to +1
                    let newVal = val + change;
                    return Math.min(Math.max(newVal, 30), 70); // Keep between 30-70
                });
                chart.update('quiet'); // Update without animation
            }
            
            if (chart.canvas.id === 'temperature-chart') {
                chart.data.datasets[0].data = chart.data.datasets[0].data.map(val => {
                    let change = Math.random() * 0.6 - 0.3; // -0.3 to +0.3
                    let newVal = val + change;
                    return Math.min(Math.max(newVal, 20), 32); // Keep between 20-32
                });
                chart.update('quiet'); // Update without animation
            }
        });
    }, 10000); // Update every 10 seconds
    
    // Simulate random alerts (in a real app, these would come from a server)
    setTimeout(() => {
        const alertTypes = ['Humedad baja', 'Temperatura alta', 'Cambio brusco de clima'];
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        showNotification(`¡Nueva alerta! ${randomAlert} detectado en Parcela 2.`, 'warning');
    }, 45000); // After 45 seconds
}