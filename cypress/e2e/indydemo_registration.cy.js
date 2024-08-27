// Тесты формы регистрации для сайта //indydemo.cg28577.tmweb.ru
// Команда в terminal для запуска Cypress: npx cypress open

const $site = "https://indydemo.cg28577.tmweb.ru"; // Переменная для основного сайта

// _________________________1_________________________________

describe("1. Переход на страницу регистрации", () => {
    it("passes", () => {
        cy.visit($site); // заходим на сайт
        cy.get("#register").click(); // ищем заголовок "регистрация" нажимаем на него.
    });
});

// _________________________2_________________________________

describe("2.1 Наличие всех текстов, заголовков", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name_label").children().should("contain", "Имя пользователя"); // Ищем элемент, проверяем что в нем в дочернем элементе содержится нужная фраза
        cy.get("#email_label").children().should("contain", "Эл. почта");
        cy.get("#password_label").children().should("contain", "Пароль");
        cy.get("#password_confirmation_label").children().should("contain", "Повторите пароль");
    });
});

describe("2.2 Наличие всех плейсхолдеров", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name")
            .then(($el) => $el[0].placeholder)
            .should("eq", "имя пользователя"); //ищем элемент, провреяем что в плейсхлодере записана верная фраза
        cy.get("#email")
            .then(($el) => $el[0].placeholder)
            .should("eq", "адрес эл. почты");
        cy.get("#password")
            .then(($el) => $el[0].placeholder)
            .should("eq", "пароль");
        cy.get("#password_confirmation")
            .then(($el) => $el[0].placeholder)
            .should("eq", "повторите пароль");
    });
});

describe("2.3 Наличие лого и верная ссылка на него", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("svg")
            .then(($el) => $el[0].attributes[1].value)
            .should("eq", "http://www.w3.org/2000/svg");
    });
});

describe('2.4 Наличие кнопка "Зарегестрироваться"', () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#btn_registration")
            .then(($el) => $el[0].innerText)
            .should("eq", "ЗАРЕГИСТРИРОВАТЬСЯ"); //ищем элемент, проверяем что кнопка называется верно
    });
});

describe('2.5 Наличие ссылки "Уже зарегестрированы?" и верное перенаправление', () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#login")
            .then(($el) => $el[0].text)
            .should("eq", " Уже зарегистрированы? "); // Проверяем что у элемента прописан нужный текст
        cy.get("#login")
            .then(($el) => $el[0].href)
            .should("eq", $site + "/login"); // Проверяем что у элемента прописана нужная ссылка
        cy.get("#login").click(); // Нажимаем кнопку "Уже зарегестрированы?"
        cy.url().should("eq", $site + "/login"); // Проверяем что нас правильно перенаправило на страницу авторизации
    });
});

// _________________________3.1_________________________________

const $unicid = () => Cypress._.random(0, 1e4); // Создание уникального номера id
const $id = $unicid(); // Уникальный номер id (несколько аккаунтов под одним id не создаются, потому что почта считается одинаковой)

describe("3.1.1 тест. Корректная регистрация. Пароль: цифры. Имя: латиница и цифры", () => {
    it("passes", () => {
        cy.visit($site + "/register"); // заходим на сайт. форма регистрации
        cy.get("#name").type("Denis" + $id); // находим поле имя и пишем в новое имя

        cy.get("#email").type("alatus" + $id + "@list.ru"); // находим поле ел. почты и пишем в новую почту
        cy.get("#password").type("123456789"); // находим поле пароля и пишем в пароль
        cy.get("#password_confirmation").type("123456789"); // находим поле подтверждение пароля и пишем проверку пароля
        cy.get("#btn_registration").click(); // находим кнопку регистрации. нажимаем на нее
        cy.url().should("eq", $site + "/dashboard"); // проверяем переход на главную страницу
    });
});

const $unicid2 = () => Cypress._.random(0, 1e4);
const $id2 = $unicid2();

