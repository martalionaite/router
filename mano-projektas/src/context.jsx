import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("matrix");
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_KEY}`;
  console.log("API Key:", import.meta.env.VITE_MOVIE_API_KEY);
  console.log("Full API URL:", `${API_ENDPOINT}&s=matrix`);
  
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_ENDPOINT}&s=${query}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search || []);
          setError({ show: false, msg: "" });
        } else {
          setError({ show: true, msg: data.Error });
          setMovies([]);
        }
      } catch (err) {
        console.error(err);
        setError({ show: true, msg: "Something went wrong." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        error,
        movies,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

