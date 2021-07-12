FROM php:7.4-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    supervisor

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
RUN pecl install xdebug-3.0.3
RUN docker-php-ext-install gd
RUN docker-php-ext-enable xdebug

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY ./docker/queue /var/www/docker
WORKDIR /var/www/docker
RUN mv php.ini /usr/local/etc/php/conf.d/php.ini


RUN mkdir /var/www/project

COPY ./project  /var/www/project
WORKDIR  /var/www/project

# Copy existing application directory permissions
RUN chown www-data:www-data -R /var/www/project

CMD ln -sf /var/www/docker/php.ini /usr/local/etc/php/conf.d/php.ini && \
 supervisord -n --configuration /var/www/docker/supervisor.conf
