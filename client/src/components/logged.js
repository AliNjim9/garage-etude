import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel className="p-5 h-50 w-50 float-end" showIndicators="false" autoPlay="true" infiniteLoop="true">
                <div>
                    <img src="link.png"  alt="img1"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="planify.png" alt="img2"/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="log.png"  alt="img1"/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};

export default DemoCarousel;