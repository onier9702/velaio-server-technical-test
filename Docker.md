# Information about docker commands to use on this backend server

# Commands Needed in Development and Production

1. Build the docker image of this App (For DEVELOPMENT )
   `docker compose -f docker-compose.dev.yml build --no-cache`

2. Build the docker image of this App (For PRODUCTION )
   `docker compose -f docker-compose.yml build --no-cache`

3. Up the container for this image created before (For DEVELOPMENT )
   `docker compose -f docker-compose.dev.yml up -d`

4. Up the container for this image created before (For PRODUCTION )
   `docker compose -f docker-compose.yml up -d`

5. Set the containers down
   `docker-compose down`
