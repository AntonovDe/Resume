

//test
// // 1 тест. Регистрация
// describe('1', () => {
//   it('passes', () => {
//     cy.visit('https://indydemo.cg28577.tmweb.ru/') // заходим на сайт
//     cy.get('nav').should('contain', 'Register').contains('Register').click() // ищем заголовок "регистрация" нажимаем на него.
//   })
// })

// const email_id = 69

// // 2.1 тест. Корректная регистрация нового пользователя. Пароль только цифры. Имя на латинице и цифры
// describe('2.1', () => {
//   it('passes', () => {
//     cy.visit('https://indydemo.cg28577.tmweb.ru/register') // заходим на сайт. форма регистрации
//     cy.get('#name').type('Denis'+email_id)

//     cy.get('#email').type('alatus'+email_id+'@list.ru')
//     cy.get('#password').type('123456789')
//     cy.get('#password_confirmation').type('123456789')
//     cy.get('form div:nth-child(5) button').click()
//     cy.url().should('eq', 'https://indydemo.cg28577.tmweb.ru/dashboard') // проверяем переход на главную страницу
//   })
// })

// const email_id2=email_id+1

// // 2.2 тест. Корректная регистрация нового пользователя. Пароль цифры, латинские буквы и символ
// describe('2.2', () => {
//   it('passes', () => {
//     cy.visit('https://indydemo.cg28577.tmweb.ru/register') // заходим на сайт. форма регистрации
//     cy.get('#name').type('Denis'+email_id2)
//     cy.get('#email').type('alatus'+email_id2+'@list.ru')
//     cy.get('#password').type('123456as\')
//     cy.get('#password_confirmation').type('123456as\')
//     cy.get('form div:nth-child(5) button').click()
//     cy.url().should('eq', 'https://indydemo.cg28577.tmweb.ru/dashboard') // проверяем переход на главную страницу
//   })
// })

// const email_id3=email_id2+1

// // 2.3 тест. Корректная регистрация нового пользователя. Имя на русском и цифры. Пароль цифры, латинские буквы и символ
// describe('2.3', () => {
//   it('passes', () => {
//     cy.visit('https://indydemo.cg28577.tmweb.ru/register') // заходим на сайт. форма регистрации
//     cy.get('#name').type('Денис'+email_id3)
//     cy.get('#email').type('alatus'+email_id3+'@list.ru')
//     cy.get('#password').type('123456as\')
//     cy.get('#password_confirmation').type('123456as\')
//     cy.get('form div:nth-child(5) button').click()
//     cy.url().should('eq', 'https://indydemo.cg28577.tmweb.ru/dashboard') // проверяем переход на главную страницу
//   })
// })

// 3.1 тест. Не корректная регистрация нового пользователя. Пустой email
describe('3.1', () => {
  it('passes', () => {
    cy.visit('https://indydemo.cg28577.tmweb.ru/register') // заходим на сайт. форма регистрации
    cy.get('#name').type('Denis11')

    cy.get('#password').type('123456789')
    cy.get('#password_confirmation').type('123456789')
    cy.get('form div:nth-child(5) button').click()
    // cy.get('#email_error').should('eq', 'none') // ищу по id ошибку почты. Проверяю что стиль этой ошибки= нt показываться. (по идее нужно наоборот, что бы показывался. Писал это что бы искать остальные ошибки, которые в это время не показываются, но не находит)
    cy.get('#email_error').should('not.contain()', 'none') // ищу по id ошибку почты. Проверяю что она не равно нулю. Снов хренушки

  })
})
