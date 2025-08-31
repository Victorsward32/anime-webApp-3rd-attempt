import React from 'react'
import LeftBtn from '../../../assets/icons/left.svg';
import RightBtn from '../../../assets/icons/right.svg'
import '../../../scss/components/dotsNbutton.scss'

const DotsNButton = ({ slides, activeIndex, onClick, onClickLeft, onClickRight, isDotVisible = false }) => {
    
    // Function to handle dot click
    const handleDotClick = (dotIndex) => {
        onClick(dotIndex);
    }

    return (
        <div data-component="dotsNbtn-container">
            {/* Left arrow button */}
            <img 
                className="arrowBtnImg" 
                src={LeftBtn} 
                alt="slider left button" 
                onClick={onClickLeft} 
            />
            
            {/* Dots for navigation - only show if isDotVisible is true */}
            {isDotVisible === true && (
                <div className="dots-container">
                    {slides.map((slide, index) => (
                        <span
                            key={index}
                            className={`dot ${activeIndex === index ? "active-dot" : ""}`}
                            onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                </div>
            )}
            
            {/* Right arrow button */}
            <img 
                className="arrowBtnImg" 
                src={RightBtn} 
                alt="slider right button" 
                onClick={onClickRight} 
            />
        </div>
    );
};

export default DotsNButton;