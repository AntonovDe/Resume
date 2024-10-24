import * as auth from "./command/auth.js"; // добавление (импорт) последовательности действий для авторизации пользователя
import Env from "./command/Env.js"; // добавление (импорт) класса с быстрым набором логинов, паролей, ссылок
import Error from "./command/ErrorMessage.js"; // добавление (импорт) класса с сообщениями об ошибках

/** Локаторы на странице авторизации для поиска*/
const $ = {
    login: "#login",
    btn_login: "#btn_login",
    email_label: "#email_label",
    email: "#email",
    email_error: "#email_error",
    password_label: "#password_label",
    password: "#password",
    remember_label: "#remember_label",
    remember: "#remember",
    login_forget: "#login_forget",
    registration: "#registration",
    svg: "svg"
};

/**
 * Тесты формы авторизации для сайта //
 * Команда в terminal для запуска Cypress: npx cypress open
 */

/** 1. Проверка открытия страницы */

describe("1. Проверка перехода на сайт, на форму авторизации", () => {
    it("passes", () => {
        cy.visit(Env.url.domain);
        cy.get($.login).click();
        cy.url().should("eq", Env.url.domain + Env.url.login);
    });
});

/** 2. Проверка элементов страницы */

describe("2.1 Наличие лого и верная ссылка на него", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.svg)
            .then((el) => el[0].attributes[1].value)
            .should("eq", Env.image.logo);
    });
});

describe("2.2 Наличие всех текстов, заголовков", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email_label)
            .then((el) => el[0].innerText)
            .should("eq", "Эл. почта");
        cy.get($.password_label)
            .then((el) => el[0].innerText)
            .should("eq", "Пароль");
    });
});

describe("2.3 Наличие всех плейсхолдеров", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email)
            .then((el) => el[0].placeholder)
            .should("eq", "адрес эл. почты");
        cy.get($.password)
            .then((el) => el[0].placeholder)
            .should("eq", "пароль");
    });
});

describe('2.4 Наличие чекбокса "Запомнить меня"', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.remember)
            .then((el) => el[0]._modelValue)
            .should("be.false");
        cy.get($.remember_label)
            .then((el) => el[0].innerText)
            .should("eq", "Запомнить меня");
    });
});

describe('2.5 Наличие ссылки "Забыли свой пароль?" и верное перенаправление', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.login_forget)
            .then((el) => el[0].innerText)
            .should("eq", "Забыли свой пароль?");
        cy.get($.login_forget)
            .then((el) => el[0].href)
            .should("eq", Env.url.domain + Env.url.forgot);
        cy.get($.login_forget).click();
        cy.url().should("eq", Env.url.domain + Env.url.forgot);
    });
});

describe('2.6 Наличие ссылки "Не зарегестрированы?" и верное перенаправление', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.registration)
            .then((el) => el[0].innerText)
            .should("eq", "Не зарегистрированы?");
        cy.get($.registration)
            .then((el) => el[0].href)
            .should("eq", Env.url.domain + Env.url.register);
        cy.get($.registration).click();
        cy.url().should("eq", Env.url.domain + Env.url.register);
    });
});

describe('2.7 Наличие кнопки "Войти"', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.btn_login)
            .then((el) => el[0].innerText)
            .should("eq", "ВОЙТИ");
    });
});

/** 3.1 Корректная авторизация (позитивный сценарий) */

describe("3.1 тест. Корректная авторизация. Пароль: цифры. Имя: латиница и цифры", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
    });
});

/** 3.2 Некорректные авторизации (негативные сценарии) */

describe("3.2.1 тест. Не корретная авторизация. Email: пустой. Пароль: корретный", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_login).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.general.empty);
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.2 Не корретная авторизация. Не корретный email (отсутствует знак @)", () => {
    it("passes", () => {
        const emailAndId = Env.email.withoutAt;
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.withoutAt);
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_login).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutAt(emailAndId));
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.3 Не корретная авторизация. Не корретный email (отсутствует домен, точка и знак @)", () => {
    it("passes", () => {
        const emailAndId = Env.email.withoutDomainAndAt;
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.withoutDomainAndAt);
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_login).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutDomainAndAt(emailAndId));
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.4 Не корретная авторизация. Не корретный email (текст после @)", () => {
    it("passes", () => {
        const emailAndId = Env.email.withoutDomain;
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.withoutDomain);
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_login).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutDomain(emailAndId));
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.5 Не корретная авторизация. Не корретный email (запятая вместо точки)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.withoutDot);
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_login).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutDot);
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.6 Не корретная авторизация. Email: Не зарегестрированный. Пароль: корректный", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.unregistrated);
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_login).click();
        cy.get($.email_error)
            .then((el) => el[0].children[0])
            .invoke("text")
            .should("eq", Error.email.unregistrated);
    });
});

describe("3.2.7 Не корретная авторизация. Email: корректный. Пароль: не корректный (короткий. 6 символов)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.correct);
        cy.get($.password).type(Env.password.short);
        cy.get($.btn_login).click();
        cy.wait(2000);
        cy.get($.email_error)
            .then((el) => el[0].textContent)
            .should("eq", Error.password.short);
    });
});

describe("3.2.8 Не корретная авторизация. Email: корректный. Пароль: не корректный (не верный пароль)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.correct);
        cy.get($.password).type(Env.password.incorrect);
        cy.get($.btn_login).click();
        cy.wait(2000);
        cy.get($.email_error)
            .then((el) => el[0].textContent)
            .should("eq", Error.password.incorrect);
    });
});

/** 4. Открытие страницы пользователями с разными правами*/

describe("4. Открытие страницы авторизации авторизованным пользователем", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.email).type(Env.email.correct);
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_login).click();
        cy.url().should("eq", Env.url.domain + Env.url.main);
        cy.visit(Env.url.domain + Env.url.login);
        cy.url().should("eq", Env.url.domain + Env.url.main);
    });
});

/** 5. Проверка cookies*/

describe("5.1 Проверка создания Cookies", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.getCookie(Env.cookies.token).should("exist");
        cy.getCookie(Env.cookies.session).should("exist");
    });
});

describe("5.2 Cookies", () => {
    it("passes", () => {
        let token;
        let newToken;

        cy.visit(Env.url.domain + Env.url.login);

        cy.getCookie(Env.cookies.token)
            .should("exist")
            .then((cookie) => {
                token = cookie.value;
                cy.log(token);
            });

        auth.login(Env.email.correct, Env.password.correct);

        cy.getCookie(Env.cookies.token)
            .should("exist")
            .then((cookie) => {
                newToken = cookie.value;
                cy.log(newToken);
                cy.wrap(newToken).should("not.equal", token);
            });
    });
});