describe("3.1.2 Корректная регистрация. Пароль: цифры, латинские буквы и символ. Имя: латиница и цифры", () => {
    it("passes", () => {
        cy.visit($site + "/register"); //
        cy.get("#name").type("Denis" + $id2);
        cy.get("#email").type("alatus" + $id2 + "@list.ru");
        cy.get("#password").type("123456asd/");
        cy.get("#password_confirmation").type("123456asd/");
        cy.get("#btn_registration").click();
        cy.url().should("eq", $site + "/dashboard");
    });
});

const $unicid3 = () => Cypress._.random(0, 1e4);
const $id3 = $unicid3();

describe("3.1.3 Корректная регистрация. Пароль: цифры, латинские буквы и символ. Имя: на русском и цифры", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Денис" + $id3);
        cy.get("#email").type("alatus" + $id3 + "@list.ru");
        cy.get("#password").type("123456asd/");
        cy.get("#password_confirmation").type("123456asd/");
        cy.get("#btn_registration").click();
        cy.url().should("eq", $site + "/dashboard");
    });
});

// _________________________3.2_________________________________

describe("3.2.1 Не корректная регистрация. Пустой email", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#password").type("123456789");
        cy.get("#password_confirmation").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", "Заполните это поле.");
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

const $unicid4 = () => Cypress._.random(0, 1e4);
const $id4 = $unicid4();

describe("3.2.2 Не корректная регистрация. Не корретный email (Знак @)", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus" + $id4);
        cy.get("#password").type("123456789");
        cy.get("#password_confirmation").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should(
                "eq",
                'Адрес электронной почты должен содержать символ "@". В адресе "alatus' +
                    $id4 +
                    '" отсутствует символ "@".'
            );
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.3 Не корректная регистрация. Не корретный email (текст после @)", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus" + $id4 + "@");
        cy.get("#password").type("123456789");
        cy.get("#password_confirmation").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", 'Введите часть адреса после символа "@". Адрес "alatus' + $id4 + '@" неполный.');
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.4 Не корректная регистрация. Не корретный email (запятая вместо точки)", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus" + $id4 + "@list,ru");
        cy.get("#password").type("123456789");
        cy.get("#password_confirmation").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#email")
            .then(($el) => $el[0].validationMessage)
            .should("eq", 'Часть адреса после символа "@" не должна содержать символ ",".');
        cy.get("#email")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.5 Не корректная регистрация. Повторный email", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus@list.ru");
        cy.get("#password").type("123456789");
        cy.get("#password_confirmation").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#email_error").children().should("contain", "The email has already been taken.");
    });
});

describe("3.2.6 Не корректная регистрация. Пустой name ", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#email").type("alatus" + $id4 + "@list.ru");
        cy.get("#password").type("123456789");
        cy.get("#password_confirmation").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#name")
            .then(($el) => $el[0].validationMessage)
            .should("eq", "Заполните это поле.");
        cy.get("#name")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.7 Не корректная регистрация. Пустой password ", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus" + $id4 + "@list.ru");
        cy.get("#password_confirmation").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#password")
            .then(($el) => $el[0].validationMessage)
            .should("eq", "Заполните это поле.");
        cy.get("#password")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.8 Не корректная регистрация. Пустой Confirm Password ", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus" + $id4 + "@list.ru");
        cy.get("#password").type("123456789");
        cy.get("#btn_registration").click();
        cy.get("#password_confirmation")
            .then(($el) => $el[0].validationMessage)
            .should("eq", "Заполните это поле.");
        cy.get("#password_confirmation")
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.9 Не корректная регистрация. Короткий пароль", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus" + $id4 + "@list.ru");
        cy.get("#password").type("123456");
        cy.get("#password_confirmation").type("123456");
        cy.get("#btn_registration").click();
        cy.get("#password_error").children().should("contain", "The password field must be at least 8 characters.");
    });
});

describe("3.2.10 Не корректная регистрация. Не верный проверочный пароль", () => {
    it("passes", () => {
        cy.visit($site + "/register");
        cy.get("#name").type("Denis11");
        cy.get("#email").type("alatus" + $id4 + "@list.ru");
        cy.get("#password").type("123456789");
        cy.get("#password_confirmation").type("123456788");
        cy.get("#btn_registration").click();
        cy.get("#password_error").children().should("contain", "The password field confirmation does not match.");
    });
});
