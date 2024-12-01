function cadastrarUsuario()
{

  const nome = document.querySelector("#form_cadastrar #nome").value;
  const email = document.querySelector("#form_cadastrar #email").value;
  const senha = document.querySelector("#form_cadastrar #senha").value;

  const error_nome = document.querySelector("#form_cadastrar #error_nome");
  const error_email = document.querySelector("#form_cadastrar #error_email");
  const error_senha = document.querySelector("#form_cadastrar #error_senha");

  let error = 0;

  if ( !nome ) {
    error_nome.innerHTML = '<span class="bold">Atenção:</span> Preencha o campo nome!';
    error++;
  }

  if ( !email ) {
    error_email.innerHTML = '<span class="bold">Atenção:</span> Preencha o campo email!';
    error++;
  }

  if ( !senha ) {
    error_senha.innerHTML = '<span class="bold">Atenção:</span> Preencha o campo senha!';
    error++;
  }

  if ( error > 0 ) {
    setTimeout(()=>{
      error_nome.innerText = "";
      error_email.innerText = "";
      error_senha.innerText = "";
    },3000);
    return false;
  }

  const ajax = new XMLHttpRequest();

  ajax.onload = () => {

    const response = JSON.parse(ajax.response)["response"];

    if ( ajax.status == 201 ) {

      const success_message = document.querySelector("#form_cadastrar #success_message");
      document.querySelector("#form_cadastrar #nome").value = "";
      document.querySelector("#form_cadastrar #email").value = "";
      document.querySelector("#form_cadastrar #senha").value = "";

      success_message.innerText = response.message;

      setInterval(()=>{

        success_message.innerText = "";
          
      },3000);
      
    }
    
  }

  ajax.open("POST","/api.php/usuario/post",true);

  const dados = {
    nome: nome,
    email: email,
    senha: senha
  };

  ajax.send(JSON.stringify(dados));

  return false;
  
}