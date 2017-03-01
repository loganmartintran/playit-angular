(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        /*
        *@desc current album that is being played
        */
        
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        *@desc Buzz object audio file
        *@type {Object}
        */
        
        var currentBuzzObject = null;
        
        /**
        *@function setSong
        *@desc Stops currenty playing song and loads new audio file as currentBuzzOject
        *@param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        *@function playSong
        *@desc Plays currently playing song
        *@param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        /*
        *@function stopSong
        *@desc stops the currently playing song
        *@param {Object} song
        */
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = false;
        }
        
        /**
        *@function getSongIndex
        *@desc gets the current index of the playing song
        *param {Object} song
        */
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        *@desc Active song object from list of songs
        *@type {Object}
        */
        
        SongPlayer.currentSong = null;
        
        /**
        *@desc Current playback time (in seconds) of currently playing song
        *@type {Number}
        */
        
        SongPlayer.currentTime = null;
        
        /**
        *@function play
        *@desc Play current song or new song 
        *@param {Object} song
        */
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
                
            };
        
        /**
        *@function pause
        *@desc Pause current song 
        *@param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /*
        *@function previous
        *@desc goes to the previous track of the song that is playing or stops the song if the first song is playing. 
        */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /*
        *@function next
        *@desc goes to the next track of the song that is playing
        */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > 5) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /*
        *@function setCurrentTime
        *@desc Set current time (in seconds) of currently playing song
        *@param {Number} time
        */
        
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
    return SongPlayer;
        
    }
 
    angular 
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();

