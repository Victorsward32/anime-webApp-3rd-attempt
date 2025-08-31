import React, { useState, useEffect, } from "react";
import "../../scss/components/sliderComponent.scss"
import { slideImagesArr } from "../../utils/StaticData";
import Slide from "./component/Slide.jsx";
import DotsNButton from "./component/DotsNButton.jsx";

const SliderComponent = () => {
    const [imageSlides, setImageSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Set slides when component starts mounting
    useEffect(() => {
        setImageSlides(slideImagesArr);
        
        // Auto slide timer - simple logic for fresher understanding
        const autoSlideTimer = setInterval(() => {
            setActiveIndex((currentIndex) => {
                // If we are at last slide, go to first slide (0)
                // Otherwise go to next slide
                if (currentIndex === slideImagesArr.length - 1) {
                    return 0;
                } else {
                    return currentIndex + 1;
                }
            });
        }, 5000); // Change slide every 5 seconds

        // Cleanup function to clear timer when component unmounts
        return () => {
            clearInterval(autoSlideTimer);
        }
    }, []);

    // Function to go to previous slide
    const handlePreviousClick = () => {
        setActiveIndex((currentIndex) => {
            // If we are at first slide (0), go to last slide
            // Otherwise go to previous slide
            if (currentIndex === 0) {
                return slideImagesArr.length - 1;
            } else {
                return currentIndex - 1;
            }
        })
    }

    // Function to go to next slide
    const handleNextClick = () => {
        setActiveIndex((currentIndex) => {
            // If we are at last slide, go to first slide (0)
            // Otherwise go to next slide
            if (currentIndex === slideImagesArr.length - 1) {
                return 0;
            } else {
                return currentIndex + 1;
            }
        })
    }

    // Function to go to specific slide when dot is clicked
    const handleDotClick = (clickedIndex) => {
        setActiveIndex(clickedIndex);
    }

    return (
        <section data-component="bannerSlider">
            <Slide
                slides={slideImagesArr}
                activeIndex={activeIndex}
            />
            <DotsNButton
                activeIndex={activeIndex}
                slides={slideImagesArr}
                onClick={handleDotClick}
                isDotVisible={true}
                onClickLeft={handlePreviousClick}
                onClickRight={handleNextClick}
            />
        </section>
    );
};

export default SliderComponent;