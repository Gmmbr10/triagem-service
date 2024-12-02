<?php

class Triagem {

  private $connection = null;

  public function __construct()
  {
    require_once __DIR__ . "/Database.php";
    $this->connection = new Database();
    return;
  }

  public function get(array $data)
  {

    if ( isset($data) && !empty($data) ) {

      $query = "SELECT * FROM triagem WHERE tri_id = :id";
      $buscar = $this->connection->getConnection()->prepare($query);

      $buscar->bindParam(":id",$data[0]);

      $buscar->execute();

      if ( $buscar->rowCount() == 0 ) {

        $response = [
          "response" => [
            "message" => "Nenhum paciente cadastrado"
          ]
        ];
          
        http_response_code(200);
        echo json_encode($response);
        return;
        
      }
      
      $response = [
        "response" => [
          "data" => $buscar->fetchAll(PDO::FETCH_ASSOC)
        ]
      ];
      
      http_response_code(200);
      echo json_encode($response);
      return;
      
    }

    $query = "SELECT * FROM triagem";
    $buscar = $this->connection->getConnection()->prepare($query);

    $buscar->execute();

    if ( $buscar->rowCount() == 0 ) {

      
      $response = [
        "response" => [
          "message" => "Nenhum paciente cadastrado"
        ]
      ];
        
      http_response_code(200);
      echo json_encode($response);
      return;

    }

    $response = [
      "response" => [
        "data" => $buscar->fetchAll(PDO::FETCH_ASSOC)
      ]
    ];
    
    http_response_code(200);
    echo json_encode($response);
    return;
    
  }

  public function post(array $data)
  {

    $errors = array();

    if ( empty($data[0]["paciente"]) ) {
      $errors[] = "Campo paciente vazio!";
    }

    if ( empty($data[0]["dataNasc"]) ) {
      $errors[] = "Campo data de nascimento vazio!";
    }

    if ( empty($data[0]["febre"]) ) {
      $errors[] = "Campo Febre vazio!";
    }

    if ( empty($data[0]["sintomas"]) ) {
      $errors[] = "Campo sintomas vazio!";
    }

    if ( !empty($errors) ) {

      $response = [
        "response" => [
          "message" => "Alerta: Falta de dados!",
          "error" => $errors
        ]
      ];
      
      http_response_code(400);
      echo json_encode($response);
      return;

    }

    $query = "INSERT INTO triagem ( tri_paciente , tri_dataNasc , tri_febre , tri_sintomas , tri_alergias ) VALUES ( :paciente , :dataNasc , :febre , :sintomas , :alergias )";
    $cadastrar = $this->connection->getConnection()->prepare($query);

    $cadastrar->bindParam(":paciente",$data[0]["paciente"]);
    $cadastrar->bindParam(":dataNasc",$data[0]["dataNasc"]);
    $cadastrar->bindParam(":febre",$data[0]["febre"]);
    $cadastrar->bindParam(":sintomas",$data[0]["sintomas"]);
    $cadastrar->bindParam(":alergias",$data[0]["alergias"]);

    $cadastrar->execute();

    if ( $cadastrar->rowCount() == 0 ) {
      $response = [
        "response" => [
          "message" => "Alerta: Houve problemas durante o registro!"
        ]
      ];
      
      http_response_code(500);
      echo json_encode($response);
      return;
    }

    $response = [
      "response" => [
        "message" => "Successo: Paciente cadastrado com sucesso!",
      ]
    ];
    
    http_response_code(201);
    echo json_encode($response);
    return;
    
  }

  public function delete(array $data)
  {

    $query = "DELETE FROM triagem WHERE tri_id = :id";
    $deletar = $this->connection->getConnection()->prepare($query);

    $deletar->bindParam(":id",$data[0]);

    $deletar->execute();
    
    http_response_code(200);
    return;
  }

  public function path(array $data)
  {

    $errors = array();

    if ( empty($data[0]["paciente"]) ) {
      $errors[] = "Campo paciente vazio!";
    }

    if ( empty($data[0]["dataNasc"]) ) {
      $errors[] = "Campo data de nascimento vazio!";
    }

    if ( empty($data[0]["febre"]) ) {
      $errors[] = "Campo Febre vazio!";
    }

    if ( empty($data[0]["sintomas"]) ) {
      $errors[] = "Campo sintomas vazio!";
    }

    if ( !empty($errors) ) {

      $response = [
        "response" => [
          "message" => "Alerta: Falta de dados!",
          "error" => $errors
        ]
      ];
      
      http_response_code(400);
      echo json_encode($response);
      return;

    }

    $query = "UPDATE triagem SET tri_paciente=:paciente,tri_febre=:febre,tri_sintomas=:sintomas,tri_alergias=:alergias,tri_dataNasc=:dataNasc WHERE tri_id = :id";
    $cadastrar = $this->connection->getConnection()->prepare($query);

    $cadastrar->bindParam(":id",$data[0]["id"]);
    $cadastrar->bindParam(":paciente",$data[0]["paciente"]);
    $cadastrar->bindParam(":dataNasc",$data[0]["dataNasc"]);
    $cadastrar->bindParam(":febre",$data[0]["febre"]);
    $cadastrar->bindParam(":sintomas",$data[0]["sintomas"]);
    $cadastrar->bindParam(":alergias",$data[0]["alergias"]);

    $cadastrar->execute();
    
    http_response_code(200);
    return;
    
  }
  
}