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

    /** password */
    static password = {
        /** Корректный пароль */
        correct: "123456789",

        /** Не корректный пароль. Короткий пароль */
        short: "123456",

        /** Не подходящий пароль*/
        incorrect: "12345678999",
    };
}
