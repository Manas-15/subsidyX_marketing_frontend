/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImQuotesLeft } from "react-icons/im";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function Portfolio() {
  const portfolio = [
    {
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim ",
      name: "John Deo",
      role: "Web Developer",
      image: "images/client.png",
      companyLogo: "images/c-logo.png",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim ",
      name: "Jhn Deo",
      role: "Web Developer",
      image: "images/client.png",
      companyLogo: "images/c-logo.png",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim ",
      name: "Jhn Deo",
      role: "Web Developer",
      image: "images/client.png",
      companyLogo: "images/c-logo.png",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim ",
      name: "Jhn Deo",
      role: "Web Developer",
      image: "images/client.png",
      companyLogo: "images/c-logo.png",
    },
  ];
  return (
    <div className="sec">
      <Swiper
        spaceBetween={30}
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiperClient"
      >
        {portfolio.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="foot_slid_content text-center">
                <h3 className="pb-5">Hear From Our Clients</h3>
                <div className="card foot_sld_crd ">
                  <div className="row">
                    <div className="col-md-4">
                      <figure>
                        <img src={item.image} alt="" height="398" width="350" />
                      </figure>
                    </div>
                    <div className="col-md-8">
                      <figure className="pt-2">
                        <img
                          src={item.companyLogo}
                          alt=""
                          height="100"
                          width="100"
                        />
                      </figure>
                      <div className="foot_sld_crd_content">
                        <ImQuotesLeft className="qut_icon" />
                        <p className="pt-2">{item.comment}</p>
                      </div>
                      <h4 className="pt-4 pr-4">
                        {item.name} - {item.role}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Portfolio;
