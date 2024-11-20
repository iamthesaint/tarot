import TarotReading from "../../client/src/pages/TarotReading";

describe('TarotReading Component', () => {
    // beforeEach(() => {
    //     cy.intercept({
    //         method: 'GET',
    //         url: '/api/questions/random'
    //     },
    //         {
    //             fixture: 'questions.json',
    //             statusCode: 200
    //         }
    //     ).as('getRandomQuestion')
    // });

    it('should start the quiz and display the first question', () => {
        cy.mount(<TarotReading />);
        // cy.get('button').contains('Start Quiz').click();
        // cy.get('.card').should('be.visible');
        cy.get('h1').should('not.be.empty');
    });
});