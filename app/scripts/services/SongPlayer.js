(function() {
    function SongPlayer(Fixtures) {
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
                currentBuzzObject.stop();
                SongPlayer.playing=null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        *@function playSong
        *@desc Plays currently playing song
        *param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
    return SongPlayer;
        
    }
 
    angular 
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();

