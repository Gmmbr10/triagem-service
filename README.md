<h1 align="center">Triagem-service</h1>

<p align="center">Triagem-service é um microserviço sobre triagem.</p>
<p align="center">Ideia principal deste software é criar uma ficha de triagem hospitalar.</p>

<p align="center">
	<a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&#124;&nbsp;&nbsp;
	<a href="#sobre-o-app">Sobre o app</a>&nbsp;&nbsp;&#124;&nbsp;&nbsp;
	<a href="#executar-o-app">Executar o app</a>&nbsp;&nbsp;&#124;&nbsp;&nbsp;
	<a href="#autores">Autores</a>&nbsp;&nbsp;
</p>

## Tecnologias

Esse app foi desenvolvido com as seguintes tecnologias:

- HTML e CSS
- JavaScript
- PHP
- Mysql
- Docker

## Sobre o app

Este é um microserviço cujo a ideia é imitar um processo de triagem hospitalar.

Ele funciona na base de consumo de uma API, criada pelo próprio desenvolvedor.

## Executar o app

É necessário ter o [Docker](https://docs.docker.com/desktop/)  e [Docker Compose](https://docs.docker.com/compose/install/) instalado.

Navegue até a pasta deste projeto e execute o seguinte código `docker compose up` ou `docker-compose up`

Após este processo, copie e cole os scripts do arquivo `src/triagem.sql` no container do banco de dados.

Com isso, todo o setup deve estar configurado e pronto para usar na url [localhost:8888](http://localhost:8888).

## Autores

<ul>
	<li>Giovanne Monteiro de Melo</li>
</ul>

