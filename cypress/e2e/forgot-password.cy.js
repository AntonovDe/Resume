import Env from "./command/Env.js"; // добавление (импорт) класса с быстрым набором логинов, паролей, ссылок
import Error from "./command/ErrorMessage.js"; // добавление (импорт) класса с сообщениями об ошибках

/** _________________________1_________________________________ */

const $ = {
    login: "#login",
    login_forget: "#login_forget",
    email: "#email",
    svg: "svg",
    div: "div",
    label: "label",
    button: "button",
    mesError: '[class="mb-4 text-sm font-medium text-green-600"]',
    form: "form",
};

describe("1 Проверка перехода на сайт, на форму авторизации", () => {
    it("passes", () => {
        cy.visit(Env.url.domain);
        cy.get($.login).click();
        cy.get($.login_forget).click();
        cy.url().should("eq", Env.url.domain + Env.url.forgot);
    });
});

/** _________________________2_________________________________ */

describe("2.1 Наличие лого и верная ссылка на него", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.svg)
            .then(($el) => $el[0].attributes[1].value)
            .should("eq", Env.image.logo);
    });
});

describe("2.2 Наличие всех текстов, заголовков", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.div)
            .then(($el) => $el[0].children[0])
            .invoke("text")
            .should(
                "contain",
                "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."
            );
        cy.get($.label)
            .then(($el) => $el[0].innerText)
            .should("eq", "Email");
    });
});

describe("2.3 Наличие кнопки сброса пароля", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.button)
            .then(($el) => $el[0].innerText)
            .should("eq", "EMAIL PASSWORD RESET LINK");
    });
});

/** _________________________3.1_________________________________ */

describe("3.1 Корректный сброс пароля. Почта: корректная", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.email).type(Env.email.correct);
        cy.get($.button).click();
        cy.get($.mesError)
            .then(($el) => $el[0])
            .invoke("text")
            .should("contain", Error.forget.correct);
    });
});

/** _________________________3.2_________________________________ */

describe("3.2.1 Не корректный сброс пароля. Почта: корректная. Слишком быстрый повторный сброс.", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.email).type(Env.email.correct);
        cy.get($.button).click();
        cy.get($.form)
            .then(($el) => $el[0].children[0])
            .last()
            .should("contain", Error.forget.wrong); // Оба рабочих варианта
        //   cy.get("form").then(($el) => $el[0].children[0]).invoke('text').should('contain', message.wrong) // Оба рабочих варианта
    });
});

describe("3.2.2 Не корректный сброс пароля. Email: пустой.", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.button).click();
        cy.get($.email)
            .then(($el) => $el[0].validationMessage)
            .should("eq", Error.general.empty);
        cy.get($.email)
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.3 Не корректный сброс пароля.. Не корретный email (отсутствует Знак @)", () => {
    it("passes", () => {
        const email = Env.email.withoutAt;
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.email).type(Env.email.withoutAt);
        cy.get($.button).click();
        cy.get($.email)
            .then(($el) => $el[0].validationMessage)
            .should("eq", Error.email.withoutAt(email));
        cy.get($.email)
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.4 Не корректный сброс пароля.. Не корретный email (отсутствует домен, точка и Знак @)", () => {
    it("passes", () => {
        const email = Env.email.withoutDomainAndAt;
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.email).type(Env.email.withoutDomainAndAt);
        cy.get($.button).click();
        cy.get($.email)
            .then(($el) => $el[0].validationMessage)
            .should("eq", Error.email.withoutDomainAndAt(email));
        cy.get($.email)
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.5 Не корректный сброс пароля.. Не корретный email (текст после @)", () => {
    it("passes", () => {
        const email = Env.email.withoutDomain;
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.email).type(Env.email.withoutDomain);
        cy.get($.button).click();
        cy.get($.email)
            .then(($el) => $el[0].validationMessage)
            .should("eq", Error.email.withoutDomain(email));
        cy.get($.email)
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.6 Не корректный сброс пароля.. Не корретный email (запятая вместо точки)", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.email).type(Env.email.withoutDot);
        cy.get($.button).click();
        cy.get($.email)
            .then(($el) => $el[0].validationMessage)
            .should("eq", Error.email.withoutDot);
        cy.get($.email)
            .then(($el) => $el[0].validity.valid)
            .should("be.false");
    });
});

describe("3.2.7 Не корректный сброс пароля. Не корретный email", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.forgot);
        cy.get($.email).type(Env.email.unregistrated);
        cy.get($.button).click();
        cy.get($.form)
            .then(($el) => $el[0].children[0])
            .invoke("text")
            .should("contain", "We can't find a user with that email address.");
    });
});
