import React, { Fragment } from 'react'
import BackgroundImage from './assets/bg.png'

export default function LandingPage() {
    return (
        <Fragment>
            <div style={HeaderStyle}/>
        </Fragment>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}