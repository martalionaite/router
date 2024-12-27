import {Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Movie from "../movie/movie";
function App() {

  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Movie />} />
        </Routes>
  )
}

export default App;

