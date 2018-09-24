import React from "react";

import { Message, Container } from "semantic-ui-react";

const Error = ({ error }) => {
    return (
        <Container>
            <Message negative>
                <Message.Header>{error}</Message.Header>
            </Message>
        </Container>
    );
};

export default Error;
