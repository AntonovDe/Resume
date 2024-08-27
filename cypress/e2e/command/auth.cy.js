/**
 * Функция для ввода данных для login
 * @param {string} site url сайта
 * @param {string} email email для входа
 * @param {string} password пароль для входа
 */
exports.login = (site, email, password) => {
    cy.visit(site + "/login");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#btn_login").click();
};
