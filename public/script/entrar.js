function entrar()
{

  const email = document.querySelector("#form_entrar #email").value;
  const senha = document.querySelector("#form_entrar #senha").value;

  const error_email = document.querySelector("#form_entrar #error_email");
  const error_senha = document.querySelector("#form_entrar #error_senha");

  let error = 0;

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
      error_email.innerText = "";
      error_senha.innerText = "";
    },5000);
    return false;
  }

  const ajax = new XMLHttpRequest();

  ajax.onload = () => {

    if ( ajax.status == 200 ) {
      window.location.href = "../index.php/home";
    }
    
  }

  ajax.open("POST","/api.php/usuario/get",true);

  const dados = {
    email: email,
    senha: senha
  };

  ajax.send(JSON.stringify(dados));

  return false;
  
}