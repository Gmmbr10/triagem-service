<?php

session_start();

require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_URI"] == "/") {
  header("location: ". INCLUDE_PATH . "index.php/home");
}

if (empty($_SERVER["PATH_INFO"]) || $_SERVER["PATH_INFO"] == "/") {
  header("location: ". INCLUDE_PATH . "index.php/home");
}

$html = file_get_contents("src/view/home.html");

if (isset($_SESSION["usuario"])) {

  $routes = explode("/",substr($_SERVER["PATH_INFO"],1));

  if ( $routes[0] == "sair" ) {

    session_destroy();

    header("location: ../");
    return;

  }

  $html = file_get_contents("src/view/medico/home.html");
  $html = str_replace("{medico}", $_SESSION["usuario"]["usu_nome"] , $html);
  
}

$html = str_replace("{include_path}", INCLUDE_PATH, $html);

echo $html;
return;