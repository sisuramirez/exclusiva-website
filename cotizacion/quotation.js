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

async function initializeQuotationTool() {
    let carsData = [];
    let insuranceAddOns = [];
    let siteConfig = {};
    
    try {
        const [vehiclesResponse, configResponse] = await Promise.all([
            fetch('../api/admin/leer_autos.php?cache_bust=' + new Date().getTime()),
            fetch('../api/admin/leer_configuracion.php?cache_bust=' + new Date().getTime())
        ]);

        if (!vehiclesResponse.ok) throw new Error('No se pudieron cargar los datos de los vehículos.');
        if (!configResponse.ok) throw new Error('No se pudo cargar la configuración del sitio.');

        const vehiclesFromDB = await vehiclesResponse.json();
        siteConfig = await configResponse.json();
        
        const minimumTimeP = document.getElementById('minimum-time');
        if (minimumTimeP && siteConfig.dias_minimos_alquiler) {
            const minDays = siteConfig.dias_minimos_alquiler;
            const dayText = minDays > 1 ? 'días' : 'día';
            minimumTimeP.textContent = `*La fecha de devolución debe ser al menos ${minDays} ${dayText} posterior a la fecha de inicio.*`;
        }

        carsData = vehiclesFromDB
            .filter(car => car.activo == 1)
            .map(car => ({
                id: parseInt(car.id),
                name: car.nombre,
                category: car.categoria,
                "DE 1 A 2 DIAS": parseFloat(car.precio_1_2_dias),
                "DE 3 A 4 DIAS": parseFloat(car.precio_3_4_dias),
                "DE 5 A 6 DIAS": parseFloat(car.precio_5_6_dias),
                "1 SEMANA": parseFloat(car.precio_semana),
                "15 DIAS": parseFloat(car.precio_15_dias),
                "1 MES": parseFloat(car.precio_mes),
                imageUrl: `../${car.url_imagen}`,
                specs: {
                    airConditioner: car.espec_ac,
                    fuel: car.espec_combustible,
                    transmission: car.espec_transmision
                }
            }));

    } catch (error) {
        console.error("Error al cargar datos:", error);
        const catalogGrid = document.getElementById('catalog-grid');
        if(catalogGrid) {
            catalogGrid.innerHTML = '<p style="text-align: center; color: red;">No se pueden mostrar los vehículos en este momento. Por favor, intente más tarde.</p>';
        }
        return;
    }

    insuranceAddOns = [
        { id: 'cdw', name: 'Protección a Terceros', dailyCost: 20, mandatory: true, selected: true, description: 'Cubre daños a terceros.', popupDescription: 'Esta cobertura es fundamental y obligatoria. Protege contra daños a vehículos, propiedades o personas ajenas al contrato de alquiler, brindándote seguridad completa en la carretera. Incluye responsabilidad civil por lesiones corporales y daños a la propiedad de terceros hasta los límites establecidos por la ley. Es tu primer nivel de protección para conducir con tranquilidad.' },
        { id: 'tpp', name: 'Cobertura Deducible por Pérdida y Daño', dailyCost: 10, mandatory: false, selected: false, description: '<strong>Low Damage Waiver (LWD)</strong> <br><br> Cubre deducible por pérdida y daño.', popupDescription: ' Si el arrendatario (usted) acepta, mediante sus iniciales, el deducible por PÉRDIDA/DAÑO (esto no constituye un seguro), su responsabilidad se limita a un deducible variable según el caso, más los gastos por remolque, almacenamiento, recuperación y un cargo razonable por la pérdida de uso. Al aceptar esto, el arrendatario (usted) conviene pagar una cuota adicional por día o fracción. Si el arrendatario (usted) no acepta, mediante sus iniciales, su responsabilidad no excederá el valor real de mercado del vehículo al momento de su pérdida/daño, más los gastos por remolque, almacenamiento, recuperación y un cobro razonable por la pérdida de uso a favor de la arrendante (Exclusiva Renta Autos).' },
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
        } else if (rentalDays >= 3 && rentalDays <= 4) {
            return vehicle["DE 3 A 4 DIAS"];
        } else if (rentalDays >= 5 && rentalDays <= 6) {
            return vehicle["DE 5 A 6 DIAS"];
        } else if (rentalDays >= 7 && rentalDays <= 14) {
            return vehicle["1 SEMANA"];
        } else if (rentalDays >= 15 && rentalDays <= 29) {
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
                    <small class="card-disclaimer">Precio no incluye seguro</small>
                </div>
                <div class="car-card__specs">
                    <div class="car-card__spec"><span class="car-card__spec-icon">❄️</span><span class="car-card__spec-text">Aire acondicionado: ${car.specs.airConditioner}</span></div>
                    <div class="car-card__spec"><span class="car-card__spec-icon">⛽</span><span class="car-card__spec-text">Combustible: ${car.specs.fuel}</span></div>
                    <div class="car-card__spec"><span class="car-card__spec-icon">🔄</span><span class="car-card__spec-text">Transmisión: ${car.specs.transmission}</span></div>
                </div>
                <div class="car-card__footer">
                    <div>
                        <span class="car-card__price">Precio desde: ${formatCurrency(priceFrom)}/día</span>
                    </div>
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

        if (selectedCar) {
            selectedCarInfo.innerHTML = `
                <img src="${selectedCar.imageUrl}" alt="${selectedCar.name}" class="quotation__car-image">
                <div class="quotation__car-details">
                    <h3 class="quotation__car-title">${selectedCar.name}</h3>
                    <span class="quotation__car-category">${selectedCar.category}</span>
                    <div class="quotation__car-specs">
                        <div class="quotation__car-spec"><span class="car-card__spec-icon">❄️</span><span class="quotation__car-spec-text">Aire acondicionado: ${selectedCar.specs.airConditioner}</span></div>
                        <div class="quotation__car-spec"><span class="car-card__spec-icon">⛽</span><span class="quotation__car-spec-text">Combustible: ${selectedCar.specs.fuel}</span></div>
                        <div class="car-card__spec"><span class="car-card__spec-icon">🔄</span><span class="quotation__car-spec-text">Transmisión: ${selectedCar.specs.transmission}</span></div>
                    </div>
                </div>`;
        }

        startDatePicker.clear();
        endDatePicker.clear();
        startTimePicker.setDate('', false);
        endTimePicker.setDate('', false);

        quotationResult.style.display = 'none';
    }

    function backToCatalog() {
        quotationSection.style.display = 'none';
        document.querySelector('.catalog').style.display = 'block';
        selectedCar = null;
    }

    function calculateAndDisplayQuote() {
        quotationResult.innerHTML = '';
        quotationResult.style.display = 'block';
    
        const startDateValue = startDateInput.value;
        const endDateValue = endDateInput.value;
        const startTimeValue = startTimeInput.value;
        const endTimeValue = endTimeInput.value;
    
        if (!startDateValue || !endDateValue || !startTimeValue || !endTimeValue) {
            quotationResult.innerHTML = `<p class="error">Por favor, completa todos los campos de fecha y hora para calcular tu cotización.</p>`;
            return;
        }
    
        const startDate = new Date(`${startDateValue}T${startTimeValue}`);
        const endDate = new Date(`${endDateValue}T${endTimeValue}`);
    
        if (endDate <= startDate) {
            quotationResult.innerHTML = `<p class="error">La fecha y hora de devolución deben ser posteriores a la de inicio.</p>`;
            return;
        }

        const totalMilliseconds = endDate.getTime() - startDate.getTime();
        const totalHours = totalMilliseconds / (1000 * 60 * 60);
        let rentalDays = Math.floor(totalHours / 24);
        let extraHours = Math.ceil(totalHours % 24);

        if (extraHours === 24) {
            rentalDays += 1;
            extraHours = 0;
        }
        
        if (rentalDays === 0 && extraHours > 0) {
            rentalDays = 1;
            extraHours = 0;
        }

        const minRentalDays = parseInt(siteConfig.dias_minimos_alquiler, 10) || 2;
        const minMilliseconds = (minRentalDays * 24 * 60 * 60 * 1000);
        const extraHourPrice = selectedCar.category === "Sedanes" ? 10 : 20;
        const extraHoursCost = extraHours * extraHourPrice;
        const nextDayPrice = getDynamicDailyPrice(selectedCar, rentalDays + 1);
        const isAutomaticUpgradeBeneficial = (extraHours > 0 && extraHoursCost >= nextDayPrice);

        const isPeriodTooShort = totalMilliseconds < minMilliseconds;
        const canAutoUpgradeFixMinimum = isAutomaticUpgradeBeneficial && (rentalDays + 1) >= minRentalDays;

        if (isPeriodTooShort && !canAutoUpgradeFixMinimum) {
            const dayText = minRentalDays > 1 ? 'días' : 'día';
            quotationResult.innerHTML = `
                <p class="info">El período mínimo de alquiler es de ${minRentalDays} ${dayText}. ¿Deseas extender tu selección para cumplir con el mínimo?</p>
                <div class="confirmation-buttons">
                    <button id="confirm-adjust-btn" class="btn">Sí, ajustar al mínimo</button>
                    <button id="reject-adjust-btn" class="btn btn--secondary">No, lo haré yo mismo</button>
                </div>
            `;
            document.getElementById('confirm-adjust-btn').addEventListener('click', () => {
                const newEndDate = new Date(startDate);
                newEndDate.setDate(newEndDate.getDate() + minRentalDays);
                endDatePicker.setDate(newEndDate, true);
                endTimePicker.setDate(startTimeInput.value, true);
                calculateAndDisplayQuote();
            });
            document.getElementById('reject-adjust-btn').addEventListener('click', () => {
                quotationResult.innerHTML = `<p class="info">De acuerdo. Por favor, ajusta las fechas para cumplir con el mínimo de ${minRentalDays} ${dayText} de alquiler.</p>`;
            });
            calculateBtn.disabled = true;
            return;
        }
    
        let finalTotal = 0;
        let summaryHTML = `<h4>Resumen de la Cotización</h4>`;
    
        if (isAutomaticUpgradeBeneficial) {
            const finalRentalDays = rentalDays + 1;
            const finalDailyPrice = getDynamicDailyPrice(selectedCar, finalRentalDays);
            finalTotal = finalDailyPrice * finalRentalDays;
            summaryHTML += `<p>Alquiler: ${finalRentalDays} día(s) x ${formatCurrency(finalDailyPrice)}/día = <strong>${formatCurrency(finalTotal)}</strong></p>`;
            // summaryHTML += `<small class="date-change-notice">Nota: Se agregó un día completo en lugar de ${extraHours} horas extra, ya que resulta más económico para ti.</small>`;
            currentQuoteDetails.rentalDays = finalRentalDays;
        } else {
            if (extraHours > 0) {
                 const basePriceForDays = getDynamicDailyPrice(selectedCar, rentalDays) * rentalDays;
                 finalTotal = basePriceForDays + extraHoursCost;
                 summaryHTML += `<p>Alquiler: ${rentalDays} día(s) = <strong>${formatCurrency(basePriceForDays)}</strong></p>`;
                 summaryHTML += `<p>${extraHours} hora(s) extra = <strong>${formatCurrency(extraHoursCost)}</strong></p>`;
                 currentQuoteDetails.rentalDays = rentalDays;
            } else {
                const dailyPrice = getDynamicDailyPrice(selectedCar, rentalDays);
                finalTotal = dailyPrice * rentalDays;
                summaryHTML += `<p>Alquiler: ${rentalDays} día(s) x ${formatCurrency(dailyPrice)}/día = <strong>${formatCurrency(finalTotal)}</strong></p>`;
                currentQuoteDetails.rentalDays = rentalDays;
            }
        }
    
        currentQuoteDetails.baseTotal = finalTotal;
        currentQuoteDetails.summaryHTML = summaryHTML;
    
        quotationResult.innerHTML = summaryHTML + `<hr><p class="quotation__total">Subtotal Estimado: <strong>${formatCurrency(finalTotal)}</strong></p>` + `<button id="proceed-to-form-btn" class="btn">Continuar y Reservar</button>`;

        const proceedBtn = document.getElementById('proceed-to-form-btn');
        if (proceedBtn) {
            proceedBtn.addEventListener('click', (event) => {
                event.preventDefault();
                showCustomerForm();
            });
        }
        
        calculateBtn.disabled = true;
    }

    displayCars();
    filterButtons.forEach(button => { button.addEventListener('click', () => { const filterValue = button.dataset.filter; filterButtons.forEach(btn => btn.classList.remove('active')); button.classList.add('active'); displayCars(filterValue); }); });
    backBtn.addEventListener('click', backToCatalog);
    calculateBtn.addEventListener('click', (event) => { event.preventDefault(); calculateAndDisplayQuote(); });
    
    flatpickr.localize(flatpickr.l10ns.es);

    const datePickerConfig = {
        altInput: true,
        altFormat: "d/m/Y",
        dateFormat: "Y-m-d",
        minDate: "today",
        disableMobile: false
    };

    const timePickerConfig = {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: "h:i K",
        dateFormat: "H:i",
        time_24hr: false,
        disableMobile: false,
        onReady: function(selectedDates, dateStr, instance) {
            if (instance.calendarContainer) {
                const doneBtn = document.createElement('button');
                doneBtn.textContent = 'Seleccionar Hora';
                doneBtn.className = 'flatpickr-done-btn';
                doneBtn.addEventListener('click', () => {
                    instance.close();
                });
                instance.calendarContainer.appendChild(doneBtn);
            }
        }
    };

    const endDatePicker = flatpickr("#end-date", {
        ...datePickerConfig,
        minDate: new Date().fp_incr(1),
        onChange: function() { 
            quotationResult.style.display = 'none';
            calculateBtn.disabled = false;
        }
    });

    const startDatePicker = flatpickr("#start-date", {
        ...datePickerConfig,
        onChange: function (selectedDates) {
            if (selectedDates[0]) {
                const minEndDate = new Date(selectedDates[0]);
                minEndDate.setDate(minEndDate.getDate() + 1);
                endDatePicker.set("minDate", minEndDate);
            }
            quotationResult.style.display = 'none';
            calculateBtn.disabled = false;
        }
    });

    const startTimePicker = flatpickr("#start-time", {
        ...timePickerConfig,
        onChange: function () {
            quotationResult.style.display = 'none';
            calculateBtn.disabled = false;
        }
    });

    const endTimePicker = flatpickr("#end-time", {
        ...timePickerConfig,
        onChange: function () {
            quotationResult.style.display = 'none';
            calculateBtn.disabled = false;
        }
    });
   
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
   
    let timerInterval;
    const totalTimeInSeconds = 15 * 60;
    const testIntervalSpeed = 1000;
    let timeRemaining = totalTimeInSeconds;

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
            if (addon.id === 'cdw' && selectedCar) {
                const category = selectedCar.category;
                if (category === "SUVs" || category === "Pick-ups" || category === "Microbuses") {
                    displayCost = 20;
                } else if (category === "Crossovers") {
                    displayCost = 15;
                } else if (category === "Sedanes") {
                    displayCost = 10;
                }
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
              if (addon.id === 'cdw' && selectedCar) {
                  const category = selectedCar.category;
                  if (category === "SUVs" || category === "Pick-ups" || category === "Microbuses") {
                      currentAddonDailyCost = 20;
                  } else if (category === "Crossovers") {
                      currentAddonDailyCost = 15;
                  } else if (category === "Sedanes") {
                      currentAddonDailyCost = 10;
                  }
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

    function showCustomerForm() {
        quotationSection.style.display = 'none';
        customerFormSection.style.display = 'block';
        summaryCarInfo.innerHTML = document.getElementById('selected-car-info').innerHTML;
        renderInsuranceAddOns();
        updateQuoteSummaryAndTotal();
        document.querySelector('.hero').style.display = 'none';
        window.scrollTo(0, 0);
        startTimer();
    }
    
    function startTimer() {
        const timerContainer = document.querySelector('.timer-container');
        const timerDisplay = document.getElementById('timer-display');
        const timerBar = document.getElementById('timer-bar');

        const tempMessage = document.createElement('div');
        tempMessage.className = 'temp-message-container';
        tempMessage.innerHTML = `<p>Este auto está reservado para ti durante los próximos 15 minutos. Completa tu reserva para asegurarlo.</p>`;
        const customerFormHeader = document.querySelector('.customer-form-header');
        customerFormHeader.parentNode.insertBefore(tempMessage, customerFormHeader.nextSibling);

        tempMessage.style.cssText = 'background-color: #32aeb5; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 1.1rem; font-weight: bold; margin: 20px 0; opacity: 0; transition: opacity 0.5s ease-in-out;';
        tempMessage.style.display = 'block';
        setTimeout(() => {
            tempMessage.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            tempMessage.style.opacity = '0';
            setTimeout(() => {
                tempMessage.style.display = 'none';
            }, 500);
        }, 15000);
        
        customerFormHeader.parentNode.insertBefore(timerContainer, tempMessage.nextSibling);

        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        const totalTimeInSeconds = 15 * 60;
        const testIntervalSpeed = 1000;
        let timeRemaining = totalTimeInSeconds;

        timerContainer.style.display = 'flex';
        timerContainer.classList.remove('expired');

        const updateTimerVisuals = () => {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');
            timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
            const percentage = (timeRemaining / totalTimeInSeconds) * 100;
            timerBar.style.width = `${percentage}%`;

            if (percentage <= 25) {
                timerBar.style.backgroundColor = '#f44336';
            } else if (percentage <= 50) {
                timerBar.style.backgroundColor = '#ffc107';
            } else {
                timerBar.style.backgroundColor = '#ff9800';
            }
        };

        timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimerVisuals();

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerContainer.classList.add('expired');
                alert('¡El tiempo para tu reserva ha expirado! Por favor, cotiza de nuevo.');
                backToQuoteBtn.click();
            }
        }, testIntervalSpeed);
    }
    
    function stopAndHideTimer() {
        clearInterval(timerInterval);
        const timerContainer = document.querySelector('.timer-container');
        if (timerContainer) {
             timerContainer.style.display = 'none';
        }
    }
    
    populateCountryCodes();
    if (backToQuoteBtn) {
        backToQuoteBtn.addEventListener('click', () => {
            customerFormSection.style.display = 'none';
            quotationSection.style.display = 'block';
            document.querySelector('.hero').style.display = 'block';
            window.scrollTo(0, 0);
            stopAndHideTimer();
        });
    }
    if (licenseOriginRadios) { licenseOriginRadios.forEach(radio => radio.addEventListener('change', handleLicenseOriginChange)); }
    if (deliveryLocationRadios) { deliveryLocationRadios.forEach(radio => radio.addEventListener('change', handleDeliveryLocationChange)); }
    if (customerForm) { customerForm.addEventListener('submit', handleFormSubmit); }
    if (addonsContainer) { addonsContainer.addEventListener('click', (event) => { const addonButton = event.target.closest('.addon-button'); const infoButton = event.target.closest('.addon-info-button'); if (infoButton) { event.stopPropagation(); showAddonInfoPopup(infoButton.dataset.description); } else if (addonButton) { const addonId = addonButton.dataset.id; const addon = insuranceAddOns.find(a => a.id === addonId); if (addon && !addon.mandatory) { addon.selected = !addon.selected; addonButton.classList.toggle('selected'); updateQuoteSummaryAndTotal(); } } }); }
}