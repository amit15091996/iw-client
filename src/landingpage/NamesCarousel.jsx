import { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./namescarousel.css";

const NameSlider = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // Apply changes for screens smaller than 768px
        settings: {
          slidesToShow: 2, // Display two names per slide on smaller screens
        },
      },
    ],
  };

  const name1 = [
    "Alok Traders",
    "Aviral Enterprises",
    "Bafna Jewellers",
    "Dhanansh Engineering",
    "Hira Agro",
    "K.M Industries",
    "Mahaveer Jewellers",
    "Shubham Motor",
  ];

  const name2 = [
    "Prience Infotech",
    "BR Enterprises",
    "JP Tyre",
    "Mahajan Jewellers",
    "Pankaj Tiles",
    "Reet Hosiery",
    "Kajal Industries",
    "Warshi AirConditioner",
  ];

  const name3 = [
    "Vrindavan Electronics",
    "Shourya Traders",
    "Kahna Telecom",
    "Dewangan Enterprises",
    "Balaji Light House",
    "Car Care",
    "D.K. Enterprises",
    "KK MacineDry",
  ];

  const createSlider = (names) => {
    const sliderRef = useRef(null);

    useEffect(() => {
      const interval = setInterval(() => {
        if (sliderRef && sliderRef.current) {
          sliderRef.current.slickNext();
        }
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <div style={{ marginBottom: "80px" }}>
        <Slider ref={sliderRef} {...settings} style={{ marginTop: "2rem" }}>
          {names.map((name, index) => (
            <div key={index} style={{ marginTop: "3rem" }}>
              <h3 style={{ color: "#023e8a" }}>{name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <div className="slider-container">
      <text
        style={{ fontFamily: "sans-serif", fontSize: "30px", color: "#003E70", fontWeight:600 }}
      >
        Our Representative Clients
      </text>
      {createSlider(name1)}
      {createSlider(name2)}
      {createSlider(name3)}
    </div>
  );
};

export default NameSlider;
