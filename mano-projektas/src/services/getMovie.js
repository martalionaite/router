import { useEffect, useState } from "react";

// Naudojame import.meta.env Vite projekte
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_KEY}`;
console.log("API Key:", import.meta.env.VITE_MOVIE_API_KEY);
console.log("API Endpoint:", API_ENDPOINT);

const useMovie = (urlParams) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({ show: false, msg: '' });
    const [data, setData] = useState(null);

    const fetchMovies = async (url) => {
        console.log("Fetching URL:", url); // Tikriname, ar URL formuojamas teisingai
        setIsLoading(true);
        try {
            const response = await fetch(url);
            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Response data:", data);
            if (data.Response === 'True') {
                setData(data.Search || data);
                setError({ show: false, msg: '' });
            } else {
                setError({ show: true, msg: data.Error });
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError({ show: true, msg: 'Something went wrong. Please try again later.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(`${API_ENDPOINT}${urlParams}`);
    }, [urlParams]);

    return { isLoading, error, data };
};

export default useMovie;
