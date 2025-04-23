// Función para redireccionar al dashboard
function goToDashboard() {
  window.location.href = "dashboard.html";
}

// Crear animación 3D para fondo del hero usando Three.js
function initHeroBackground() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 1500;
  
  const posArray = new Float32Array(particleCount * 3);
  const scaleArray = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Position in 3D space
    posArray[i] = (Math.random() - 0.5) * 10;
    posArray[i + 1] = (Math.random() - 0.5) * 10;
    posArray[i + 2] = (Math.random() - 0.5) * 10;
    
    // Scale for each particle
    scaleArray[i/3] = Math.random();
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
  
  // Material with custom shader
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x157A6E,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);
  
  camera.position.z = 5;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    particleSystem.rotation.x += 0.0005;
    particleSystem.rotation.y += 0.0008;
    
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

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Initialize 3D background
  initHeroBackground();

  // Animación de entrada para elementos de la página
  animateOnScroll();

  // Añadir efecto de scroll suave para los enlaces internos
  setupSmoothScrolling();

  // Inicializar números animados
  setupCounterAnimation();

  // Cambiar header al hacer scroll
  setupStickyHeader();

  // Configurar botón de dashboard
  const dashboardBtn = document.getElementById('dashboardBtn');
  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
      goToDashboard();
    });

    // Add hover-lift class for CSS-based hover effect
    dashboardBtn.classList.add('hover-lift');
  }

  // Configurar todos los botones con clase btn-cta que necesitan ir al dashboard
  document.querySelectorAll('.btn-cta').forEach(button => {
    button.addEventListener('click', () => {
      goToDashboard();
    });

    // Add hover-lift class for CSS-based hover effect
    button.classList.add('hover-lift');
  });

  // Add hover-lift class to plan cards for consistent hover effects
  const planCards = document.querySelectorAll('.plan');
  planCards.forEach(card => {
    card.classList.add('hover-lift');
  });

  // Add hover-lift class to team member cards
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    member.classList.add('hover-lift');
  });

  // Pulse animation for key buttons
  function addPulseEffect(button) {
    button.addEventListener('click', function() {
      this.classList.add('pulse');
      setTimeout(() => {
        this.classList.remove('pulse');
      }, 1000);
    });
  }

  const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary');
  ctaButtons.forEach(button => {
    addPulseEffect(button);
  });
});

// Función para animar elementos cuando entran en el viewport
function animateOnScroll() {
  const fadeElements = document.querySelectorAll('.fade-ready');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });
}

// Configurar desplazamiento suave para los enlaces internos
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Añadir efecto de contador para números
function setupCounterAnimation() {
  const roi = document.querySelector('#roi');

  if (roi) {
    const cells = roi.querySelectorAll('td');
    cells.forEach(cell => {
      if (!isNaN(parseFloat(cell.textContent))) {
        const originalValue = cell.textContent;
        if (originalValue.includes('%')) {
          const value = parseFloat(originalValue);
          cell.setAttribute('data-target', value);
          cell.textContent = '0%';
        } else if (originalValue.includes('$')) {
          const value = parseInt(originalValue.replace(/\$|,/g, ''));
          cell.setAttribute('data-target', value);
          cell.textContent = '$0';
        }
      }
    });

    // Observer para iniciar la animación cuando la tabla esté visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cells = entry.target.querySelectorAll('td[data-target]');
          cells.forEach(cell => {
            animateValue(cell);
          });
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.5});

    observer.observe(roi);
  }
}

// Animación de contador
function animateValue(cell) {
  const target = parseFloat(cell.getAttribute('data-target'));
  const isPercentage = cell.textContent.endsWith('%');
  const isDollar = cell.textContent.startsWith('$');
  let startValue = 0;
  const duration = 1500;
  const increment = target / (duration / 16);
  let currentValue = startValue;

  const animateCounter = () => {
    currentValue += increment;

    if (currentValue >= target) {
      if (isPercentage) {
        cell.textContent = target.toFixed(1) + '%';
      } else if (isDollar) {
        cell.textContent = '$' + formatNumber(target);
      } else {
        cell.textContent = target;
      }
    } else {
      if (isPercentage) {
        cell.textContent = currentValue.toFixed(1) + '%';
      } else if (isDollar) {
        cell.textContent = '$' + formatNumber(Math.round(currentValue));
      } else {
        cell.textContent = Math.round(currentValue);
      }
      requestAnimationFrame(animateCounter);
    }
  };

  requestAnimationFrame(animateCounter);
}

// Formatear números con comas para miles
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Header que cambia al hacer scroll
function setupStickyHeader() {
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}