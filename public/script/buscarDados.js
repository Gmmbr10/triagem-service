function buscarDados() {

  const table_body = document.querySelector("#pacientes #pacientes_body");
  const ajax = new XMLHttpRequest();
  table_body.innerHTML = '';

  ajax.onload = () => {

    // console.log(ajax.response);
    const response = JSON.parse(ajax.response).response;

    if (response.message) {
      table_body.innerHTML = '<tr><td colspan="6" class="text-center">' + response.message + '</td></tr>';
      return;
    }


    response.data.map(data => {
      const hoje = new Date();
      const nascimento = new Date(data["tri_dataNasc"]);

      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();

      // Ajusta a idade se a data de nascimento ainda não ocorreu este ano
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }

      const alergias = (data["tri_alergias"]) ? data["tri_alergias"] : "Não possuí alergias";
      const febre = Number(data["tri_febre"]).toFixed(1).replace(".", ",");

      table_body.innerHTML += `<tr>
            <td onclick="abrirForm(${data["tri_id"]})">${data["tri_paciente"]}</td>
            <td onclick="abrirForm(${data["tri_id"]})">${idade}</td>
            <td onclick="abrirForm(${data["tri_id"]})">${alergias}</td>
            <td onclick="abrirForm(${data["tri_id"]})">${febre}</td>
            <td onclick="abrirForm(${data["tri_id"]})">${data["tri_sintomas"]}</td>
            <td>
              <span onclick="deleteModal(${data["tri_id"]})" class="text-center error material-symbols-outlined">
                delete
              </span>
            </td>
          </tr>
          <tr id="${data["tri_id"]}" class="bg-gray">
            <td colspan="6">
              
              <h3 style="margin-bottom: 2rem">Atualizar</h3>
              
              <form action="#" id="atualizarPaciente" onsubmit="atualizarPaciente(${data["tri_id"]});return false;" class="col-2">

                <section class="column">

                  <span class="success" id="success_message"></span>

                  <section class="input-box">

                    <label for="nome">Nome</label>
                    <input type="text" name="nome" id="nome">
                    <span class="error" id="error_nome"></span>

                  </section>

                  <section class="input-box">

                    <label for="dataNasc">Data de nascimento</label>
                    <input type="date" name="dataNasc" id="dataNasc">
                    <span class="error" id="error_dataNasc"></span>

                  </section>

                  <section class="input-box">

                    <label for="alergia">Alergias</label>
                    <textarea name="alergia" id="alergia"></textarea>
                    <span class="error" id="error_alergia"></span>

                  </section>
                  
                </section>
                <section class="column">

                  <section class="input-box">

                    <label for="febre">Febre</label>
                    <input type="number" step="0.1" name="febre" id="febre">
                    <span class="error" id="error_febre"></span>

                  </section>

                  <section class="input-box">

                    <label for="sintomas">Sintomas</label>
                    <textarea name="sintomas" id="sintomas"></textarea>
                    <span class="error" id="error_sintomas"></span>

                  </section>

                  <input type="hidden" name="tri_id" id="tri_id">

                  <button type="submit" class="btn btn-secondary">Atualizar</button>

                </section>

              </form>
              
            </td>
          </tr>`;
    });

  };

  ajax.open("GET", "/api.php/triagem/get", true);

  ajax.send();

}