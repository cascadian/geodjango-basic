#!/bin/sh
POSTGRES="gosu postgres postgres"

$POSTGRES --single -E <<EOSQL
CREATE DATABASE geodjango TEMPLATE=template_postgis
CREATE ROLE geo WITH LOGIN CREATEDB
EOSQL
