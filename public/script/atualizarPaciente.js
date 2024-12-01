function atualizarPaciente(id) {

  const row = document.getElementById(id);
  
  const nome = row.querySelector("#nome").value;
  const dataNascimento = row.querySelector("#dataNasc").value;
  const febre = row.querySelector("#febre").value;
  const sintomas = row.querySelector("#sintomas").value;

  const error_nome = row.querySelector("#error_nome");
  const error_dataNasc = row.querySelector("#error_dataNasc");
  const error_febre = row.querySelector("#error_febre");
  const error_sintomas = row.querySelector("#error_sintomas");

  let error = 0;

  if ( !nome ) {
    error_nome.innerHTML = '<span class="bold">Atenção:</span> Preencha o campo nome!';
    error++;
  }

  if ( !dataNascimento ) {
    error_dataNasc.innerHTML = '<span class="bold">Atenção:</span> Preencha o campo data de nascimento!';
    error++;
  }

  if ( !febre ) {
    error_febre.innerHTML = '<span class="bold">Atenção:</span> Preencha o campo febre!';
    error++;
  }

  if ( !sintomas ) {
    error_sintomas.innerHTML = '<span class="bold">Atenção:</span> Preencha o campo sintomas!';
    error++;
  }

  const dataNascimentoValidar = dataNascimento.split("-");
  const dataAtual = new Date();
  
  if ( dataNascimentoValidar[0] > dataAtual.getFullYear() ) {
    error_dataNasc.innerHTML = '<span class="bold">Atenção:</span> Escolha uma data válida!';
    error++;
  } else if ( dataNascimentoValidar[0] == dataAtual.getFullYear() && dataNascimentoValidar[1] > dataAtual.getMonth() + 1 ) {
    error_dataNasc.innerHTML = '<span class="bold">Atenção:</span> Escolha uma data válida!';
    error++;
  } else if ( dataNascimentoValidar[1] == dataAtual.getMonth() + 1 && dataNascimentoValidar[2] > dataAtual.getDate() ) {
    error_dataNasc.innerHTML = '<span class="bold">Atenção:</span> Escolha uma data válida!';
    error++;
  }


  if ( error > 0 ) {
    setTimeout(()=>{
      error_nome.innerText = "";
      error_dataNasc.innerText = "";
      error_febre.innerText = "";
      error_sintomas.innerText = "";
    },5000);
    return false;
  }

  const alergias = row.querySelector("#alergia").value;

  const data = {
    id: id,
    paciente: nome,
    dataNasc: dataNascimento,
    febre: febre,
    sintomas: sintomas,
    alergias: alergias
  };

  const ajax = new XMLHttpRequest();

  ajax.onload = () => {

    if ( ajax.status == 200 ) {

      row.querySelector("#nome").value = "";
      row.querySelector("#dataNasc").value = "";
      row.querySelector("#febre").value = "";
      row.querySelector("#sintomas").value = "";
      row.querySelector("#alergia").value = "";
      
      abrirForm(id);
      buscarDados();
      
    }

    return false;

  };

  ajax.open("POST","/api.php/triagem/path",true);
  ajax.send(JSON.stringify(data));

  return false;
  
}