var exec = require('child_process').exec;
var path = require('path');
var queue = require('queue-async');
var test = require('tape').test;

var list = path.resolve(__dirname, '..', 'mapbox-data-list');
var create = path.resolve(__dirname, '..', 'mapbox-data-create');
var dataDelete = path.resolve(__dirname, '..', 'mapbox-data-delete');
var add = path.resolve(__dirname, '..', 'mapbox-data-add');

var validFeatures = path.resolve(__dirname, 'fixtures', 'features.json');

var testDataset;
var testFeatures = [];

process.env.PATH = [ path.resolve(__dirname, '..'), process.env.PATH ].join(':');

test('create: create a dataset', function(t) {
    var cmd = create;
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'user exists');
        var dataset = JSON.parse(stdout);
        t.equal(dataset.owner, 'jakepruitt', 'jakepruitt is the owner');
        t.ok(dataset.id, 'dataset has id');
        t.ok(dataset.created, 'dataset as a created date');
        t.ok(dataset.modified, 'dataset has a modified date');
        testDataset = dataset.id;
        t.end();
    });
});

test('add: add features to a dataset', function(t) {
    var cmd = [add, testDataset, validFeatures].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'user exists');
        stdout.split('\n').forEach(function(line) {
            if (line) {
                var feature = JSON.parse(line);
                t.equal(feature.type, 'Feature', 'mapbox is the owner');
                t.ok(feature.id, 'id exists');
                testFeatures.push(feature.id);
                t.ok(feature.geometry, 'dataset has created property');
            }
        });
        t.end();
    });
});

test('list: list datasets of user', function(t) {
    var cmd = list;
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'user exists');
        stdout.split('\n').forEach(function(line) {
            if (line) {
                var dataset = JSON.parse(line);
                t.equal(dataset.owner, 'jakepruitt', 'mapbox is the owner');
                t.ok(dataset.id, 'id exists');
                t.ok(dataset.created, 'dataset has created property');
                t.ok(dataset.modified, 'dataset has modified property');
            }
        });
        t.end();
    });
});

test('list: list features of a dataset', function(t) {
    var cmd = [list, testDataset].join(' ');
    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'dataset exists');
        var feature = JSON.parse(stdout);
        t.ok(feature, 'list is the expected list');
        t.end();
    });
});

test('delete: delete features of a dataset', function(t) {
    var testFeature = testFeatures.shift();
    var cmd = [dataDelete, testDataset, testFeature].join(' ');

    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'feature was deleted');
        t.end();
    });
});

test('delete: delete an entire dataset', function(t) {
    var cmd = [dataDelete, testDataset].join(' ');

    exec(cmd, function(err, stdout, stderr) {
        t.ifError(err, 'dataset was deleted');
        t.end();
    });
});
