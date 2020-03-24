import React, {useEffect,useState} from 'react';
import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button/Button"
import Card from "../../shared/components/UIElements/Card"
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import { useParams}  from "react-router-dom"
import {useForm} from "../../shared/hooks/form-hook"
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];
const UpdatePlace = (props) => {
    const [isLoading,setIsLoading] = useState(true);
    const placeId = useParams().placeId;
    const[formState,inputHandler,setFormData] = useForm(
        {
            title:{
                value:"" ,
                isValid: false
            },
            description:{
                value: "",
                isValid: false
            }
        },
        false
    );

    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
    useEffect(()=>{
        if(identifiedPlace){
            setFormData(
                {
                    title:{
                        value:identifiedPlace.title ,
                        isValid: true
                    },
                    description:{
                        value: identifiedPlace.description,
                        isValid: true
                    }
                },
                true
            );
        }
        setIsLoading(false);
    },[setFormData,identifiedPlace])

    const placeUpdateSubmitHandler = event=>{
        event.preventDefault();
        console.log(formState.inputs);
    }
    if(!identifiedPlace){
        return (
            <div className="center">
                <Card>
                    <h2>Could not find this place...</h2>
                </Card>
            </div>
        )
    }
    else{
        if(!isLoading){
            return (
                <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                <Input id="title" type="text" label="Title" element="input" validators ={[VALIDATOR_REQUIRE()]} errorText="Please Enter A Valid Title" onInput={inputHandler} value={formState.inputs.title.value} valid={formState.inputs.title.isValid}/>
                <Input id="description" label="Description" element="textarea" validators ={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter A Valid Dexription" onInput={inputHandler} value={formState.inputs.description.value} valid={formState.inputs.description.isValid}/>
                <Button type="submit" disabled={!formState.isValid} > ADD PLACE </Button>
                </form>
            )
        }else{
            return null;
        }
    }
};

export default UpdatePlace;
