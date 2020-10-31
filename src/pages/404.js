import {Header} from "semantic-ui-react";
import React from "react";

export default function order() {
    window.location.replace("/order")

    return (
        <div>
            <Header>Redirecting to order form...</Header>
        </div>
    );
}