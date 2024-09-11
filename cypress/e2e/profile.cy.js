import Env from "./command/Env.js"; // добавление (импорт) класса с быстрым набором логинов, паролей, ссылок
import Error from "./command/ErrorMessage.js"; // добавление (импорт) класса с сообщениями об ошибках
import * as auth from "./command/auth.js"; // добавление (импорт) последовательности действий для авторизации пользователя

/** Локаторы на странице профиля для поиска*/
const $ = {
    email: "#email",
    bioEmail: "#bio-email",
    password: "#password",
    password_confirmation: "#password_confirmation",
    current_password: "#current_password",
    btn_login: "#btn_login",
    imageForm: "#storeImageForm",
    nick: "#nick",
    phone: "#phone",
    job: "#job",
    city: "#city",
    description: "#description",
    name: "#name",
    button: "button",
    href6: "a",
    h2: "h2",
    headerP: "header p",
    formSpan: "form span",
    formInput: "form input",
    imagePrev: '[alt="Image preview"]',
    imageAva: '[alt="Мой аватар"]',
    imageName: '[alt="название картинки"]',
    input: "input",
    inputFile: 'input[type="file"]',
    image: "#image",
    DLS: "div label span",
    DI: "div input",
    figureImg: "figure img",
    namePlaceholder: '[placeholder="Название картинки (не более 50 символов)"]',
    descriptionPlaceholder: '[placeholder="Описание картинки (не более 50 символов)"]',
    linkPlaceholder: '[placeholder="Название ссылки на латиннице (не более 20 символов)"]',
    buttonSubmit: 'button[type="submit"]',
    buttonSaveBio: "#bio-submit",
    buttonDeliteAvatar: '[class="absolute right-0 rounded-full bg-black hover:bg-gray-700"]',
    testAva1: '[alt="Тестовая аватарка 1"]',
    testAva2: '[alt="Тестовая аватарка 2"]',
    buttonDeliteImages: '[aria-label="dropdown"]',
};

/** 1. Проверка открытия страницы */

describe("Тест 1.1 Заход на страницу профиля. Авторизованный пользователь. Через кнопки.", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.get($.button).first().click();
        cy.get($.href6).eq("6").click();
        cy.url().should("eq", Env.url.domain + Env.url.profile);
    });
});

describe("Тест 1.2 Заход на страницу профиля. Авторизованный пользователь. Через строку браузера.", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.wait(1000);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.url().should("eq", Env.url.domain + Env.url.profile);
    });
});

describe("Тест 1.3. Заход на страницу профиля. НЕ авторизованный пользователь", () => {
    it("passes", () => {
        cy.visit(Env.url.domain + Env.url.profile);
        cy.url().should("eq", Env.url.domain + Env.url.login);
    });
});

describe("Тест 1.4 Выход из профиля", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.login);
        cy.get($.button).first().click();
        cy.get($.button).eq("1").click();
        cy.url().should("eq", Env.url.domain + "/");
    });
});

/** 2. Проверка элементов страницы */

describe("2.1. Наличие всех текстов, заголовков h2", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.get($.h2)
            .then((el) => el[0].innerText)
            .should("eq", "Основная информация");
        cy.get($.headerP)
            .then((el) => el[0].innerText)
            .should("contain", "Обновите информацию о себе");
        cy.get($.formSpan)
            .then((el) => el[0].innerText)
            .should("eq", "Добавить аватар");
        cy.get($.formSpan)
            .then((el) => el[1].innerText)
            .should("eq", "Никнейм");
        cy.get($.formSpan)
            .then((el) => el[2].innerText)
            .should("eq", "E-mail для связи");
        cy.get($.formSpan)
            .then((el) => el[3].innerText)
            .should("eq", "Номер телефона");
        cy.get($.formSpan)
            .then((el) => el[4].innerText)
            .should("eq", "Профессия/специальность");
        cy.get($.formSpan)
            .then((el) => el[5].innerText)
            .should("eq", "Город");
        cy.get($.formSpan)
            .then((el) => el[6].innerText)
            .should("eq", "Ссылка");
        cy.get($.formSpan)
            .then((el) => el[7].innerText)
            .should("eq", "О себе");

        cy.get($.h2)
            .then((el) => el[1].innerText)
            .should("eq", "Персональные данные");
        cy.get($.headerP)
            .then((el) => el[1].innerText)
            .should("contain", "Обновите информацию профиля вашей учетной записи и адрес электронной почты");
        cy.get($.formSpan)
            .then((el) => el[8].innerText)
            .should("eq", "Логин");
        cy.get($.formSpan)
            .then((el) => el[9].innerText)
            .should("eq", "Электронная почта");

        cy.get($.h2)
            .then((el) => el[2].innerText)
            .should("eq", "Изменить пароль");
        cy.get($.headerP)
            .then((el) => el[2].innerText)
            .should(
                "contain",
                "Чтобы обеспечить безопасность, в вашей учетной записи используется длинный случайный пароль"
            );
        cy.get($.formSpan)
            .then((el) => el[10].innerText)
            .should("eq", "Текущий пароль");
        cy.get($.formSpan)
            .then((el) => el[11].innerText)
            .should("eq", "Новый пароль");
        cy.get($.formSpan)
            .then((el) => el[12].innerText)
            .should("eq", "Повторите пароль");

        cy.get($.h2)
            .then((el) => el[3].innerText)
            .should("eq", "Удалить аккаунт");
        cy.get($.headerP)
            .then((el) => el[3].innerText)
            .should(
                "contain",
                "После удаления вашей учетной записи все ее ресурсы и данные будут удалены без возможности восстановления. Прежде чем удалять свою учетную запись, загрузите все данные или информацию, которую вы хотите сохранить."
            );

        cy.get($.h2)
            .then((el) => el[4].innerText)
            .should("eq", "TW ELEMENTS");
    });
});

