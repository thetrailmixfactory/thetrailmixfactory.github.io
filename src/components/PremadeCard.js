import React from "react";
import {Card, Image, Form, Checkbox, Input} from "semantic-ui-react";

export default class IngredientCard extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = {
            checked: false
        }
    }

    onClick(e) {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <Card fluid onClick={this.onClick} style={{backgroundColor: this.state.checked ? "#00cc66" : "", transition: "background-color 1s"}}>
                <Image src={this.props.imageSrc} size={"small"} centered/>
                <Card.Content value={this.props.name}>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Meta>
                        <span>{this.props.price}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.ingredients.reduce((t, c) => (t + c + ", "), "")}
                    </Card.Description>
                    <Form.Field style={{display: "none"}} control={Input} type={"checkbox"} name={this.props.name} checked={this.state.checked ? "checked" : ""} />
                </Card.Content>
            </Card>
        )
    }
}