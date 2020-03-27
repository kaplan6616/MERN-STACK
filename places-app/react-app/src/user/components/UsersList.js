import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
const UserList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card className="center">
                    <h2> No Users Found </h2>
                </Card>
            </div>
        );
    } else {
        return (
            <ul className="user-list">
                {props.items.map(user => {
                    return (
                        <UserItem
                            key={user.id}
                            id={user.id}
                            image={user.image}
                            name={user.name}
                            placeCount={user.places.length}
                        />
                    );
                })}
            </ul>
        );
    }
};

export default UserList;
