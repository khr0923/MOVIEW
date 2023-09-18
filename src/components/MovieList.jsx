import dummyData from "../static/dummyData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Autoplay } from "swiper/modules";

import "./Slider.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import 'swiper/css/autoplay';

export default function MovieList(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={1}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper2"
      >
        {dummyData.map((item) => (
          <SwiperSlide>
            <div className="slide">
              <div className="slide_info">
                <div className="slide_title">{item.title}</div>
                <div className="slide_plot">
                  {item.plot.length > 80
                    ? `${item.plot.slice(0, 80)}...`
                    : item.plot}
                </div>
                <Link className="slide__detail__btn" to={`/movie/${item.id}`}>
                  <button className="pointer">영화 상세보기</button>
                </Link>
              </div>
              <img className="slide_img" src={item.Image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <h1 className="main__title">인기 영화 TOP10</h1>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={10}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="mySwiper"
      >
        {props.movieItems.map((item) => (
          <SwiperSlide className="slide__mini">
            <img src={item.postImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
