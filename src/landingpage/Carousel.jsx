import { useState, useEffect } from "react";
import "./carousel.css"; // External CSS file for styling

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Array of images and their corresponding text
  const images = [
    {
      src: "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Discover the essence of technological brilliance with Intallysh Wisdom. As a premier software company, we offer a comprehensive suite of services designed to elevate your business to new heights. From innovative software development to seamless integration solutions, intuitive user interfaces to robust cybersecurity measures, we are your one-stop destination for all things tech",
    },
    {
      src: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1555&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Continuing our dedication to innovation, Intallysh Wisdom remains your steadfast partner in navigating the dynamic realms of technology. Our mission extends beyond mere software; it encompasses a commitment to understanding your unique needs, collaborating seamlessly, and delivering solutions that surpass expectations",
    },
    {
      src: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Expanding beyond borders, Intallysh Wisdom is poised to scale your network internationally, amplifying your global footprint. Our adept team specializes in crafting scalable software solutions that transcend geographical boundaries, ensuring seamless connectivity and performance across diverse locations",
    },
    {
      src: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Security is the cornerstone of our ethos at Intallysh Wisdom. We meticulously craft comprehensive security solutions, employing cutting-edge technologies and stringent protocols to safeguard your digital assets. Our commitment to security extends across borders, ensuring robust protection for your network on a global scale",
    },
  ];

  // Auto play the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

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
