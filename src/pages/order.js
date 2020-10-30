import React from "react"
import style from "./order.module.css";

import {
    Button,
    Checkbox,
    Form, Header,
    Input,
    Radio,
    Select,
    TextArea,
    Message
} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/Layout";

export default class order extends React.Component{
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.validateData = this.validateData.bind(this);


        this.state = {
            success: false,
            failure: false
        };
    }

    validateData(formData) {
        return true;
    }

    onSubmit(event) {
        if (this.validateData(this)) {
            this.setState({success: true, failure: false});

        } else {
            this.setState({failure: true});
            event.preventDefault();
        }
    }

    render() {
        return (
            <Layout>
                <Header size={"huge"}>Order Form</Header>
                <iframe width={0} height={0} title={"dummyframe"} name={"dummyframe"} id={"dummyframe"}/>
                <p>Please fill out some personal details before you order. Please acknowledge that we currently accept
                    cash only, which will be paid on pickup of trail mix. </p>
                <Form className={style.form} target={"dummyframe"} onSubmit={this.onSubmit}
                      action={"https://api.apispreadsheets.com/data/2728/"} method={"POST"} success={this.state.success} error={this.state.error}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Full Name'
                            placeholder='Name'
                            name={"name"}
                        />
                        <Form.Field
                            control={Input}
                            label='Email'
                            placeholder='Email'
                            name={"email"}
                        />
                    </Form.Group>
                    <Message
                        success
                        header='Order Completed!'
                    />
                    <Form.Field control={Button} type={"submit"}>Submit</Form.Field>
                </Form>
            </Layout>
        );
    }
}