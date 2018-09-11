import React from "react";

import { Message } from "semantic-ui-react";

const Success = ({ message }) => {
    return (
        <Message success>
            <Message.Header>{message}</Message.Header>
        </Message>
    );
};

export default Success;
