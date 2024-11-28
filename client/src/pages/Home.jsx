import React from 'react';
import image from '../assets/image.png';
import m1 from '../assets/1.jfif';
import m2 from '../assets/2.jfif';
import m3 from '../assets/3.jfif';
import m4 from '../assets/4.jfif';
import m5 from '../assets/5.jfif';
import Blog from '../components/navbar/Blog/Blog';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper style4
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-3xl lg:text-5xl text-center font-bold mb-4 mx-auto">Blog Title</h1>
        <p className="text-lg lg:text-xl text-gray-700">
          This is a sample paragraph for your blog. Add more content here to fit your theme and style. It should remain legible across all devices.
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 w-full mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
      
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src={image} className='w-full lg:h-[220px] sm:96 h-80' alt="" /></SwiperSlide>
        <SwiperSlide><img src={m1} className='w-full lg:h-[220px] sm:96 h-80' alt="" /></SwiperSlide>
        <SwiperSlide><img src={m2} className='w-full lg:h-[220px] sm:96 h-80' alt="" /></SwiperSlide>
        <SwiperSlide><img src={m3} className='w-full lg:h-[220px] sm:96 h-80' alt="" /></SwiperSlide>
        <SwiperSlide><img src={m4} className='w-full lg:h-[220px] sm:96 h-80' alt="" /></SwiperSlide>
        <SwiperSlide><img src={m5} className='w-full lg:h-[220px] sm:96 h-80' alt="" /></SwiperSlide>

      </Swiper>
  
      </div>

      {/* Bottom Section - Full width */}
      <div className="col-span-1 lg:col-span-2 w-full">
        <Blog />
      </div>
    </div>
  );
};

export default Home;
