import React from 'react'
import CardPlacehoder from './CardPlacehoder'
import { responsive } from './responsive'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselPlaceholder = () => {
    return (
        <div>

          
            <Carousel responsive={responsive} showDots={true} >

               <CardPlacehoder/>
               <CardPlacehoder/>
               <CardPlacehoder/>

            </Carousel>

        </div>
    )
}

export default CarouselPlaceholder