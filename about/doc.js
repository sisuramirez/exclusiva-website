async function loadSharedComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (!headerPlaceholder || !footerPlaceholder) return;

    try {
        const [headerResponse, footerResponse] = await Promise.all([
            fetch('../header.html'),
            fetch('../footer.html')
        ]);

        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();

        headerPlaceholder.innerHTML = headerHtml;
        footerPlaceholder.innerHTML = footerHtml;
        
        initializeSharedComponents();

    } catch (error) {
        console.error('Error loading shared components:', error);
    }
}

function initializeSharedComponents() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const contactLink = Array.from(document.querySelectorAll('.nav__link')).find(link => link.textContent.trim() === 'Contáctanos');
    let contactCard = null;

    function toggleMenu() {
        if (!navMenu || !hamburger) return;
        navMenu.classList.toggle('active');
        const hamburgerLines = hamburger.querySelectorAll('.nav__hamburger-line');
        if (navMenu.classList.contains('active')) {
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';
        }
    }

    function createContactCard() {
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
                        <img src="../img/phone-icon.png" alt="Call" class="contact-card__phone-icon">
                    </a>
                    </span>
                    <span class="contact-card__email">Email: cotizaciones@exclusivarentaautos.com</span>
                  </div>
                  <div class="contact-card__social">
                      <a href="https://www.facebook.com/profile.php?id=100077124247045" class="contact-card__social-link" target="_blank">
                          <img src="../img/social-media-facebook.png" alt="Facebook" class="contact-card__social-icon">
                      </a>
                      <a href="https://www.instagram.com/exclusivarentaautos?igsh=MTN1dWVrOTF1N3A0dQ==" class="contact-card__social-link" target="_blank">
                          <img src="../img/social-media-instagram.png" alt="Instagram" class="contact-card__social-icon">
                      </a>
                      <a href="#" class="contact-card__social-link whatsapp-link">
                          <img src="../img/social-media-whatsapp.png" alt="WhatsApp" class="contact-card__social-icon">
                      </a>
                  </div>
              </div>
          </div>`;
        contactCard.innerHTML = cardContent;
        document.body.appendChild(contactCard);

        contactCard.querySelector('.contact-card__close').addEventListener('click', hideContactCard);
        
        const cardWhatsAppLink = contactCard.querySelector('.whatsapp-link');
        if (cardWhatsAppLink) {
            cardWhatsAppLink.addEventListener('click', function(event) {
                event.preventDefault();
                const phoneNumber = '50248494290';
                const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }
        
        setTimeout(() => {
            contactCard.classList.add('active');
        }, 10);
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
        if (contactCard && !contactCard.querySelector('.contact-card__content').contains(event.target) && event.target !== contactLink) {
            hideContactCard();
        }
    }

    function toggleContactCard(event) {
        event.preventDefault();
        if (contactCard) {
            hideContactCard();
        } else {
            createContactCard();
        }
    }

    function setupFooterWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('.footer__social-link img[alt="WhatsApp"]');
        whatsappLinks.forEach(img => {
            const link = img.closest('a');
            if (link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const phoneNumber = '50248494290';
                    const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                });
            }
        });
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    document.addEventListener('click', function(event) {
        if (navMenu && hamburger && !navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        if(link.getAttribute('href') !== '#') {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        }
    });

    if (contactLink) {
        contactLink.addEventListener('click', toggleContactCard);
    }

    setupFooterWhatsAppLinks();
}

document.addEventListener('DOMContentLoaded', loadSharedComponents);