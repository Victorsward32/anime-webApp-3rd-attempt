import React, { useState, useEffect, useRef } from "react";
import "../../scss/components/sliderComponent.scss"
import { slideImagesArr } from "../../utils/StaticData";
import Slide from "./component/Slide.jsx";
import DotsNButton from "./component/DotsNButton.jsx";

const SliderComponent = () => {
    // State variables - component ki memory
    const [allSlides, setAllSlides] = useState([]); // Sare images store karte hain
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0); // Abhi konsa slide active hai
    
    // Timer ka reference store karte hain
    const autoSlideTimer = useRef(null);

    // Auto slide start karne ka function
    const startAutoSlide = () => {
        // Agar pehle se timer chal raha hai to band kar dete hain
        if (autoSlideTimer.current) {
            clearInterval(autoSlideTimer.current);
        }
        
        // Naya timer start karte hain
        autoSlideTimer.current = setInterval(() => {
            setCurrentSlideNumber((previousSlide) => {
                // Agar last slide pe hain to first slide pe chale jao
                if (previousSlide === slideImagesArr.length - 1) {
                    return 0;
                } else {
                    // Warna next slide pe jao
                    return previousSlide + 1;
                }
            });
        }, 5000); // 5 second baad slide change hoga
    };

    // Auto slide stop karne ka function
    const stopAutoSlide = () => {
        if (autoSlideTimer.current) {
            clearInterval(autoSlideTimer.current); // Timer band karte hain
            autoSlideTimer.current = null; // Reference clear karte hain
        }
    };

    // Component load hone pe ye chalega
    useEffect(() => {
        console.log('Slider component loaded, setting up slides');
        setAllSlides(slideImagesArr); // Images set karte hain
        startAutoSlide(); // Auto slide start karte hain

        // Component destroy hone pe timer clean up karte hain
        return () => {
            console.log('Slider component unmounting, cleaning up timer');
            stopAutoSlide();
        }
    }, []); // Empty dependency array matlab sirf ek baar chalega

    // Previous slide pe jane ka function
    const goToPreviousSlide = () => {
        console.log('Previous button clicked');
        stopAutoSlide(); // User interaction pe auto slide band karte hain
        
        setCurrentSlideNumber((currentSlide) => {
            // Agar first slide pe hain to last slide pe jao
            if (currentSlide === 0) {
                return slideImagesArr.length - 1;
            } else {
                // Warna previous slide pe jao
                return currentSlide - 1;
            }
        });
        
        // 5 second baad auto slide dobara start kar dete hain
        setTimeout(() => {
            startAutoSlide();
        }, 5000);
    }

    // Next slide pe jane ka function
    const goToNextSlide = () => {
        console.log('Next button clicked');
        stopAutoSlide(); // User interaction pe auto slide band karte hain
        
        setCurrentSlideNumber((currentSlide) => {
            // Agar last slide pe hain to first slide pe jao
            if (currentSlide === slideImagesArr.length - 1) {
                return 0;
            } else {
                // Warna next slide pe jao
                return currentSlide + 1;
            }
        });
        
        // 5 second baad auto slide dobara start kar dete hain
        setTimeout(() => {
            startAutoSlide();
        }, 5000);
    }

    // Specific slide pe jane ka function (dot click pe)
    const goToSpecificSlide = (slideIndex) => {
        console.log('Dot clicked for slide:', slideIndex);
        stopAutoSlide(); // User interaction pe auto slide band karte hain
        setCurrentSlideNumber(slideIndex); // Direct slide pe chale jao
        
        // 5 second baad auto slide dobara start kar dete hain
        setTimeout(() => {
            startAutoSlide();
        }, 5000);
    }

    // Drag start hone pe ye function chalega
    const handleUserDragStart = () => {
        console.log('User started dragging');
        stopAutoSlide(); // Drag start hone pe auto slide band kar dete hain
    };

    // Drag end hone aur slide change hone pe ye function chalega
    const handleUserDragEnd = (newSlideIndex) => {
        console.log('User finished dragging, new slide:', newSlideIndex);
        setCurrentSlideNumber(newSlideIndex); // New slide set karte hain
        
        // 5 second baad auto slide dobara start kar dete hain
        setTimeout(() => {
            startAutoSlide();
        }, 5000);
    };

    return (
        <section data-component="bannerSlider">
            {/* Slide component - main slider */}
            <Slide
                slides={slideImagesArr}
                activeIndex={currentSlideNumber}
                onDragStart={handleUserDragStart}
                onDragEnd={handleUserDragEnd}
            />
            
            {/* Dots aur buttons component - navigation */}
            <DotsNButton
                activeIndex={currentSlideNumber}
                slides={slideImagesArr}
                onClick={goToSpecificSlide}
                isDotVisible={true}
                onClickLeft={goToPreviousSlide}
                onClickRight={goToNextSlide}
            />
        </section>
    );
};

export default SliderComponent;