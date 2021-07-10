FROM php:7.4-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
RUN pecl install xdebug-3.0.3
RUN docker-php-ext-install gd
RUN docker-php-ext-enable xdebug

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY ./docker/php /var/www/docker
WORKDIR /var/www/docker
RUN chmod u+x /var/www/docker/start.sh


RUN mkdir /var/www/project

COPY ./project  /var/www/project
WORKDIR  /var/www/project

# Copy existing application directory permissions
RUN chown www-data:www-data -R /var/www/project

CMD /var/www/docker/start.sh && \
    php-fpm -F -R
