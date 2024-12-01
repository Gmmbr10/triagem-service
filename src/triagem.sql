create database triagem_service;

use triagem_service;

create table usuarios (
  usu_id int auto_increment not null,
  usu_nome varchar(100) not null,
  usu_email varchar(255) not null,
  usu_senha varchar(255) not null,
  primary key(usu_id),
  unique(usu_email)
);

create table triagem (
  tri_id int auto_increment not null,
  tri_paciente varchar(100) not null,
  tri_dataNasc date not null,
  tri_febre float(3,1) not null,
  tri_alergias text,
  tri_sintomas text not null,
  primary key(tri_id)
);