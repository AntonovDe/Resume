import { login } from "./command/auth.cy.js"; // добавление (импорт) последовательности действий для авторизации пользователя

// Тесты формы регистрации для сайта //indydemo.cg28577.tmweb.ru
// Команда в terminal для запуска Cypress: npx cypress open

/** Переменная для основного сайта */
const $site = "https://indydemo.cg28577.tmweb.ru";

// _________________________1_________________________________

describe("1. Проверка перехода на сайт, на форму авторизации", () => {
    it("passes", () => {
        cy.visit($site);
        cy.get("#login").click();
        cy.url().should("eq", $site + "/login");
    });
});

// _________________________2_________________________________

describe("2.1 Наличие лого и верная ссылка на него", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("svg")
            .then(($el) => $el[0].attributes[1].value)
            .should("eq", "http://www.w3.org/2000/svg");
    });
});

describe("2.2 Наличие всех текстов, заголовков", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#email_label")
            .then(($el) => $el[0].innerText)
            .should("eq", "Эл. почта");
        cy.get("#password_label").children().should("contain", "Пароль");
    });
});

describe("2.3 Наличие всех плейсхолдеров", () => {
    it("passes", () => {
        cy.visit($site + "/login");
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
        cy.visit($site + "/login");
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
        cy.visit($site + "/login");
        cy.get("#login_forget")
            .then(($el) => $el[0].innerText)
            .should("eq", "Забыли свой пароль?");
        cy.get("#login_forget")
            .then(($el) => $el[0].href)
            .should("eq", $site + "/forgot-password");
        cy.get("#login_forget").click();
        cy.url().should("eq", $site + "/forgot-password");
    });
});

describe('2.6 Наличие ссылки "Не зарегестрированы?" и верное перенаправление', () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#registration")
            .then(($el) => $el[0].innerText)
            .should("eq", "Не зарегистрированы?"); // Проверяем что у элемента прописан нужный текст
        cy.get("#registration")
            .then(($el) => $el[0].href)
            .should("eq", $site + "/register"); // Проверяем что у элемента прописана нужная ссылка
        cy.get("#registration").click(); // Нажимаем кнопку "Уже зарегестрированы?"
        cy.url().should("eq", $site + "/register"); // Проверяем что нас правильно перенаправило на страницу авторизации
    });
});

describe('2.7 Наличие кнопки "Войти"', () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#btn_login")
            .then(($el) => $el[0].innerText)
            .should("eq", "ВОЙТИ"); //ищем элемент, проверяем что кнопка называется верно
    });
});

// _________________________3.1_________________________________

describe("3.1 тест. Корректная авторизация. Пароль: цифры. Имя: латиница и цифры", () => {
    it("passes", () => {
        login($site, "test@list.ru", "123456789");
        cy.url().should("eq", $site + "/dashboard");
    });
});

// _________________________3.2_________________________________

describe("3.2.1 тест. Не корретная авторизация. Email: пустой. Пароль: корретный", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#password").type("123456789");
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
        cy.visit($site + "/login");
        cy.get("#email").type("notcorrectlist.ru");
        cy.get("#password").type("123456789");
        cy.get("#btn_login").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should(
                "eq",
                'Адрес электронной почты должен содержать символ "@". В адресе "notcorrectlist.ru" отсутствует символ "@".'
            );
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.3 Не корретная авторизация. Не корретный email (текст после @)", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#email").type("notcorrect@");
        cy.get("#password").type("123456789");
        cy.get("#btn_login").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", 'Введите часть адреса после символа "@". Адрес "notcorrect@" неполный.');
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.4 Не корретная авторизация. Не корретный email (запятая вместо точки)", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#email").type("notcorrect@list,ru");
        cy.get("#password").type("123456789");
        cy.get("#btn_login").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", 'Часть адреса после символа "@" не должна содержать символ ",".');
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.5 Не корретная авторизация. Email: не корретный. Пароль: корректный", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#email").type("notcorrect@list.ru");
        cy.get("#password").type("123456789");
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
        cy.visit($site + "/login");
        cy.get("#email").type("notcorrect@list.ru");
        cy.get("#password").type("123456");
        cy.get("#btn_login").click();
        cy.get("#email_error")
            .then(($el) => $el[0].children[0])
            .invoke("text")
            .should("eq", "These credentials do not match our records.");
    });
});

describe("3.2.7 Не корретная авторизация. Email: корректный. Пароль: не корректный (не верный пароль)", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#email").type("notcorrect@list.ru");
        cy.get("#password").type("12345678999");
        cy.get("#btn_login").click();
        cy.get("#email_error")
            .then(($el) => $el[0].children[0])
            .invoke("text")
            .should("eq", "These credentials do not match our records.");
    });
});

// _________________________4_________________________________

describe("4. Открытие страницы авторизации авторизованным пользователем", () => {
    it("passes", () => {
        cy.visit($site + "/login");
        cy.get("#email").type("test@list.ru");
        cy.get("#password").type("123456789");
        cy.get("#btn_login").click();
        cy.url().should("eq", $site + "/dashboard");
        cy.visit($site + "/login");
        cy.url().should("eq", $site + "/dashboard");
    });
});

// _________________________5_________________________________

// константа не меняется, остается значение 0, которое и отображается в log
describe("5 Cookies", () => {
    it("passes", () => {
        let token;
        let newToken;

        cy.visit($site + "/login");

        cy.getCookie("XSRF-TOKEN")
            .should("exist")
            .then((cookie) => {
                token = cookie.value;
                cy.log(token);
            });

        cy.get("#email").type("test@list.ru");
        cy.get("#password").type("123456789");
        cy.get("#btn_login").click();
        cy.url().should("eq", $site + "/dashboard");

        cy.getCookie("XSRF-TOKEN")
            .should("exist")
            .then((cookie) => {
                newToken = cookie.value;
                cy.log(newToken);
                cy.wrap(newToken).should("not.equal", token);
            });
    });
});