//  <    >    =>

// Inicializar contenido al cargar
document.querySelectorAll(".card").forEach(card => {
  card.querySelector(".card-title").textContent = card.dataset.title;
  card.querySelector(".short").textContent = card.dataset.desc;
  card.querySelector(".full").textContent =
    card.dataset.descExpanded || card.dataset.desc;
});

document.querySelectorAll(".expand").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    card.classList.toggle("active");
    btn.textContent = card.classList.contains("active")
      ? "Cerrar"
      : "Ver más";
  });
});



