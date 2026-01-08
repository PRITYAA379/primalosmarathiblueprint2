console.log("The Primal OS - Interactive Mode Active");

// 1. Prepare elements for Typewriter Effect
const typeElements = document.querySelectorAll('.type-on-scroll');

typeElements.forEach(el => {
    // Store original text
    el.dataset.fullText = el.innerText.trim();
    // Clear text initially but keep element size roughly if possible
    el.innerText = '';
    el.classList.add('opacity-0'); // Hide initially until observed
});

// 2. Typewriter Logic
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.classList.remove('opacity-0'); // Make visible
    element.classList.add('type-cursor'); // Add cursor
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after a delay when typing finishes
            setTimeout(() => {
                element.classList.remove('type-cursor');
            }, 2000);
        }
    }
    type();
}

// 3. Observer for Typing
const typeObserverOptions = {
    threshold: 0.2, 
    rootMargin: "0px 0px -50px 0px"
};

const typeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (!el.dataset.typed) {
                const fullText = el.dataset.fullText;
                typeWriter(el, fullText, 25);
                el.dataset.typed = "true";
                observer.unobserve(el);
            }
        }
    });
}, typeObserverOptions);

typeElements.forEach(el => {
    typeObserver.observe(el);
});

// Hover glow boost
document.querySelectorAll('.animate-glow').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.animationDuration = '0.5s';
    });
    el.addEventListener('mouseleave', () => {
        el.style.animationDuration = '3s';
    });
});

// --- MODAL LOGIC ---
const modal = document.getElementById('offerModal');
const closeModalBtn = document.getElementById('closeModal');
const buyButtons = document.querySelectorAll('.buy-trigger');

// Open Modal
buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        // Disable body scroll when modal is open
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal Function
function hideModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scroll
}

// Close on Button Click
closeModalBtn.addEventListener('click', hideModal);

// Close on Outside Click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        hideModal();
    }
});
