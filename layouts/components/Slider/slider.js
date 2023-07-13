/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import sliderGif from "../../../public/images/slider1.gif";

function Slider() {
  const services = [
    {
      title:
        "Get your benifit report with in few minutes and start planning for your business",
      heading: "Instant benifits report",
      sub_heading: "Instant benifits report",
      image: { sliderGif },
    },
  ];

  console.log(services);
  return (
    <div className="benefit_sec w-100">
      {/* <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 7000,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    modules={[Autoplay, Pagination]}
    className="mySwiper"
    > */}
      {services.map((item, index) => {
        return (
          // <SwiperSlide >
          <div className="first_slide" key={index}>
            <div className="row incen_row_content w-100">
              <div className="col-md-5 text-center">
                <figure>
                  <Image
                    src={item?.image?.sliderGif?.src}
                    height="400"
                    width="400"
                    alt="slider gif"
                  />
                </figure>
              </div>
              <div className="col-md-7 text-center">
                <h2 className="cmn_h2_heading text-center mb-3">
                  <span className="col_blue">INSTANT </span>
                  <span className="col_orng">BENEFIT REPORT</span>
                </h2>
                {/* <figure>
                                <img src="" alt="" height="100px" width="100px"></img>
                            </figure> */}
                <div>
                  <p className="incen_content">{item.title}</p>
                </div>
                <div>
                  <Link href="/contact" className="btn btn-primary lo_ck_btn">
                    CHECK YOUR BENEFITS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* </Swiper> */}
    </div>
  );
}

export default Slider;
