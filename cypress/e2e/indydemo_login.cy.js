import { login } from "./command/auth.js"; // добавление (импорт) последовательности действий для авторизации пользователя
import Env from "./command/Env.js";

/**
 * Тесты формы регистрации для сайта //indydemo.cg28577.tmweb.ru
 * Команда в terminal для запуска Cypress: npx cypress open
 */

/** 1. Проверка открытия страницы */

describe("1. Проверка перехода на сайт, на форму авторизации", () => {
    it("passes", () => {
        cy.visit(Env.url.domain);
        cy.get("#login").click();
        cy.url().should("eq", Env.url.domain + Env.url.login);
    });
});

/** 2. Проверка элементов страницы */

describe("2.1 Наличие лого и верная ссылка на него", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("svg").then(($el) => $el[0].attributes[1].value);
    });
});

describe("2.2 Наличие всех текстов, заголовков", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email_label")
            .then(($el) => $el[0].innerText)
            .should("eq", "Эл. почта");
        cy.get("#password_label").children().should("contain", "Пароль");
    });
});

describe("2.3 Наличие всех плейсхолдеров", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email")
            .then(($el) => $el[0].placeholder)
            .should("eq", "адрес эл. почты");
        cy.get("#password")
            .then(($el) => $el[0].placeholder)
            .should("eq", "пароль");
    });
});

describe('2.4 Наличие чекбокса "Запомнить меня"', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#remember")
            .then(($el) => $el[0]._modelValue)
            .should("be.false");
        cy.get("#remember_label")
            .then(($el) => $el[0].innerText)
            .should("eq", "Запомнить меня");
    });
});

describe('2.5 Наличие ссылки "Забыли свой пароль?" и верное перенаправление', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#login_forget")
            .then(($el) => $el[0].innerText)
            .should("eq", "Забыли свой пароль?");
        cy.get("#login_forget")
            .then(($el) => $el[0].href)
            .should("eq", Env.url.domain + "/forgot-password");
        cy.get("#login_forget").click();
        cy.url().should("eq", Env.url.domain + "/forgot-password");
    });
});

describe('2.6 Наличие ссылки "Не зарегестрированы?" и верное перенаправление', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#registration")
            .then(($el) => $el[0].innerText)
            .should("eq", "Не зарегистрированы?"); // Проверяем что у элемента прописан нужный текст
        cy.get("#registration")
            .then(($el) => $el[0].href)
            .should("eq", Env.url.domain + "/register"); // Проверяем что у элемента прописана нужная ссылка
        cy.get("#registration").click(); // Нажимаем кнопку "Уже зарегестрированы?"
        cy.url().should("eq", Env.url.domain + "/register"); // Проверяем что нас правильно перенаправило на страницу авторизации
    });
});

describe('2.7 Наличие кнопки "Войти"', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#btn_login")
            .then(($el) => $el[0].innerText)
            .should("eq", "ВОЙТИ"); //ищем элемент, проверяем что кнопка называется верно
    });
});

/** 3. Авторизация*/

/** 3.1 Корректная авторизация (позитивный сценарий) */

describe("3.1 тест. Корректная авторизация. Пароль: цифры. Имя: латиница и цифры", () => {
    it("passes", () => {
        login(Env.url.domain, Env.email, Env.password);
        cy.url().should("eq", Env.url.domain + "/dashboard");
    });
});

/** 3.2 Некорректные авторизации (негативные сценарии) */

describe("3.2.1 тест. Не корретная авторизация. Email: пустой. Пароль: корретный", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#password").type(Env.password);
        cy.get("#btn_login").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", "Заполните это поле.");
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.2 Не корретная авторизация. Не корретный email (отсутствует Знак @)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email").type(Env.withoutAtEmail);
        cy.get("#password").type(Env.password);
        cy.get("#btn_login").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should(
                "eq",
                `Адрес электронной почты должен содержать символ "@". В адресе "${Env.withoutAtEmail}" отсутствует символ "@".`
            );
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.3 Не корретная авторизация. Не корретный email (текст после @)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email").type(Env.withoutDomainEmail);
        cy.get("#password").type(Env.password);
        cy.get("#btn_login").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", `Введите часть адреса после символа "@". Адрес "${Env.withoutDomainEmail}" неполный.`);
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.4 Не корретная авторизация. Не корретный email (запятая вместо точки)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email").type(Env.withoutDotEmail);
        cy.get("#password").type(Env.password);
        cy.get("#btn_login").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", 'Часть адреса после символа "@" не должна содержать символ ",".');
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.5 Не корретная авторизация. Email: Не зарегестрированный. Пароль: корректный", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email").type(Env.unregisteredEmail);
        cy.get("#password").type(Env.password);
        cy.get("#btn_login").click();
        // cy.get("#email_error").then(($el) => $el[0].children[0].innerText).should('eq', 'These credentials do not match our records.') // не верная херня
        cy.get("#email_error")
            .then(($el) => $el[0].children[0])
            .invoke("text")
            .should("eq", "These credentials do not match our records."); // работает
    });
});

describe("3.2.6 Не корретная авторизация. Email: корректный. Пароль: не корректный (короткий. 6 символов)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email").type(Env.email);
        cy.get("#password").type(Env.shortPassword);
        cy.get("#btn_login").click();
        cy.get("#email_error")
            .then(($el) => $el[0].children[0])
            .invoke("text")
            .should("eq", "These credentials do not match our records.");
    });
});

describe("3.2.7 Не корретная авторизация. Email: корректный. Пароль: не корректный (не верный пароль)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email").type(Env.email);
        cy.get("#password").type(Env.incorrectPassword);
        cy.get("#btn_login").click();
        cy.get("#email_error")
            .then(($el) => $el[0].children[0])
            .invoke("text")
            .should("eq", "These credentials do not match our records.");
    });
});

/** 4. Открытие страницы пользователями с разными правами*/

describe("4. Открытие страницы авторизации авторизованным пользователем", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.login);
        cy.get("#email").type(Env.email);
        cy.get("#password").type(Env.password);
        cy.get("#btn_login").click();
        cy.url().should("eq", Env.url.domain + "/dashboard");
        cy.visit(Env.url.domain + Env.url.login);
        cy.url().should("eq", Env.url.domain + "/dashboard");
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

        cy.get("#email").type(Env.email);
        cy.get("#password").type(Env.password);
        cy.get("#btn_login").click();
        cy.url().should("eq", Env.url.domain + "/dashboard");

        cy.getCookie(Env.cookies.token)
            .should("exist")
            .then((cookie) => {
                newToken = cookie.value;
                cy.log(newToken);
                cy.wrap(newToken).should("not.equal", token);
            });
    });
});
