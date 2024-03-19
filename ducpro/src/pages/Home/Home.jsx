
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
function Home() {
  const slides = [
    {
      src: 'https://via.placeholder.com/600x300/dddddd/808080?text=First+Slide',
      title: 'First Slide',
      description: 'This is the first slide description.'
    },
    {
      src: 'https://via.placeholder.com/600x300/cccccc/808080?text=Second+Slide',
      title: 'Second Slide',
      description: 'Here goes the second slide description.'
    },
    {
      src: 'https://via.placeholder.com/600x300/bbbbbb/808080?text=Third+Slide',
      title: 'Third Slide',
      description: 'And this is the third slide description.'
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div style={{ position: 'relative' }}>
            <img src={slide.src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              textAlign: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)' // Dark overlay for text readability
            }}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    
  );
}

export default Home;
