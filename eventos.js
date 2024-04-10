//obtengo el botons
let addCardButtons = document.querySelectorAll(".addCardButton");

addCardButtons.forEach((button) => {  
  //evento de click
  button.addEventListener("click", function () {
    
    let newCard = document.createElement("div");
    newCard.className = "tarjeta";

    // Prioridad
    const prioridades = ["Alta", "Baja", "Media", "Muy Alta", "Muy Baja"];

    // Estado
    const estados = ["En Proceso", "Bloqueado", "Finalizado"];

    let cardContent = `
    <div class="inputs">
    <button class="openTask">
      <p>tarea</p>
    </button>
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
            ${estados.map(estado => `<option value="${estado}">${estado}</option>`).join('')}
          </select>
        </div>
        <div class="input-wrapper">
          <label for="priority">Prioridad:</label>
          <select class="priority">
            ${prioridades.map(prioridad => `<option value="${prioridad}">${prioridad}</option>`).join('')}
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

    // cargar contenido div
    newCard.innerHTML = cardContent;

    // Agregar tarjeta
    let cardsContainer = document.querySelector(".cards");
    cardsContainer.appendChild(newCard);

    // cargar datos
    function ApiCargaModal(tarea) {
      // Obtener los elementos de entrada del modal
      let titleInput = newCard.querySelector('.title');
      let descriptionInput = newCard.querySelector('.description');
      let assignedToInput = newCard.querySelector('.assignedTo');
      let startDateInput = newCard.querySelector('.startDate');
      let endDateInput = newCard.querySelector('.endDate');
      let statusInput = newCard.querySelector('.status');
      let priorityInput = newCard.querySelector('.priority');
      let commentsInput = newCard.querySelector('.comments');

      // Establecer los valores de los elementos de entrada con los datos del JSON
      titleInput.value = tarea.title;
      descriptionInput.value = tarea.description;
      assignedToInput.value = tarea.assignedTo;
      startDateInput.value = tarea.startDate;
      endDateInput.value = tarea.endDate;
      statusInput.value = tarea.status;
      priorityInput.value = tarea.priority;
      commentsInput.value = tarea.comments;
    }

    const api = {
      "title": "Devolverle las cosas",
      "description": "La extraño :c",
      "assignedTo": "MiEx",
      "startDate": "2024-08-23",
      "endDate": "2025-01-01",
      "status": "En Proceso",
      "priority": "Alta",
      "comments": "sin comentarios"
    };

    // Llamar a la función para cargar los datos en el modal
    ApiCargaModal(api);

    // Obtener modal
    let modal = newCard.querySelector(".modal");

    // Botones que utilizo para abrir el modal
    let openTaskButtons = newCard.querySelectorAll(".openTask");
    openTaskButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Display the modal
        modal.style.display = "block";
      });
    });

    // Botón que cierra el modal 
    let closeButton = modal.querySelector(".close");

    // Evento para cerrar el modal
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Cuando el usuario hace clic en cualquier parte fuera del modal, ciérralo
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  });
});
