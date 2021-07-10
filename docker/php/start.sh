#!/bin/bash

cd /var/www/project

export COMPOSER_MEMORY_LIMIT=-1

cp .env.${APP_ENV} .env

RUN chmod u+x .env

composer install

#php artisan passport:keys --force
#php artisan storage:link
php artisan key:generate

php artisan migrate --seed --force
