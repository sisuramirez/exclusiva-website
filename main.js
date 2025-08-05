async function loadHeaderAndFooter() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    try {
        const [headerResponse, footerResponse] = await Promise.all([
            fetch('header.html'),
            fetch('footer.html')
        ]);

        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();

        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHtml;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;
        
    } catch (error) {
        console.error('Error al cargar los componentes:', error);
    }
    
    initPage();
}

function initPage() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const contactLink = document.querySelector('.nav__link[href="#"]'); 
    const whatsappButton = document.querySelector('.are-you-ready__button');
    const footerWhatsappButton = document.querySelector('.footer__social-link img[alt="WhatsApp"]').parentElement;
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
        if (contactCard && !contactCard.querySelector('.contact-card__content').contains(event.target) && 
            event.target !== contactLink) {
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

    if(hamburger) {
      hamburger.addEventListener('click', toggleMenu);
    }

    document.addEventListener('click', function(event) {
        if (!navMenu || !hamburger) return;
        if (!navMenu.contains(event.target) && 
            !hamburger.contains(event.target) && 
            navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (!navMenu) return;
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    const contactLinks = document.querySelectorAll('.nav__link');
    contactLinks.forEach(link => {
        if (link.textContent.trim() === 'Contáctanos') {
            link.addEventListener('click', toggleContactCard);
        }
    });

    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(event) {
            event.preventDefault();
            const phoneNumber = '50248494290';
            const message = "Hola, estoy interesado en los servicios de renta de autos. ¿Podrían brindarme más información?";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    const vehicleImages = [
        './img/transition1-hilux.png',
        './img/transition2-fortuner.png',
        './img/transition4-stavia.png', 
        './img/transition5-kicks.png'
    ];
    
    const heroImage = document.querySelector('.hero__image-container img');
    let currentIndex = 0;
    let isAnimating = false;
    let imagesLoaded = 0;
    
    function preloadImages(callback) {
        const totalImages = vehicleImages.length;
        if (totalImages === 0) {
            if(callback) callback();
            return;
        }
        vehicleImages.forEach(src => {
            const img = new Image();
            img.onload = function() {
                imagesLoaded++;
                if (imagesLoaded === totalImages && callback) {
                    callback();
                }
            };
            img.onerror = function() {
                imagesLoaded++;
                if (imagesLoaded === totalImages && callback) {
                    callback();
                }
            };
            img.src = src;
        });
    }
    
    if (heroImage) {
        heroImage.style.transition = 'opacity 0.3s ease-in-out';
        heroImage.style.opacity = '0';
        const firstImage = new Image();
        firstImage.onload = function() {
            heroImage.src = firstImage.src;
            setTimeout(() => {
                heroImage.style.opacity = '1';
            }, 100);
        };
        firstImage.src = vehicleImages[0];
    }
    
    function transitionToNextImage() {
        if (isAnimating || !heroImage) return;
        isAnimating = true;
        heroImage.style.transition = 'opacity 1s ease-in-out';
        heroImage.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % vehicleImages.length;
            const nextImage = new Image();
            nextImage.onload = function() {
                heroImage.src = nextImage.src;
                setTimeout(() => {
                    heroImage.style.transition = 'opacity 0.8s ease-in-out';
                    heroImage.style.opacity = '1';
                    setTimeout(() => {
                        isAnimating = false;
                    }, 800);
                }, 2500);
            };
            nextImage.src = vehicleImages[currentIndex];
            if (nextImage.complete) {
                nextImage.onload();
            }
        }, 1000);
    }
    
    preloadImages(() => {
        setTimeout(() => {
            setInterval(transitionToNextImage, 6300);
        }, 1000);
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
}

document.addEventListener('DOMContentLoaded', loadHeaderAndFooter);