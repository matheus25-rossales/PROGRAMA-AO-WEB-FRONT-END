document.querySelector('#adicionar').addEventListener('click', insereTarefa);
// window.onload = function() {
//    gravar(); // carrega a lista do localStorage automaticamente
// };
// document.querySelector('#gravar').addEventListener('click', gravar);
document.querySelector('#recuperar').addEventListener('click', recuperar);
// document.querySelector('#limpar').addEventListener('click', limpar);

let toDoList = []; //Variável com os dados da TODO list

function mostra() {
  let valor = "";
  for (let i = 0; i < toDoList.length; i++) {
    valor += ` 
           <label for="tarefa${i}" id = "label${i}" class = "${toDoList[i].excluido ? 'apagado1' :'' }">${toDoList[i].texto}</label>
          <input type="button" id="tarefa${i}" class ="d1" value ='feito' onclick ="excluirTarefa(${i})">`+"<br>";
  }
  document.querySelector("#lista").innerHTML = valor;
}

// Inclui e exclui terefas no array toDoList
function insereTarefa() {
  toDoList.push({texto: document.querySelector("#tarefa").value + "," + document.querySelector("#data").value ,excuido : 0
  }
  );
  gravar();
  mostra();
}
function excluirTarefa(num) { 
   if(!(document.getElementById(`label${num}`).classList.contains("apagado1"))){
  document.getElementById(`label${num}`).classList.add("apagado1")
  toDoList[num].excluido=1;
  }
  else{
 a = JSON.parse(localStorage.getItem("lista"));
  console.log(Array.isArray(a))
  a.splice(num,1);
  console.log(Array.isArray(a))
  localStorage.lista = a;
  toDoList.splice(num,1)
  mostra();
  }
}


//Operações no localstorage
function gravar() {
  localStorage.setItem("lista", JSON.stringify(toDoList));
}
function recuperar() {
  toDoList = [];
  lista = localStorage.getItem("lista");
  if (lista) {
    toDoList = JSON.parse(lista);
  }
  mostra();
}
function limpar() {
  localStorage.removeItem('lista');
  toDoList = [];
  mostra();
} 
