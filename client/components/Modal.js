import React from 'camunda-modeler-plugin-helpers/react';

import { Modal } from 'camunda-modeler-plugin-helpers/components';

const Title = Modal.Title || (({ children }) => <h2>{children}</h2>);
const Body = Modal.Body || (({ children }) => <div>{children}</div>);
const Footer = Modal.Footer || (({ children }) => <div>{children}</div>);

export default ({ title, children, onClose }) => (
    <Modal onClose= { onClose }>
        <Title>{ title } </Title>
        <Body> { children } </Body>
        <Footer>
          <button onClick={ onClose }>Close</button>
        </Footer>
    </Modal>
);