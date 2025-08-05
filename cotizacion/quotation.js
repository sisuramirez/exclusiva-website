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

const contactLink = document.querySelector('.nav__link[href="#"]');
let contactCard = null;
const footerWhatsappButton = document.querySelector('.footer__social-link img[alt="WhatsApp"]').parentElement;


function createContactCard(clickEvent) {
  if (clickEvent) {
    clickEvent.stopPropagation();
  }

  contactCard = document.createElement('div');
  contactCard.className = 'contact-card';

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

  document.body.appendChild(contactCard);

  const closeButton = contactCard.querySelector('.contact-card__close');
  closeButton.addEventListener('click', hideContactCard);

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

  setTimeout(() => {
      contactCard.classList.add('active');
  }, 10);

  setTimeout(() => {
    document.addEventListener('click', closeCardOutside);
  }, 100);
}

function hideContactCard() {
  if (contactCard) {
      contactCard.classList.remove('active');

      setTimeout(() => {
          if (contactCard && contactCard.parentNode) {
              document.body.removeChild(contactCard);
              contactCard = null;
          }
      }, 300);

      document.removeEventListener('click', closeCardOutside);
  }
}

function closeCardOutside(event) {
  if (contactCard &&
      !contactCard.contains(event.target) &&
      !event.target.classList.contains('nav__link')) {
      hideContactCard();
  }
}

function toggleContactCard(event) {
  event.preventDefault();
  event.stopPropagation();

  if (contactCard) {
      hideContactCard();
  } else {
      createContactCard(event);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const contactLinks = document.querySelectorAll('.nav__link');
  contactLinks.forEach(link => {
      if (link.textContent.trim() === 'Contáctanos') {
          link.addEventListener('click', toggleContactCard);
      }
  });
});

const cars = [
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

  const extraHourRates = {
    "Microbuses": 20,
    "SUVs": 20,
    "Pick-ups": 20,
    "Crossovers": 20,
    "Sedanes": 10
  };

const insuranceAddOns = [
    {
        id: 'cdw',
        name: 'Protección a Terceros',
        dailyCost: 10,
        mandatory: true,
        selected: true,
        description: 'Cubre daños a terceros.',
        popupDescription: 'Esta cobertura es fundamental y obligatoria. Protege contra daños a vehículos, propiedades o personas ajenas al contrato de alquiler, brindándote seguridad completa en la carretera. Incluye responsabilidad civil por lesiones corporales y daños a la propiedad de terceros hasta los límites establecidos por la ley. Es tu primer nivel de protección para conducir con tranquilidad.'
    },
    {
        id: 'tpp',
        name: 'Cobertura Deducible por Pérdida y Daño',
        dailyCost: 10,
        mandatory: false,
        selected: false,
        description: '<strong>Low Damage Waiver (LWD)</strong> <br><br> Cubre deducible por pérdida y daño.',
        popupDescription: 'Si El Arrendatario acepta mediante sus iniciales el deducible por PÉRDIDA/DAÑO que no es un seguro, su responsabilidad se limita a un deducible variable según el caso más gastos por remolque, almacenamiento, recuperación y un cargo razonable por la perdida de uso. Al aceptar esto, "El Arrendatario" conviene pagar una cuota adicional por día o fracción. Si El Arrendatario NO ACEPTA, mediante sus iniciales, su responsabilidad no excederá el VALOR REAL DEL MERCADO del vehículo al momento de su PÉRDIDA/DAÑO, más gastos por remolque, almacenamiento, recuperación y un cobro razonable por la perdida de uso.'
    },
    {
        id: 'pai',
        name: 'Seguro Personal de Accidente',
        dailyCost: 10,
        mandatory: false,
        selected: false,
        description: '<strong>Personal Accident Insurance (PAI)</strong> <br><br> Seguro médico para ocupantes.',
        popupDescription: 'Si el Arrendatario ACEPTA, con sus iniciales, acepta pagar una tarifa adicional cuyo monto variará por día de tracción. El arrendatario acepta haber leído un resumen de los términos y limitaciones de la póliza del Arrendador.'
    }
];

const catalogGrid = document.getElementById('catalog-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const quotationSection = document.getElementById('quotation-section');
const backBtn = document.getElementById('back-btn');
const selectedCarInfo = document.getElementById('selected-car-info');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const calculateBtn = document.getElementById('calculate-btn');
const quotationResult = document.getElementById('quotation-result');
const hamburgerBtn = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const whatsappNumber = "50248494290";

let selectedCar = null;
let currentQuoteDetails = {};


function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  }).format(amount);
}

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

