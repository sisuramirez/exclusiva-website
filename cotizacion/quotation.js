// Array de vehículos disponibles
const cars = [
  // MICROBUSES
  {
    id: 1,
    name: "Toyota Hiace",
    category: "Microbuses",
    imageUrl: "./img/hiace.png",
    price: 120,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Manual"
    }
  },
  {
    id: 2,
    name: "Nissan Urvan",
    category: "Microbuses",
    imageUrl: "./img/urvan.png",
    price: 115,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Manual"
    }
  },
  {
    id: 3,
    name: "Hyundai H1",
    category: "Microbuses",
    imageUrl: "./img/h1.png",
    price: 125,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  {
    id: 4,
    name: "Hyundai Staria",
    category: "Microbuses",
    imageUrl: "./img/staria.png",
    price: 130,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  
  // SUVs
  {
    id: 5,
    name: "Toyota Fortuner",
    category: "SUVs",
    imageUrl: "./img/fortuner.png",
    price: 110,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  {
    id: 6,
    name: "Mitsubishi Montero",
    category: "SUVs",
    imageUrl: "./img/montero.png",
    price: 115,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  {
    id: 7,
    name: "Hyundai Santa Fe",
    category: "SUVs",
    imageUrl: "./img/santafe.png",
    price: 105,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 8,
    name: "Mitsubishi Outlander",
    category: "SUVs",
    imageUrl: "./img/outlander.png",
    price: 100,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  
  // PICK-UPS
  {
    id: 9,
    name: "Toyota Hilux",
    category: "Pick-ups",
    imageUrl: "./img/hilux.png",
    price: 100,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  {
    id: 10,
    name: "Mitsubishi L200",
    category: "Pick-ups",
    imageUrl: "./img/l200.png",
    price: 95,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Manual"
    }
  },
  {
    id: 11,
    name: "Nissan Frontier",
    category: "Pick-ups",
    imageUrl: "./img/frontier.png",
    price: 98,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático"
    }
  },
  
  // CROSSOVER
  {
    id: 12,
    name: "Nissan Kicks",
    category: "Crossovers",
    imageUrl: "./img/kicks.png",
    price: 85,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 13,
    name: "Kia Sonet",
    category: "Crossovers",
    imageUrl: "./img/sonet.png",
    price: 80,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 14,
    name: "Mitsubishi Xpander",
    category: "Crossovers",
    imageUrl: "./img/xpander.png",
    price: 90,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  }
];

// Elementos del DOM
const catalogGrid = document.getElementById('catalog-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const quotationSection = document.getElementById('quotation-section');
const backBtn = document.getElementById('back-btn');
const selectedCarInfo = document.getElementById('selected-car-info');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const startTimeInput = document.getElementById('start-time'); // Referencia al nuevo campo de hora de inicio
const endTimeInput = document.getElementById('end-time');     // Referencia al nuevo campo de hora de entrega
const calculateBtn = document.getElementById('calculate-btn');
const quotationResult = document.getElementById('quotation-result');
const hamburgerBtn = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const whatsappNumber = "50244771088"; // Número correcto sin el signo +

// Variables globales
let selectedCar = null;

// Función para formatear precio a formato de moneda
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
  }).format(amount);
}

// Función para crear una card de auto
function createCarCard(car) {
  const carCard = document.createElement('div');
  carCard.className = 'car-card';
  carCard.dataset.category = car.category;
  
  carCard.innerHTML = `
      <img src="${car.imageUrl}" alt="${car.name}" class="car-card__image">
      <div class="car-card__content">
          <div class="car-card__header">
              <h3 class="car-card__title">${car.name}</h3>
              <span class="car-card__category">${car.category}</span>
          </div>
          <div class="car-card__specs">
              <div class="car-card__spec">
                  <span class="car-card__spec-icon">❄️</span>
                  <span class="car-card__spec-text">Aire acondicionado: ${car.specs.airConditioner}</span>
              </div>
              <div class="car-card__spec">
                  <span class="car-card__spec-icon">⛽</span>
                  <span class="car-card__spec-text">Combustible: ${car.specs.fuel}</span>
              </div>
              <div class="car-card__spec">
                  <span class="car-card__spec-icon">🔄</span>
                  <span class="car-card__spec-text">Transmisión: ${car.specs.transmission}</span>
              </div>
          </div>
          <div class="car-card__footer">
              <span class="car-card__price">Precio desde: ${formatCurrency(car.price)}/día</span>
              <button class="car-card__button" data-id="${car.id}">Cotizar este auto</button>
          </div>
      </div>
  `;
  
  return carCard;
}

// Función para mostrar todos los autos o filtrar por categoría
function displayCars(category = 'all') {
  catalogGrid.innerHTML = '';
  
  cars.forEach(car => {
      if (category === 'all' || car.category === category) {
          const carCard = createCarCard(car);
          catalogGrid.appendChild(carCard);
      }
  });
  
  // Agregar event listeners a los botones de cotizar
  document.querySelectorAll('.car-card__button').forEach(button => {
      button.addEventListener('click', () => {
          const carId = parseInt(button.dataset.id);
          selectedCar = cars.find(car => car.id === carId);
          showQuotationSection();
      });
  });
}

// Función para mostrar sección de cotización
function showQuotationSection() {
  document.querySelector('.catalog').style.display = 'none';
  quotationSection.style.display = 'block';
  
  // Mostrar información del auto seleccionado
  selectedCarInfo.innerHTML = `
      <img src="${selectedCar.imageUrl}" alt="${selectedCar.name}" class="quotation__car-image">
      <div class="quotation__car-details">
          <h3 class="quotation__car-title">${selectedCar.name}</h3>
          <span class="quotation__car-category">${selectedCar.category}</span>
          <div class="quotation__car-specs">
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">❄️</span>
                  <span class="quotation__car-spec-text">Aire acondicionado: ${selectedCar.specs.airConditioner}</span>
              </div>
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">⛽</span>
                  <span class="quotation__car-spec-text">Combustible: ${selectedCar.specs.fuel}</span>
              </div>
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">🔄</span>
                  <span class="quotation__car-spec-text">Transmisión: ${selectedCar.specs.transmission}</span>
              </div>
              <div class="quotation__car-spec">
                  <span class="car-card__spec-icon">💰</span>
                  <span class="quotation__car-spec-text">Precio base: ${formatCurrency(selectedCar.price)}/día</span>
              </div>
          </div>
      </div>
  `;
  
  // Limpiar inputs y resultado de cotización
  startDateInput.value = '';
  endDateInput.value = '';
  if (startTimeInput) startTimeInput.value = '';
  if (endTimeInput) endTimeInput.value = '';
  quotationResult.style.display = 'none';
  
  // Establecer valores mínimos para las fechas
  const today = new Date().toISOString().split('T')[0];
  startDateInput.min = today;
  endDateInput.min = today;
}

// Función para volver al catálogo
function backToCatalog() {
  quotationSection.style.display = 'none';
  document.querySelector('.catalog').style.display = 'block';
  selectedCar = null;
}

// Función para enviar mensaje a WhatsApp
function sendToWhatsApp() {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const startTime = startTimeInput ? startTimeInput.value : '';
  const endTime = endTimeInput ? endTimeInput.value : '';
  
  // Validaciones
  if (!startDate || !endDate) {
      alert('Por favor selecciona fechas de inicio y devolución');
      return;
  }
  
  if (!startTime || !endTime) {
      alert('Por favor selecciona horas de inicio y devolución');
      return;
  }
  
  const formattedStartDate = new Date(startDate).toLocaleDateString('es-MX');
  const formattedEndDate = new Date(endDate).toLocaleDateString('es-MX');
  
  // Crear mensaje para WhatsApp
  const message = `*¡Mucho gusto!*

Me interesa rentar el siguiente vehículo:
▪️ *Modelo:* ${selectedCar.name}
▪️ *Categoría:* ${selectedCar.category}

*Detalles de la reserva:*
📅 *Fecha de inicio:* ${formattedStartDate}
⏰ *Hora de recogida:* ${startTime}
📅 *Fecha de entrega:* ${formattedEndDate}
⏰ *Hora de entrega:* ${endTime}`;
  
  // URL de WhatsApp con el mensaje - usar el número correcto sin el signo +
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  // Abrir WhatsApp en una nueva ventana
  window.open(whatsappUrl, '_blank');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar todos los autos al cargar la página
  displayCars();
  
  // Filtrar autos por categoría
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filterValue = button.dataset.filter;
          
          // Actualizar botón activo
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Mostrar autos filtrados
          displayCars(filterValue);
      });
  });
  
  // Botón de regresar al catálogo
  backBtn.addEventListener('click', backToCatalog);
  
  // Botón para calcular cotización - cambiado para enviar a WhatsApp
  calculateBtn.addEventListener('click', sendToWhatsApp);
  
  // Menu hamburguesa
  hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animar las líneas del hamburger
      const lines = hamburgerBtn.querySelectorAll('.nav__hamburger-line');
      if (navMenu.classList.contains('active')) {
          lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          lines[1].style.opacity = '0';
          lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
          lines[0].style.transform = 'none';
          lines[1].style.opacity = '1';
          lines[2].style.transform = 'none';
      }
  });
  
  // Evento para fecha de inicio que actualiza la fecha mínima de devolución
  startDateInput.addEventListener('change', () => {
      if (startDateInput.value) {
          endDateInput.min = startDateInput.value;
      }
  });
});
