// Función para redireccionar al dashboard
function goToDashboard() {
  window.location.href = "dashboard.html";
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Animación de entrada para elementos de la página
  animateOnScroll();
  
  // Añadir efecto de scroll suave para los enlaces internos
  setupSmoothScrolling();
  
  // Inicializar números animados
  setupCounterAnimation();
  
  // Cambiar header al hacer scroll
  setupStickyHeader();
});

// Función para animar elementos cuando entran en el viewport
function animateOnScroll() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  sections.forEach(section => {
    section.classList.add('fade-ready');
    observer.observe(section);
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
  const headerHeight = header.offsetHeight;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

// Añadir efectos hover a elementos
document.querySelectorAll('.plan, .card-grid li, #equipo li').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
    this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
  });
});

// Añadir efecto de pulse al botón CTA
const ctaButton = document.querySelector('.cta button');
if (ctaButton) {
  setInterval(() => {
    ctaButton.classList.add('pulse');
    setTimeout(() => {
      ctaButton.classList.remove('pulse');
    }, 1000);
  }, 3000);
}