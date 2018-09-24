import React from "react";

import { Message, Container } from "semantic-ui-react";

const Success = ({ message }) => {
    return (
        <Container>
            <Message success>
                <Message.Header>{message}</Message.Header>
            </Message>
        </Container>
    );
};

export default Success;
