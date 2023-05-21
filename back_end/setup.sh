#!/bin/bash

# Copy the .env.example file to .env
cp .env.example .env

# Install dependencies
composer install

# Install node dependencies
npm install

# # Run the tests
# ./vendor/bin/sail artisan test

# Run the application
./vendor/bin/sail up -d

# # Generate an app key
./vendor/bin/sail artisan key:generate

# Run the migrations (tables and columns)
./vendor/bin/sail artisan migrate

# Run the seeders (insert data into tables)
./vendor/bin/sail artisan db:seed
