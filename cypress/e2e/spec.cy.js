describe('template spec', () => {
  it('passes', () => {

    let msg = 'mon message';
    let mdp = 'mdp';
    cy.visit('http://localhost:8080/');

    //on ecrit le message et mdp
    cy.get('#message').type(msg);
    cy.get('#passwordinput').type(mdp);
    
    //click sur envoyer
    cy.contains('Envoyer').click();

    //lorsque la nouvelle page apparait avec l url
    cy.get('#pasteurl').invoke('attr', 'href').then((pasteUrl) => {
      cy.reload(true);
      cy.visit(pasteUrl);

      cy.get('input#passworddecrypt').type(mdp); // on ecrit le mdp
      cy.contains('Déchiffrer').click();

      // on compare le msg
      cy.get('#prettyprint').should('contains.text', msg); 

    });
  })
})