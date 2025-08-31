import React, { useState } from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'
import AnimeCards from '../components/cards/animeCard/AnimeCards';
import Pagination from '../components/pagination/Pagination';
import AnimeCardsLayout from '../layouts/homeLayouts/animeCardsLayout';

const HomePage = () => {
    return (
        <div data-component='homepage'>
            <HeaderComponent />
            <section className='slider-container'>
                <SliderComponent />
            </section>
            <section className='cards-container' >
            <AnimeCardsLayout/>
            </section>

        </div>
    )
}

export default HomePage