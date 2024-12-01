function deleteModal(id) {

  const modal = document.getElementById("deleteModal");

  modal.showModal();

  const ajax = new XMLHttpRequest();

  ajax.onload = () => {

    const response = JSON.parse(ajax.response).response;

    modal.querySelector("#nome").innerText = response.data[0].tri_paciente;
    modal.querySelector("#febre").innerText = response.data[0].tri_febre;
    modal.querySelector("#sintomas").innerText = response.data[0].tri_sintomas;
    modal.querySelector("#alergia").innerText = response.data[0].tri_alergias ? response.data[0].tri_alergias : "Nenhuma";
    modal.querySelector("#dataNasc").innerText = response.data[0].tri_dataNasc;
    modal.querySelector("#tri_id").value = response.data[0].tri_id;

  };

  ajax.open("GET", "/api.php/triagem/get/" + id, true);

  ajax.send();

}

function closeModal() {
  const modal = document.getElementById("deleteModal");

  modal.close();

  modal.querySelector("#nome").innerText = "";
  modal.querySelector("#febre").innerText = "";
  modal.querySelector("#sintomas").innerText = "";
  modal.querySelector("#alergia").innerText = "";
  modal.querySelector("#dataNasc").innerText = "";
  modal.querySelector("#tri_id").value = "";

}

function deletarPaciente() {
  const modal = document.getElementById("deleteModal");

  const ajax = new XMLHttpRequest();

  ajax.onload = () => {

    buscarDados();
    closeModal();

    modal.querySelector("#nome").innerText = "";
    modal.querySelector("#febre").innerText = "";
    modal.querySelector("#sintomas").innerText = "";
    modal.querySelector("#alergia").innerText = "";
    modal.querySelector("#dataNasc").innerText = "";
    modal.querySelector("#tri_id").value = "";
    
  };

  const id = modal.querySelector("#tri_id").value;

  ajax.open("GET", "/api.php/triagem/delete/" + id, true);

  ajax.send();
}