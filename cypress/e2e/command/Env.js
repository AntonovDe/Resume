/**
 * Класс с константами
 */
export default class Env {
    /** routes (DOMAIN, URL) */
    static url = {
        /** Основной сайт */
        domain: "Здесь был адрес сайта",

        /** Страница авторизации */
        login: "/login",

        /** Страница регистрации */
        register: "/register",

        /** Страница восстановления пароля */
        forgot: "/forgot-password",

        /** Страница профиля */
        profile: "/profile",

        /** Главная страница */
        main: "/dashboard",

        /** Страница с картинками */
        images: "/images",
    };

    /** Куки */
    static cookies = {
        /** XSRF-TOKEN */
        token: "XSRF-TOKEN",

        /** laravel_session */
        session: "laravel_session",
    };

    /** Изображения */
    static image = {
        /** Ссылка логотипа */
        logo: "http://www.w3.org/2000/svg",
        defaultAva: url.domain + "/build/assets/avatar-CPjtKgoM.png",
    };

    /** email */
    static email = {
        /** Корректная почта */
        correct: "***",

        /** Новая корректная почта */
        newCorrect: "***",

        /** Не корректная почта. Без домена и @ */
        withoutDomainAndAt: "notcorrect",

        /** Не корректная почта. Без домена */
        withoutDomain: "notcorrect@",

        /** Не корректная почта. Без знака @ */
        withoutAt: "notcorrectlist.ru",

        /** Не корректная почта. Точка вместо запятой */
        withoutDot: "notcorrect@list,ru",

        /** Не зарегестрированная почта */
        unregistrated: "unregistrated@list.ru",
    };

    /** email для регистрации */
    static emailReg = {
        /** Корректная почта регистрации */
        correct: ($id) => {
            return `***${$id}***`;
        },

        /** Не корректная почта. Без домена и @ */
        withoutDomainAndAt: ($id) => {
            return `***${$id}`;
        },
        /** Не корректная почта. Без домена */
        withoutDomain: ($id) => {
            return `***${$id}@`;
        },
        /** Не корректная почта. Без домена и знака @*/
        withoutAt: ($id) => {
            return `***${$id}list.ru`;
        },
    };

    /** password */
    static password = {
        /** Корректный пароль */
        correct: "***",

        /** Новый корректный пароль */
        newCorrect: "***",

        /** Корректный пароль с буквами и символами */
        correctWithСharacter: "***",

        /** Не корректный пароль. Короткий пароль */
        short: "***",

        /** Не подходящий пароль*/
        incorrect: "***",
    };

    /** name */
    static name = {
        /** Корректное имя */
        correct: "AuthoTest",

        /** Новое корректное имя */
        newCorrect: "TestAutho",

        /** Корректное имя на русском */
        correctRus: "Авто тест имя",
    };

    /** info для профиля */
    static info = {
        /** Никнейм */
        nick: "AT",

        /** почта для связи */
        bioEmail: "***",

        /** телефон */
        phone: "+7(900)12345678",

        /** работа */
        job: "authoTester",

        /** город */
        city: "Москва",

        /** ссылка на профиль */
        link: "test",

        /** описание в профиле */
        description: "Тестовый аккаунт. Тестовая запись",
    };
}
