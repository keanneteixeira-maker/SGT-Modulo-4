@echo off
REM Desativa a exibicao dos comandos no terminal.

chcp 65001 >nul
REM Configura o terminal para UTF-8.

REM Cria o arquivo .env a partir do .env.example somente se ele ainda nao existir.
if not exist .env (
    copy .env.example .env
)

echo Parando e removendo os containers da aplicacao...

REM Para e remove os containers definidos no compose.yml.
docker compose -f compose.yml down --remove-orphans

REM Remove container antigo, caso exista.
docker rm -f tarefas-web-app >nul 2>nul

echo Subindo a aplicacao com build e recriacao do container...

REM Sobe a aplicacao reconstruindo a imagem e recriando o container.
docker compose -f compose.yml up --build --force-recreate