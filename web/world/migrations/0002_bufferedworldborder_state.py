# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('world', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BufferedWorldBorder',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('geom', django.contrib.gis.db.models.fields.GeometryField(srid=4326)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('state_name', models.CharField(max_length=25)),
                ('state_fips', models.CharField(max_length=2)),
                ('sub_region', models.CharField(max_length=20)),
                ('state_abbr', models.CharField(max_length=2)),
                ('pop2010', models.IntegerField()),
                ('pop10_sqmi', models.FloatField()),
                ('pop2012', models.IntegerField()),
                ('pop12_sqmi', models.FloatField()),
                ('white', models.IntegerField()),
                ('black', models.IntegerField()),
                ('ameri_es', models.IntegerField()),
                ('asian', models.IntegerField()),
                ('hawn_pi', models.IntegerField()),
                ('hispanic', models.IntegerField()),
                ('other', models.IntegerField()),
                ('mult_race', models.IntegerField()),
                ('males', models.IntegerField()),
                ('females', models.IntegerField()),
                ('age_under5', models.IntegerField()),
                ('age_5_9', models.IntegerField()),
                ('age_10_14', models.IntegerField()),
                ('age_15_19', models.IntegerField()),
                ('age_20_24', models.IntegerField()),
                ('age_25_34', models.IntegerField()),
                ('age_35_44', models.IntegerField()),
                ('age_45_54', models.IntegerField()),
                ('age_55_64', models.IntegerField()),
                ('age_65_74', models.IntegerField()),
                ('age_75_84', models.IntegerField()),
                ('age_85_up', models.IntegerField()),
                ('med_age', models.FloatField()),
                ('med_age_m', models.FloatField()),
                ('med_age_f', models.FloatField()),
                ('households', models.IntegerField()),
                ('ave_hh_sz', models.FloatField()),
                ('hsehld_1_m', models.IntegerField()),
                ('hsehld_1_f', models.IntegerField()),
                ('marhh_chd', models.IntegerField()),
                ('marhh_no_c', models.IntegerField()),
                ('mhh_child', models.IntegerField()),
                ('fhh_child', models.IntegerField()),
                ('families', models.IntegerField()),
                ('ave_fam_sz', models.FloatField()),
                ('hse_units', models.IntegerField()),
                ('vacant', models.IntegerField()),
                ('owner_occ', models.IntegerField()),
                ('renter_occ', models.IntegerField()),
                ('no_farms07', models.FloatField()),
                ('avg_size07', models.FloatField()),
                ('crop_acr07', models.FloatField()),
                ('avg_sale07', models.FloatField()),
                ('sqmi', models.FloatField()),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(srid=4326)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
