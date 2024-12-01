<?php

class Api
{

  public function __construct()
  {

    session_start();

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    $route = explode("/", strtolower(substr($_SERVER["PATH_INFO"], 1)));

    $route[0] = ucfirst($route[0]);

    $path = __DIR__ . "/" . $route[0] . ".php";

    if (!file_exists($path)) {

      return $this->error("Rota Inexistente");
    }

    require_once $path;

    $class = new $route[0]();

    if (empty($route[1])) {

      return $this->error("Método não passado");
    }

    $method = strtolower($route[1]);

    if (!method_exists($class, $method)) {

      return $this->error("Método não encontrado");
    }

    $data = (isset($route[2])) ? [$route[2]] : array();

    if (file_get_contents("php://input")) {

      $data[] = json_decode(file_get_contents("php://input"),true);
      
    }

    call_user_func([$class, $method],$data);
  }

  private function error(String $message)
  {
    $response = ["message" => $message];

    http_response_code(400);
    echo json_encode($response);
    return;
  }
}
