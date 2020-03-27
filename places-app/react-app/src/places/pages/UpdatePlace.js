import React, { useEffect, useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from "../../shared/util/validators";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
const UpdatePlace = props => {
    const [loadedPlace, setLoadedPlace] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const placeId = useParams().placeId;
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false
            },
            description: {
                value: "",
                isValid: false
            }
        },
        false
    );
    useEffect(() => {
        console.log(placeId);

        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    },
                    true
                );
            } catch (err) {}
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                "PATCH",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    "Content-Type": "application/json"
                }
            );
            history.push("/" + auth.userId + "/places");
        } catch (error) {}
    };
    const setUpdateForm = () => {
        if (!isLoading && loadedPlace) {
            return (
                <form
                    className="place-form"
                    onSubmit={placeUpdateSubmitHandler}
                >
                    <Input
                        id="title"
                        type="text"
                        label="Title"
                        element="input"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please Enter A Valid Title"
                        onInput={inputHandler}
                        value={loadedPlace.title}
                        valid={true}
                    />
                    <Input
                        id="description"
                        label="Description"
                        element="textarea"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please Enter A Valid Dexription"
                        onInput={inputHandler}
                        value={loadedPlace.description}
                        valid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {" "}
                        UPDATE PLACE{" "}
                    </Button>
                </form>
            );
        } else {
            return null;
        }
    };
    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }
    if (!loadedPlace && error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find this place...</h2>
                </Card>
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError} />
                {setUpdateForm()}
            </React.Fragment>
        );
    }
};

export default UpdatePlace;