describe("2.2 Наличие всех плейсхолдеров", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.get($.imageForm)
            .then((el) => el[0].innerText)
            .should("eq", "Добавить аватар");
        cy.get($.nick)
            .then((el) => el[0].placeholder)
            .should("eq", "Придумайте себе никнейм или прозвище");
        cy.get($.bioEmail)
            .then((el) => el[0].placeholder)
            .should("eq", "E-mail для связи (лучше не указывайте email своего аккаунта)");
        cy.get($.phone)
            .then((el) => el[0].placeholder)
            .should("eq", "Номер телефона для связи");
        cy.get($.job)
            .then((el) => el[0].placeholder)
            .should("eq", "Название свой профессии");
        cy.get($.city)
            .then((el) => el[0].placeholder)
            .should("eq", "Город, в котором вы проживаете");
        cy.get($.description)
            .then((el) => el[0].placeholder)
            .should("eq", "Несколько слов о себе, своих увлечениях, своей жизни");

        cy.get($.name)
            .then((el) => el[0].autocomplete)
            .should("eq", "name");
        cy.get($.formInput)
            .then((el) => el[7].autocomplete)
            .should("eq", "username");

        cy.get($.current_password)
            .then((el) => el[0].placeholder)
            .should("eq", "текущий пароль");
        cy.get($.password)
            .then((el) => el[0].placeholder)
            .should("eq", "новый пароль");
        cy.get($.password_confirmation)
            .then((el) => el[0].placeholder)
            .should("eq", "повторите новый пароль");
    });
});

describe('2.3 Наличие кнопки: "Сохранить", "сохранить", "сохранить пароль", "удалить аккаунт"', () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.get($.button)
            .then((el) => el[5].innerText)
            .should("eq", "СОХРАНИТЬ");
        cy.get($.button)
            .then((el) => el[6].innerText)
            .should("eq", "СОХРАНИТЬ");
        cy.get($.button)
            .then((el) => el[7].innerText)
            .should("eq", "СОХРАНИТЬ ПАРОЛЬ");
        cy.get($.button)
            .then((el) => el[8].innerText)
            .should("eq", "УДАЛИТЬ АККАУНТ");
    });
});

/** 3.1 Корректные изменения в профиле. Добавление, изменение, удаление аватара */

