import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";

import HeroLanding from "../../component/HeroLanding";
import NavbarLanding from "../../component/NavbarLanding";
import ContentNilaiLanding from "../../component/ContentNilaiLanding";
import ContentAboutLanding from "../../component/ContentAboutLanding";
import ContentNewsLanding from "../../component/ContentNewsLanding";
import ContentSKAILanding from "../../component/ContentSKAILanding";
import Footer from "../../component/Footer";

function LandingPage() {
  return (
    <>
      <div className="w-full">
        <NavbarLanding />
        <div id="home">
          <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
            <SwiperSlide>
              <HeroLanding />
            </SwiperSlide>
            <SwiperSlide>
              <HeroLanding />
            </SwiperSlide>
            <SwiperSlide>
              <HeroLanding />
            </SwiperSlide>
            <SwiperSlide>
              <HeroLanding />
            </SwiperSlide>
          </Swiper>
        </div>
        <div id="blog">
          <ContentNilaiLanding />
        </div>
        <ContentAboutLanding />
        <div id="news">
          <ContentNewsLanding />
        </div>

        <ContentSKAILanding />
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
