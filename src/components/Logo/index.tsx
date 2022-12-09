import React, { Component } from "react";
import LogoImage from "../../assets/images/gitfamelogo.png";
import "./Logo.scss"

class LogoProps {
    description!: string;
}

export default class Logo extends Component<LogoProps> {

    render() {
        return (
            <a className="Logo" href="/">
                <img className="LogoImage" src={LogoImage} alt="site_config" />
                <div className="Description">{this.props.description}</div>
            </a>
        )
    }
}