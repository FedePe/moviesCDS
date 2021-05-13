const axios = require('axios');

// Get all movies with keyword
exports.getMovies = async (req, res) => {
    try {

        // extract keyword
        const { keyword } = req.body;
        
        if(keyword){
            
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {params: {api_key: process.env.KEY, query: keyword}})
            let arrayMovies = response.data.results.map(element => {
                // Create a Movie
                return { id: element.id, title: element.title,score: Math.floor(Math.random() * 99) }
            })
            arrayMovies = arrayMovies.sort((a,b)=>b.score-a.score);
            
            res.json(arrayMovies);

        } else {
            
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular',  {params: {api_key: process.env.KEY}})
            let arrayMovies = response.data.results.map(element => {
                // Create a Movie
                return { id: element.id, title: element.title,score: Math.floor(Math.random() * 99) }
            })
            arrayMovies = arrayMovies.sort((a,b)=>b.score-a.score);
            
            res.json(arrayMovies);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: 'An error occurred' })
    }
}