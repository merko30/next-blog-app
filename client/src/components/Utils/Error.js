import React from "react";

import { Message } from "semantic-ui-react";

const Error = ({ error }) => {
    return (
        <Message negative>
            <Message.Header>{error}</Message.Header>
        </Message>
    );
};

export default Error;