function displayCars(category = 'all') {
  catalogGrid.innerHTML = '';

  cars.forEach(car => {
      if (category === 'all' || car.category === category) {
          const carCard = createCarCard(car);
          catalogGrid.appendChild(carCard);
      }
  });

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

  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  startDateInput.setCustomValidity('');
  endDateInput.setCustomValidity('');

  if (startDate < yesterday) {
    startDateInput.setCustomValidity('La fecha de inicio no puede ser anterior a hoy');
    startDateInput.reportValidity();
    return false;
  }

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

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const yesterdayString = yesterday.toISOString().split('T')[0];
  startDateInput.min = yesterdayString;

  const minEndDate = new Date(today);
  minEndDate.setDate(today.getDate() + 2);
  const minEndDateString = minEndDate.toISOString().split('T')[0];

  endDateInput.min = minEndDateString;
}

const fabWhatsapp = document.getElementById('whatsapp-fab');
      if (fabWhatsapp) {
          fabWhatsapp.addEventListener('click', function(event) {
              event.preventDefault();

              const phoneNumber = '50248494290';
              const message = "Hola, estoy interesado en rentar un vehículo y me gustaría más información.";

              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

              window.open(whatsappUrl, '_blank');
          });
      }

function showQuotationSection() {
  document.querySelector('.catalog').style.display = 'none';
  quotationSection.style.display = 'block';

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
                  <span class="quotation__car-spec-text">Precio desde: ${formatCurrency(selectedCar.price)}/dia</span>
              </div>
          </div>
      </div>
  `;

  startDateInput.value = '';
  endDateInput.value = '';
  if (startTimeInput) startTimeInput.value = '';
  if (endTimeInput) endTimeInput.value = '';
  quotationResult.style.display = 'none';

  setInitialDateRestrictions();
}

function backToCatalog() {
  quotationSection.style.display = 'none';
  document.querySelector('.catalog').style.display = 'block';
  selectedCar = null;
}

function calculateAndDisplayQuote() {
  const startDateValue = startDateInput.value;
  const endDateValue = endDateInput.value;
  const startTimeValue = startTimeInput.value;
  const endTimeValue = endTimeInput.value;

  if (!startDateValue || !endDateValue || !startTimeValue || !endTimeValue) {
    quotationResult.innerHTML = `<p class="error">Por favor, completa todos los campos de fecha y hora para calcular tu cotización.</p>`;
    quotationResult.style.display = 'block';
    return false;
  }

  const startDate = new Date(`${startDateValue}T${startTimeValue}`);
  const endDate = new Date(`${endDateValue}T${endTimeValue}`);

  if (endDate <= startDate) {
    quotationResult.innerHTML = `<p class="error">La fecha y hora de devolución deben ser posteriores a la de inicio del alquiler.</p>`;
    quotationResult.style.display = 'block';
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDateOnly = new Date(startDateValue + 'T00:00:00');

  if (selectedDateOnly < today) {
    quotationResult.innerHTML = `<p class="error">La fecha de inicio no puede ser anterior al día de hoy. Por favor, elige una fecha válida.</p>`;
    quotationResult.style.display = 'block';
    return false;
  }

  const dailyPrice = selectedCar.price;
  const extraHourPrice = extraHourRates[selectedCar.category] || 10;

  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));

  const fullDays = Math.floor(durationHours / 24);
  const extraHours = durationHours % 24;

  let finalDays = fullDays;
  let extraHoursCost = extraHours * extraHourPrice;
  let finalTotal = 0;
  let summaryHTML = '';

  if (extraHours > 0 && extraHoursCost >= dailyPrice) {
    finalDays += 1;
    finalTotal = finalDays * dailyPrice;

    summaryHTML = `
      <h4>Resumen de la Cotización</h4>
      <p>Días de renta: <strong>${finalDays}</strong></p>
      <p>Precio por día: ${formatCurrency(dailyPrice)}</p>
      <hr>
      <p class="quotation__total">Subtotal Estimado: <strong>${formatCurrency(finalTotal)}</strong></p>
    `;
    currentQuoteDetails.rentalDays = finalDays;

  } else {
    finalTotal = (fullDays * dailyPrice) + extraHoursCost;

    summaryHTML = `
      <h4>Resumen de la Cotización</h4>
      <p>${fullDays} día(s) x ${formatCurrency(dailyPrice)}/día = <strong>${formatCurrency(fullDays * dailyPrice)}</strong></p>
      ${extraHours > 0 ? `<p>${extraHours} hora(s) extra x ${formatCurrency(extraHourPrice)}/hora = <strong>${formatCurrency(extraHoursCost)}</strong></p>` : ''}
      <hr>
      <p class="quotation__total">Subtotal Estimado: <strong>${formatCurrency(finalTotal)}</strong></p>
    `;
    currentQuoteDetails.rentalDays = fullDays > 0 ? fullDays : 1;
  }

  currentQuoteDetails.baseTotal = finalTotal;
  currentQuoteDetails.summaryHTML = summaryHTML;

  summaryHTML += `<button id="proceed-to-form-btn" class="btn">Continuar y Reservar</button>`;
  quotationResult.innerHTML = summaryHTML;
  quotationResult.style.display = 'block';

  document.getElementById('proceed-to-form-btn').addEventListener('click', () => {
    if (calculateAndDisplayQuote()) {
        showCustomerForm();
    }
  });
  return true;
}

function formatDateAsText(dateString) {
  const dateUTC = new Date(dateString);

  const dateString12PM = dateString + 'T12:00:00';
  const dateWithTime = new Date(dateString12PM);

  const day = dateWithTime.getDate();

  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

  const month = months[dateWithTime.getMonth()];
  const year = dateWithTime.getFullYear();

  return `${day} de ${month} de ${year}`;
}

document.addEventListener('DOMContentLoaded', () => {
  displayCars();

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filterValue = button.dataset.filter;

          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          displayCars(filterValue);
      });
  });

  backBtn.addEventListener('click', backToCatalog);

  calculateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    calculateAndDisplayQuote();
  });

  hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');

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

  startDateInput.addEventListener('change', () => {
      if (startDateInput.value) {
          const minEndDate = new Date(startDateInput.value);
          minEndDate.setDate(minEndDate.getDate() + 2);

          const minEndDateString = minEndDate.toISOString().split('T')[0];
          endDateInput.min = minEndDateString;

          if (new Date(endDateInput.value) < minEndDate) {
              endDateInput.value = '';
          }
      }
      quotationResult.style.display = 'none';
  });

  endDateInput.addEventListener('change', () => {
    quotationResult.style.display = 'none';
  });

  startTimeInput.addEventListener('change', () => {
    quotationResult.style.display = 'none';
  });

  endTimeInput.addEventListener('change', () => {
    quotationResult.style.display = 'none';
  });

  setInitialDateRestrictions();
});

if (footerWhatsappButton) {
  footerWhatsappButton.addEventListener('click', function(event) {
      event.preventDefault();
      const phoneNumber = '50248494290';
      const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
  });
}

let infoPopup = null;

function showAddonInfoPopup(description) {
  if (infoPopup) {
    hideAddonInfoPopup();
  }

  infoPopup = document.createElement('div');
  infoPopup.className = 'info-popup-overlay';
  infoPopup.innerHTML = `
    <div class="info-popup-content">
      <button class="info-popup-close-btn">&times;</button>
      <p>${description}</p>
    </div>
  `;
  document.body.appendChild(infoPopup);

  setTimeout(() => {
    infoPopup.classList.add('active');
  }, 10);

  infoPopup.querySelector('.info-popup-close-btn').addEventListener('click', hideAddonInfoPopup);

  infoPopup.addEventListener('click', (event) => {
    if (event.target === infoPopup) {
      hideAddonInfoPopup();
    }
  });
}

function hideAddonInfoPopup() {
  if (infoPopup) {
    infoPopup.classList.remove('active');
    infoPopup.addEventListener('transitionend', function handler() {
      if (infoPopup && infoPopup.parentNode) {
        infoPopup.parentNode.removeChild(infoPopup);
        infoPopup = null;
      }
      infoPopup.removeEventListener('transitionend', handler);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const customerFormSection = document.getElementById('customer-form-section');
  const backToQuoteBtn = document.getElementById('back-to-quote-btn');
  const customerForm = document.getElementById('customer-form');
  const licenseOriginRadios = document.querySelectorAll('input[name="license-origin"]');
  const licenseOriginOtherInput = document.getElementById('license-origin-other');
  const deliveryLocationRadios = document.querySelectorAll('input[name="delivery-location"]');
  const flightDetailsFieldset = document.getElementById('flight-details');
  const countryCodeSelect = document.getElementById('country-code');
  const summaryCarInfo = document.getElementById('summary-car-info');
  const summaryQuoteInfo = document.getElementById('summary-quote-info');
  const addonsContainer = document.getElementById('addons-container');
  const finalTotalContainer = document.getElementById('final-total-container');

  const countryCodes = [
      { name: "Guatemala", code: "+502" }, { name: "USA", code: "+1" },
      { name: "El Salvador", code: "+503" }, { name: "Honduras", code: "+504" },
      { name: "Mexico", code: "+52" }, { name: "Spain", code: "+34" },
  ];

  function populateCountryCodes() {
      if (!countryCodeSelect) return;
      countryCodes.forEach(country => {
          const option = document.createElement('option');
          option.value = country.code;
          option.textContent = `${country.name} (${country.code})`;
          if (country.code === '+502') { option.selected = true; }
          countryCodeSelect.appendChild(option);
      });
  }

  function handleLicenseOriginChange() {
      const otherRadio = document.querySelector('input[name="license-origin"][value="Otros"]');
      licenseOriginOtherInput.style.display = otherRadio.checked ? 'block' : 'none';
      licenseOriginOtherInput.required = otherRadio.checked;
      if (!otherRadio.checked) licenseOriginOtherInput.value = '';
  }

  function handleDeliveryLocationChange() {
      const airportRadio = document.querySelector('input[name="delivery-location"][value="Aeropuerto"]');
      flightDetailsFieldset.style.display = airportRadio.checked ? 'block' : 'none';
      document.getElementById('airline-name').required = airportRadio.checked;
      document.getElementById('flight-number').required = airportRadio.checked;
      if (!airportRadio.checked) {
          document.getElementById('airline-name').value = '';
          document.getElementById('flight-number').value = '';
      }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById('submit-form');
    submitButton.disabled = true;
    submitButton.textContent = 'Procesando...';

    try {
        const formData = new FormData(customerForm);
        const data = Object.fromEntries(formData.entries());

        data.VehiculoSeleccionado = selectedCar.name;
        data.CategoriaVehiculo = selectedCar.category;
        data.PrecioBaseDiario = selectedCar.price;
        data.DiasDeRenta = currentQuoteDetails.rentalDays;
        data.SubtotalCotizacion = currentQuoteDetails.baseTotal;
        data.fechaRecogida = document.getElementById('start-date').value;
        data.horaRecogida = document.getElementById('start-time').value;
        data.fechaDevolucion = document.getElementById('end-date').value;
        data.horaDevolucion = document.getElementById('end-time').value;

        data.segurosSeleccionados = insuranceAddOns
            .filter(addon => addon.selected)
            .map(addon => addon.name);

        const finalTotalElement = document.querySelector('.total-amount');
        data.TotalFinalEstimado = finalTotalElement ? finalTotalElement.textContent : 'No calculado';

        const response = await fetch('https://exclusivarentaautos.com/api/reservar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            alert('¡Reserva completada! Hemos enviado una confirmación a tu correo electrónico.');
            window.location.href = "https://exclusivarentaautos.com";
        } else {
            throw new Error(result.message || 'Error desconocido al procesar la reserva.');
        }

    } catch (error) {
        console.error('Error en la reserva:', error);
        alert(`Hubo un problema al enviar tu reserva: ${error.message}. Por favor, intenta de nuevo.`);
        submitButton.disabled = false;
        submitButton.textContent = 'Finalizar Reserva';
    }
}

  function renderInsuranceAddOns() {
    if (!addonsContainer) return;
    addonsContainer.innerHTML = '';

    insuranceAddOns.forEach(addon => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'addon-button';
        button.dataset.id = addon.id;

        if (addon.selected) button.classList.add('selected');
        if (addon.mandatory) button.classList.add('mandatory');

        let buttonContent = '';

        if (addon.id === 'cdw') {
            buttonContent += '<p class="basic-insurance-inline-label">Seguro Básico</p>';
        }

        buttonContent += `<h4>${addon.name}</h4>`;
        buttonContent += `<p>${addon.description}</p>`;
        buttonContent += `<p><strong>${formatCurrency(addon.dailyCost)} / día</strong></p>`;

        if (addon.mandatory) {
            buttonContent += '<span class="mandatory-label">(Obligatorio)</span>';
        }

        buttonContent += `
            <button type="button" class="addon-info-button" data-description="${addon.popupDescription}">
                <img src="./img/question-icon.png" alt="Información" class="addon-info-icon">
            </button>
        `;

        button.innerHTML = buttonContent;
        addonsContainer.appendChild(button);
    });
  }

  function updateQuoteSummaryAndTotal() {
      if (!summaryQuoteInfo || !finalTotalContainer || !currentQuoteDetails.baseTotal) return;

      let addonsTotal = 0;
      let addonsHTML = '<hr><h4>Seguros y Extras</h4>';

      insuranceAddOns.forEach(addon => {
          if (addon.selected) {
              const addonCost = addon.dailyCost * currentQuoteDetails.rentalDays;
              addonsTotal += addonCost;
              addonsHTML += `<p>${addon.name}: <strong>${formatCurrency(addonCost)}</strong> <br> (${currentQuoteDetails.rentalDays} día(s) x ${formatCurrency(addon.dailyCost)})</p>`;
          }
      });

      const finalTotal = currentQuoteDetails.baseTotal + addonsTotal;

      summaryQuoteInfo.innerHTML = currentQuoteDetails.summaryHTML + addonsHTML;

      finalTotalContainer.innerHTML = `<hr><span class="total-label">Total Final Estimado:</span><strong class="total-amount">${formatCurrency(finalTotal)}</strong>`;
  }

  function showCustomerForm() {
      quotationSection.style.display = 'none';
      customerFormSection.style.display = 'block';
      summaryCarInfo.innerHTML = document.getElementById('selected-car-info').innerHTML;
      renderInsuranceAddOns();
      updateQuoteSummaryAndTotal();
      window.scrollTo(0, 0);
  }

  displayCars();

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      displayCars(filterValue);
    });
  });

  backBtn.addEventListener('click', backToCatalog);

  calculateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    calculateAndDisplayQuote();
  });

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
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

  flatpickr.localize(flatpickr.l10ns.es);

  const datePickerConfig = {
    altInput: true,
    altFormat: "d/m/Y",
    dateFormat: "Y-m-d",
    minDate: "today"
  };

  const timePickerConfig = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
    altFormat: "h:i K",
    dateFormat: "H:i",
    time_24hr: false
  };

  const endDatePicker = flatpickr("#end-date", {
    ...datePickerConfig,
    minDate: new Date().fp_incr(2)
  });
  
  flatpickr("#start-date", {
    ...datePickerConfig,
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates[0]) {
        const minEndDate = new Date(selectedDates[0]);
        minEndDate.setDate(minEndDate.getDate() + 2);
        endDatePicker.set("minDate", minEndDate);
      }
      quotationResult.style.display = 'none';
    },
  });

  flatpickr("#start-time", {
    ...timePickerConfig,
    onChange: function() {
      quotationResult.style.display = 'none';
    }
  });

  flatpickr("#end-time", {
    ...timePickerConfig,
    onChange: function() {
      quotationResult.style.display = 'none';
    }
  });

  flatpickr("#end-date", {
    ...datePickerConfig,
    minDate: new Date().fp_incr(2),
    onChange: function() {
      quotationResult.style.display = 'none';
    }
  });

  const departureDatePicker = flatpickr("#departure-date", datePickerConfig);

  flatpickr("#arrival-date", {
    ...datePickerConfig,
    onChange: function(selectedDates, dateStr, instance) {
      if(selectedDates[0]) {
        departureDatePicker.set("minDate", selectedDates[0]);
      }
    }
  });

  flatpickr("#arrival-time", timePickerConfig);
  flatpickr("#departure-time", timePickerConfig);
  
  populateCountryCodes();

  if (backToQuoteBtn) {
    backToQuoteBtn.addEventListener('click', () => {
      customerFormSection.style.display = 'none';
      document.getElementById('quotation-section').style.display = 'block';
      window.scrollTo(0, 0);
    });
  }
  if (licenseOriginRadios) {
    licenseOriginRadios.forEach(radio => radio.addEventListener('change', handleLicenseOriginChange));
  }
  if (deliveryLocationRadios) {
    deliveryLocationRadios.forEach(radio => radio.addEventListener('change', handleDeliveryLocationChange));
  }
  if (customerForm) {
    customerForm.addEventListener('submit', handleFormSubmit);
  }
  if (addonsContainer) {
    addonsContainer.addEventListener('click', (event) => {
      const addonButton = event.target.closest('.addon-button');
      const infoButton = event.target.closest('.addon-info-button');

      if (infoButton) {
        event.stopPropagation();
        showAddonInfoPopup(infoButton.dataset.description);
      } else if (addonButton) {
        const addonId = addonButton.dataset.id;
        const addon = insuranceAddOns.find(a => a.id === addonId);

        if (addon && !addon.mandatory) {
          addon.selected = !addon.selected;
          addonButton.classList.toggle('selected');
          updateQuoteSummaryAndTotal();
        }
      }
    });
  }

  const quotationResultContainer = document.querySelector('#quotation-result');
  if (quotationResultContainer) {
    quotationResultContainer.addEventListener('click', function(event) {
      if (event.target && event.target.id === 'proceed-to-form-btn') {
        if (calculateAndDisplayQuote()) {
          showCustomerForm();
        }
      }
    });
  }
});