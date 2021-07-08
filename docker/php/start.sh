#!/bin/bash

cd /var/www/project

export COMPOSER_MEMORY_LIMIT=-1

composer install

#php artisan passport:keys --force
#php artisan storage:link
php artisan migrate --seed
