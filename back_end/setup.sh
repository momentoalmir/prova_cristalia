#!/bin/bash

# Copiar arquivo .env.example para .env
cp .env.example .env

# Instalar dependências
composer install

# Gerar chave da aplicação
php artisan key:generate

# Criar banco de dados
php artisan migrate

# Popular banco de dados
php artisan db:seed

# Rodar servidor
php artisan serve
