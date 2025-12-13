document.querySelector('#adicionar').addEventListener('click', insereTarefa);
document.querySelector('#recuperar').addEventListener('click', recuperar);

let toDoList = []; // Variável com os dados da TODO list

function mostra() {
  let valor = "";
  for (let i = 0; i < toDoList.length; i++) {
    valor += ` 
      <label for="tarefa${i}" id="label${i}" 
        class="${toDoList[i].excluido ? 'apagado1' : ''}">
        ${toDoList[i].texto}
      </label>
      <input type="button" id="tarefa${i}" class="d1" value="feito" onclick="excluirTarefa(${i})">
      <br>`;
  }
  document.querySelector("#lista").innerHTML = valor;
}

// Inclui tarefa no array toDoList
function insereTarefa() {
  toDoList.push({
    texto: document.querySelector("#tarefa").value + "," + document.querySelector("#data").value,
    excluido: 0
  });

  gravar();
  mostra();
}

function excluirTarefa(num) {
  const label = document.getElementById(`label${num}`);

  // Primeira vez → risca a tarefa
  if (!label.classList.contains("apagado1")) {
    label.classList.add("apagado1");
    toDoList[num].excluido = 1;
    gravar();
  } 
  else {
    // Segunda vez → deleta definitivamente
    let a = JSON.parse(localStorage.getItem("lista"));
    a.splice(num, 1);

    localStorage.setItem("lista", JSON.stringify(a));

    
    toDoList.splice(num, 1);
    mostra();
  }
}

// Operações no localStorage
function gravar() {
  localStorage.setItem("lista", JSON.stringify(toDoList));
}

function recuperar() {
  let lista = localStorage.getItem("lista");

  if (lista) {
    toDoList = JSON.parse(lista);
  } else {
    toDoList = [];
  }

  mostra();
}

function limpar() {
  localStorage.removeItem('lista');
  toDoList = [];
  mostra();
}
