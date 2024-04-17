//obtengo el botons
let addCardButtons = document.querySelectorAll(".addCardButton");

addCardButtons.forEach((button) => {  
  //evento de click
  button.addEventListener("click", function () {
    createCards([], true); // Crear una nueva tarjeta vacía
  });
});


// promesa
let response
let url = "http://localhost:3000/api/tasks";
fetch(url)
.then(response => response.json())
.then(data => {
  tareas = data;
  createCards(tareas); // Crear tarjetas a partir de los datos de response
})
.catch(error => {
  console.error('Error:', error);
});


//crear cartas
function createCards(response, nuevo = false) {
  let cardsContainer = document.querySelector(".cards");

  // Eliminar tarjetas existentes
  let existingCards = cardsContainer.querySelectorAll(".tarjeta");
  existingCards.forEach(card => card.remove());

  if (nuevo) {
    // Crear una nueva tarjeta vacía
    let newCard = document.createElement("div");
    newCard.className = "tarjeta";

    let cardContent = `
      <div class="inputs">
        <button class="openTask">
          <p>tarea</p>
        </button>
        <button class="eliminar-tarjeta">Eliminar</button>
        <div class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <div class="input-wrapper">
              <label for="title">Título:</label>
              <input type="text" class="title" />
            </div>
            <div class="input-wrapper">
              <label for="description">Descripción:</label>
              <input type="text" class="description" />
            </div>
            <div class="input-wrapper">
              <label for="assignedTo">Asignado a:</label>
              <input type="text" class="assignedTo" />
            </div>
            <div class="input-wrapper">
              <label for="startDate">Fecha de inicio:</label>
              <input type="date" class="startDate" />
            </div>
            <div class="input-wrapper">
              <label for="endDate">Fecha de fin:</label>
              <input type="date" class="endDate" />
            </div>
            <div class="input-wrapper">
              <label for="status">Estado:</label>
              <select class="status">
                <option value="En Proceso">En Proceso</option>
                <option value="Bloqueado">Por Hacer</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
            <div class="input-wrapper">
              <label for="priority">Prioridad:</label>
              <select class="priority">
                <option value="Media">Media</option>
              </select>
            </div>
            <div class="input-wrapper">
              <label for="comments">Comentarios:</label>
              <input type="text" class="comments" />
            </div>
          </div>
        </div>
      </div>
    `;
    newCard.innerHTML = cardContent;

    // Agregar botón de eliminar
    let eliminarButton = newCard.querySelector(".eliminar-tarjeta");
    eliminarButton.addEventListener("click", function () {
      newCard.remove();
    });

    cardsContainer.appendChild(newCard);

    // Funcionalidad del modal
    let modal = newCard.querySelector(".modal");
    let openTaskButton = newCard.querySelector(".openTask");
    openTaskButton.addEventListener("click", function () {
      modal.style.display = "block";
    });
    let closeButton = modal.querySelector(".close");
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  } 
    // Crear tarjetas a partir de los datos de response
    response.forEach(item => {
      let newCard = document.createElement("div");
      newCard.className = "tarjeta";

      let cardContent = `
        <div class="inputs">
          <button class="openTask">
            <p>tarea</p>
          </button>
          <button class="eliminar-tarjeta">Eliminar</button>
          <div class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <div class="input-wrapper">
                <label for="title">Título:</label>
                <input type="text" class="title" value="${item.title || ''}">
              </div>
              <div class="input-wrapper">
                <label for="description">Descripción:</label>
                <input type="text" class="description" value="${item.description || ''}">
              </div>
              <div class="input-wrapper">
                <label for="assignedTo">Asignado a:</label>
                <input type="text" class="assignedTo" value="${item.assignedTo || ''}">
              </div>
              <div class="input-wrapper">
                <label for="startDate">Fecha de inicio:</label>
                <input type="date" class="startDate" value="${formatDate(item.startDate) || ''}">
              </div>
              <div class="input-wrapper">
                <label for="endDate">Fecha de fin:</label>
                <input type="date" class="endDate" value="${formatDate(item.endDate) || ''}">
              </div>
              <div class="input-wrapper">
                <label for="status">Estado:</label>
                <select class="status">
                  <option value="En Proceso" ${item.status === "In Progress" ? "selected" : ""}>En Proceso</option>
                  <option value="Bloqueado" ${item.status === "To Do" ? "selected" : ""}>Por Hacer</option>
                  <option value="Finalizado" ${item.status === "Done" ? "selected" : ""}>Finalizado</option>
                </select>
              </div>
              <div class="input-wrapper">
                <label for="priority">Prioridad:</label>
                <select class="priority">
                  <option value="Media" ${item.priority === "Medium" ? "selected" : ""}>Media</option>
                </select>
              </div>
              <div class="input-wrapper">
                <label for="comments">Comentarios:</label>
                <input type="text" class="comments" value="${item.comments || ''}">
              </div>
            </div>
          </div>
        </div>
      `;
      newCard.innerHTML = cardContent;

      let eliminarButton = newCard.querySelector(".eliminar-tarjeta");
      eliminarButton.addEventListener("click", function () {
        newCard.remove();
      });

      // Agregar botón de cerrar
      let closeButton = newCard.querySelector(".close");
      closeButton.addEventListener("click", function () {
        modal.style.display = "none";
      });

      cardsContainer.appendChild(newCard);

      let modal = newCard.querySelector(".modal");
      let openTaskButtons = newCard.querySelectorAll(".openTask");
      openTaskButtons.forEach((button) => {
        button.addEventListener("click", function () {
          modal.style.display = "block";
        });
      });
      closeButton = modal.querySelector(".close");
      closeButton.addEventListener("click", function () {
        modal.style.display = "none";
      });
      window.addEventListener("click", function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    });
  }



//formateo de fecha
function formatDate(dateString) {
  if (!dateString) return '';
  let [day, month, year] = dateString.split('/');
  let date = new Date(year, month - 1, day);

  let anio = date.getFullYear();
  let mes = String(date.getMonth() + 1).padStart(2, '0');
  let dia = String(date.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
}