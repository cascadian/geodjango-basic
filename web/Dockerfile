FROM python:2.7
ENV PYTHONUNBUFFERED 1
# install geospatial libraries for geodjango
# https://docs.djangoproject.com/en/dev/ref/contrib/gis/install/geolibs/
RUN apt-get update && apt-get install -y binutils libproj-dev gdal-bin

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
