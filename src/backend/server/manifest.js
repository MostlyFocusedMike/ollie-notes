require('dotenv').config();
const Confidence = require('confidence');
const Toys = require('toys');
const Path = require('path');
const Constants = require('../../constants');

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: '0.0.0.0',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 8000,
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error'],
            },
            production: {
                request: ['implementation'],
            },
        },
        routes: {
            files: { // configures Inert's starting directory for files
                relativeTo: Path.join(__dirname, '..', '..', '..', 'build'),
            },
        },
    },
    register: {
        plugins: [
            {
                plugin: 'inert',
                options: {},
            },
            {
                plugin: 'vision',
                options: {},
            },
            {
                plugin: 'hapi-swagger',
                options: {
                    info: {
                        title: 'Ollie Notes Api Routes',
                        version: '0.0.1',
                    },
                    tags: [ // lets us decide the display order of tags
                        {
                            name: Constants.TAGS.USERS,
                        },
                        {
                            name: Constants.TAGS.NOTES,
                        },
                        {
                            name: Constants.TAGS.AUTH,
                        },
                        {
                            name: Constants.TAGS.STATIC,
                        },
                        {
                            name: Constants.TAGS.UTIL,
                            description: 'Miscellaneous, but useful',
                        },
                        {
                            name: Constants.TAGS.TEMPO,
                            description: 'For quick development',
                        },
                    ],
                    grouping: 'tags',
                    documentationPath: '/swagger',
                },
            },
            {
                plugin: '../lib', // Main plugin
                options: {},
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop,
                },
            },
        ],
    },
});
