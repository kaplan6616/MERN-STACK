import React from 'react';
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button/Button"
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import "./NewPlace.css"
import {useForm} from "../../shared/hooks/form-hook"
const NewPlace = () => {

    const[formState,inputHandler] = useForm(
        {
            title:{
                value: "",
                isValid: false
            },
            description:{
                value: "",
                isValid: false
            },
            adress:{
                value: "",
                isValid: false
            }
        },
        false
    )

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input id="title" type="text" label="Title" element="input" validators ={[VALIDATOR_REQUIRE()]} errorText="Please Enter A Valid Title" onInput={inputHandler}/>
            <Input id="description" label="Description" element="textarea" validators ={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter A Valid Dexription" onInput={inputHandler}/>
            <Input id="adress" label="Adress" element="input" validators ={[VALIDATOR_REQUIRE()]} errorText="Please Enter A Valid Adress" onInput={inputHandler}/>
            <Button type="submit" disabled={!formState.isValid} > ADD PLACE </Button>
        </form>
    )

};

export default NewPlace;
