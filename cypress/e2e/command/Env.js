/**
 * Класс с константами
 */
export default class Env {
    /** Ссылка логотипа */
    static logo = "http://www.w3.org/2000/svg";

    /** Корректная почта */
    static email = "test@list.ru";

    /** Корректный пароль */
    static password = "123456789";

    /** Не корректная почта. Без знака @ */
    static withoutAtEmail = "notcorrectlist.ru";

    /** Не корректная почта. Без домена */
    static withoutDomainEmail = "notcorrect@";

    /** Не корректная почта. Точка вместо запятой */
    static withoutDotEmail = "notcorrect@list,ru";

    /** Не зарегестрированная почта */
    static unregisteredEmail = "notcorrect@list.ru";

    /** Короткий пароль */
    static shortPassword = "123456";

    /** Не корректный пароль*/
    static incorrectPassword = "12345678999";

    /** Куки */
    static cookies = {
        /** XSRF-TOKEN */
        token: "XSRF-TOKEN",
        /** laravel_session */
        session: "laravel_session",
    };

    /** routes (DOMAIN, URL) */
    static url = {
        /** Основной сайт */
        domain: "https://indydemo.cg28577.tmweb.ru",
        /** Страница авторизации */
        login: "/login",
    };

    static testfunct = (email) => {
        return `Введите часть адреса после символа "@". Адрес "${email}" неполный.`;
    };
}
