import React from "react"
import style from "./order.module.css";
import isEmail from 'validator/lib/isEmail';
import proddata from "../data"
import {
    Button,
    Checkbox,
    Form, Header,
    Input,
    Radio,
    Select,
    TextArea,
    Message, Container
} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import encodeURL from "encodeurl"
import Layout from "../components/Layout";

export default class Order extends React.Component{
    submitURL = "https://api.apispreadsheets.com/data/2728/";

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.validateData = this.validateData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getMailURL = this.getMailURL.bind(this);

        this.state = {
            success: false,
            submitted: false,
            error: false,
            errorMessage: "Unexpected error",
            price: 0,
            data: {
                name: "",
                email: ""
            }
        };
    }

    getMailURL() {
        return "mailto://thetrailmixfactory@gmail.com?cc=farazmalik17465@gmail.com&subject=Cancel%20Request&body=Registered%20Email%3A%20" + encodeURL(this.state.data.email) + "%0AName%3A%20" + encodeURL(this.state.data.name) + "%0ADate%3A%20" + encodeURL(Date());
    }

    validateData(data) {
        // check if email address is valid
        if (!isEmail(data.email)) {
            return "Not a valid email";
        }

        return 0;
    }

    onChange(e, {name, value}) {
        this.setState({data: {...this.state.data, [name]: value}});
    }

    onSubmit(event) {
        const err = this.validateData(this.state.data);
        if (err === 0) {
            if (!this.state.submitted) {
                this.setState({success: true, error: false, submitted: true});
            } else {
                //resubmission
                this.setState({error: true, errorMessage: "You have already submitted your order!"});
                event.preventDefault();
            }

        } else {
            this.setState({error: true, errorMessage: err});
            event.preventDefault();
        }
    }

    render() {
        return (
            <Layout>
                <Header size={"huge"}>Order Form</Header>
                <iframe width={0} height={0} frameBorder={0}  title={"dummyframe"} name={"dummyframe"} id={"dummyframe"}/>
                <p>Please fill out some personal details before you order. Please acknowledge that we currently accept
                    cash only, which will be paid on pickup of trail mix. </p>
                <Form className={style.form} target={"dummyframe"} onSubmit={this.onSubmit}
                      action={this.submitURL} method={"POST"} success={this.state.success} error={this.state.error}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Full Name'
                            placeholder='Name'
                            name={"name"}
                            onChange={this.onChange}
                        />
                        <Form.Field
                            control={Input}
                            label='Email'
                            placeholder='Email'
                            name={"email"}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Message header={"Total"} content={"$" + this.state.price.toFixed(2)} attached={true}/>
                    <Message size={"small"} attached={true}>
                        <p>Please check all details before ordering. To cancel an order, please email <a href={this.getMailURL()}>thetrailmixfactory@gmailcom</a>.</p>
                    </Message>
                    <Message success header={'Order Completed!'}  content={'Your order was submitted!'} />
                    <Message error header={'Error'} content={this.state.errorMessage} />
                    <br />
                    <Form.Field control={Button} floated={"right"} type={"submit"} active>Submit</Form.Field>
                </Form>
            </Layout>
        );
    }
}