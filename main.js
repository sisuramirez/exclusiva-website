// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactLink = document.querySelector('.nav__link[href="#"]'); // Selecciona el enlace "Contáctanos"
let contactCard = null;

// Toggle mobile menu function
function toggleMenu() {
    navMenu.classList.toggle('active');
    
    // Toggle hamburger icon animation
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

// Create contact card function
function createContactCard() {
    // Create card container
    contactCard = document.createElement('div');
    contactCard.className = 'contact-card';
    
    // Create card content
    const cardContent = `
        <div class="contact-card__content">
            <button class="contact-card__close">&times;</button>
            <div class="contact-card__info">
                <div class="contact-card__contact">
                    <span class="contact-card__phone">Teléfono: +123 456 7890</span>
                    <span class="contact-card__email">Email: info@exclusivarentaautos.com</span>
                </div>
                <div class="contact-card__social">
                    <a href="#" class="contact-card__social-link">
                        <img src="./img/social-media-facebook.png" alt="Facebook" class="contact-card__social-icon">
                    </a>
                    <a href="#" class="contact-card__social-link">
                        <img src="./img/social-media-instagram.png" alt="Instagram" class="contact-card__social-icon">
                    </a>
                    <a href="#" class="contact-card__social-link">
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
    
    // Show the card with animation
    setTimeout(() => {
        contactCard.classList.add('active');
    }, 10);
    
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
    if (contactCard && !contactCard.querySelector('.contact-card__content').contains(event.target) && 
        event.target !== contactLink) {
        hideContactCard();
    }
}

// Toggle contact card function
function toggleContactCard(event) {
    event.preventDefault();
    
    if (contactCard) {
        hideContactCard();
    } else {
        createContactCard();
    }
}

// Event listeners
hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && 
        !hamburger.contains(event.target) && 
        navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu when clicking navigation links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Add event listener to contact link
const contactLinks = document.querySelectorAll('.nav__link');
contactLinks.forEach(link => {
    if (link.textContent.trim() === 'Contáctanos') {
        link.addEventListener('click', toggleContactCard);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Array de imágenes de vehículos para rotar
    const vehicleImages = [
        './img/transition1-hilux.png',
        './img/transition2-fortuner.png',
        './img/transition3-outlander.png', 
        './img/transition4-h1.png', 
        './img/transition5-kicks.png', 
    ];
    
    // Seleccionar la imagen del hero
    const heroImage = document.querySelector('.hero__image-container img');
    let currentIndex = 0;
    
    // Precarga de imágenes para evitar flickering
    const preloadImages = () => {
        vehicleImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    // Precargar las imágenes al inicio
    preloadImages();
    
    // Función para cambiar la imagen con una transición suave
    function changeImage() {
        // Aplicar fade out
        heroImage.style.opacity = 0;
        
        // Cambiar la imagen después de que se complete el fade out completamente
        setTimeout(() => {
            // Actualizar el índice y cambiar la fuente de la imagen
            currentIndex = (currentIndex + 1) % vehicleImages.length;
            heroImage.src = vehicleImages[currentIndex];
            
            // Esperar a que la nueva imagen esté cargada antes de hacer fade in
            heroImage.onload = function() {
                // Aplicar fade in
                heroImage.style.opacity = 1;
            };
            
            // Respaldo en caso de que la imagen ya esté en caché y onload no se dispare
            setTimeout(() => {
                heroImage.style.opacity = 1;
            }, 50);
        }, 500); // Este tiempo debe coincidir con la duración de tu transición CSS
    }
    
    // Agregar estilo de transición a la imagen
    heroImage.style.transition = 'opacity 0.5s ease-in-out';
    
    // Cambiar la imagen cada 5 segundos
    setInterval(changeImage, 5000);
});