#!/usr/bin/env bash

export COMPOSE_FILE="docker/docker-compose.local.yml"


docker-compose -f ${COMPOSE_FILE} down

docker-compose -f ${COMPOSE_FILE} build --force-rm #--no-cache

docker-compose -f ${COMPOSE_FILE} up