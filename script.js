document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------
    // 1. SIMULADOR DE ALERTA SOS
    // --------------------------------------------------
    let clicks = 3;
    let timer = null;

    const sosTrigger = document.getElementById('sosTrigger');
    const clicksLeftDisplay = document.getElementById('clicksLeft');
    const statusIndicator = document.getElementById('statusIndicator');

    // Validación por si la página actual no contiene el simulador (ej. disenos.html)
    if (sosTrigger && clicksLeftDisplay && statusIndicator) {
        sosTrigger.addEventListener('click', () => {
            if (clicks <= 0) return; // Bloquea clics adicionales mientras está activado

            clicks--;
            clicksLeftDisplay.textContent = clicks > 0 ? clicks : '✓';

            // Resetear contador si pasa demasiado tiempo (2.5s) entre toques
            clearTimeout(timer);
            timer = setTimeout(resetSimulator, 2500);

            if (clicks === 0) {
                triggerSOSAlert();
            }
        });
    }

    function triggerSOSAlert() {
        statusIndicator.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #ff4d4d; margin-bottom: 10px;"></i>
            <h3 style="color: #ff4d4d;">¡ALERTA SOS ACTIVADA!</h3>
            <p style="margin-top: 10px;">Enviando ubicación GPS en tiempo real a 3 contactos de confianza...</p>
        `;
        sosTrigger.style.borderColor = '#ff4d4d';
        sosTrigger.style.boxShadow = '0 0 30px rgba(255, 77, 77, 0.6)';

        // Reinicio automático en 5 segundos
        setTimeout(resetSimulator, 5000);
    }

    function resetSimulator() {
        clicks = 3;
        if (clicksLeftDisplay) clicksLeftDisplay.textContent = clicks;
        if (sosTrigger) {
            sosTrigger.style.borderColor = 'var(--gold, #d4b77a)';
            sosTrigger.style.boxShadow = '0 0 20px rgba(212, 183, 122, 0.2)';
        }
        if (statusIndicator) {
            statusIndicator.innerHTML = `
                <i class="fa-solid fa-hand-pointer" style="font-size: 2rem; color: var(--gold, #d4b77a); margin-bottom: 10px;"></i>
                <p id="sosStatusText">Haz 3 clics seguidos en el dije para iniciar la prueba de emergencia.</p>
            `;
        }
    }
});

// --------------------------------------------------
// 2. PERSONALIZADOR DE ACABADOS
// --------------------------------------------------
const finishDescriptions = {
    'Oro 24K': 'Elegancia clásica bañada en oro de 24 quilates con pulido espejo.',
    'Oro Rosa': 'Tono cálido sofisticado, perfecto para combinar con cualquier atuendo diario.',
    'Plata Esterlina': 'Acabado moderno y minimalista en plata ley 925.'
};

function setFinish(finishName, imgPath) {
    const descElement = document.getElementById('finishDesc');
    const customImg = document.getElementById('customizerImg');

    if (descElement && finishDescriptions[finishName]) {
        descElement.textContent = finishDescriptions[finishName];
    }

    if (customImg && imgPath) {
        customImg.src = imgPath;
    }

    // Actualizar botones activos
    const buttons = document.querySelectorAll('.finish-btn');
    buttons.forEach(btn => {
        if (btn.innerText.includes(finishName)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// --------------------------------------------------
// 3. FILTRAR PRODUCTOS EN EL CATÁLOGO
// --------------------------------------------------
function filterCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Cambiar botón activo
    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    // Mostrar/Ocultar productos
    cards.forEach(card => {
        if (category === 'todos' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}




// AGREGAR Y ELIMINAR CONTACTOS SOS
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('addContactForm');
    const contactsList = document.getElementById('contactsList');

    if (contactForm && contactsList) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const relation = document.getElementById('contactRelation').value;

            // Crear elemento en la lista
            const newContact = document.createElement('div');
            newContact.className = 'contact-item';
            newContact.innerHTML = `
                <div class="contact-info">
                    <strong>${name}</strong>
                    <span><i class="fa-solid fa-phone"></i> +52 ${phone} • <em>${relation}</em></span>
                </div>
                <button class="delete-btn" title="Eliminar contacto" onclick="deleteContact(this)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            contactsList.appendChild(newContact);
            contactForm.reset();
        });
    }
});

// Función para eliminar contacto
function deleteContact(button) {
    const item = button.closest('.contact-item');
    if (item) item.remove();
}