describe("3.1.1 Проверка текста при добавлении аватара", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.get($.imageForm).then((el) => {
            if (el[0].innerText == "Добавить аватар") {
                cy.get($.button)
                    .then((el) => el[4])
                    .click();
            } else {
                cy.get($.imagePrev)
                    .then((el) => el[0])
                    .click();
                су.Log(
                    "В профиле уже установлен аватар. В тестовом профиле не должно быть установленного аватара. Аватар возможно был добавлен вручную. Либо необходимо проверить остальные тесты на удаление аватара после его добавления"
                );
            }
        });
        cy.get($.inputFile).click().selectFile("cypress/e2e/image/ava1.png");

        /** Проверка главного заголовка и описания */
        cy.get($.h2)
            .then((el) => el[5].innerText)
            .should("eq", "Загрузить картинку?");
        cy.get('p[class="mb-6 text-sm text-gray-600"]')
            .then((el) => el[0].innerText)
            .should(
                "eq",
                "После загрузки картинки вы сможете многократно использовать ее в своих созданных статьях, аккаунте, а также добавить коллекции и альбомы с ней или сделать ее приватной"
            );

        /** Проверка заголовков */
        cy.get($.DLS)
            .then((el) => el[13].innerText)
            .should("eq", "Название картинки");
        cy.get($.DLS)
            .then((el) => el[14].innerText)
            .should("eq", "Описание картинки");
        cy.get($.DLS)
            .then((el) => el[15].innerText)
            .should("eq", "Название ссылки на латиннице");
        cy.get($.DLS)
            .then((el) => el[16].innerText)
            .should("eq", "Загрузите картинку");

        /** Проверка плейсхолдеров */
        cy.get($.DI)
            .then((el) => el[12].placeholder)
            .should("eq", "Название картинки (не более 50 символов)");
        cy.get($.DI)
            .then((el) => el[13].placeholder)
            .should("eq", "Описание картинки (не более 50 символов)");
        cy.get($.DI)
            .then((el) => el[14].placeholder)
            .should("eq", "Название ссылки на латиннице (не более 20 символов)");

        /** Проверка кнопки загрузки */
        cy.get($.inputFile)
        .should('exist')
    });
});

describe("3.1.2 Добавление аватара в профиль", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.get($.imageForm).then((el) => {
            if (el[0].innerText == "Добавить аватар") {
                cy.get($.button)
                    .then((el) => el[4])
                    .click();
            } else {
                cy.get($.imagePrev)
                    .then((el) => el[0])
                    .click();
                cy.log(
                    "В профиле уже установлен аватар. В тестовом профиле не должно быть установленного аватара. Аватар возможно был добавлен вручную. Либо необходимо проверить остальные тесты на удаление аватара после его добавления"
                );
            }
        });

        cy.get($.inputFile).click().selectFile("cypress/e2e/image/ava1.png");
        cy.get($.namePlaceholder)
            .type("Тестовая аватарка 1");
        cy.get($.descriptionPlaceholder)
            .then((el) => el[0])
            .type("Описание тестовой аватарки 1");
        cy.get($.linkPlaceholder)
            .then((el) => el[0])
            .type("testAva1");
        cy.get($.buttonSubmit).contains("Загрузить картинку").click();
        cy.wait(1000);
        cy.get($.buttonSaveBio).click();
        cy.wait(1000);
        cy.get($.imagePrev).should("exist");
    });
});

describe("3.1.3 Смена аватара в профиле", () => {
    it("passes", () => {
        let Src;
        let newSrc;

        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.get($.imagePrev)
            .then((el) => el[0])
            .click();
        cy.get($.imagePrev).then((el) => {
            Src = el[0].currentSrc;
            cy.log(Src);
        });
        cy.get($.inputFile).click().selectFile("cypress/e2e/image/ava2.png");
        cy.get($.namePlaceholder)
            .then((el) => el[0])
            .type("Тестовая аватарка 2");
        cy.get($.descriptionPlaceholder)
            .then((el) => el[0])
            .type("Описание тестовой аватарки 2");
        cy.get($.linkPlaceholder)
            .then((el) => el[0])
            .type("testAva2");
        cy.get($.buttonSubmit).contains("Загрузить картинку").click();
        cy.wait(1000);
        cy.get($.buttonSaveBio).click();
        cy.wait(1000);
        cy.get($.imagePrev).then((el) => {
            (newSrc = el[0].currentSrc), cy.log(newSrc), cy.wrap(newSrc).should("not.equal", Src);
        });
    });
});

describe("3.1.4 Удаление аватара в профиле", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.profile);
        cy.get($.buttonDeliteAvatar)
            .click();
        cy.get($.buttonSaveBio).click();
        cy.wait(1000);
        cy.get($.imagePrev).should('not.exist')
        cy.get($.imageAva).then((el) => el[0].currentSrc).should('eq', Env.image.defaultAva)
    });
});

describe("3.1.5 Удаление аватаров из загруженных картинок", () => {
    it("passes", () => {
        auth.login(Env.email.correct, Env.password.correct);
        cy.visit(Env.url.domain + Env.url.images);
        cy.get($.buttonDeliteImages).then((el) => el[0]).click();
        cy.get('button').contains('Удалить').click()
        cy.get($.buttonDeliteImages).then((el) => el[1]).click();
        cy.get('button').contains('Удалить').click()
    });
});    

/** 3.2 Корректные изменения в профиле. Обновление информацию о себе */
