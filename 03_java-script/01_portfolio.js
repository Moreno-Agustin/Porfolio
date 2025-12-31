const openCv = document.getElementById('open-cv');
const closeCv = document.getElementById('close-cv');
const cvModal = document.getElementById('cv-modal');

openCv.addEventListener('click', () => {
    cvModal.classList.add('active');
});

closeCv.addEventListener('click', () => {
    cvModal.classList.remove('active');
});

// Cerrar haciendo click fuera de la imagen
cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        cvModal.classList.remove('active');
    }
});