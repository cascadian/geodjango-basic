# Prequisites
- A Linux (virtual) machine

Note: this setup will not work on Windows or Mac  using boot2docker because docker-compose (another prereq) doesn't currently work with boot2docker

- Install [Docker](https://docs.docker.com/installation/#installation) onto a Linux machine or VM.

- Install [Docker-compose](https://docs.docker.com/compose/install/#install-compose)

# Run
1. clone this repository

`git clone https://github.com/cascadian/geodjango-basic.git`

1. Open a terminal and `cd` to the `geodjango-basic` directory created in the previous step.

2. At the command prompt, run `docker-compose build`

This will take a few minutes to run the first time because it downloads images from the Docker hub and builds the docker images for the app. The built image steps are cached, so the next time `docker-compose` is run, it will be much faster.

3. Run `docker-compose up` to start the database and web server containers.

4. Import data into the database, using the Django shell
  1. Open a new terminal session and cd to geodjango-basic
  1. Open a Django shell `docker-compose run web python manage.py syncdb`
  1. Open a Django shell `docker-compose run web python manage.py shell`
  1. In the Python shell, run:

     ```
     >>>from world import load
     >>>load.run()
     ```

     This will load data into the database from
the shape file under `web/world/data`

5. Browse to http://localhost:8000/world/ to view the app
