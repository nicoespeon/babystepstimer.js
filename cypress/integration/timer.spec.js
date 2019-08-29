/* globals describe, it, cy, expect */

describe('Timer', function () {
  it('Launches the timer', function () {
    visitPageAndStart()
    cy.wait(1000)

    cy.get('#timer')
      .find('#timeleft')
      .invoke('text')
      .should('match', /01:\d{2}/)
  })

  it('Resets the timeleft when it stops the timer', function () {
    visitPageAndStart()
    cy.wait(1000)
    cy.get('#stop').click()

    cy.get('#timer')
      .find('#timeleft')
      .should('have.text', '02:00')
  })

  it('Resets the timeleft when it clicks on reset', function () {
    visitPageAndStart()
    cy.wait(2000)

    let currentTimeLeft
    cy.get('#timer')
      .find('#timeleft')
      .invoke('text')
      .then(text => (currentTimeLeft = timeLeftToNumber(text)))

    cy.get('#reset').click()
    cy.get('#timer')
      .find('#timeleft')
      .invoke('text')
      .then(text => {
        const resetTimeLeft = timeLeftToNumber(text)
        expect(resetTimeLeft).to.be.greaterThan(currentTimeLeft)
      })
  })

  it('Makes background successful when it clicks on reset', function () {
    visitPageAndStart()
    cy.wait(1000)

    cy.get('#reset').click()
    cy.get('#timer').should('have.css', 'background-color', 'rgb(204, 255, 204)')
  })

  it('Makes background failed when it times out', function () {
    visitPageAndStart()
    cy.wait(120000)
    cy.get('#timer').should('have.css', 'background-color', 'rgb(255, 204, 204)')
  })
})

function visitPageAndStart () {
  return cy.visit('/').get('#start').click()
}

function timeLeftToNumber (timeLeft) {
  const [minutes, seconds] = timeLeft.split(':')
  return minutes * 100 + seconds
}
