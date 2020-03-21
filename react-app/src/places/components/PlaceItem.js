import React, {useState,useContext} from 'react';
import "./PlaceItem.css"
import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button/Button"
import Modal from "../../shared/components/UIElements/Modal"
import Map from "../../shared/components/UIElements/Map"
import {AuthContext} from "../../shared/context/auth-context";
const PlaceItem = (props) => {
    const auth = useContext(AuthContext);
    const [showMap,setShowMap] = useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    function openMapHandler(){
        setShowMap(true);
    }

    function closeMapHandler(){
        setShowMap(false);
    }

    function openShowDeleteModal(){
        setShowDeleteModal(true);
    }

    function closeShowDeleteModal(){
        setShowDeleteModal(false);
    }

    function confirmDeleteButtonHandler(){
        console.log("Deleting...");
        closeShowDeleteModal()
    }

    function createEditDeleteButtons(){
        if(auth.isLoggedIn){
            return (
                <React.Fragment>
                    <Button to={`/places/${props.id}`}>EDIT</Button>
                    <Button onClick={openShowDeleteModal} danger>DELETE</Button>
                </React.Fragment>
            )
        }
        else{
            return null
        }
    }

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item_modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center = {props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showDeleteModal}
                onCancel={closeShowDeleteModal}
                header={"Are You Sure?"}
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={closeShowDeleteModal}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteButtonHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p> Do you want to proceed and delete this place? Please note that it cant be undone thereafter. </p>
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button onClick={openMapHandler} inverse>VIEW ON MAP</Button>
                        {createEditDeleteButtons()}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
};

export default PlaceItem;
