import React from 'react'
import placeholder_img from '../images/placeholder-image.jpeg'

const CardPlacehoder = () => {
  return (
    <div class="card" aria-hidden="true">
    <img src={placeholder_img} class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
        </p>
        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
    </div>
</div>
  )
}

export default CardPlacehoder