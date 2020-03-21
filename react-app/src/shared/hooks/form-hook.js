import {useCallback,useReducer} from "react";

const formReducer = (state,action) =>{
    switch (action.type) {
        case "INPUT_CHANGE":
        let isFormValid = true;
        for (var inputId in state.inputs) {
            if(!state.inputs[inputId]){
                continue;
            }
            if(inputId === action.inputId){
                isFormValid = isFormValid && action.isValid;
            }
            else{
                isFormValid = isFormValid && state.inputs[inputId].isValid
            }
        }
        return {
            ...state,
            inputs:{
                ...state.inputs,
                [action.inputId] : {value:action.value, isValid:action.isValid}
            },
            isValid: isFormValid
        };
        case "SET_DATA":
            return{
                inputs : action.inputs,
                isValid: action.formIsValid
            }
        default:
            return state;

    }
}
export const useForm  = ( initialInputs,initialFormValidity ) =>{
    const [formState,dispatch] = useReducer(formReducer,{
        inputs  : initialInputs,
        isValid : initialFormValidity
    });

    const inputHandler = useCallback(function (id,value,isValid){
        dispatch({type:"INPUT_CHANGE",value:value,isValid:isValid,inputId:id})
    },[]); // useCallback bu component tekrardan render edilse bile bu fonksiyonu yeniden oluşmasını engeller. Bu sayede Input componentinde useEffect tetiklenmez

    const setFormData = useCallback(function(inputData,formValiditiy){
        dispatch({
            type:"SET_DATA",
            inputs:inputData,
            formIsValid:formValiditiy
        })
    },[])
    return [formState,inputHandler,setFormData];
}
