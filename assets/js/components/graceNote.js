
    const APIKEY = 'dp99ze7uepwt88ykbkfnpf4d';
    // '2m5fs9kvktd48xcrz569rjkn' '7dadpsd62b4jwc7a92arb7fb'


    let baseUrl = 'https://data.tmsapi.com/v1.1/movies/showings?';
    let dateNow = moment().format('YYYY-MM-DD');
    let restLocation = {lat: 35.851000, lng: -78.796130};
    let radius = 10;
   
    
    const encodeURL = (startDate, loc, radius) => {
        const url = baseUrl;
        const date = startDate;
        const center = {...loc};
        const distance = radius;
        console.log(`${url}startDate=${date}&lat=${center.lat}&lng=${center.lng}&radius=${distance}&api_key=${APIKEY}`);
        return `${url}startDate=${date}&lat=${center.lat}&lng=${center.lng}&radius=${distance}&api_key=${APIKEY}`;
    }
    
    const getData = (loc) => {
        const theatreNames = [];
        return new Promise((resolve, reject) => {
              $.get(encodeURL(dateNow, loc, radius)).then(res => {
             let data;
             console.log('api data fetched');
             data = res.map(data => data.showtimes);
             data.forEach(results => {
                 results.forEach(theatre => {
                     if (theatreNames.indexOf(theatre.theatre.name) === -1)
                     theatreNames.push(theatre.theatre.name);
                 })
             })
             sortMovieData(res, theatreNames);
             resolve(theatreNames);
         })
         .catch(error => {
             reject(error);
             console.log(`You have encountered an error: ${error}`)
     });
        });
     };


     const grabShowtimes = (loc) => {
        const theatreData = {};
        const movieNames = {};
        const noahsMovies = [];
        return new Promise((resolve, reject) => {
              $.get(encodeURL(dateNow, loc, radius)).then(res => {
             let data;
             console.log('api data fetched');
             console.log(res);
             res.map(data => {
                 console.log('DATA ', data)
                 movieNames[data.title] = [];
                //  console.log('MOVIE NAMES ', movieNames)
                // noahsMovies[data.theatre] = [];
                // console.log('NOAH MOVIES ', noahsMovies)
                 data.showtimes.forEach(movie => {
                     movieNames[data.title].push(moment(movie.dateTime).format('hh:mm a'));
                     theatreData[movie.theatre.name] = movieNames;
                 });



                 data.showtimes.map(showtime => {
                    noahsMovies.push({name: showtime.theatre.name, movie: []}) 
                })

                data.showtimes.map(st => {
                    const deduplicatedTheaters = [...new Set(noahsMovies)]
                    console.log('NOAH MOVIES ', deduplicatedTheaters)
                    deduplicatedTheaters.map((theater, i) => {
                        if (theater === st.theater.name) {
                            console.log('yes')
                            deduplicatedTheaters[i].movie.push(data.title)
                        }
                    })
                })

            })
             resolve(theatreData);
         })
         .catch(error => {
             reject(error);
             console.log(`You have encountered an error: ${error}`)
     });
        });
    };

    function sortMovieData (res, theatreNames) {
        var movieData = {};
        console.log("CHECKING DOT NOTATION",res[0].showtimes[1]);
    
        console.log("API RES IN SORTMOVIE DATA", res);
        console.log("THEATRE NAMES FROM SORTMOVIE DATA",theatreNames);
        
        //     for(var i = 0; i < res.length; i++){
                
        //         for(var x = 0; x <res[i].showtimes.length; x++){
        //             var movie = res[i].title
        //             for(var j = 0; j < theatreNames.length; j++){
        //                //check to see if the theater is playing this movie 
        //                 if(theatreNames[j] === res[i].showtimes[x].theatre.name){
        //                 //set movie to the title of this movie
        //                 console.log(movie);
        //                 //check the movies in the object and create array of them
        //                 var movieTitle = Object.keys(movieData);
        //                 var theater = theatreNames[j];
        //                 console.log(theater);
        //                 //check index of movieTitle array for this movie
        //                 if(movieTitle.indexOf(movie) === -1){
        //                     //create array to add showtime to
        //                     var showtimes = []
        //                     //create path with this movie for this theater
        //                     movieData[theater][j] = movie
        //                     console.log(movieData);
        //                     console.log(res[i].showtimes[x].dateTime); 
        //                     //push this showtime to the showtimes Array
        //                     showtimes.push(res[i].showtimes[x].dateTime)
        //                     console.log(showtimes);

        //                     movieData[theater][movie][x] = showtimes;
        //                     console.log(movieData);
        //                 }
        //                 else{
        //                     movieData[theater][movie].showtimes.push(res[i].showtimes[x].dateTime);
        //                 }

                        
                        
        //            }
                   
            
                   
        //         }
        //     }
           
        // }
        // console.log("MOVIEDATA", movieData); 
    }
        


// user + uid + restaurants . restaurant.Lat, restaurant.Long

// dateTime: "2019-02-02T12:20"


//http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-02-02&lat=35.851000&lng=-78.796130&api_key=7dadpsd62b4jwc7a92arb7fb

//http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-02-02&zip=27517&api_key=//