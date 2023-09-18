import { Link } from "react-router-dom";
import SearchDetailItem from "../components/SearchDetailItem";
import { Icon } from "@iconify/react";

export default function SearchDetail(props) {
  const searchItem = props.searchDisplay.map((item) =>
    item.title.includes(`${props.searchHandle}`) ? item : null
  );

  const filterItem = searchItem.filter((item) => item !== null);

  return (
    <section className="search__movie__result">
      <div className="search_result_wrap">
        {filterItem.length !== 0 && props.searchHandle.length !== 0 ? (
          <>
            <p className="search__movie__result__text">
              <span className="highlight">'{props.searchHandle}'</span>에 대한
              검색 결과입니다.
            </p>
            <div className="search__movie__List">
              {filterItem.map((item) => (
                <SearchDetailItem key={item.id} movie={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="search__movie__result__text__none">
              <span className="highlight">"{props.searchHandle}"</span>
              <span>에 대한 검색 결과가 없습니다.</span>
            </p>
            <Icon
              className="search__movie__none__icon"
              icon="material-symbols:error-outline"
              color="#ff3358"
              width="80"
              height="80"
            />
          </>
        )}
      </div>
    </section>
  );
}
