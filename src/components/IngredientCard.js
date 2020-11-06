import React from "react";
import {Card, Image, Form, Checkbox, Input} from "semantic-ui-react";
import style from "./IngredientCard.module.css";

export default class IngredientCard extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = {
            checked: false
        }
    }

    onClick(e) {
        if (this.state.checked) {
            this.props.remove(this.props.name, this.props.category);
            this.setState({checked: false});
        } else {
            this.props.add(this.props.name, this.props.category);
            this.setState({checked: true});
        }

    }

    render() {
        return (
            <Card onClick={this.onClick} style={{backgroundColor: this.state.checked ? "#90EE90" : "", transition: "background-color 0.5s"}}>
                <Image src={this.props.imageSrc} size={"small"} centered/>
                <Card.Content value={this.props.name}>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Description>
                        {this.props.price}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}