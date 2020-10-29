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
} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/Layout";

export default function order() {
    return (
        <Layout>
            <Header size={"huge"}>Order Form</Header>
            <p>Please fill out some personal details before you order. Please acknowledge that we currently accept cash only, which will be paid on pickup of trail mix. </p>
            <Form className={style.form} action={"https://formspree.io/f/mwkwbeqo"} method={"POST"}>
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
                <Form.Field control={Button} type={"submit"}>Submit</Form.Field>
            </Form>
        </Layout>
    );
}