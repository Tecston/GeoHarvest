// Datos de prueba para el dashboard de GeoHarvest
const demoData = {
  // Datos del sensor - Últimos 30 días
  sensorData: {
    humidity: {
      labels: Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (30 - i));
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          label: 'Humedad del suelo (%)',
          data: [42, 45, 45, 43, 40, 42, 44, 46, 45, 43, 41, 40, 39, 40, 42, 45, 48, 50, 48, 45, 44, 43, 42, 41, 39, 37, 38, 40, 42, 43],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.4
        }
      ],
      thresholds: {
        critical: 25,
        warning: 35,
        optimal: [40, 55]
      }
    },
    temperature: {
      labels: Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (30 - i));
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: [24, 25, 26, 27, 28, 29, 30, 31, 32, 31, 30, 28, 27, 26, 25, 24, 25, 26, 27, 28, 29, 30, 30, 29, 28, 27, 26, 25, 24, 25],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.4
        }
      ],
      thresholds: {
        critical: 35,
        warning: 32,
        optimal: [20, 30]
      }
    },
    nutrients: {
      nitrogen: {
        current: 65,
        optimal: 75,
        status: 'warning'
      },
      phosphorus: {
        current: 82,
        optimal: 80,
        status: 'good'
      },
      potassium: {
        current: 58,
        optimal: 70,
        status: 'warning'
      },
      ph: {
        current: 6.5,
        optimal: [6.0, 7.0],
        status: 'good'
      }
    }
  },

  // Datos de cultivo
  crops: {
    maiz: {
      parcels: ['Parcela 1', 'Parcela 2', 'Parcela 3', 'Parcela 4'],
      health: [85, 72, 90, 78],
      yield: {
        predicted: 7.8,
        previous: 7.0,
        trend: '+11.4%',
        historical: [6.5, 6.8, 7.0, 7.8]
      },
      revenue: {
        predicted: 156000,
        previous: 140000,
        trend: '+11.4%'
      }
    },
    trigo: {
      parcels: ['Parcela 1', 'Parcela 2', 'Parcela 3', 'Parcela 4'],
      health: [65, 82, 70, 88],
      yield: {
        predicted: 4.2,
        previous: 3.8,
        trend: '+10.5%',
        historical: [3.5, 3.6, 3.8, 4.2]
      },
      revenue: {
        predicted: 126000,
        previous: 114000,
        trend: '+10.5%'
      }
    },
    frijol: {
      parcels: ['Parcela 1', 'Parcela 2', 'Parcela 3', 'Parcela 4'],
      health: [75, 68, 80, 85],
      yield: {
        predicted: 2.5,
        previous: 2.3,
        trend: '+8.7%',
        historical: [2.0, 2.1, 2.3, 2.5]
      },
      revenue: {
        predicted: 87500,
        previous: 80500,
        trend: '+8.7%'
      }
    }
  },

  // Datos satelitales NDVI y EVI
  satellite: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        label: 'NDVI (Índice de vegetación)',
        data: [0.3, 0.4, 0.45, 0.5, 0.6, 0.65, 0.7],
        borderColor: 'rgb(46, 125, 50)',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'EVI (Índice de vegetación mejorado)',
        data: [0.25, 0.35, 0.4, 0.48, 0.55, 0.62, 0.65],
        borderColor: 'rgb(156, 204, 101)',
        backgroundColor: 'rgba(156, 204, 101, 0.1)',
        fill: true,
        tension: 0.4
      }
    ],
    parcela1: {
      factor: 1.1
    },
    parcela2: {
      factor: 0.9
    },
    parcela3: {
      factor: 1.2
    }
  },

  // Datos de alertas
  alerts: [
    {
      id: 1,
      type: 'high',
      icon: 'fa-triangle-exclamation',
      title: 'Nivel bajo de nitrógeno',
      location: 'Parcela 3',
      time: '10:15 AM',
      date: '22/04/2025',
      details: 'Nivel de nitrógeno en 58%, por debajo del umbral óptimo (65%)'
    },
    {
      id: 2,
      type: 'high',
      icon: 'fa-bug',
      title: 'Riesgo de plaga detectado',
      location: 'Parcela 1',
      time: '08:30 AM',
      date: '22/04/2025',
      details: 'Imágenes satelitales muestran signos de posible infestación'
    },
    {
      id: 3,
      type: 'medium',
      icon: 'fa-temperature-high',
      title: 'Temperatura elevada',
      location: 'Parcela 2',
      time: '07:45 AM', 
      date: '22/04/2025',
      details: 'Temperatura alcanzó 31°C, acercándose al umbral de alerta'
    },
    {
      id: 4,
      type: 'low',
      icon: 'fa-info-circle',
      title: 'Riego programado',
      location: 'Todas las parcelas',
      time: '06:00 AM',
      date: '23/04/2025',
      details: 'Sistema automático programado para irrigación mañana'
    }
  ],

  // Datos de análisis financiero
  financial: {
    cashFlow: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ingresos',
          data: [45000, 42000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000],
          backgroundColor: 'rgba(46, 204, 113, 0.2)',
          borderColor: 'rgba(46, 204, 113, 1)',
          tension: 0.4
        },
        {
          label: 'Gastos',
          data: [40000, 38000, 42000, 45000, 47000, 49000, 52000, 54000, 58000, 61000, 63000, 66000],
          backgroundColor: 'rgba(231, 76, 60, 0.2)',
          borderColor: 'rgba(231, 76, 60, 1)',
          tension: 0.4
        }
      ]
    },
    creditScore: {
      score: 82,
      history: [75, 76, 78, 80, 82],
      factors: {
        paymentHistory: 90,
        utilization: 75,
        length: 85,
        mix: 80
      },
      status: 'Excelente'
    },
    metrics: {
      tir: {
        value: 18.5,
        trend: '+2.3%',
        status: 'up'
      },
      van: {
        value: 256000,
        trend: '+15000',
        status: 'up'
      },
      roi: {
        value: 25.4,
        trend: '-1.2%',
        status: 'down'
      },
      payback: {
        value: 3.2,
        trend: '-0.3',
        status: 'up'
      }
    },
    loans: [
      {
        id: 1,
        type: 'Línea de crédito agrícola',
        amount: 500000,
        rate: 12.5,
        term: 36,
        status: 'Aprobado',
        institution: 'AgroBank',
        date: '15/01/2025'
      },
      {
        id: 2,
        type: 'Préstamo para maquinaria',
        amount: 320000,
        rate: 10.8,
        term: 48,
        status: 'En revisión',
        institution: 'FinAgro',
        date: '05/04/2025'
      },
      {
        id: 3,
        type: 'Crédito para insumos',
        amount: 150000,
        rate: 9.5,
        term: 12,
        status: 'Pre-aprobado',
        institution: 'RuralCredit',
        date: '18/04/2025'
      }
    ],
    simulation: {
      optimistic: {
        tir: 22.5,
        van: 320000,
        roi: 28.4,
        payback: 2.8
      },
      conservative: {
        tir: 18.5,
        van: 256000,
        roi: 25.4,
        payback: 3.2
      },
      pessimistic: {
        tir: 15.2,
        van: 180000,
        roi: 19.8,
        payback: 4.1
      }
    }
  },

  // Datos para el panel de entidades financieras
  bankData: {
    clientRisk: {
      labels: ['Riesgo bajo', 'Riesgo moderado', 'Riesgo alto'],
      data: [65, 25, 10],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336']
    },
    loanPerformance: {
      labels: ['Al día', 'Mora temprana', 'Mora tardía', 'Incobrable'],
      data: [82, 10, 6, 2],
      backgroundColor: ['#4caf50', '#8bc34a', '#ff9800', '#f44336']
    },
    cropDistribution: {
      labels: ['Maíz', 'Trigo', 'Frijol', 'Sorgo', 'Otros'],
      data: [40, 25, 15, 12, 8],
      backgroundColor: ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
    },
    approvalTimeline: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr'],
      datasets: [
        {
          label: 'Tiempo de aprobación (días)',
          data: [12, 10, 8, 6],
          backgroundColor: '#4caf50'
        }
      ]
    },
    clients: [
      {
        id: 1,
        name: 'Carlos Rodríguez',
        location: 'Hermosillo, Sonora',
        crop: 'Lechuga hidropónica',
        score: 87,
        status: 'Excelente',
        loans: 2,
        amount: 750000,
        performance: 'Al día'
      },
      {
        id: 2,
        name: 'María González',
        location: 'Culiacán, Sinaloa',
        crop: 'Tomate',
        score: 76,
        status: 'Bueno',
        loans: 1,
        amount: 350000,
        performance: 'Al día'
      },
      {
        id: 3,
        name: 'José Martínez',
        location: 'La Barca, Jalisco',
        crop: 'Maíz',
        score: 65,
        status: 'Regular',
        loans: 1,
        amount: 250000,
        performance: 'Mora temprana'
      },
      {
        id: 4,
        name: 'Luisa Fernández',
        location: 'Ciudad Obregón, Sonora',
        crop: 'Trigo',
        score: 91,
        status: 'Excelente',
        loans: 3,
        amount: 1200000,
        performance: 'Al día'
      },
      {
        id: 5,
        name: 'Roberto Díaz',
        location: 'Zamora, Michoacán',
        crop: 'Fresa',
        score: 72,
        status: 'Bueno',
        loans: 1,
        amount: 480000,
        performance: 'Mora temprana'
      }
    ]
  },

  // Datos para el panel de compradores
  buyerData: {
    supplierMap: {
      regions: [
        {
          name: 'Sonora',
          suppliers: 35,
          products: ['Trigo', 'Lechuga', 'Uva'],
          coordinates: [29.2972, -110.3309]
        },
        {
          name: 'Sinaloa',
          suppliers: 42,
          products: ['Tomate', 'Chile', 'Maíz'],
          coordinates: [25.8236, -108.2185]
        },
        {
          name: 'Jalisco',
          suppliers: 28,
          products: ['Maíz', 'Agave', 'Frambuesa'],
          coordinates: [20.6595, -103.3494]
        },
        {
          name: 'Michoacán',
          suppliers: 33,
          products: ['Aguacate', 'Fresa', 'Zarzamora'],
          coordinates: [19.5665, -101.7068]
        },
        {
          name: 'Guanajuato',
          suppliers: 24,
          products: ['Fresa', 'Brócoli', 'Lechuga'],
          coordinates: [21.0190, -101.2574]
        }
      ]
    },
    productAvailability: {
      labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
      datasets: [
        {
          label: 'Maíz (toneladas)',
          data: [500, 750, 900, 1200, 1000, 800],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)'
        },
        {
          label: 'Trigo (toneladas)',
          data: [300, 450, 600, 750, 820, 700],
          borderColor: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)'
        },
        {
          label: 'Frijol (toneladas)',
          data: [150, 200, 280, 350, 320, 290],
          borderColor: '#9c27b0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)'
        }
      ]
    },
    certificates: {
      labels: ['Orgánico', 'Global G.A.P.', 'Fair Trade', 'HACCP', 'Sin certificar'],
      data: [35, 25, 15, 10, 15],
      backgroundColor: ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#e0e0e0']
    },
    suppliers: [
      {
        id: 1,
        name: 'Agrícola Santa Rosa',
        location: 'Hermosillo, Sonora',
        product: 'Lechuga hidropónica',
        certifications: ['Orgánico', 'Global G.A.P.'],
        reliability: 95,
        lastDelivery: '18/04/2025',
        nextAvailable: '25/04/2025',
        quantity: '1.5 toneladas',
        priceRange: '$18-22 MXN/kg'
      },
      {
        id: 2,
        name: 'Productora El Valle',
        location: 'Culiacán, Sinaloa',
        product: 'Tomate',
        certifications: ['HACCP', 'Fair Trade'],
        reliability: 88,
        lastDelivery: '15/04/2025',
        nextAvailable: '29/04/2025',
        quantity: '3 toneladas',
        priceRange: '$14-16 MXN/kg'
      },
      {
        id: 3,
        name: 'Cooperativa La Barca',
        location: 'La Barca, Jalisco',
        product: 'Maíz',
        certifications: ['Global G.A.P.'],
        reliability: 85,
        lastDelivery: '10/04/2025',
        nextAvailable: '30/04/2025',
        quantity: '8 toneladas',
        priceRange: '$7-8 MXN/kg'
      },
      {
        id: 4,
        name: 'Agropecuaria del Sur',
        location: 'Zamora, Michoacán',
        product: 'Fresa',
        certifications: ['Orgánico', 'Fair Trade', 'Global G.A.P.'],
        reliability: 93,
        lastDelivery: '20/04/2025',
        nextAvailable: '27/04/2025',
        quantity: '1 tonelada',
        priceRange: '$45-52 MXN/kg'
      },
      {
        id: 5,
        name: 'Hortícola San José',
        location: 'Guanajuato, Guanajuato',
        product: 'Brócoli',
        certifications: ['HACCP', 'Global G.A.P.'],
        reliability: 90,
        lastDelivery: '16/04/2025',
        nextAvailable: '26/04/2025',
        quantity: '2 toneladas',
        priceRange: '$22-25 MXN/kg'
      }
    ],
    orders: [
      {
        id: 'ORD-2025-042',
        supplier: 'Agrícola Santa Rosa',
        product: 'Lechuga hidropónica',
        quantity: '0.8 toneladas',
        orderDate: '15/04/2025',
        deliveryDate: '25/04/2025',
        status: 'En proceso',
        totalPrice: '$15,200 MXN'
      },
      {
        id: 'ORD-2025-039',
        supplier: 'Productora El Valle',
        product: 'Tomate',
        quantity: '1.5 toneladas',
        orderDate: '12/04/2025',
        deliveryDate: '29/04/2025',
        status: 'Confirmado',
        totalPrice: '$22,500 MXN'
      },
      {
        id: 'ORD-2025-035',
        supplier: 'Cooperativa La Barca',
        product: 'Maíz',
        quantity: '5 toneladas',
        orderDate: '08/04/2025',
        deliveryDate: '30/04/2025',
        status: 'Pagado',
        totalPrice: '$37,500 MXN'
      },
      {
        id: 'ORD-2025-031',
        supplier: 'Hortícola San José',
        product: 'Brócoli',
        quantity: '1 tonelada',
        orderDate: '05/04/2025',
        deliveryDate: '26/04/2025',
        status: 'En tránsito',
        totalPrice: '$24,000 MXN'
      }
    ]
  },

  // Datos de predicciones y recomendaciones
  predictions: {
    weatherForecast: [
      {
        day: 'Hoy',
        date: '22/04/2025',
        icon: 'fa-sun',
        temp: 26,
        condition: 'Despejado',
        precipitation: '0%',
        humidity: '45%',
        wind: '10 km/h'
      },
      {
        day: 'Mañana',
        date: '23/04/2025',
        icon: 'fa-cloud-sun',
        temp: 24,
        condition: 'Parcialmente nublado',
        precipitation: '10%',
        humidity: '50%',
        wind: '12 km/h'
      },
      {
        day: 'Jueves',
        date: '24/04/2025',
        icon: 'fa-cloud-sun-rain',
        temp: 22,
        condition: 'Chubascos',
        precipitation: '40%',
        humidity: '65%',
        wind: '15 km/h'
      },
      {
        day: 'Viernes',
        date: '25/04/2025',
        icon: 'fa-cloud-rain',
        temp: 20,
        condition: 'Lluvia',
        precipitation: '80%',
        humidity: '75%',
        wind: '20 km/h'
      },
      {
        day: 'Sábado',
        date: '26/04/2025',
        icon: 'fa-cloud',
        temp: 22,
        condition: 'Nublado',
        precipitation: '20%',
        humidity: '60%',
        wind: '15 km/h'
      }
    ],
    recommendations: [
      {
        id: 1,
        action: 'Aplicar fertilizante',
        location: 'Parcela 3',
        urgency: 'high',
        impact: 'Alto',
        basis: 'Análisis de suelo muestra deficiencia de nitrógeno',
        savings: '12%',
        icon: 'fa-flask'
      },
      {
        id: 2,
        action: 'Revisar sistema de riego',
        location: 'Parcela 2',
        urgency: 'medium',
        impact: 'Medio',
        basis: 'Sensores muestran distribución desigual de humedad',
        savings: '8%',
        icon: 'fa-faucet-drip'
      },
      {
        id: 3,
        action: 'Planificar cosecha',
        location: 'Todas las parcelas',
        urgency: 'low',
        impact: 'Alto',
        basis: 'Predicción de madurez óptima en 7-10 días',
        savings: '15%',
        icon: 'fa-tractor'
      },
      {
        id: 4,
        action: 'Inspeccionar por plagas',
        location: 'Parcela 1',
        urgency: 'high',
        impact: 'Alto',
        basis: 'Imágenes satelitales muestran patrones de posible infestación',
        savings: '25%',
        icon: 'fa-bug'
      },
      {
        id: 5,
        action: 'Preparar cobertura ante lluvia',
        location: 'Parcela 4',
        urgency: 'medium',
        impact: 'Medio',
        basis: 'Pronóstico de lluvia intensa en 3 días',
        savings: '10%',
        icon: 'fa-cloud-rain'
      }
    ]
  },

  // KPIs clave
  kpis: {
    moneyMetrics: {
      monthlyCredits: {
        value: '$2,500,000',
        trend: '+15%',
        status: 'up'
      },
      resourceSavings: {
        value: '$350,000',
        trend: '+8%',
        status: 'up'
      },
      averageROI: {
        value: '25.4%',
        trend: '-1.2%',
        status: 'down'
      },
      responseTime: {
        value: '6 días',
        trend: '-25%',
        status: 'up'
      }
    },
    farmMetrics: {
      monthlyIncome: {
        value: '$156,000',
        trend: '+12%',
        status: 'up'
      },
      waterSaved: {
        value: '15%',
        trend: '+3%',
        status: 'up'
      },
      yieldIncrease: {
        value: '11.4%',
        trend: '+2.1%',
        status: 'up'
      },
      carbonReduced: {
        value: '18.5 ton',
        trend: '+5%',
        status: 'up'
      }
    }
  }
};

// Exportar datos para uso en el dashboard
if (typeof module !== 'undefined' && module.exports) {
  module.exports = demoData;
}