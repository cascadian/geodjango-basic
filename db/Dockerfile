FROM mdillon/postgis:9.3
# the postgis image will run the following script on build
# scripts run in alphabetic order, so name it 'z.sh' so that it
# runs after postgis.sh from the base image
COPY ./initdb-geodjango.sh /docker-entrypoint-initdb.d/z.sh
