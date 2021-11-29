import React from "react";
import { useContext } from "react";
import GlobalState from "../Context/globalState";
import { MdStarRate } from "react-icons/md"



const CFWL = ({ props }) => {
  const { value2, value3, value4 } = useContext(GlobalState);
  const [favourites, setFavourites] = value2;
  const [watchlist, setWatchlist] = value3;
  const [completed, setCompleted] = value4;

  function checkBox1(e, movie) {
    const checked = e.target.checked && !favourites.includes(movie);
    checked ? (movie.fav = true) : (movie.fav = false);
    checked
      ? setFavourites([...favourites, movie])
      : setFavourites(favourites.filter((fav) => fav.id !== movie.id));
  }

  function checkBox2(e, movie) {
    const checked = e.target.checked && !watchlist.includes(movie);
    checked ? (movie.watchLater = true) : (movie.watchLater = false);
    checked
      ? setWatchlist([...watchlist, movie])
      : setWatchlist(watchlist.filter((watch) => watch.id !== movie.id));
  }

  function checkBox3(e, movie) {
    const checked = e.target.checked && !completed.includes(movie);
    checked ? (movie.completed = true) : (movie.completed = false);
    checked
      ? setCompleted([...completed, movie])
      : setCompleted(completed.filter((complete) => complete.id !== movie.id));
  }

  return (
    <div className="grid grid-cols-5">
      {props.map((t, idx) => {
        return (
          <div
            className=" bg-purple-300 rounded-t-lg m-4 flex flex-col justify-center items-center"
            key={idx}
          >
            <div className="title">{t.title}</div>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    className="h-80 w-60"
                    src={"http://image.tmdb.org/t/p/w780/" + t.poster_path}
                    alt="Not Found"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://image.shutterstock.com/image-illustration/leather-background-jpeg-version-260nw-101031550.jpg";
                    }}
                  />
                </div>
                <div className="flip-card-back px-4">
                  <div className="text-red-700 text-2xl font-bold">
                    {t.release_date}
                  </div>
                  {t.overview}
                </div>
              </div>
            </div>

            <div className="rating flex">
              <div className="heart mx-4">
                <input
                  type="checkbox"
                  className="heart__checkbox"
                  checked={t.fav ? true : false}
                  onClick={(e) => checkBox1(e, t)}
                  readOnly={true}
                />
                <div className="heart__icon"></div>
              </div>

              <div className="text-white font-bold ml-8">
                 {t.vote_average}
              </div>
              <div className="mr-8">
                <MdStarRate  color="yellow"/>
              </div>

              {/* <BsFillBookmarkFill color="red" size="3x" /> */}
                


            </div>

            <div className="flex">
              {/* <div className="flex my-2">
                <input
                  type="checkbox"
                  checked={t.fav ? true : false}
                  onChange={(e) => checkBox1(e, t)}
                />
                <label className="label123">Add to Favourites</label>
              </div> */}

              <div className="flex m-2">
                <input
                  type="checkbox"
                  checked={t.watchLater ? true : false}
                  onChange={(e) => checkBox2(e, t)}
                  readOnly={true}
                />
                <label className="label123">Watch Later</label>
              </div>

              <div className="flex m-2">
                <input
                  type="checkbox"
                  checked={t.completed ? true : false}
                  onChange={(e) => checkBox3(e, t)}
                  readOnly={true}
                />
                <label className="label123">Completed</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CFWL;
