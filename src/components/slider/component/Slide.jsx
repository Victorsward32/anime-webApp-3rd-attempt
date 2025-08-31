import React from 'react'
import '../../../scss/components/slides.scss'

const Slide = ({ slides, activeIndex }) => {
    const fallbackImage = 'https://cdn.lazyshop.com/files/d2c4f2c8-ada5-455a-86be-728796b838ee/other/192115ca73ec8c98c62e3cbc95b96d32.jpg'

    // Simple error handler function
    const handleImageError = (e) => {
        e.target.src = fallbackImage;
    }

    return (
        <div data-component="slides">
            <div 
                className="slides-container" 
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {slides?.map((imageUrl, index) => (
                    <div key={index} className="slide-item">
                        <img 
                            src={imageUrl || fallbackImage}
                            alt={`Slide ${index + 1}`}
                            onError={handleImageError}
                            className="slide-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slide;