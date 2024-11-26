import React from 'react';
import ReadingModal from '../../client/src/components/ReadingModal';

describe("<ReadingModal />", () => {
  it("renders", () => {
    const props = {
      isOpen: true,
      onClose: () => {},  
      onSave: () => {}, 
      children: <div>Test Modal</div>
    };

    cy.mount(<ReadingModal {...props} />);
    cy.get('div').contains('Test Modal');
  });
});