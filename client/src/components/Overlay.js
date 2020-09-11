import React from "react"

import "./styles/overlay.css"

export default function Overlay(props) {
    return <div className={props.className} onClick={props.onClick}></div>
}