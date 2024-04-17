// Obtener los botones "Añadir una tarjeta"
let addCardButtons = document.querySelectorAll(".addCardButton");
addCardButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Crear una nueva tarjeta
    let newCard = document.createElement("div");
    newCard.className = "tarjeta";

    // Array para el campo "Prioridad"
    const prioridades = ["Alta", "Baja", "Media", "Muy Alta", "Muy Baja"];

    // Array para el campo "Estado"
    const estados = ["En Proceso", "Bloqueado", "Finalizado"];

    let cardContent = `
    <div class="inputs">
      <button class="openTask">
        <p>tarea</p>
      </button> <!-- Cambiado a clase -->
      <div class="modal"> <!-- Cambiado a clase -->
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="input-wrapper">
            <label for="title">Título:</label>
            <input type="text" id="title" class="title" />
          </div>
          <div class="input-wrapper">
            <label for="description">Descripción:</label>
            <input type="text" id="description" class="description" />
          </div>
          <div class="input-wrapper">
            <label for="assignedTo">Asignado a:</label>
            <input type="text" id="assignedTo" class="assignedTo" />
          </div>
          <div class="input-wrapper">
            <label for="startDate">Fecha de inicio:</label>
            <input type="date" id="startDate" class="startDate" />
          </div>
          <div class="input-wrapper">
            <label for="endDate">Fecha de fin:</label>
            <input type="date" id="endDate" class="endDate" />
          </div>
          <div class="input-wrapper">
            <label for="status">Estado:</label>
            <select id="status" class0=0"status">
              ${estados.map(estado => `<option value="${estado}">${estado}</option>`).join('')}
            </select>
          </div>
          <div class="input-wrapper">
            <label for="priority">Prioridad:</label>
            <select id="priority" class="priority">
              ${prioridades.map(prioridad => `<option value="${prioridad}">${prioridad}</option>`).join('')}
            </select>
          </div>
          <div class="input-wrapper">
            <label for="comments">Comentarios:</label>
            <input type="text" id="comments" class="comments" />
          </div>
        </div>
      </div>
    </div>
    `;

    let api = {
      "title": "Título de la tarea",
      "description": "Descripción detallada de la tarea",
      "assignedTo": "Usuario asignado a la tarea",
      "startDate": "2024-04-15",
      "endDate": "2024-04-30",
      "status": "En Proceso",
      "priority": "Alta",
      "comments": "Comentarios adicionales sobre la tarea"
    };

    
    // Función para cargar los datos en el modal
    function cargarDatosEnModal(tarea) {
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

  // Llamar a la función para cargar los datos en el modal
    cargarDatosEnModal(api);    
    

  

    // Asignar el contenido a la nueva tarjeta
    newCard.innerHTML = cardContent;

    // Agregar la nueva tarjeta al contenedor de tarjetas
    let cardsContainer = document.querySelector(".cards");
    cardsContainer.appendChild(newCard);

    // Obtener modal dentro de la nueva tarjeta
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
