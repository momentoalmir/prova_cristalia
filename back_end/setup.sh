#!/bin/bash
cp .env.example .env

composer i

php artisan key:generate
php artisan migrate

npm i
npm run build

php artisan serve --port=8000
