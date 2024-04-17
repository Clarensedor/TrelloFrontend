
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

    // cargardiv
    newCard.innerHTML = cardContent;



   

    
    function ApiCargaModal(tarea) {
      console.log('antes de hacer magia' + tarea);
      
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
      assignedToInput.value = tarea.assignedTo;
      commentsInput.value = tarea.comments;
      descriptionInput.value = tarea.description;
      endDateInput.value = tarea.endDate;
      titleInput.value = tarea.title;
      startDateInput.value = tarea.startDate;
      statusInput.value = tarea.status;
      priorityInput.value = tarea.priority;
    }
   

    // Llamar a la función para cargar los datos en el modal
   
  
  });
});


    // cargar datos
    let response
    let url = "http://localhost:3000/api/tasks";
    fetch(url)
    .then(response => response.json())
    .then(data => {
      tareas = data;
      tareas.forEach(e=>createCards(tareas));
    })

    

    .catch(error => {
      console.error('Error:', error);
    });



function createCards(response) {
  console.log('data' + response);
  const cardsContainer = document.querySelector(".cards");

  
    const newCard = document.createElement("div");
    newCard.className = "tarjeta";

    const prioridades = ["Alta", "Baja", "Media", "Muy Alta", "Muy Baja"];
    const estados = ["En Proceso", "Bloqueado", "Finalizado"];

    const cardContent = `
    <div class="inputs">
      <button class="openTask">
        <p>tarea</p>
      </button>
      <div class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="input-wrapper">
            <label for="title">Título:</label>
            <input type="text" class="title" value="${title}" />
          </div>
          <div class="input-wrapper">
            <label for="description">Descripción:</label>
            <input type="text" class="description" value="${description}" />
          </div>
          <div class="input-wrapper">
            <label for="assignedTo">Asignado a:</label>
            <input type="text" class="assignedTo" value="${assignedTo}" />
          </div>
          <div class="input-wrapper">
            <label for="startDate">Fecha de inicio:</label>
            <input type="date" class="startDate" value="${startDate}" />
          </div>
          <div class="input-wrapper">
            <label for="endDate">Fecha de fin:</label>
            <input type="date" class="endDate" value="${endDate}" />
          </div>
          <div class="input-wrapper">
            <label for="status">Estado:</label>
            <select class="status">
              ${estados.map(
                (estado) =>
                  `<option value="${estado}" ${
                    estado === status ? "selected" : ""
                  }>${estado}</option>`
              ).join("")}
            </select>
          </div>
          <div class="input-wrapper">
            <label for="priority">Prioridad:</label>
            <select class="priority">
              ${prioridades.map(
                (prioridad) =>
                  `<option value="${prioridad}" ${
                    prioridad === priority ? "selected" : ""
                  }>${prioridad}</option>`
              ).join("")}
            </select>
          </div>
          <div class="input-wrapper">
            <label for="comments">Comentarios:</label>
            <input type="text" class="comments" value="${comments}" />
          </div>
        </div>
      </div>
    </div>
  `;

    newCard.innerHTML = cardContent;
    cardsContainer.appendChild(newCard);

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
  
}

createCards(3);
