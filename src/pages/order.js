import React from "react"
import style from "./order.module.css";
import isEmail from 'validator/lib/isEmail';
import IngredientCard from "../components/IngredientCard";
import PremadeCard from "../components/PremadeCard";
import data from "../data.json"
import {
    Button,
    Checkbox,
    Form, Header,
    Input,
    Radio,
    Select,
    TextArea,
    Message, Container, Segment, Card
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
        this.renderChooseMenu = this.renderChooseMenu.bind(this);
        this.renderPresetMenu = this.renderPresetMenu.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.setPresetMix = this.setPresetMix.bind(this);

        this.state = {
            success: false,
            submitted: false,
            error: false,
            errorMessage: "Unexpected error",
            price: 0,
            presetMenu: false,
            chooseMenu: false,
            ingredients: [],
            categories: {},
            presetMix: "",
            data: {
                name: "",
                email: "",
            }
        };
    }

    addIngredient(i, c) {
        this.setState({ingredients: [...this.state.ingredients, i], categories: {...this.state.categories, [c]: this.state.categories[c] === undefined ? 1 : this.state.categories[c]+1}});
    }

    removeIngredient(i, c) {
        this.setState({ingredients: this.state.ingredients.filter(v => v !== i), categories: {...this.state.categories, [c]: this.state.categories[c]-1}});
    }

    setPresetMix(p) {
        if (this.state.presetMix === "" || p === "") {
            this.setState({presetMix: p});
            return true;
        } else {
            return false;
        }

    }

    getMailURL() {
        return "mailto://thetrailmixfactory@gmail.com?cc=farazmalik17465@gmail.com&subject=Cancel%20Request&body=Registered%20Email%3A%20" + encodeURL(this.state.data.email) + "%0AName%3A%20" + encodeURL(this.state.data.name) + "%0ADate%3A%20" + encodeURL(Date());
    }

    validateData(data) {
        // check if name is not empty
        if (data.name === "") {
            return "Please fill in your name";
        }

        // check if email address is valid
        if (!isEmail(data.email)) {
            return "Not a valid email";
        }

        return 0;
    }

    renderChooseMenu(e) {
        this.setState({presetMenu: false, chooseMenu: true});
    }

    renderPresetMenu(e) {
        this.setState({presetMenu: true, chooseMenu: false});
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
                this.setState({error: true, errorMessage: "You have already submitted your order! Please reload to order again!"});
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
                <Message warning>Please be advised to not consume this product if you have an allergy to <strong>wheat/gluten, milk, eggs, peanuts, tree nuts, or soy.</strong> </Message>
                <p>Please fill out some personal details before you order. Please acknowledge that we currently accept
                    cash only, which will be paid on pickup of trail mix. <strong>To learn about the health precautions we take for preparing your food, please look <a href={"https://docs.google.com/document/d/1Ev2AldUpJc0sHFMCgKsRu3AdWRRLrvBjPJAlPM_rUUE/edit?usp=sharing"}>here</a></strong>.</p>
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
                    {/* Hidden Fields*/}
                    <Form.Field
                        className={style.hiddenField}
                        control={Input}
                        name={"status"}
                        value={"PENDING"}
                        type={"hidden"}
                    />
                    <Form.Field
                        className={style.hiddenField}
                        control={Input}
                        name={"price"}
                        value={this.state.price}
                        type={"hidden"}
                    />
                    <Form.Field
                        className={style.hiddenField}
                        control={Input}
                        name={"premade"}
                        value={this.state.presetMenu}
                        type={"hidden"}
                    />
                    <Form.Field
                        className={style.hiddenField}
                        control={Input}
                        name={"choose"}
                        value={this.state.chooseMenu}
                        type={"hidden"}
                    />
                    {
                        this.state.chooseMenu ?
                        <Form.Field
                            className={style.hiddenField}
                            control={Input}
                            name={"ingredients"}
                            value={this.state.ingredients.join(", ")}
                            type={"hidden"}
                        /> : ""
                    }
                    {
                        this.state.presetMenu ?
                        <Form.Field
                            className={style.hiddenField}
                            control={Input}
                            name={"presetName"}
                            value={this.state.presetMix}
                            type={"hidden"}
                        /> : ""
                    }
                    <br />

                    <Message attached={"top"}>
                        Choose an ordering option:
                    </Message>

                    <Button.Group fluid size={"large"} attached={"bottom"}>
                        <Button type={"button"} onClick={this.renderPresetMenu}>Pre-made</Button>
                        <Button.Or />
                        <Button color={"yellow"} type={"button"} onClick={this.renderChooseMenu}>Choose your own</Button>
                    </Button.Group>

                    {/* Choose Menu */}
                    <Segment color={"yellow"} style={{display: this.state.chooseMenu ? "" : "none"}}>
                        <Header>Please choose <strong className={style.strong}>6</strong> items for your mix:</Header>
                        {data.defaults.map( c => (
                            <Segment secondary>
                                <Header size={"large"}>{c.Categories}</Header>
                                <p>Please choose up to <strong className={style.strong}>{c.Limit}</strong> of the following:</p>
                                <Card.Group itemsPerRow={2}>
                                    {data.prod.filter(val => val.category === c.Categories).map(v => <IngredientCard add={this.addIngredient} remove={this.removeIngredient} category={c.Categories} imageSrc={v.imageLink} name={v.name} price={"$69"}/>)}
                                </Card.Group>
                            </Segment>)
                        )}
                    </Segment>

                    {/* Preset Menu */}
                    <Segment color={"grey"} style={{display: this.state.presetMenu ? "" : "none"}}>
                        <Card.Group itemsPerRow={2}>
                            {data.premade.map(v => <PremadeCard setPreset={this.setPresetMix} imageSrc={v.imageLink} name={v.name} price={"$69"} ingredients={Object.keys(v).filter(k => v[k] === 'x')}/>)}
                        </Card.Group>
                    </Segment>

                    <br />
                    <Message header={"Total"} content={"$" + this.state.price.toFixed(2)} attached={true}/>
                    <Message size={"small"} attached={true}>
                        <p>Please check all details before ordering. To cancel an order, please email <a href={this.getMailURL()}>thetrailmixfactory@gmailcom</a>.</p>
                    </Message>
                    <Message success header={'Order Completed!'}  content={'Your order was submitted!'} />
                    <Message error header={'Error'} content={this.state.errorMessage} />

                    <br />
                    <Form.Field control={Button} size={"large"} floated={"right"} type={"submit"} active>Submit</Form.Field>
                    <br />
                    <iframe style={{width: 0, height: 0}} width={0} height={0} frameBorder={0} title={"dummyframe"} name={"dummyframe"} id={"dummyframe"}/>
                </Form>
            </Layout>
        );
    }
}