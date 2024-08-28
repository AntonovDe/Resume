import Env from "./Env.js";

/**
 * Функция ввода данных для login
 * @param {string} email email для входа
 * @param {string} password пароль для входа
 */
exports.login = (email, password) => {
    cy.visit(Env.url.domain + Env.url.login);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#btn_login").click();
    cy.url().should("eq", Env.url.domain + Env.url.main);
};

/**
 * Функция регистрации нового пользователя для сайта
 * @param {string} name имя пользователя
 * @param {string} email email для регистрации
 * @param {string} password пароль для регистрации
 * @param {string} password_confirmation повторный пароль для регистрации
 */
exports.registration = (name, email, password, password_confirmation) => {
    cy.visit(Env.url.domain + Env.url.register);
    cy.get("#name").type(name);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#password_confirmation").type(password_confirmation);
    cy.get("#btn_registration").click();
    cy.url().should("eq", Env.url.domain + Env.url.main);
};

