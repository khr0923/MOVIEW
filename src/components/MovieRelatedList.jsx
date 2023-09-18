// import MovieRelatedItem from "../components/MovieRelatedItem";
import "./MovieRelated.css";
import "./RelatedSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function MovieRelatedList(props) {
  const movieRelatedArr =
    props.movieRelated.length < 10
      ? props.movieRelated
      : props.movieRelated.slice(0, 10);
  //연관 영화가 10개만 보여지게 하기 위해 slice를 통해 10개의 데잍만 얻어옴
  //만약 연관영화가 10개 미만이라면 모든 데이터 얻어옴

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {movieRelatedArr.map((item) => (
          <SwiperSlide>
            <Link className="slide_wrap" to={`/movie/${item.id}`}>
              <div className="movieRelated__slide__item">
                <img
                  className="movieRelated__post__slide__Image"
                  src={item.postImage}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
