
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');
// add authentication/keys
// Require all npm packages

// Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
// movie or song
var userInput = "";
// attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    userInput = userInput + "+" + nodeArgv[i];
  } else{
    userInput = userInput + nodeArgv[i];
  }
}


// read tweet info
switch(command){
  case "tweet-id":
    tweetInfo();
  break;
// read song info
  case "song-id":
    if(x){
      SpotifyInfo(x);
  break;
// read movie info
  case "movie-id":
    if(x){
      omdbInfo(x)
  break;
// read file info
  case "read-id":
    readInfo();
  break;

  default:
    console.log("{Please enter a command: tweet-id, song-id, movie-id, read-id}");
  break;
}

// twitter part of liri
// create twitter account 
function tweetInfo(){
  // Display last 20 Tweets
  // use client.get
  // append twitter info into new text file 
  };
}
// spotify part of liri
function spotifyInfo(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        // artist
        console.log("Artist: " + songData.artists[0].name);
        // song name
        console.log("\nSong: " + songData.name);
        // album name
        console.log("\nAlbum: " + songData.album.name);
        console.log("\n ");
        
        // adds text to info.txt
        fs.appendFile('info.txt', songData.artists[0].name);
        fs.appendFile('\ninfo.txt', songData.name);
        fs.appendFile('\ninfo.txt', songData.preview_url);
        fs.appendFile('\ninfo.txt', songData.album.name);
        fs.appendFile('\ninfo.txt', "\n ");
      }
    } else{
      console.log('Error occurred.');
    }
  });
}
// imdb part of liri
function omdbInfo(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      // add parse for readability 
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("\nRelease Year: " + body.Year);
      console.log("\nIMdB Rating: " + body.imdbRating);
      console.log("\nCountry: " + body.Country);
      console.log("\nLanguage: " + body.Language);
      console.log("\nPlot: " + body.Plot);
      console.log("\nActors: " + body.Actors);
 
      fs.appendFile('info.txt', "Title: " + body.Title);
      fs.appendFile('info.txt', "\nRelease Year: " + body.Year);
      fs.appendFile('info.txt', "\nIMdB Rating: " + body.imdbRating);
      fs.appendFile('info.txt', "\nCountry: " + body.Country);
      fs.appendFile('info.txt', "\nLanguage: " + body.Language);
      fs.appendFile('info.txt', "\nPlot: " + body.Plot);
      fs.appendFile('info.txt', "\nActors: " + body.Actors);

    } else{
      console.log('Error occurred.')
    }
  });

}

function readInfo(){
  fs.readFile('info.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}