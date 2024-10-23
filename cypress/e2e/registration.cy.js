import Env from "./command/Env.js"; // добавление (импорт) класса с быстрым набором логинов, паролей, ссылок
import Error from "./command/ErrorMessage.js"; // добавление (импорт) класса с сообщениями об ошибках

const random = Cypress._.random(0, 1e8); // Создание уникального id номера

/** Локаторы на странице регистрации для поиска*/
const $ = {
    site: "#site",
    register: "#register",
    name_label: "#name_label",
    email_label: "#email_label",
    password_label: "#password_label",
    password_confirmation_label: "#password_confirmation_label",
    name: "#name",
    email: "#email",
    password: "#password",
    password_confirmation: "#password_confirmation",
    svg: "svg",
    btn_registration: "#btn_registration",
    login: "#login",
    password_error: "#password_error",
    email_error: "#email_error",
};

/**
 * Тесты формы регистрации для сайта //
 * Команда в terminal для запуска Cypress: npx cypress open
 */

/** 1. Проверка открытия страницы */

describe("1. Переход на страницу регистрации", () => {
    it("passes", () => {
        cy.visit(Env.url.domain); // заходим на сайт
        cy.get($.register).click(); // ищем заголовок "регистрация" нажимаем на него.
    });
});

// /** 2. Проверка элементов страницы */

describe("2.1 Наличие всех текстов, заголовков", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name_label).children().should("contain", "Имя пользователя"); // Ищем элемент, проверяем что в нем в дочернем элементе содержится нужная фраза
        cy.get($.email_label).children().should("contain", "Эл. почта");
        cy.get($.password_label).children().should("contain", "Пароль");
        cy.get($.password_confirmation_label).children().should("contain", "Повторите пароль");
    });
});

describe("2.2 Наличие всех плейсхолдеров", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name)
            .then((el) => el[0].placeholder)
            .should("eq", "имя пользователя"); //ищем элемент, провреяем что в плейсхлодере записана верная фраза
        cy.get($.email)
            .then((el) => el[0].placeholder)
            .should("eq", "адрес эл. почты");
        cy.get($.password)
            .then((el) => el[0].placeholder)
            .should("eq", "пароль");
        cy.get($.password_confirmation)
            .then((el) => el[0].placeholder)
            .should("eq", "повторите пароль");
    });
});

describe("2.3 Наличие лого и верная ссылка на него", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.svg)
            .then((el) => el[0].attributes[1].value)
            .should("eq", Env.image.logo);
    });
});

describe('2.4 Наличие кнопка "Зарегестрироваться"', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.btn_registration)
            .then((el) => el[0].innerText)
            .should("eq", "ЗАРЕГИСТРИРОВАТЬСЯ"); //ищем элемент, проверяем что кнопка называется верно
    });
});

describe('2.5 Наличие ссылки "Уже зарегестрированы?" и верное перенаправление', () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.login)
            .then((el) => el[0].text)
            .should("eq", " Уже зарегистрированы? "); // Проверяем что у элемента прописан нужный текст
        cy.get($.login)
            .then((el) => el[0].href)
            .should("eq", Env.url.domain + Env.url.login); // Проверяем что у элемента прописана нужная ссылка
        cy.get($.login).click(); // Нажимаем кнопку "Уже зарегестрированы?"
        cy.url().should("eq", Env.url.domain + Env.url.login); // Проверяем что нас правильно перенаправило на страницу авторизации
    });
});

/** 3.1 Корректная регистрация (позитивные сценарии) */

describe("3.1.1 тест. Корректная регистрация. Пароль: цифры. Имя: латиница и цифры", () => {
    it("passes", () => {
        const $id = random + 1; // Уникальный номер id (несколько аккаунтов под одним id не создаются, потому что почта считается одинаковой)
        cy.visit(Env.url.domain + Env.url.register); // заходим на сайт. форма регистрации
        cy.get($.name).type(Env.name.correct); // находим поле имя и пишем в новое имя
        cy.get($.email).type(Env.emailReg.correct($id)); // находим поле ел. почты и пишем в новую почту
        cy.get($.password).type(Env.password.correct); // находим поле пароля и пишем в пароль
        cy.get($.password_confirmation).type(Env.password.correct); // находим поле подтверждение пароля и пишем проверку пароля
        cy.get($.btn_registration).click(); // находим кнопку регистрации. нажимаем на нее
        cy.url().should("eq", Env.url.domain + Env.url.main); // проверяем переход на главную страницу
    });
});

