import React from "react"
import { Redirect } from "react-router-dom"

export default function NotFoundRoute(props) {
    return (
        <Redirect to="/" />
    )
}