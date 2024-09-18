import React from 'react';

import './MovieList.css';
import Fire from '../../assets/fire.png';
import Star from '../../assets/glowing-star.png';
import Party from '../../assets/partying-face.png';
import MovieCard from './MovieCard';
import { useEffect } from 'react';
import { useState } from 'react';
import FilterGroup from './FilterGroup';
import API_KEY from '../../../apikey';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY; // Concatenate API key with the URL
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies(data.results);
        setFilterMovies(data.results);
    };

    const handleFilter = rate => {
        if(rate === minRating) {
            setMinRating(0);
            setFilterMovies(movies);
        } else {
            setMinRating(rate);

            const filtered = movies.filter(movie => movie.vote_average >= rate);
            setFilterMovies(filtered);
        }
    };

  return (
    <section className="movie_list">
        <header className="movie_list_header">
            <h2 className="movie_list_heading">Popular <img src={Fire} alt="fire emoji" className='navbar_emoji' /></h2>

            <div className="movie_list_fs">
                <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[8,7,6]} />

                <select name="" id="" className="movie_sorting">
                    <option value="">SortBy</option>
                    <option value="">Date</option>
                    <option value="">Rating</option>
                </select>
                <select name="" id="" className="movie_sorting">
                    <option value="">Ascending</option>
                    <option value="">Desceding</option>
                </select>
            </div>
        </header>

        <div className="movie_cards">
            {
                filterMovies.map((movie) => (<MovieCard key={movie.id} movie={movie} />))
            }
        </div>
    </section>
  )
};

export default MovieList;