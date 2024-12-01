function cadastrarPaciente()
{

  const nome = document.querySelector("#cadastrarPaciente #nome").value;
  const dataNascimento = document.querySelector("#cadastrarPaciente #dataNasc").value;
  const febre = document.querySelector("#cadastrarPaciente #febre").value;
  const sintomas = document.querySelector("#cadastrarPaciente #sintomas").value;

  const error_nome = document.querySelector("#cadastrarPaciente #error_nome");
  const error_dataNasc = document.querySelector("#cadastrarPaciente #error_dataNasc");
  const error_febre = document.querySelector("#cadastrarPaciente #error_febre");
  const error_sintomas = document.querySelector("#cadastrarPaciente #error_sintomas");

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

  const alergias = document.querySelector("#cadastrarPaciente #alergia").value;

  const data = {
    paciente: nome,
    dataNasc: dataNascimento,
    febre: febre,
    sintomas: sintomas,
    alergias: alergias
  };

  const ajax = new XMLHttpRequest();

  ajax.onload = () => {

    if ( ajax.status == 201 ) {

      const sucess_message = document.querySelector("#cadastrarPaciente #success_message");
      
      document.querySelector("#cadastrarPaciente #nome").value = "";
      document.querySelector("#cadastrarPaciente #dataNasc").value = "";
      document.querySelector("#cadastrarPaciente #febre").value = "";
      document.querySelector("#cadastrarPaciente #sintomas").value = "";
      document.querySelector("#cadastrarPaciente #alergia").value = "";
      
      sucess_message.innerText = JSON.parse(ajax.response).response.message;

      setInterval(()=>{

        success_message.innerText = "";
          
      },3000);
      
    }

    return false;

  };

  ajax.open("POST","/api.php/triagem/post",true);
  ajax.send(JSON.stringify(data));

  return false;
  
}