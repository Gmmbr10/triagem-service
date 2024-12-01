function abrirForm(id) {

  const classes = document.getElementById(id).classList;
  const form = document.getElementById(id);

  if (classes.contains("d-block")) {

    classes.toggle("d-block");

    form.querySelector("#nome").value = "";
    form.querySelector("#febre").value = "";
    form.querySelector("#sintomas").value = "";
    form.querySelector("#alergia").value = "";
    form.querySelector("#dataNasc").value = "";
    form.querySelector("#tri_id").value = "";

  } else {

    const ajax = new XMLHttpRequest();

    ajax.onload = () => {

      const response = JSON.parse(ajax.response).response;

      form.querySelector("#nome").value = response.data[0].tri_paciente;
      form.querySelector("#febre").value = response.data[0].tri_febre;
      form.querySelector("#sintomas").value = response.data[0].tri_sintomas;
      form.querySelector("#alergia").value = response.data[0].tri_alergias;
      form.querySelector("#dataNasc").value = response.data[0].tri_dataNasc;
      form.querySelector("#tri_id").value = response.data[0].tri_id;

    };

    classes.toggle("d-block");

    ajax.open("GET", "/api.php/triagem/get/" + id, true);

    ajax.send();

  }

}