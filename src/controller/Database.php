<?php

class Database {

  private static $host = "db";
  private static $database = "triagem_service";
  private static $user = "root";
  private static $password = "root";
  private static $connection = null;
  
  private static function Connect()
  {

    try {

      if (self::$connection == null) {

        self::$connection = new PDO(
          "mysql:host=". self::$host .";dbname=". self::$database,
          self::$user,self::$password
        );
      }
    } catch (Exception $exeption) {

      echo "Error: " . $exeption;
      die();
    }
    return self::$connection;
  }

  public function getConnection()
  {
    return self::Connect();
  }
  
}