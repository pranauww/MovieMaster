import React from 'react';
import _ from 'lodash';

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
    const [sort, setSort] = useState({
        by: "default",
        order: "asc"
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if(sort.by !== "defaut") {
            const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
            setFilterMovies(sortedMovies);
        }
    }, [sort]);

    const fetchMovies = async () => {
        const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;
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

    const handleSort = e => {
        const {name, value} = e.target;
        setSort(prev => {
            return{...prev, [name]: value}
        });
    };

  return (
    <section className="movie_list">
        <header className="movie_list_header">
            <h2 className="movie_list_heading">Popular <img src={Fire} alt="fire emoji" className='navbar_emoji' /></h2>

            <div className="movie_list_fs">
                <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[8,7,6]} />

                <select name="by" id="" onChange={handleSort} value={sort.by} className="movie_sorting">
                    <option value="default">SortBy</option>
                    <option value="release_date">Date</option>
                    <option value="vote_average">Rating</option>
                </select>
                <select name="order" id="" onChange={handleSort} value={sort.order} className="movie_sorting">
                    <option value="asc">Ascending</option>
                    <option value="desc">Desceding</option>
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