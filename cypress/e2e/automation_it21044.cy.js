context('Form Submission Check', function() {
    const formElements = {
      '#firstName': 'Aleksis',
      '#lastName': 'Kais',
      '#userEmail': 'aleksis.kalis@va.lv',
      '#userPhoneNumber': '839483494',
      '#subjectsInput': 'Economics{enter}',
      'div#state': 'NCR{enter}',
      'div#city': 'Delhi{enter}',
      '#submit': ''
    };
  
    const dateOfBirth = {
      date: '28',
      month: 'February',
      year: '1930'
    };
  
    beforeEach(function() {
      // Navigē uz mājaslapu
      cy.visit('https://demoqa.com/automation-practice-form');
    });
  
    specify('Complete and validate the form', function() {
      // Aizpilda visu nepieciešamo informāciju text laukumos
      for (let key in formElements) {
        if (formElements[key]) {
          cy.get(key).type(formElements[key]);
        }
      }
  
      cy.get('textarea#currentAddress').type("Unity State, Santa Maria, Bikses street 21");
      cy.get('label.custom-control-label').contains('Male').click();
  
      // Nokonfigurē dzimšanasdienas kalendāru
      cy.get('#dateOfBirthInput').click();
  
      // Pārliek uz pareizo mēnesi
      cy.get('.react-datepicker__month-select').select(dateOfBirth.month);
    
      // Pārliek uz pareizo gadu
      cy.get('.react-datepicker__year-select').select(dateOfBirth.year);
    
      // Izvēlas pareizo dienu
      cy.get('div.react-datepicker__week div').contains(dateOfBirth.date).click();
  
      // Uzliek hobijus uz mūziku
      cy.get('label[for="hobbies-checkbox-3"]').click();
  
      // Augšuplādē bildi
      cy.get('#uploadPicture').click().selectFile('./cypress/fixtures/files/default_picture1.jpg');
  
      // Štats uz NCR
      if (formElements['div#state']) {
        cy.get('div#state').click().type(formElements['div#state']);
      }
  
      // Uzliek uz Deli pilsētu
      if (formElements['div#city']) {
        cy.get('div#city').click().type(formElements['div#city']);
      }
  
      // Iesniedz
      cy.get('#submit').click();
  
      // Validē datus
      cy.get('#example-modal-sizes-title-lg').should('be.visible');
      cy.get('table').contains('td', 'Student Name').next().should('contain.text', 'Aleksis Kalis');
      cy.get('table').contains('td', 'Student Email').next().should('contain.text', 'aleksis.kalis@va.lv');
      cy.get('table').contains('td', 'Gender').next().should('contain.text', 'male');
      cy.get('table').contains('td', 'Mobile').next().should('contain.text', '839483494');
      cy.get('table').contains('td', 'Date of Birth').next().should('contain.text', '1930 February 28');
      cy.get('table').contains('td', 'Subjects').next().should('contain.text', 'Economics');
      cy.get('table').contains('td', 'Hobbies').next().should('contain.text', 'Music');
      cy.get('table').contains('td', 'Picture').next().should('contain.text', 'default_picture1.jpg');
      cy.get('table').contains('td', 'Address').next().should('contain.text', 'Unity State, Santa Maria, Bikses street 21');
      cy.get('table').contains('td', 'State and City').next().should('contain.text', 'NCR Delhi');
    });
  });
  