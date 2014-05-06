'use strict';

var dbox  = require("dbox"),
    config = require('../config/config');

var Player = require('player');

var dropbox = dbox.app({"app_key": config.dropbox.app_key, "app_secret": config.dropbox.app_secret, "root": "dropbox"});

exports.requestAuthorizationToken = function(req, res) {
  dropbox.requesttoken(function(status, request_token) {
	 return res.json(request_token);
  });
};

exports.requestAccessToken = function(req, res) {
  var request_token = req.body;
  dropbox.accesstoken(request_token, function(status, access_token){
    console.log(access_token);
    var client = dropbox.client(access_token);
    var musics = [];
    client.search("/", ".mp3", function(status, reply){
      for(var i=0; i<reply.length; i++) {
        client.media(reply[i].path, function(status, reply){
          musics.push(reply.url);
          console.log(musics);
          var player = new Player(musics);

          player.play(function(err) {
            console.log('all songs play end');
          });

          player.on('downloading', function(song) {
            console.log('im downloading... ');
            console.log(song);
          });

          player.on('playing', function(song) {
            console.log('im playing... ');
            console.log(song);
          });

          player.on('error', function(err) {
            console.log('Opps...!')
            console.log(err);
          });
        });
      }
    });

    // return res.json();
  });
};