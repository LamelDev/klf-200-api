﻿'use strict';

const Promise = require('bluebird');
const urlBuilder = require('./urlBuilder');

/**
 * Create a new scenes object.
 * Use the scenes object to retrieve a list of scenes known to your KLF interface and to start one of them.
 * @constructor
 * @param {connection} connection
 */
function scenes(connection) {
    this.connection = connection;
}

/**
 * Get a list of the scenes stored in the KLF interface.
 * @return {Promise} Returns a promise that resolves to the list of the scenes.
 */
scenes.prototype.getAsync = function () {
    return this.connection.postAsync(urlBuilder.scenes, 'get', null)
        .then((res) => {
            return res.data;
        });
};

/**
 * Runs a scene either by ID or name.
 * @param {(number|string)} sceneIdOrName The id or the name of the scene.
 * @return {Promise} Returns a promise that resolves.
 */
scenes.prototype.runAsync = function (sceneIdOrName) {
    if (!sceneIdOrName && sceneIdOrName !== 0)
        return Promise.reject(new Error('Missing sceneId parameter.'));

    let sceneIdType = typeof sceneIdOrName;
    switch (sceneIdType) {
        case 'number':
            return this.connection.postAsync(urlBuilder.scenes, 'run', { id: sceneIdOrName })
            .then(() => {
                return Promise.resolve();
            });

        case 'string':
            return this.getAsync()
                .then((scs) => {
                    // Convert scene name to Id
                    let scene = scs.find((scene) => {
                        return scene.name === sceneIdOrName;
                    });

                    if (!scene || !scene.id && scene.id !== 0)
                        return Promise.reject(new Error(`Scene "${sceneIdOrName}" not found`));

                    return this.connection.postAsync(urlBuilder.scenes, 'run', { id: scene.id })
                    .then(() => {
                        return Promise.resolve();
                    });
                });

        default:
            return Promise.reject(new Error('Parameter sceneId must be of type number or string.'));
    }
};

module.exports = scenes;