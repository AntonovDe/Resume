/**
 * Класс с константами
 */
export default class Env {
    /** routes (DOMAIN, URL) */
    static url = {
        /** Основной сайт */
        domain: "https://indydemo.cg28577.tmweb.ru",

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
        defaultAva: "https://indydemo.cg28577.tmweb.ru/build/assets/avatar-CPjtKgoM.png",
    };

    /** email */
    static email = {
        /** Корректная почта */
        correct: "test@list.ru",

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
            return `test${$id}@list.ru`;
        },

        /** Не корректная почта. Без домена и @ */
        withoutDomainAndAt: ($id) => {
            return `test${$id}`;
        },
        /** Не корректная почта. Без домена */
        withoutDomain: ($id) => {
            return `test${$id}@`;
        },
        /** Не корректная почта. Без домена и знака @*/
        withoutAt: ($id) => {
            return `test${$id}list.ru`;
        },
    };

    /** password */
    static password = {
        /** Корректный пароль */
        correct: "123456789",

        /** Корректный пароль с буквами и символами */
        correctWithСharacter: "123456asd/",

        /** Не корректный пароль. Короткий пароль */
        short: "123456",

        /** Не подходящий пароль*/
        incorrect: "12345678999",
    };

    /** name */
    static name = {
        /** Корректное имя */
        correct: "AuthoTest",

        /** Корректное имя на русском */
        correctRus: "Авто тест имя",
    };
}
