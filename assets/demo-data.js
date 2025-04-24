// GeoHarvest Demo Data
// Datos de demostración para la aplicación

const demoData = {
    // Datos del productor
    producer: {
        name: "Juan Rodríguez",
        farm: "Finca Los Naranjos",
        crops: ["Maíz", "Frijol", "Café"],
        parcels: 3,
        totalArea: 15.4, // hectáreas
        monthlyIncome: 156000,
        waterSavings: "18%",
        yieldIncrease: "12.5%",
        soilHealth: 82,
        harvestDate: "2025-05-15",
        certifications: ["Orgánico", "Comercio Justo"],
        parcelsData: [
            {
                id: 1,
                name: "Parcela 1",
                area: 5.2,
                crop: "Maíz",
                soilMoisture: 52,
                temperature: [25, 27, 28, 26, 24, 26, 29],
                humidity: [45, 47, 43, 42, 55, 58, 52],
                status: "Óptimo",
                healthIndex: 87
            },
            {
                id: 2,
                name: "Parcela 2",
                area: 4.8,
                crop: "Frijol",
                soilMoisture: 32,
                temperature: [24, 26, 29, 27, 25, 24, 26],
                humidity: [38, 35, 32, 30, 45, 50, 48],
                status: "Requiere riego",
                healthIndex: 65
            },
            {
                id: 3,
                name: "Parcela 3",
                area: 5.4,
                crop: "Café",
                soilMoisture: 48,
                temperature: [22, 23, 25, 24, 22, 23, 24],
                humidity: [60, 62, 58, 55, 65, 67, 64],
                status: "Alerta de plaga",
                healthIndex: 72
            }
        ],
        fieldData: [
            {
                id: 1,
                name: "Parcela 1",
                area: 5.2,
                crop: "Maíz",
                humidity: 52,
                status: "Óptimo"
            },
            {
                id: 2,
                name: "Parcela 2",
                area: 4.8,
                crop: "Frijol",
                humidity: 32,
                status: "Requiere riego"
            },
            {
                id: 3,
                name: "Parcela 3",
                area: 5.4,
                crop: "Café",
                humidity: 48,
                status: "Alerta de plaga"
            }
        ],
        financeData: {
            income: [
                { month: "Ene", value: 120000 },
                { month: "Feb", value: 115000 },
                { month: "Mar", value: 125000 },
                { month: "Abr", value: 135000 },
                { month: "May", value: 142000 },
                { month: "Jun", value: 148000 },
                { month: "Jul", value: 156000 }
            ],
            expenses: [
                { month: "Ene", value: 85000 },
                { month: "Feb", value: 82000 },
                { month: "Mar", value: 88000 },
                { month: "Abr", value: 90000 },
                { month: "May", value: 93000 },
                { month: "Jun", value: 95000 },
                { month: "Jul", value: 96000 }
            ],
            predictedIncome: [
                { month: "Ago", value: 160000 },
                { month: "Sep", value: 168000 },
                { month: "Oct", value: 175000 },
                { month: "Nov", value: 182000 },
                { month: "Dic", value: 190000 }
            ]
        }
    },
    
    // Datos del banco
    bank: {
        creditScore: 82,
        loanStatus: "Aprobado",
        loanAmount: 500000,
        interestRate: 8.5,
        monthlyPayment: 15200,
        remainingAmount: 320000,
        availableCredit: 250000,
        activeLoan: 75000,
        paymentDate: "2025-05-10",
        clients: 124,
        averageLoan: 85000,
        defaultRate: "2.3%",
        paymentHistory: [
            { month: "Ene", amount: 15200, status: "Pagado" },
            { month: "Feb", amount: 15200, status: "Pagado" },
            { month: "Mar", amount: 15200, status: "Pagado" },
            { month: "Abr", amount: 15200, status: "Pagado" },
            { month: "May", amount: 15200, status: "Pagado" },
            { month: "Jun", amount: 15200, status: "Pagado" },
            { month: "Jul", amount: 15200, status: "Pendiente" }
        ],
        riskAssessment: {
            weatherRisk: "Bajo",
            marketRisk: "Medio",
            productionRisk: "Bajo",
            overallRisk: "Bajo"
        },
        nextProducts: [
            {
                name: "Préstamo de Expansión",
                amount: 800000,
                interestRate: 7.8,
                term: 36
            },
            {
                name: "Seguro de Cosecha",
                coverage: 600000,
                premium: 45000,
                term: 12
            }
        ]
    },
    
    // Datos del comprador
    buyer: {
        name: "Distribuidora Agrícola del Norte",
        productsInterest: ["Maíz orgánico", "Frijol orgánico"],
        orders: 12,
        totalVolume: 450,
        averagePrice: 18.5,
        nextDeliveryDate: "2025-05-12",
        suppliers: 45,
        pendingDeliveries: 3,
        qualityScore: 92,
        lastPurchase: {
            date: "2025-03-15",
            amount: 280000,
            products: [
                { name: "Maíz", quantity: 3500, unit: "kg", price: 58 },
                { name: "Frijol", quantity: 1200, unit: "kg", price: 75 }
            ]
        },
        upcomingDeals: [
            {
                product: "Maíz",
                quantity: 4000,
                unit: "kg",
                price: 60,
                date: "2025-05-20",
                estimatedValue: 240000
            },
            {
                product: "Frijol",
                quantity: 1500,
                unit: "kg",
                price: 78,
                date: "2025-05-25",
                estimatedValue: 117000
            }
        ],
        marketPrices: [
            { product: "Maíz", currentPrice: 58, trend: "+2.5%" },
            { product: "Frijol", currentPrice: 75, trend: "+4.1%" },
            { product: "Café", currentPrice: 180, trend: "+1.2%" }
        ],
        certification: {
            status: "En proceso",
            type: "Orgánica",
            progress: 65,
            estimatedCompletion: "2025-06-30",
            potentialPriceIncrease: "15%"
        }
    },
    
    // Datos de alertas
    alerts: [
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
    ],
    
    // Datos de recomendaciones
    recommendations: [
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
    ],
    
    // Datos del clima
    weather: {
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
    }
};

// Exportar datos para uso en el dashboard
if (typeof module !== 'undefined' && module.exports) {
  module.exports = demoData;
}