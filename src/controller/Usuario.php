<?php

class Usuario
{

  private $connection = null;

  public function __construct()
  {
    require_once __DIR__ . "/Database.php";
    $this->connection = new Database();
  }

  public function get(array $data)
  {

    $query = "SELECT * FROM usuarios WHERE usu_email = :email";

    $buscar = $this->connection->getConnection()->prepare($query);

    $buscar->bindParam(":email", $data[0]["email"], PDO::PARAM_STR);

    $buscar->execute();

    if ($buscar->rowCount() == 0) {
      $response = [
        "response" => [
          "message" => "Email ou senha inválido(s)",
        ]
      ];

      http_response_code(400);
      echo json_encode($response);
      return;
    }

    $user = $buscar->fetch(PDO::FETCH_ASSOC);

    if (!password_verify($data[0]["senha"], $user["usu_senha"])) {
      $response = [
        "response" => [
          "message" => "Email ou senha inválido(s)",
        ]
      ];

      http_response_code(400);
      echo json_encode($response);
      return;
    }

    $_SESSION["usuario"] = $user;

    $response = [
      "response" => [
        "message" => "Usuários logado",
      ]
    ];

    http_response_code(200);
    echo json_encode($response);
    return;
  }

  public function post(array $data)
  {

    $errors = array();

    if (empty($data[0]["nome"])) {
      $errors[] = "Campo nome vazio!";
    }

    if (empty($data[0]["email"])) {
      $errors[] = "Campo email vazio!";
    }

    if (empty($data[0]["senha"])) {
      $errors[] = "Campo senha vazio!";
    }

    if (!empty($errors)) {

      $response = [
        "response" => [
          "message" => "Erro durante o cadastro",
          "error" => $errors,
          "data" => $data[0]
        ]
      ];

      http_response_code(400);
      echo json_encode($response);
      return;
    }

    $query = "INSERT INTO usuarios ( usu_nome , usu_email , usu_senha ) VALUES ( :nome , :email , :senha )";

    $cadastrar = $this->connection->getConnection()->prepare($query);

    $nome = $data[0]["nome"];
    $email = $data[0]["email"];
    $senha = password_hash($data[0]["senha"],PASSWORD_DEFAULT);

    $cadastrar->bindParam(":nome", $nome, PDO::PARAM_STR);
    $cadastrar->bindParam(":email", $email, PDO::PARAM_STR);
    $cadastrar->bindParam(":senha", $senha, PDO::PARAM_STR);

    $cadastrar->execute();

    if ($cadastrar->rowCount() == 0) {
      $response = [
        "response" => [
          "message" => "Erro durante o cadastro",
        ]
      ];

      http_response_code(200);
      echo json_encode($response);
      return;
    }

    $response = [
      "response" => [
        "message" => "Usuário criado",
      ]
    ];

    http_response_code(201);
    echo json_encode($response);
    return;
  }

  private function error(string $message)
  {

    $response = [
      "response" => [
        "message" => $message
      ]
    ];

    http_response_code(400);
    echo json_encode($response);
    return;
  }

  private function success(string $message)
  {

    $response = [
      "response" => [
        "message" => $message
      ]
    ];

    http_response_code(200);
    echo json_encode($response);
    return;
  }
}
