import React,{useState} from 'react';
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import {VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hook"

import "./Auth.css";

const Auth = () => {
    const [isLoginMode,setLoginMode] = useState(true)
    const [formState,inputHandler,setFormData] = useForm({
        email: {
            value:"",
            isValid:false
        },
        password: {
            value:"",
            isValid:false
        }
    },false);

    const authSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs);
    }

    const signUpMode = () =>{
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name:undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
            setFormData({
                ...formState.inputs,
                name:{
                    value:"",
                    isValid:false
                }
            },false)
        }
        setLoginMode(!isLoginMode);
    }

    const createFormElements = () =>{
        if(isLoginMode){
            return(
                <React.Fragment>
                    <Input element="input" id="email" type="email" label="E-mail" validators={[VALIDATOR_EMAIL()]} errorText="Please Enter A Valid E-mail" onInput={inputHandler} />
                    <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter A Valid Password at Least 5 Characters" onInput={inputHandler}/>
                    <Button type="submit" disabled={!formState.isValid}> LOGIN </Button>
                    <Button inverse onClick={signUpMode}>{isLoginMode ? "Sign Up" : "Login"}</Button>
                </React.Fragment>
            )
        }
        else{
            return(
                <React.Fragment>
                    <Input element="input" id="name" type="text" label="Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please Enter A Name" onInput={inputHandler} />
                    <Input element="input" id="email" type="email" label="E-mail" validators={[VALIDATOR_EMAIL()]} errorText="Please Enter A Valid E-mail" onInput={inputHandler} />
                    <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter A Valid Password at Least 5 Characters" onInput={inputHandler}/>
                    <Button inverse onClick={signUpMode}>{isLoginMode ? "Sign Up" : "Login"}</Button>
                </React.Fragment>

            )
        }
    }
    return (
        <Card className="authentication">
            <h2> Login Required </h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
            {createFormElements()}
            </form>
        </Card>
    )
};

export default Auth;
