# mapbox-data-cli

[![build status](https://secure.travis-ci.org/mapbox/mapbox-data-cli.png)](http://travis-ci.org/mapbox/mapbox-data-cli)

[![NPM](https://nodei.co/npm/mapbox-data-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mapbox-data-cli/)

CLI utilities for [Mapbox](https://www.mapbox.com/) Data API.

## Install

```sh
$ npm install -g mapbox-data-cli
```

## Setup

Requires a `MapboxAccessToken` environment variable with map:write permissions.

## Utilities

Includes three utilities

* `mapbox-data-get`: get [GeoJSON](http://geojson.org/) data
* `mapbox-data-add`: add/update features in a dataset
* `mapbox-data-replace`: replace dataset with new GeoJSON data

DATASETID can either be a dataset id (preferred) or a map id. If a map id
is given, mapbox-markers-cli will infer the dataset id.

```sh
$ npm install -g mapbox-markers-cli
$ mapbox-data-get USERNAME DATASETID
$ mapbox-data-add USERNAME DATASETID FILE
$ mapbox-data-replace USERNAME DATASETID FILE
```

`mapbox-data-create` creates a new empty dataset. NAME and DESCRIPTION are
optional.

```sh
$ mapbox-data-create USERNAME [NAME] [DESCRIPTION]
```

## Pipes

`mapbox-data-add` and `mapbox-data-replace` support stdin: you can pipe
into them, and they'll put the data on [Mapbox](https://www.mapbox.com/).

```sh
$ npm install -g geojson-random # util that generates random geojson
$ geojson-random | mapbox-data-add USERNAME DATASETID
```
