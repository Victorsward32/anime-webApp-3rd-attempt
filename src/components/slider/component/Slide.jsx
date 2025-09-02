import React, { useRef, useState, useEffect } from 'react'
import '../../../scss/components/slides.scss'

const Slide = ({ slides, activeIndex, onDragStart, onDragEnd }) => {
    // Default image agar koi image load nahi ho
    const fallbackImage = 'https://via.placeholder.com/800x400/cccccc/666666?text=Image+Not+Found'

    // References banaye DOM elements ko access karne ke liye
    const sliderContainer = useRef(null) // Slider container ka reference
    const slideWrapper = useRef(null) // Wrapper ka reference
    
    // State variables
    const [isDragging, setIsDragging] = useState(false) // Kya drag ho raha hai?
    const [dragStartX, setDragStartX] = useState(0) // Drag start position
    const [currentSlideIndex, setCurrentSlideIndex] = useState(activeIndex || 0) // Current slide number

    // Slide ki width calculate karte hain
    const calculateSlideWidth = () => {
        if (!slideWrapper.current) {
            return window.innerWidth // Backup width
        }
        
        // Mobile, tablet ya desktop ke hisab se gap calculate karte hain
        let gapSize = 16 // Default 1rem = 16px
        if (window.innerWidth >= 768) {
            gapSize = 16 // Desktop/tablet gap
        } else {
            gapSize = 8 // Mobile gap
        }
        
        return slideWrapper.current.offsetWidth + gapSize
    }

    // Image error handle karte hain
    const handleImageError = (e) => {
        console.log('Image failed to load, using fallback')
        e.target.src = fallbackImage
    }

    // Slide ko move karte hain
    const goToSlide = (slideNumber, shouldBounce = false) => {
        if (!sliderContainer.current) return // Agar container nahi mila to return
        
        const slideWidth = calculateSlideWidth()
        const moveDistance = -slideNumber * slideWidth
        
        // Animation type decide karte hain
        if (shouldBounce) {
            // Bounce effect ke liye special animation
            sliderContainer.current.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        } else {
            // Normal smooth animation
            sliderContainer.current.style.transition = 'transform 0.3s ease'
        }
        
        // Actual move karte hain
        sliderContainer.current.style.transform = `translateX(${moveDistance}px)`
    }

    // Drag start karte hain
    const handleDragStart = (x) => {
        console.log('Drag started at position:', x)
        setIsDragging(true)
        setDragStartX(x)
        
        // Animation hatate hain drag ke time
        if (sliderContainer.current) {
            sliderContainer.current.style.transition = 'none'
        }
        
        // Parent component ko batate hain
        if (onDragStart) {
            onDragStart()
        }
    }

    // Drag karte samay
    const handleDragging = (x) => {
        if (!isDragging || !sliderContainer.current) return // Agar drag nahi ho raha to return
        
        const dragDistance = x - dragStartX // Kitna drag kiya
        const slideWidth = calculateSlideWidth()
        let movePosition = -currentSlideIndex * slideWidth + dragDistance
        
        // Boundary checking - first aur last slide ke liye resistance
        const firstSlideBoundary = 0 // First slide ki position
        const lastSlideBoundary = -(slides.length - 1) * slideWidth // Last slide ki position
        
        // Agar boundaries ke bahar drag kar rahe hain
        if (movePosition > firstSlideBoundary) {
            // First slide se aage drag kar rahe hain - resistance add karte hain
            const extraDrag = movePosition - firstSlideBoundary
            movePosition = firstSlideBoundary + extraDrag * 0.3 // 30% resistance
        } else if (movePosition < lastSlideBoundary) {
            // Last slide se aage drag kar rahe hain - resistance add karte hain
            const extraDrag = movePosition - lastSlideBoundary
            movePosition = lastSlideBoundary + extraDrag * 0.3 // 30% resistance
        }
        
        // Position update karte hain
        sliderContainer.current.style.transform = `translateX(${movePosition}px)`
    }

    // Drag end karte hain
    const handleDragEnd = (x) => {
        if (!isDragging) return // Agar drag nahi ho raha tha to return
        
        console.log('Drag ended at position:', x)
        setIsDragging(false)
        
        const dragDistance = x - dragStartX // Total drag distance
        const slideWidth = calculateSlideWidth()
        let newSlideIndex = currentSlideIndex
        let needsBounce = false

        // Check karte hain ki boundary drag kiya hai ya nahi
        const draggedRightOnFirst = currentSlideIndex === 0 && dragDistance > slideWidth / 6
        const draggedLeftOnLast = currentSlideIndex === slides.length - 1 && dragDistance < -slideWidth / 6
        
        if (draggedRightOnFirst || draggedLeftOnLast) {
            // Boundary drag kiya hai - bounce back karte hain
            needsBounce = true
            newSlideIndex = currentSlideIndex // Same slide pe rehte hain
        } else {
            // Normal slide change logic
            if (dragDistance < -slideWidth / 3 && currentSlideIndex < slides.length - 1) {
                // Left drag kiya aur next slide available hai
                newSlideIndex++
            } else if (dragDistance > slideWidth / 3 && currentSlideIndex > 0) {
                // Right drag kiya aur previous slide available hai
                newSlideIndex--
            }
        }

        // New slide pe move karte hain
        setCurrentSlideIndex(newSlideIndex)
        goToSlide(newSlideIndex, needsBounce)
        
        // Parent ko notify karte hain agar slide change hui
        if (onDragEnd && newSlideIndex !== currentSlideIndex) {
            onDragEnd(newSlideIndex)
        }
    }

    // Parent se activeIndex change hone pe update karte hain
    useEffect(() => {
        if (typeof activeIndex === 'number' && activeIndex !== currentSlideIndex) {
            console.log('Updating slide from parent:', activeIndex)
            setCurrentSlideIndex(activeIndex)
            goToSlide(activeIndex, false) // Bounce nahi chahiye programmatic change pe
        }
    }, [activeIndex, currentSlideIndex])

    // Window resize hone pe adjust karte hain
    useEffect(() => {
        const handleWindowResize = () => {
            console.log('Window resized, adjusting slider')
            goToSlide(currentSlideIndex, false)
        }
        
        window.addEventListener('resize', handleWindowResize)
        
        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [currentSlideIndex])

    // Image drag prevent karte hain
    const preventImageDrag = (e) => {
        e.preventDefault()
    }

    return (
        <div
            data-component="slides"
            ref={slideWrapper}
            // Mouse events
            onMouseDown={(e) => {
                e.preventDefault()
                handleDragStart(e.pageX)
            }}
            onMouseMove={(e) => {
                if (isDragging) {
                    handleDragging(e.pageX)
                }
            }}
            onMouseUp={(e) => {
                if (isDragging) {
                    handleDragEnd(e.pageX)
                }
            }}
            onMouseLeave={(e) => {
                if (isDragging) {
                    handleDragEnd(e.pageX)
                }
            }}
            // Touch events (mobile ke liye)
            onTouchStart={(e) => {
                e.preventDefault()
                handleDragStart(e.touches[0].clientX)
            }}
            onTouchMove={(e) => {
                e.preventDefault()
                handleDragging(e.touches[0].clientX)
            }}
            onTouchEnd={(e) => {
                e.preventDefault()
                handleDragEnd(e.changedTouches[0].clientX)
            }}
            style={{ userSelect: 'none' }} // Text selection prevent karte hain
        >
            <div className="slides-container" ref={sliderContainer}>
                {slides?.map((imageUrl, index) => (
                    <div key={index} className="slide-item">
                        <img
                            src={imageUrl || fallbackImage}
                            alt={`Slide number ${index + 1}`}
                            onError={handleImageError}
                            className="slide-image"
                            onDragStart={preventImageDrag}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slide