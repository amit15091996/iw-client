import { useState, useEffect } from "react";
import "./carousel.css"; // External CSS file for styling
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Array of images and their corresponding text
  const images = [
    {
      src: "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Discover the essence of technological brilliance with Intallysh Wisdom. As a premier software company, we offer a comprehensive suite of services designed to elevate your business to new heights.",
    },
    {
      src: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1555&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The commitment to innovation at Intallysh Wisdom goes beyond software. We navigate dynamic technology realms, understanding unique needs, collaborating seamlessly, and delivering solutions that exceed expectations.",
    },
    {
      src: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Intallysh Wisdom expands globally, scaling networks, crafting scalable software solutions, and ensuring seamless connectivity across diverse locations, transcending geographical boundaries for enhanced performance.",
    },
    {
      src: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Intallysh Wisdom prioritizes security, crafting comprehensive solutions with cutting-edge tech. Our commitment extends globally, ensuring robust network protection across diverse borders and digital landscapes.",
    },
  ];

  // Auto play the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };
  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={index === currentImage ? "slide active" : "slide"}
        >
          <img src={image.src} alt={`Image ${index + 1}`} />
          <div className="text-overlay">
            <p>{image.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
