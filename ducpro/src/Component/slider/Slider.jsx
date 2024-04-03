
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Slide() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://file.hstatic.net/200000722513/file/pc-slider_b09b86cba7914c59affaaa41df4d38ec.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://file.hstatic.net/200000722513/file/pc-slider_b09b86cba7914c59affaaa41df4d38ec.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://file.hstatic.net/200000722513/file/pc-slider_b09b86cba7914c59affaaa41df4d38ec.png" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}
