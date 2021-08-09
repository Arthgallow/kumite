import React from 'react';
import "./splashPage.css"

const SplashPage = () => {
    return (
        <div className="splash-page-box">
            <div className="splash-page-content">
                <div className="splash-page-content-top">
                    <div className="splash-page-content-top-inner">
                        <h1>September 10, 2021</h1>
                        <h1></h1>

                    </div>
                </div>
                <div className="splash-page-content-bottom">
                    <div className="splash-page-content-bottom-inner">
                        <div className="splash-page-content-bottom-inner-left">
                            <img className="boyka" src="https://ih1.redbubble.net/image.1996272902.9946/st,small,507x507-pad,600x600,f8f8f8.jpg"  alt="boyka"/>
                        </div>
                        <div className="splash-page-content-bottom-inner-center">
                           <h1>Yuri Boyka  Vs. Jean-Claude Van Damme</h1>
                           <h2 style={{marginRight:"50px"}}> 40  Wins 18 </h2>
                           <h2 style={{marginRight:"50px"}}> 1  Losses 1 </h2>


                        </div>
                        <div className="splash-page-content-bottom-inner-right">
                            <img className="jcvd" src="https://i.pinimg.com/474x/1c/a4/5d/1ca45d5ecc4387421c2a75180d014f7a.jpg"  alt="Jean-Claude"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
