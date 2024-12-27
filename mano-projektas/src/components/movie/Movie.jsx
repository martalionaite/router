import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getMovie from "../../services/getMovie";

const Movie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovie(`&i=${id}`);
        if (data.Response === "False") {
          setError({ show: true, msg: data.Error });
        } else {
          setMovie(data);
        }
      } catch (error) {
        setError({ show: true, msg: "Something went wrong. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">Back to Movies</Link>
      </div>
    );
  }

  return (
    <section className="single-movie">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="single-movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <h4>{movie.Year}</h4>
        <Link to="/" className="btn">Back to Movies</Link>
      </div>
    </section>
  );
};

export default Movie;

