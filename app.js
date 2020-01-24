const express = require('express');
const morgan = require('morgan');

const appData = require('./playstore.js');

const app = express();
app.use(morgan('common'));

app.get('/apps', (req, res) => {
  let filteredApps = [...appData];
  const { sort, genres } = req.query;
  console.log('sort:', sort);
  console.log('genres:', genres);
  const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  if(genres===''){
    return res.status(400).json({error: 'Please enter a valid genre'});
  }
  //filtering by genre
  if (genres){
    let acceptedGenres = validGenres.toLowerCase();
    if(!acceptedGenres.includes(genres.toLowerCase())){
      return res.status(400).send('Genres must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card');
    }
    
    const lowerGenres = req.query.genres.toLowerCase();
    filteredApps = filteredApps.filter(() => genres.toLowerCase().includes(lowerGenres));
  }

  //sort by rating and/or app
  if (sort){
    if (sort !== 'Rating' && sort !== 'App'){
      return res.status(400).send('Sort must be set by "Rating" or "App"');
    }

    filteredApps.sort((a, b) => {
      // 1 | -1 to reverse the order || 0 to leave it where it is 
      //use bracket notation to handle dynamic data - we do not know if sort will be by title or by rank
      return a[sort] < b[sort] ? -1 : 1;
    });
  }

  res.json(filteredApps);
});

module.exports = app;