describe("3.1.2 Корректная регистрация. Пароль: цифры, латинские буквы и символ. Имя: латиница и цифры", () => {
    it("passes", () => {
        const $id = random + 2;
        cy.visit(Env.url.domain + Env.url.register); //
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.correct($id));
        cy.get($.password).type(Env.password.correctWithСharacter);
        cy.get($.password_confirmation).type(Env.password.correctWithСharacter);
        cy.get($.btn_registration).click();
        cy.url().should("eq", Env.url.domain + Env.url.main);
    });
});

describe("3.1.3 Корректная регистрация. Пароль: цифры, латинские буквы и символ. Имя: на русском и цифры", () => {
    it("passes", () => {
        const $id = random + 3;
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correctRus);
        cy.get($.email).type(Env.emailReg.correct($id));
        cy.get($.password).type(Env.password.correctWithСharacter);
        cy.get($.password_confirmation).type(Env.password.correctWithСharacter);
        cy.get($.btn_registration).click();
        cy.url().should("eq", Env.url.domain + Env.url.main);
    });
});

/** 3.2 Не корректная регистрация (негативные сценарии) */

describe("3.2.1 Не корректная регистрация. Пустой email", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.general.empty);
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.2 Не корректная регистрация. Не корретный email (отсутствует знак @)", () => {
    it("passes", () => {
        const $id = random + 4;
        const emailAndId = Env.emailReg.withoutAt($id);
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.withoutAt($id));
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutAt(emailAndId));
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.4 Не корретная авторизация. Не корретный email (отсутствует домен, точка и знак @)", () => {
    it("passes", () => {
        const $id = random + 4;
        const emailAndId = Env.emailReg.withoutDomainAndAt($id);
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.withoutDomainAndAt($id));
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutDomainAndAt(emailAndId));
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.5 Не корректная регистрация. Не корретный email (текст после @)", () => {
    it("passes", () => {
        const $id = random + 4;
        const emailAndId = Env.emailReg.withoutDomain($id);
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.withoutDomain($id));
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutDomain(emailAndId));
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.6 Не корректная регистрация. Не корретный email (запятая вместо точки)", () => {
    it("passes", () => {
        const $id = random + 4;
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.email.withoutDot);
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.email)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.email.withoutDot);
        cy.get($.email)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.7 Не корректная регистрация. Повторный email", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.email.correct);
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.wait(1000);
        cy.get($.email_error)
            .then((el) => el[0].textContent)
            .should("eq", Error.email.alreadyTaken);
    });
});

describe("3.2.8 Не корректная регистрация. Пустой name ", () => {
    it("passes", () => {
        const $id = random + 4;
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.email).type(Env.emailReg.correct($id));
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.name)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.general.empty);
        cy.get($.name)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.9 Не корректная регистрация. Пустой password ", () => {
    it("passes", () => {
        const $id = random + 4;
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.correct($id));
        cy.get($.password_confirmation).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.password)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.general.empty);
        cy.get($.password)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.10 Не корректная регистрация. Пустой Confirm Password ", () => {
    it("passes", () => {
        const $id = random + 4;
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.correct($id));
        cy.get($.password).type(Env.password.correct);
        cy.get($.btn_registration).click();
        cy.get($.password_confirmation)
            .then((el) => el[0].validationMessage)
            .should("eq", Error.general.empty);
        cy.get($.password_confirmation)
            .then((el) => el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.11 Не корректная регистрация. Короткий пароль", () => {
    it("passes", () => {
        const $id = random + 4;
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.correct($id));
        cy.get($.password).type(Env.password.short);
        cy.get($.password_confirmation).type(Env.password.short);
        cy.get($.btn_registration).click();
        cy.wait(1000);
        cy.get($.password_error)
            .then((el) => el[0].textContent)
            .should("eq", Error.password.more8);
    });
});

describe("3.2.12 Не корректная регистрация. Не верный проверочный пароль", () => {
    it("passes", () => {А
        const $id = random + 4;
        cy.visit(Env.url.domain + Env.url.register);
        cy.get($.name).type(Env.name.correct);
        cy.get($.email).type(Env.emailReg.correct($id));
        cy.get($.password).type(Env.password.correct);
        cy.get($.password_confirmation).type(Env.password.incorrect);
        cy.get($.btn_registration).click();
        cy.wait(1000);
        cy.get($.password_error)
            .then((el) => el[0].textContent)
            .should("eq", Error.password.confirmation);
    });
});
