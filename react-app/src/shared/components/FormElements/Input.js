import React,{useReducer, useEffect} from 'react';
import {validate} from "../../util/validators"
import './Input.css';

const inputReducer = (state,action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value:action.val,
                isValid: validate(action.val,action.validators)
            };
        case "TOUCH":{
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state
    }
}
const Input = props => {
    const [inputState,dispatch] = useReducer(inputReducer,{value:props.value || "",isValid: props.valid || false, isTouched:false});

    const {id, onInput} = props;
    const {value, isValid} = inputState

    useEffect(()=>{
        onInput(id,value,isValid)
    },[id,value,isValid,onInput]); // if one of these changes this function calles immediately

    const changeHandler = event =>{
        dispatch({type:"CHANGE",val:event.target.value,validators:props.validators})
    }
    const touchHandler = event =>{
        dispatch({type:"TOUCH"})
    }

    function createElement(){
        if(props.element === 'input'){
            return( <input id={props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}/>)
        }
        else{
            return (<textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}/>)
        }
    }

    function errorMessage(){
        if(!inputState.isValid && inputState.isTouched){
            return( <p> {props.errorText} </p>)
        }
    }

    function setClassName(){
        if(!inputState.isValid && inputState.isTouched){
            return("form-control form-control--invalid")
        }
        else{
            return("form-control")
        }
    }

  return (
    <div className={setClassName()}>
      <label htmlFor={props.id}>{props.label}</label>
      {createElement()}
      {errorMessage()}
    </div>
  );
};

export default Input;
