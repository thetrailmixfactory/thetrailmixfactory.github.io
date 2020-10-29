import React from "react"
import style from "./Layout.module.css";
import {Image} from "semantic-ui-react";
import Helmet from "react-helmet";

export default function Layout(props) {
    return (
        <div className={style.layout}>
            <Helmet>
                <title>The Trail Mix Factory</title>
            </Helmet>
            <header className={style.header}>
                    <Image src={"/logo.png"} href={"/"} size={"medium"} />
            </header>
            {props.children}
        </div>
    )
}