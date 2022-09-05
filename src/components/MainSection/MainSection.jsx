import { useState, useEffect } from "react";
import Counter from "../Counter";
import { RiStarSLine } from "react-icons/ri";
import TopRatedList from "../TopRatedList";
import Voted from "../Voted";
import { GET } from "../../utils/api";
import UpComingList from "../UpComingList";
import "./index.scss";

const MainSection = ({ modalVisibility, TopRated}) => {
  const [movieLists, setMovieLists] = useState({});
 
  const [page, setPage] = useState(5);

  useEffect(() => {
    GET("movie", "popular", "&language=en-US&page=", page).then((data) =>
      setMovieLists((prev) => ({ ...prev, popular: data.results }))
    );

    GET("movie", "top_rated", "&language=en-US&page=", 1).then((data) =>
      setMovieLists((prev) => ({ ...prev, topRated: data.results }))
    );

    GET("movie", "upcoming", "&language=en-US&page=", page).then((data) =>
      setMovieLists((prev) => ({ ...prev, upcoming: data.results }))
    );
  }, [page]);

  return (
    <div className="MainSection">
      <div className="Voted">
        {movieLists.topRated && (
          <Voted
            modalVisibility={modalVisibility}
            cardData={movieLists.topRated.filter(
              (movie) => movie.vote_average >= 8.6
            )}
          />
        )}
      </div>

      <div className="TopRated_Section" ref={TopRated}>
        <h1 className="toprated" >
          {" "}
          <span>T</span>
          <span>o</span> 
          <span>p</span> <span>R</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
          <span>d</span>{" "}
          <i className="star_1">
            <RiStarSLine />{" "}
          </i>
        </h1>
        {movieLists.topRated && (
          <TopRatedList
           
            modalVisibility={modalVisibility}
            cardData={movieLists.topRated}
          />
        )}
      </div>
      <div className="UpComing_Section">
        {" "}
        <h1 className="toprated">
          {" "}
          <span>U</span>
          <span>P</span> <span>C</span>
          <span>o</span>
          <span>M</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </h1>
        {movieLists.upcoming && (
          <UpComingList
            modalVisibility={modalVisibility}
            cardData={movieLists.upcoming}
          />
        )}
        <Counter
          increase={() => setPage((prev) => prev + 1)}
          decrease={() => setPage((prev) => prev - 1)}
          page={page}
        />
      </div>
    </div>
  );
};

export default MainSection;
