// Global variables for typing animation
let wordIndex = 0, charIndex = 0;
const words = ["Développeur Full-Stack MERN", "Lauréat du Prix 'Coup de Cœur'", "Créateur d’applications Web performantes"];

// --- Function declarations ---

function type() {
  const typingText = document.querySelector('.typing');
  if (!typingText) return;
  if (charIndex < words[wordIndex].length) {
    typingText.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
    const typingText = document.querySelector('.typing');
    if (!typingText) return;
    if (charIndex > 0) {
        typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
    }
}

function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.classList.add('show');
    if (isError) {
        notification.classList.add('error');
    }

    setTimeout(() => {
        notification.classList.remove('show');
        if (isError) {
            notification.classList.remove('error');
        }
    }, 3000);
}

// --- Main execution after DOM is loaded ---

document.addEventListener("DOMContentLoaded", function() {

    // Animation d'apparition (Fade + Zoom)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Effet d'écriture
    if (document.querySelector('.typing')) {
        type();
    }

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburger && navMenu) {
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    // Formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // IDs from EmailJS
            const serviceID = 'service_swco486';
            const templateID = 'template_u6bkyie';
            const publicKey = '7VlYLJiSoP_C19nrg';
            emailjs.sendForm(serviceID, templateID, this, publicKey)
                .then(() => {
                    showNotification('Message envoyé avec succès !');
                    contactForm.reset();
                }, (err) => {
                    showNotification('Une erreur s\'est produite. Veuillez réessayer.', true);
                    console.error('ERREUR...', err);
                });
        });
    }

    // Slideshow logic
    document.querySelectorAll('.slideshow-container').forEach(slideshow => {
        let slideIndex = 1;
        const slides = slideshow.querySelectorAll('.mySlides');
        const prevButton = slideshow.querySelector('.prev');
        const nextButton = slideshow.querySelector('.next');

        function showSlides(n) {
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            slides.forEach(slide => slide.style.display = "none");
            if (slides.length > 0) {
                slides[slideIndex - 1].style.display = "block";
            }
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => plusSlides(-1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => plusSlides(1));
        }

        showSlides(slideIndex);
    });
});
