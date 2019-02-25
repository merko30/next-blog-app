import React from "react";

import { Message, Container } from "semantic-ui-react";

const Error = ({ error }) => {
    return (
        <Container style={{ margin: '0.5em' }}>
            <Message negative>
                <Message.Header data-testid="error-message">{error}</Message.Header>
            </Message>
        </Container>
    );
};

export default Error;
