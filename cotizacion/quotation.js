(() => {
  const clearCache = () => {
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML += 'Cache cleared using window.location.href <br>';
    }
    
    if (!window.location.href.includes('nocache')) {
      const baseUrl = window.location.href.split('?')[0];
      window.location.href = `${baseUrl}?nocache=${Date.now()}`;
    }
  };
  
  document.addEventListener("DOMContentLoaded", clearCache);
})();



const contactLink = document.querySelector('.nav__link[href="#"]'); // Selects the "Contact Us" link
let contactCard = null;
const footerWhatsappButton = document.querySelector('.footer__social-link img[alt="WhatsApp"]').parentElement;


function createContactCard(clickEvent) {
  // Prevent the event from propagating
  if (clickEvent) {
    clickEvent.stopPropagation();
  }
  
  // Create card container
  contactCard = document.createElement('div');
  contactCard.className = 'contact-card';
  
  // Create card content
  const cardContent = `
      <div class="contact-card__content">
          <button class="contact-card__close">&times;</button>
          <div class="contact-card__info">
              <div class="contact-card__contact">
                <span class="contact-card__phone">
                  Teléfono: +502 4849-4290
                  <a href="tel:+50248494290" class="phone-link" aria-label="Call +(502)48494290">
                    <img src="./img/phone-icon.png" alt="Call" class="contact-card__phone-icon">
                  </a>
                </span>
                <span class="contact-card__email">Email: cotizaciones@exclusivarentaautos.com</span>
              </div>
              <div class="contact-card__social">
                  <a href="https://www.facebook.com/profile.php?id=100077124247045" class="contact-card__social-link" target="_blank">
                      <img src="./img/social-media-facebook.png" alt="Facebook" class="contact-card__social-icon">
                  </a>
                  <a href="https://www.instagram.com/exclusivarentaautos?igsh=MTN1dWVrOTF1N3A0dQ==" class="contact-card__social-link" target="_blank">
                      <img src="./img/social-media-instagram.png" alt="Instagram" class="contact-card__social-icon">
                  </a>
                  <a href="#" class="contact-card__social-link whatsapp-link">
                      <img src="./img/social-media-whatsapp.png" alt="WhatsApp" class="contact-card__social-icon">
                  </a>
              </div>
          </div>
      </div>
  `;
  
  contactCard.innerHTML = cardContent;
  
  // Add card to the DOM
  document.body.appendChild(contactCard);
  
  // Add event listener to close button
  const closeButton = contactCard.querySelector('.contact-card__close');
  closeButton.addEventListener('click', hideContactCard);
  
  // Add event listener to WhatsApp link
  const whatsappLink = contactCard.querySelector('.whatsapp-link');
  if (whatsappLink) {
    whatsappLink.addEventListener('click', function(event) {
      event.preventDefault();
      const phoneNumber = '+50248494290';
      const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
  
  // Show the card with animation
  setTimeout(() => {
      contactCard.classList.add('active');
  }, 10);
  
  // Add outside click listener - but with a delay to prevent immediate triggering
  setTimeout(() => {
    document.addEventListener('click', closeCardOutside);
  }, 100);
}

// Hide contact card function
function hideContactCard() {
  if (contactCard) {
      contactCard.classList.remove('active');
      
      // Wait for transition to finish before removing from DOM
      setTimeout(() => {
          if (contactCard && contactCard.parentNode) {
              document.body.removeChild(contactCard);
              contactCard = null;
          }
      }, 300); // Match transition duration
      
      // Remove outside click listener
      document.removeEventListener('click', closeCardOutside);
  }
}

// Close card when clicking outside
function closeCardOutside(event) {
  if (contactCard && 
      !contactCard.contains(event.target) && 
      !event.target.classList.contains('nav__link')) {
      hideContactCard();
  }
}

// Toggle contact card function
function toggleContactCard(event) {
  event.preventDefault();
  event.stopPropagation(); // Stop the event from bubbling up
  
  if (contactCard) {
      hideContactCard();
  } else {
      createContactCard(event);
  }
}

// Add event listener to contact link
document.addEventListener('DOMContentLoaded', function() {
  const contactLinks = document.querySelectorAll('.nav__link');
  contactLinks.forEach(link => {
      if (link.textContent.trim() === 'Contáctanos') {
          link.addEventListener('click', toggleContactCard);
      }
  });
});

// Array de vehículos disponibles
const cars = [
  // MICROBUSES
  {
    id: 1,
    name: "Toyota Hiace",
    category: "Microbuses",
    imageUrl: "./img/hiace.png?v=2",
    price: 80,
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
    imageUrl: "./img/urvan.png?v=2",
    price: 80,
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
    imageUrl: "./img/h1.png?v=2",
    price: 70,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  {
    id: 4,
    name: "Hyundai Staria",
    category: "Microbuses",
    imageUrl: "./img/staria.png?v=2",
    price: 80,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  
  // SUVs
  {
    id: 5,
    name: "Toyota Fortuner",
    category: "SUVs",
    imageUrl: "./img/fortuner.png?v=2",
    price: 95,
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
    imageUrl: "./img/montero.png?v=2",
    price: 80,
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
    imageUrl: "./img/santafe.png?v=2",
    price: 65,
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
    imageUrl: "./img/outlander.png?v=2",
    price: 65,
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
    imageUrl: "./img/hilux.png?v=2",
    price: 75,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  {
    id: 10,
    name: "Mitsubishi L200",
    category: "Pick-ups",
    imageUrl: "./img/l200.png?v=2",
    price: 75,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Manual/Automático"
    }
  },
  {
    id: 11,
    name: "Nissan Frontier",
    category: "Pick-ups",
    imageUrl: "./img/frontier.png?v=2",
    price: 75,
    specs: {
      airConditioner: "Sí",
      fuel: "Diésel",
      transmission: "Automático/Manual"
    }
  },
  
  // CROSSOVER
  {
    id: 12,
    name: "Hyundai Creta",
    category: "Crossovers",
    imageUrl: "./img/creta.png?v=2",
    price: 55,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 13,
    name: "Nissan Kicks",
    category: "Crossovers",
    imageUrl: "./img/kicks.png?v=2",
    price: 45,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 14,
    name: "Kia Sonet",
    category: "Crossovers",
    imageUrl: "./img/sonet.png?v=2",
    price: 45,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 15,
    name: "Mitsubishi Xpander",
    category: "Crossovers",
    imageUrl: "./img/xpander-v2.png?v=2",
    price: 55,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 16,
    name: "Kia Rio",
    category: "Sedanes",
    imageUrl: "./img/rio.png?v=2",
    price: 35,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 17,
    name: "Hyundai Verna",
    category: "Sedanes",
    imageUrl: "./img/verna.png?v=2",
    price: 35,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  },
  {
    id: 18,
    name: "Toyota Corolla",
    category: "Sedanes",
    imageUrl: "./img/corolla.png?v=3",
    price: 35,
    specs: {
      airConditioner: "Sí",
      fuel: "Gasolina",
      transmission: "Automático"
    }
  }
  ]

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
const whatsappNumber = "50248494290"; // Número correcto sin el signo +

// Variables globales
let selectedCar = null;


function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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

function validateDates() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const today = new Date();

  // Asegurar que today no tenga horas para comparación exacta
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Calcular la fecha de ayer
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Limpiar cualquier error previo
  startDateInput.setCustomValidity('');
  endDateInput.setCustomValidity('');

  // Validación de fecha de inicio
  // Permite seleccionar el día de hoy o un día antes
  if (startDate < yesterday) {
    startDateInput.setCustomValidity('La fecha de inicio no puede ser anterior a hoy');
    startDateInput.reportValidity();
    return false;
  }

  // Calcular fecha mínima de devolución (2 días después de la fecha de inicio)
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 2);

  if (endDate < minEndDate) {
    endDateInput.setCustomValidity('La fecha de devolución debe ser al menos 2 días después de la fecha de inicio');
    endDateInput.reportValidity();
    return false;
  }

  return true;
}

function setInitialDateRestrictions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calcular la fecha de ayer
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Formatear la fecha de ayer para el input
  const yesterdayString = yesterday.toISOString().split('T')[0];
  startDateInput.min = yesterdayString;

  // Calcular fecha mínima para fecha de devolución (2 días después de la fecha de inicio)
  const minEndDate = new Date(today);
  minEndDate.setDate(today.getDate() + 2);
  const minEndDateString = minEndDate.toISOString().split('T')[0];

  endDateInput.min = minEndDateString;
}

function getDateForWhatsApp(dateInput) {
  return dateInput.value; // Mantiene la fecha exacta ingresada sin modificarla
}

// ---------------------------------------------------

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
  setInitialDateRestrictions();
}

// Función para volver al catálogo
function backToCatalog() {
  quotationSection.style.display = 'none';
  document.querySelector('.catalog').style.display = 'block';
  selectedCar = null;
}

// Función para formatear la fecha como texto en español considerando la zona horaria de Guatemala
function formatDateAsText(dateString) {
  // Crear fecha en UTC
  const dateUTC = new Date(dateString);
  
  // Ajustar a la zona horaria de Guatemala (UTC-6)
  // Nota: usamos una fecha con hora 0 para evitar que el cambio de día afecte el resultado
  const dateString12PM = dateString + 'T12:00:00';
  const dateWithTime = new Date(dateString12PM);
  
  const day = dateWithTime.getDate();
  
  // Array con los nombres de los meses en español
  const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const month = months[dateWithTime.getMonth()];
  const year = dateWithTime.getFullYear();
  
  return `${day} de ${month} de ${year}`;
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
  
  if (startTimeInput && endTimeInput && (!startTime || !endTime)) {
      alert('Por favor selecciona horas de inicio y devolución');
      return;
  }
  
  // Validar fechas antes de enviar
  if (!validateDates()) {
    return;
  }
  
  // Formatear las fechas como texto en español
  const formattedStartDate = formatDateAsText(startDate);
  const formattedEndDate = formatDateAsText(endDate);
  
  // Crear mensaje para WhatsApp con zona horaria
  const message = `*¡Mucho gusto!*

Me interesa cotizar el siguiente vehículo:
▪️ *Modelo:* ${selectedCar.name}
▪️ *Categoría:* ${selectedCar.category}

*Detalles de la cotización:*
📅 *Fecha de inicio:* ${formattedStartDate}
⏰ *Hora de inicio:* ${startTime} (hora de Guatemala)
📅 *Fecha de entrega:* ${formattedEndDate}
⏰ *Hora de entrega:* ${endTime} (hora de Guatemala)`;
  
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
  calculateBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir envío por defecto
    sendToWhatsApp();
  });
  
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
          // Establecer fecha mínima de devolución
          const minEndDate = new Date(startDateInput.value);
          minEndDate.setDate(minEndDate.getDate() + 1);
          
          // Formatear la fecha mínima para el input de fecha de devolución
          const minEndDateString = minEndDate.toISOString().split('T')[0];
          endDateInput.min = minEndDateString;
          
          // Limpiar valor de fecha de devolución si es inválido
          if (new Date(endDateInput.value) < minEndDate) {
              endDateInput.value = '';
          }
      }
  });

  // Establecer restricciones de fecha iniciales
  setInitialDateRestrictions();
});

// Evento para botón de WhatsApp en footer
if (footerWhatsappButton) {
  footerWhatsappButton.addEventListener('click', function(event) {
      event.preventDefault();
      const phoneNumber = '50248494290';
      const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
  });
}