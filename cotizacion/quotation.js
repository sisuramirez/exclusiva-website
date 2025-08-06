document.addEventListener('DOMContentLoaded', () => {
    loadHeaderAndFooter();
    initializeQuotationTool();
  });
  
  async function loadHeaderAndFooter() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
  
    try {
        const [headerResponse, footerResponse] = await Promise.all([
            fetch('../header.html'),
            fetch('../footer.html')
        ]);
  
        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();
  
        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHtml;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;
  
        initializeEventListeners();
  
    } catch (error) {
        console.error('Error al cargar header o footer:', error);
    }
  }
  
  function initializeEventListeners() {
    let contactCard = null;
  
    function createContactCard(clickEvent) {
        if (clickEvent) clickEvent.stopPropagation();
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
            </div>`;
        contactCard.innerHTML = cardContent;
        document.body.appendChild(contactCard);
        contactCard.querySelector('.contact-card__close').addEventListener('click', hideContactCard);
        const whatsappLink = contactCard.querySelector('.whatsapp-link');
        if (whatsappLink) {
            whatsappLink.addEventListener('click', function (event) {
                event.preventDefault();
                const phoneNumber = '+50248494290';
                const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }
        setTimeout(() => contactCard.classList.add('active'), 10);
        setTimeout(() => document.addEventListener('click', closeCardOutside), 100);
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
        const contactLink = document.querySelector('.nav__link[href="#"]');
        if (contactCard && !contactCard.querySelector('.contact-card__content').contains(event.target) && event.target !== contactLink) {
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
  
    const contactLinks = document.querySelectorAll('.nav__link');
    contactLinks.forEach(link => {
        if (link.textContent.trim() === 'Contáctanos') {
            link.addEventListener('click', toggleContactCard);
        }
    });
  
    const hamburgerBtn = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
  
    if (hamburgerBtn && navMenu) {
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
    }
  
    const footerWhatsappButton = document.querySelector('.whatsapp-footer');
    if (footerWhatsappButton) {
        footerWhatsappButton.addEventListener('click', function (event) {
            event.preventDefault();
            const phoneNumber = '50248494290';
            const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
  
    const fabWhatsapp = document.getElementById('whatsapp-fab');
    if (fabWhatsapp) {
        fabWhatsapp.addEventListener('click', function (event) {
            event.preventDefault();
            const phoneNumber = '50248494290';
            const message = "Hola, estoy interesado en rentar un vehículo y me gustaría más información.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
  }
  
  function initializeQuotationTool() {
    const carsData = [
      { name: "Toyota Hiace", "DE 1 A 2 DIAS": 94.05, "DE 3 A 6 DIAS": 70.24, "1 SEMANA": 58.33, "15 DIAS": 52.38, "1 MES": 41.67, category: "Microbuses", imageUrl: "./img/hiace.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Manual" } },
      { name: "Nissan Urvan", "DE 1 A 2 DIAS": 94.05, "DE 3 A 6 DIAS": 70.24, "1 SEMANA": 58.33, "15 DIAS": 52.38, "1 MES": 41.67, category: "Microbuses", imageUrl: "./img/urvan.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Manual" } },
      { name: "Hyundai H1", "DE 1 A 2 DIAS": 70.24, "DE 3 A 6 DIAS": 58.33, "1 SEMANA": 52.38, "15 DIAS": 46.43, "1 MES": 34.52, category: "Microbuses", imageUrl: "./img/h1.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Automático/Manual" } },
      { name: "Hyundai Staria", "DE 1 A 2 DIAS": 82.14, "DE 3 A 6 DIAS": 70.24, "1 SEMANA": 58.33, "15 DIAS": 52.38, "1 MES": 40.48, category: "Microbuses", imageUrl: "./img/staria.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Automático/Manual" } },
      { name: "Toyota Fortuner", "DE 1 A 2 DIAS": 97.62, "DE 3 A 6 DIAS": 82.14, "1 SEMANA": 70.24, "15 DIAS": 58.33, "1 MES": 46.43, category: "SUVs", imageUrl: "./img/fortuner.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Automático" } },
      { name: "Mitsubishi Montero", "DE 1 A 2 DIAS": 82.14, "DE 3 A 6 DIAS": 70.24, "1 SEMANA": 58.33, "15 DIAS": 52.38, "1 MES": 40.48, category: "SUVs", imageUrl: "./img/montero.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Automático" } },
      { name: "Hyundai Santa Fe", "DE 1 A 2 DIAS": 70.24, "DE 3 A 6 DIAS": 58.33, "1 SEMANA": 52.38, "15 DIAS": 46.43, "1 MES": 34.52, category: "SUVs", imageUrl: "./img/santafe.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Mitsubishi Outlander", "DE 1 A 2 DIAS": 70.24, "DE 3 A 6 DIAS": 58.33, "1 SEMANA": 52.38, "15 DIAS": 46.43, "1 MES": 34.52, category: "SUVs", imageUrl: "./img/outlander.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Toyota Hilux", "DE 1 A 2 DIAS": 82.14, "DE 3 A 6 DIAS": 70.24, "1 SEMANA": 64.29, "15 DIAS": 58.33, "1 MES": 46.43, category: "Pick-ups", imageUrl: "./img/hilux.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Automático/Manual" } },
      { name: "Mitsubishi L200", "DE 1 A 2 DIAS": 82.14, "DE 3 A 6 DIAS": 70.24, "1 SEMANA": 64.29, "15 DIAS": 58.33, "1 MES": 46.43, category: "Pick-ups", imageUrl: "./img/l200.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Manual/Automático" } },
      { name: "Nissan Frontier", "DE 1 A 2 DIAS": 82.14, "DE 3 A 6 DIAS": 70.24, "1 SEMANA": 64.29, "15 DIAS": 58.33, "1 MES": 46.43, category: "Pick-ups", imageUrl: "./img/frontier.png?v=2", specs: { airConditioner: "Sí", fuel: "Diésel", transmission: "Automático/Manual" } },
      { name: "Hyundai Creta", "DE 1 A 2 DIAS": 58.33, "DE 3 A 6 DIAS": 46.43, "1 SEMANA": 40.48, "15 DIAS": 34.52, "1 MES": 28.57, category: "Crossovers", imageUrl: "./img/creta.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Nissan Kicks", "DE 1 A 2 DIAS": 46.43, "DE 3 A 6 DIAS": 40.48, "1 SEMANA": 34.52, "15 DIAS": 28.57, "1 MES": 22.62, category: "Crossovers", imageUrl: "./img/kicks.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Kia Sonet", "DE 1 A 2 DIAS": 46.43, "DE 3 A 6 DIAS": 40.48, "1 SEMANA": 34.52, "15 DIAS": 28.57, "1 MES": 22.62, category: "Crossovers", imageUrl: "./img/sonet.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Kia Rio", "DE 1 A 2 DIAS": 40.48, "DE 3 A 6 DIAS": 34.52, "1 SEMANA": 28.57, "15 DIAS": 22.62, "1 MES": 20.24, category: "Sedanes", imageUrl: "./img/rio.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Hyundai Verna", "DE 1 A 2 DIAS": 40.48, "DE 3 A 6 DIAS": 34.52, "1 SEMANA": 28.57, "15 DIAS": 22.62, "1 MES": 20.24, category: "Sedanes", imageUrl: "./img/verna.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Toyota Yaris", "DE 1 A 2 DIAS": 40.48, "DE 3 A 6 DIAS": 34.52, "1 SEMANA": 28.57, "15 DIAS": 22.62, "1 MES": 20.24, category: "Sedanes", imageUrl: "./img/yaris.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } },
      { name: "Hyundai Accent", "DE 1 A 2 DIAS": 40.48, "DE 3 A 6 DIAS": 34.52, "1 SEMANA": 28.57, "15 DIAS": 22.62, "1 MES": 20.24, category: "Sedanes", imageUrl: "./img/accent.png?v=2", specs: { airConditioner: "Sí", fuel: "Gasolina", transmission: "Automático" } }
    ].map((car, index) => ({ ...car, id: index + 1 }));
  
    const extraHourRates = { "Microbuses": 20, "SUVs": 20, "Pick-ups": 20, "Crossovers": 20, "Sedanes": 10 };
  
    const insuranceAddOns = [
        { id: 'cdw', name: 'Protección a Terceros', dailyCost: 10, mandatory: true, selected: true, description: 'Cubre daños a terceros.', popupDescription: 'Esta cobertura es fundamental y obligatoria. Protege contra daños a vehículos, propiedades o personas ajenas al contrato de alquiler, brindándote seguridad completa en la carretera. Incluye responsabilidad civil por lesiones corporales y daños a la propiedad de terceros hasta los límites establecidos por la ley. Es tu primer nivel de protección para conducir con tranquilidad.' },
        { id: 'tpp', name: 'Cobertura Deducible por Pérdida y Daño', dailyCost: 20, mandatory: false, selected: false, description: '<strong>Low Damage Waiver (LWD)</strong> <br><br> Cubre deducible por pérdida y daño.', popupDescription: ' Si el arrendatario (usted) acepta, mediante sus iniciales, el deducible por PÉRDIDA/DAÑO (esto no constituye un seguro), su responsabilidad se limita a un deducible variable según el caso, más los gastos por remolque, almacenamiento, recuperación y un cargo razonable por la pérdida de uso. Al aceptar esto, el arrendatario (usted) conviene pagar una cuota adicional por día o fracción. Si el arrendatario (usted) no acepta, mediante sus iniciales, su responsabilidad no excederá el valor real de mercado del vehículo al momento de su pérdida/daño, más los gastos por remolque, almacenamiento, recuperación y un cobro razonable por la pérdida de uso a favor de la arrendante (Exclusiva Renta Autos).' },
        { id: 'pai', name: 'Seguro Personal de Accidente', dailyCost: 10, mandatory: false, selected: false, description: '<strong>Personal Accident Insurance (PAI)</strong> <br><br> Seguro médico para ocupantes.', popupDescription: ' Si el arrendatario (usted) acepta, mediante sus iniciales, conviene pagar una cuota adicional diaria (monto variable según tarifa vigente) por día de tracción. El arrendatario (usted) acepta haber leído un resumen de los términos, condiciones y límites de la póliza de la arrendante (Exclusiva Renta Autos). ' }
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
  
    let selectedCar = null;
    let currentQuoteDetails = {};
  
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
  
    function getDynamicDailyPrice(vehicle, rentalDays) {
        if (rentalDays <= 2) {
            return vehicle["DE 1 A 2 DIAS"];
        } else if (rentalDays <= 6) {
            return vehicle["DE 3 A 6 DIAS"];
        } else if (rentalDays <= 14) {
            return vehicle["1 SEMANA"];
        } else if (rentalDays <= 29) {
            return vehicle["15 DIAS"];
        } else {
            return vehicle["1 MES"];
        }
    }
  
    function createCarCard(car) {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.dataset.category = car.category;
        const priceFrom = car["1 MES"];
        carCard.innerHTML = `
            <img src="${car.imageUrl}" alt="${car.name}" class="car-card__image">
            <div class="car-card__content">
                <div class="car-card__header">
                    <h3 class="car-card__title">${car.name}</h3>
                    <span class="car-card__category">${car.category}</span>
                </div>
                <div class="car-card__specs">
                    <div class="car-card__spec"><span class="car-card__spec-icon">❄️</span><span class="car-card__spec-text">Aire acondicionado: ${car.specs.airConditioner}</span></div>
                    <div class="car-card__spec"><span class="car-card__spec-icon">⛽</span><span class="car-card__spec-text">Combustible: ${car.specs.fuel}</span></div>
                    <div class="car-card__spec"><span class="car-card__spec-icon">🔄</span><span class="car-card__spec-text">Transmisión: ${car.specs.transmission}</span></div>
                </div>
                <div class="car-card__footer">
                    <span class="car-card__price">Precio desde: ${formatCurrency(priceFrom)}/día</span>
                    <button class="car-card__button" data-id="${car.id}">Cotizar este auto</button>
                </div>
            </div>`;
        return carCard;
    }
  
    function displayCars(category = 'all') {
        catalogGrid.innerHTML = '';
        carsData.forEach(car => {
            if (category === 'all' || car.category === category) {
                const carCard = createCarCard(car);
                catalogGrid.appendChild(carCard);
            }
        });
        document.querySelectorAll('.car-card__button').forEach(button => {
            button.addEventListener('click', () => {
                const carId = parseInt(button.dataset.id);
                selectedCar = carsData.find(car => car.id === carId);
                showQuotationSection();
            });
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
                    <div class="quotation__car-spec"><span class="car-card__spec-icon">❄️</span><span class="quotation__car-spec-text">Aire acondicionado: ${selectedCar.specs.airConditioner}</span></div>
                    <div class="quotation__car-spec"><span class="car-card__spec-icon">⛽</span><span class="quotation__car-spec-text">Combustible: ${selectedCar.specs.fuel}</span></div>
                    <div class="quotation__car-spec"><span class="car-card__spec-icon">🔄</span><span class="quotation__car-spec-text">Transmisión: ${selectedCar.specs.transmission}</span></div>
                </div>
            </div>`;
        startDateInput.value = '';
        endDateInput.value = '';
        if (startTimeInput) startTimeInput.value = '';
        if (endTimeInput) endTimeInput.value = '';
        quotationResult.style.display = 'none';
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
  
        const durationMs = endDate.getTime() - startDate.getTime();
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
        const fullDays = Math.floor(durationHours / 24);
        const extraHours = durationHours % 24;
        
        let finalDays = fullDays;
        if (extraHours > 3) {
            finalDays += 1;
        }
        
        const rentalDaysForPrice = finalDays > 0 ? finalDays : 1;
        const dailyPrice = getDynamicDailyPrice(selectedCar, rentalDaysForPrice);
        
        let finalTotal = dailyPrice * rentalDaysForPrice;
        let summaryHTML = `<h4>Resumen de la Cotización</h4><p>${rentalDaysForPrice} día(s) x ${formatCurrency(dailyPrice)}/día = <strong>${formatCurrency(finalTotal)}</strong></p>`;
        
        currentQuoteDetails.rentalDays = rentalDaysForPrice;
        currentQuoteDetails.baseTotal = finalTotal;
        currentQuoteDetails.summaryHTML = summaryHTML;
  
        quotationResult.innerHTML = summaryHTML + `<hr><p class="quotation__total">Subtotal Estimado: <strong>${formatCurrency(finalTotal)}</strong></p>` + `<button id="proceed-to-form-btn" class="btn">Continuar y Reservar</button>`;
        quotationResult.style.display = 'block';
        
        const proceedBtn = document.getElementById('proceed-to-form-btn');
        if (proceedBtn) {
          proceedBtn.addEventListener('click', () => {
              if (calculateAndDisplayQuote()) {
                  showCustomerForm();
              }
          });
        }
        return true;
    }
    
    displayCars();
    filterButtons.forEach(button => { button.addEventListener('click', () => { const filterValue = button.dataset.filter; filterButtons.forEach(btn => btn.classList.remove('active')); button.classList.add('active'); displayCars(filterValue); }); });
    backBtn.addEventListener('click', backToCatalog);
    calculateBtn.addEventListener('click', (event) => { event.preventDefault(); calculateAndDisplayQuote(); });
    flatpickr.localize(flatpickr.l10ns.es);
    const datePickerConfig = { altInput: true, altFormat: "d/m/Y", dateFormat: "Y-m-d", minDate: "today" };
    const timePickerConfig = { enableTime: true, noCalendar: true, altInput: true, altFormat: "h:i K", dateFormat: "H:i", time_24hr: false };
    const endDatePicker = flatpickr("#end-date", { ...datePickerConfig, minDate: new Date().fp_incr(1) });
    flatpickr("#start-date", { ...datePickerConfig, onChange: function (selectedDates) { if (selectedDates[0]) { const minEndDate = new Date(selectedDates[0]); minEndDate.setDate(minEndDate.getDate() + 1); endDatePicker.set("minDate", minEndDate); } quotationResult.style.display = 'none'; } });
    flatpickr("#start-time", { ...timePickerConfig, onChange: function () { quotationResult.style.display = 'none'; } });
    flatpickr("#end-time", { ...timePickerConfig, onChange: function () { quotationResult.style.display = 'none'; } });
  
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
    const countryCodes = [{ name: "Guatemala", code: "+502" }, { name: "USA", code: "+1" }, { name: "El Salvador", code: "+503" }, { name: "Honduras", code: "+504" }, { name: "Mexico", code: "+52" }, { name: "Spain", code: "+34" }];
  
    function populateCountryCodes() { if (!countryCodeSelect) return; countryCodes.forEach(country => { const option = document.createElement('option'); option.value = country.code; option.textContent = `${country.name} (${country.code})`; if (country.code === '+502') { option.selected = true; } countryCodeSelect.appendChild(option); }); }
    function handleLicenseOriginChange() { const otherRadio = document.querySelector('input[name="license-origin"][value="Otros"]'); licenseOriginOtherInput.style.display = otherRadio.checked ? 'block' : 'none'; licenseOriginOtherInput.required = otherRadio.checked; if (!otherRadio.checked) licenseOriginOtherInput.value = ''; }
    function handleDeliveryLocationChange() { const airportRadio = document.querySelector('input[name="delivery-location"][value="Aeropuerto"]'); flightDetailsFieldset.style.display = airportRadio.checked ? 'block' : 'none'; document.getElementById('airline-name').required = airportRadio.checked; document.getElementById('flight-number').required = airportRadio.checked; if (!airportRadio.checked) { document.getElementById('airline-name').value = ''; document.getElementById('flight-number').value = ''; } }
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
            data.PrecioBaseDiario = getDynamicDailyPrice(selectedCar, currentQuoteDetails.rentalDays);
            data.DiasDeRenta = currentQuoteDetails.rentalDays;
            data.SubtotalCotizacion = currentQuoteDetails.baseTotal;
            data.fechaRecogida = document.getElementById('start-date').value;
            data.horaRecogida = document.getElementById('start-time').value;
            data.fechaDevolucion = document.getElementById('end-date').value;
            data.horaDevolucion = document.getElementById('end-time').value;
            data.segurosSeleccionados = insuranceAddOns.filter(addon => addon.selected).map(addon => addon.name);
            const finalTotalElement = document.querySelector('.total-amount');
            data.TotalFinalEstimado = finalTotalElement ? finalTotalElement.textContent : 'No calculado';
            const response = await fetch('https://exclusivarentaautos.com/api/reservar.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
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
    let infoPopup = null;
    function showAddonInfoPopup(description) { if (infoPopup) { hideAddonInfoPopup(); } infoPopup = document.createElement('div'); infoPopup.className = 'info-popup-overlay'; infoPopup.innerHTML = `<div class="info-popup-content"><button class="info-popup-close-btn">&times;</button><p>${description}</p></div>`; document.body.appendChild(infoPopup); setTimeout(() => { infoPopup.classList.add('active'); }, 10); infoPopup.querySelector('.info-popup-close-btn').addEventListener('click', hideAddonInfoPopup); infoPopup.addEventListener('click', (event) => { if (event.target === infoPopup) { hideAddonInfoPopup(); } }); }
    function hideAddonInfoPopup() { if (infoPopup) { infoPopup.classList.remove('active'); infoPopup.addEventListener('transitionend', function handler() { if (infoPopup && infoPopup.parentNode) { infoPopup.parentNode.removeChild(infoPopup); infoPopup = null; } infoPopup.removeEventListener('transitionend', handler); }); } }
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
  
            let displayCost = addon.dailyCost;
            if (addon.id === 'tpp' && selectedCar && selectedCar.category === 'Sedanes') {
                displayCost = 10;
            }
  
            let buttonContent = '';
            if (addon.id === 'cdw') {
                buttonContent += '<p class="basic-insurance-inline-label">Seguro Básico</p>';
            }
            buttonContent += `<h4>${addon.name}</h4><p>${addon.description}</p><p><strong>${formatCurrency(displayCost)} / día</strong></p>`;
            if (addon.mandatory) {
                buttonContent += '<span class="mandatory-label">(Obligatorio)</span>';
            }
            buttonContent += `<button type="button" class="addon-info-button" data-description="${addon.popupDescription}"><img src="./img/question-icon.png" alt="Información" class="addon-info-icon"></button>`;
            button.innerHTML = buttonContent;
            addonsContainer.appendChild(button);
        });
    }
    function updateQuoteSummaryAndTotal() {
      if (!summaryQuoteInfo || !finalTotalContainer || !currentQuoteDetails.baseTotal) return;
  
      let addonsTotal = 0;
      let addonsHTML = '<h4>Seguros y Extras</h4>';
      insuranceAddOns.forEach(addon => {
          if (addon.selected) {
              let currentAddonDailyCost = addon.dailyCost;
              if (addon.id === 'tpp' && selectedCar && selectedCar.category === 'Sedanes') {
                  currentAddonDailyCost = 10;
              }
              const addonCost = currentAddonDailyCost * currentQuoteDetails.rentalDays;
              addonsTotal += addonCost;
              addonsHTML += `<p>${addon.name}: <strong>${formatCurrency(addonCost)}</strong> <br> <small>(${currentQuoteDetails.rentalDays} día(s) x ${formatCurrency(currentAddonDailyCost)})</small></p>`;
          }
      });
  
      const subTotal = currentQuoteDetails.baseTotal + addonsTotal;
      const taxes = subTotal * 0.12;
      const finalTotal = subTotal + taxes;
  
      summaryQuoteInfo.innerHTML = currentQuoteDetails.summaryHTML + '<hr>' + addonsHTML;
      
      finalTotalContainer.innerHTML = `
          <hr>
          <div class="summary-line">
              <span>Sub Total</span>
              <strong>${formatCurrency(subTotal)}</strong>
          </div>
          <hr>
          <h4>Impuestos / Taxes</h4>
          <div class="summary-line">
              <span>IVA (12%)</span>
              <strong>${formatCurrency(taxes)}</strong>
          </div>
          <div class="total-line">
              <span class="total-label">Total Final Estimado</span>
              <strong class="total-amount">${formatCurrency(finalTotal)}</strong>
          </div>`;
    }
    function showCustomerForm() { quotationSection.style.display = 'none'; customerFormSection.style.display = 'block'; summaryCarInfo.innerHTML = document.getElementById('selected-car-info').innerHTML; renderInsuranceAddOns(); updateQuoteSummaryAndTotal(); window.scrollTo(0, 0); }
    populateCountryCodes();
    if (backToQuoteBtn) { backToQuoteBtn.addEventListener('click', () => { customerFormSection.style.display = 'none'; document.getElementById('quotation-section').style.display = 'block'; window.scrollTo(0, 0); }); }
    if (licenseOriginRadios) { licenseOriginRadios.forEach(radio => radio.addEventListener('change', handleLicenseOriginChange)); }
    if (deliveryLocationRadios) { deliveryLocationRadios.forEach(radio => radio.addEventListener('change', handleDeliveryLocationChange)); }
    if (customerForm) { customerForm.addEventListener('submit', handleFormSubmit); }
    if (addonsContainer) { addonsContainer.addEventListener('click', (event) => { const addonButton = event.target.closest('.addon-button'); const infoButton = event.target.closest('.addon-info-button'); if (infoButton) { event.stopPropagation(); showAddonInfoPopup(infoButton.dataset.description); } else if (addonButton) { const addonId = addonButton.dataset.id; const addon = insuranceAddOns.find(a => a.id === addonId); if (addon && !addon.mandatory) { addon.selected = !addon.selected; addonButton.classList.toggle('selected'); updateQuoteSummaryAndTotal(); } } }); }
    
    const quotationResultContainer = document.querySelector('#quotation-result'); 
    if (quotationResultContainer) { 
        quotationResultContainer.addEventListener('click', function (event) { 
            if (event.target && event.target.id === 'proceed-to-form-btn') { 
                if (calculateAndDisplayQuote()) { 
                    showCustomerForm(); 
                } 
            } 
        }); 
    }
  }