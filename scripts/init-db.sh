#!/bin/bash

# Wait for PostgreSQL to start
until pg_isready -h localhost; do
  sleep 1
done

# Create additional databases or run any other commands
createdb -U postgres nepsevirt
