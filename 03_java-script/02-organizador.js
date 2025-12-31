//  <    >    =>
const input = document.querySelector(".taskInput");
const button = document.querySelector(".addTask");
const list = document.querySelector(".taskList");

button.addEventListener("click", agregarTarea);

function agregarTarea() {
  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement("li");
  li.textContent = texto;

  const deletebtn = document.createElement("button")
  deletebtn.textContent = "Eliminar"
  deletebtn.classList.add("delete-btn")

  deletebtn.addEventListener("click", () => {
    li.remove()
  })

  li.appendChild(deletebtn)
  list.appendChild(li);
  input.value = "";
}