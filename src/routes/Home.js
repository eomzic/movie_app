import {useEffect, useState} from "react";
import Movie from "../components/Movie";
import styles from "./Home.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
        const json =  await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="container">
            <div>
                {loading ? <div><span className="loader">Loading......</span></div> : <div className="movies">
                    {movies.map((movie) =>
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            year={movie.year}
                            summary={movie.summary}
                            geners={movie.geners}
                        />
                    )}</div>}
            </div>
        </div>
    );
}

export default Home;