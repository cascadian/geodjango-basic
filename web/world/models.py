from django.contrib.gis.db import models


class WorldBorder(models.Model):
  # Regular Django fields corresponding to the attributes in the
  # world borders shapefile.
  name = models.CharField(max_length=50)
  area = models.IntegerField()
  pop2005 = models.IntegerField('Population 2005')
  fips = models.CharField('FIPS Code', max_length=2)
  iso2 = models.CharField('2 Digit ISO', max_length=2)
  iso3 = models.CharField('3 Digit ISO', max_length=3)
  un = models.IntegerField('United Nations Code')
  region = models.IntegerField('Region Code')
  subregion = models.IntegerField('Sub-Region Code')
  lon = models.FloatField()
  lat = models.FloatField()

  # GeoDjango-specific: a geometry field (MultiPolygonField), and
  # overriding the default manager with a GeoManager instance.
  mpoly = models.MultiPolygonField()
  objects = models.GeoManager()

  # Returns the string representation of the model.
  def __str__(self):              # __unicode__ on Python 2
    return self.name


class BufferedWorldBorder(models.Model):
  # Regular Django fields corresponding to the attributes in the
  # world borders shapefile.
  name = models.CharField(max_length=50)
  # GeoDjango-specific: a geometry field (MultiPolygonField), and
  # overriding the default manager with a GeoManager instance.
  geom = models.GeometryField()
  objects = models.GeoManager()

  # Returns the string representation of the model.
  def __str__(self):              # __unicode__ on Python 2
    return self.name



class State(models.Model):
    state_name = models.CharField(max_length=25)
    state_fips = models.CharField(max_length=2)
    sub_region = models.CharField(max_length=20)
    state_abbr = models.CharField(max_length=2)
    pop2010 = models.IntegerField()
    pop10_sqmi = models.FloatField()
    pop2012 = models.IntegerField()
    pop12_sqmi = models.FloatField()
    white = models.IntegerField()
    black = models.IntegerField()
    ameri_es = models.IntegerField()
    asian = models.IntegerField()
    hawn_pi = models.IntegerField()
    hispanic = models.IntegerField()
    other = models.IntegerField()
    mult_race = models.IntegerField()
    males = models.IntegerField()
    females = models.IntegerField()
    age_under5 = models.IntegerField()
    age_5_9 = models.IntegerField()
    age_10_14 = models.IntegerField()
    age_15_19 = models.IntegerField()
    age_20_24 = models.IntegerField()
    age_25_34 = models.IntegerField()
    age_35_44 = models.IntegerField()
    age_45_54 = models.IntegerField()
    age_55_64 = models.IntegerField()
    age_65_74 = models.IntegerField()
    age_75_84 = models.IntegerField()
    age_85_up = models.IntegerField()
    med_age = models.FloatField()
    med_age_m = models.FloatField()
    med_age_f = models.FloatField()
    households = models.IntegerField()
    ave_hh_sz = models.FloatField()
    hsehld_1_m = models.IntegerField()
    hsehld_1_f = models.IntegerField()
    marhh_chd = models.IntegerField()
    marhh_no_c = models.IntegerField()
    mhh_child = models.IntegerField()
    fhh_child = models.IntegerField()
    families = models.IntegerField()
    ave_fam_sz = models.FloatField()
    hse_units = models.IntegerField()
    vacant = models.IntegerField()
    owner_occ = models.IntegerField()
    renter_occ = models.IntegerField()
    no_farms07 = models.FloatField()
    avg_size07 = models.FloatField()
    crop_acr07 = models.FloatField()
    avg_sale07 = models.FloatField()
    sqmi = models.FloatField()
    geom = models.MultiPolygonField(srid=4326)
    objects = models.GeoManager()

# Auto-generated `LayerMapping` dictionary for State model
state_mapping = {
    'state_name' : 'STATE_NAME',
    'state_fips' : 'STATE_FIPS',
    'sub_region' : 'SUB_REGION',
    'state_abbr' : 'STATE_ABBR',
    'pop2010' : 'POP2010',
    'pop10_sqmi' : 'POP10_SQMI',
    'pop2012' : 'POP2012',
    'pop12_sqmi' : 'POP12_SQMI',
    'white' : 'WHITE',
    'black' : 'BLACK',
    'ameri_es' : 'AMERI_ES',
    'asian' : 'ASIAN',
    'hawn_pi' : 'HAWN_PI',
    'hispanic' : 'HISPANIC',
    'other' : 'OTHER',
    'mult_race' : 'MULT_RACE',
    'males' : 'MALES',
    'females' : 'FEMALES',
    'age_under5' : 'AGE_UNDER5',
    'age_5_9' : 'AGE_5_9',
    'age_10_14' : 'AGE_10_14',
    'age_15_19' : 'AGE_15_19',
    'age_20_24' : 'AGE_20_24',
    'age_25_34' : 'AGE_25_34',
    'age_35_44' : 'AGE_35_44',
    'age_45_54' : 'AGE_45_54',
    'age_55_64' : 'AGE_55_64',
    'age_65_74' : 'AGE_65_74',
    'age_75_84' : 'AGE_75_84',
    'age_85_up' : 'AGE_85_UP',
    'med_age' : 'MED_AGE',
    'med_age_m' : 'MED_AGE_M',
    'med_age_f' : 'MED_AGE_F',
    'households' : 'HOUSEHOLDS',
    'ave_hh_sz' : 'AVE_HH_SZ',
    'hsehld_1_m' : 'HSEHLD_1_M',
    'hsehld_1_f' : 'HSEHLD_1_F',
    'marhh_chd' : 'MARHH_CHD',
    'marhh_no_c' : 'MARHH_NO_C',
    'mhh_child' : 'MHH_CHILD',
    'fhh_child' : 'FHH_CHILD',
    'families' : 'FAMILIES',
    'ave_fam_sz' : 'AVE_FAM_SZ',
    'hse_units' : 'HSE_UNITS',
    'vacant' : 'VACANT',
    'owner_occ' : 'OWNER_OCC',
    'renter_occ' : 'RENTER_OCC',
    'no_farms07' : 'NO_FARMS07',
    'avg_size07' : 'AVG_SIZE07',
    'crop_acr07' : 'CROP_ACR07',
    'avg_sale07' : 'AVG_SALE07',
    'sqmi' : 'SQMI',
    'geom' : 'MULTIPOLYGON',
}
