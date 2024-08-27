const $site = "https://indydemo.cg28577.tmweb.ru"; // Переменная для основного сайта

export function login(email , password) {
        cy.visit($site+'/login')
        cy.get("#email").type(email);
        cy.get("#password").type(password);
        cy.get("#btn_login").click();
        }

export default {login};

// describe('1. Проверка перехода на сайт, на форму авторизации', () => {
//   it('passes', () => {
//         login('test@list.ru','123456789')
//     })    
// })