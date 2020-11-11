import React from "react";
import {Card, Image, Form, Checkbox, Input} from "semantic-ui-react";

export default class IngredientCard extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.ingredientList = this.props.ingredients.reduce((t, c) => (t + c + ", "), "");

        this.state = {
            checked: false
        }
    }

    onClick(e) {
        if (this.state.checked) {
            this.props.setPreset("", 0);
            this.setState({checked: false});
        } else {
            const set = this.props.setPreset(this.props.name, this.props.price);
            if (set) {
                this.setState({checked: true});
            }
        }

    }

    render() {
        return (
            <Card fluid onClick={this.onClick} style={{backgroundColor: this.state.checked ? "#fbbd08" : "", transition: "background-color 0.5s"}}>
                <Image src={this.props.imageSrc} size={"small"} centered/>
                <Card.Content value={this.props.name}>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>
                        <span>{this.props.price}$</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.ingredientList.substring(0, this.ingredientList.length-2) /* -2 because ", " is added */}
                    </Card.Description>
                    <Form.Field style={{display: "none"}} control={Input} type={"checkbox"} name={this.props.name} checked={this.state.checked ? "checked" : ""} />
                </Card.Content>
            </Card>
        )
    }
}