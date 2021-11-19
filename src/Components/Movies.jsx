import React, { useContext, useState } from "react";
import axios from "axios";
import GlobalState from "../Context/globalState";

const Movies = () => {
  const { value, value2, value3, value4 } = useContext(GlobalState);
  const [movies, setMovies] = value;
  const [favourites, setFavourites] = value2;
  const [watchlist, setWatchlist] = value3;
  const [completed, setCompleted] = value4;

  
  const [pageCount, setPageCount] = useState(1);

  function checkBox1(e, movie) {
    const checked = e.target.checked;
    checked ? (movie.fav = true) : (movie.fav = false);
    checked
      ? setFavourites([...favourites, movie])
      : setFavourites(favourites.filter((fav) => fav.id !== movie.id));
  }

  function checkBox2(e, movie) {
    const checked = e.target.checked;
    checked ? (movie.watchLater = true) : (movie.watchLater = false);
    checked
      ? setWatchlist([...watchlist, movie])
      : setWatchlist(watchlist.filter((watch) => watch.id !== movie.id));
  }

  function checkBox3(e, movie) {
    const checked = e.target.checked;
    checked ? (movie.completed = true) : (movie.completed = false);
    checked
      ? setCompleted([...completed, movie])
      : setCompleted(completed.filter((complete) => complete.id !== movie.id));
  }


  async function gotoNextPage() {
    setPageCount(pageCount + 1);
    const res = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=df032f0bbf7881c7e18f93539c8a73ba&language=en-US&page=" + pageCount
    );
    setMovies(res.data.results);
  }



  async function gotoPreviousPage() {
    setPageCount(pageCount - 1);
    const res = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=df032f0bbf7881c7e18f93539c8a73ba&language=en-US&page=" + pageCount
    );
    setMovies(res.data.results);
  }


  return (
    <>
      {movies.map((t, idx) => {
        return (
          <div
            className=" bg-purple-300 rounded-t-lg m-4 flex flex-col justify-center items-center"
            key={idx}
          >
            <div className="text-xl font-bold">{t.title}</div>
            <img
              className="h-80 w-60"
              src={"http://image.tmdb.org/t/p/w780/" + t.poster_path}
              alt={t.title}
            />

            <div className="font-medium">Rating = {t.vote_average}</div>

            <div className="flex my-2">
              <input
                type="checkbox"
                checked={t.fav ? true : false}
                onChange={(e) => checkBox1(e, t)}
              />
              <label>Add to Favourites</label>
            </div>

            <div className="flex my-2">
              <input
                type="checkbox"
                checked={t.watchLater ? true : false}
                onChange={(e) => checkBox2(e, t)}
              />
              <label>Add to Watch Later</label>
            </div>

            <div className="flex my-2">
              <input
                type="checkbox"
                checked={t.completed ? true : false}
                onChange={(e) => checkBox3(e, t)}
              />
              <label>Completed</label>
            </div>
          </div>
        );
      })}
      <div
        className="w-36 h-10 bg-green-900 text-center text-white px-4 py-2 mx-8 my-8"
        onClick={gotoNextPage}
      >
        Next Page
      </div>
      <div
        className="w-36 h-10 bg-green-900 text-center text-white px-4 py-2 mx-8 my-8"
        onClick={gotoPreviousPage}
      >
        Previous Page
      </div>
    </>
  );
};

export default Movies;
