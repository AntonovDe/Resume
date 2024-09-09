/**
 * Класс с сообщениями об ошибках
 */

export default class Error {
    /** general */
    static general = {
        /** Сообщение о необходимости заполнить поле */
        empty: "Заполните это поле.",
    };

    /** email */
    static email = {
        /** Сообщение об отсутствии домейна*/
        withoutDomain: (emailAndId) => {
            return `Введите часть адреса после символа "@". Адрес "${emailAndId}" неполный.`;
        },

        /** Сообщение об отсутствии символа @*/
        withoutAt: (emailAndId) => {
            return `Адрес электронной почты должен содержать символ "@". В адресе "${emailAndId}" отсутствует символ "@".`;
        },

        /** Сообщение об отсутствии символа @ и домейна*/
        withoutDomainAndAt: (emailAndId) => {
            return `Адрес электронной почты должен содержать символ "@". В адресе "${emailAndId}" отсутствует символ "@".`;
        },

        /** Сообщение о наличии запятой вместо точки*/
        withoutDot: `Часть адреса после символа "@" не должна содержать символ ",".`,

        /** Сообщение о неверно введенной почте*/
        unregistrated: `These credentials do not match our records.`,

        /** Сообщение о регистрации на уже зарегестрированную почту*/
        alreadyTaken: `The email has already been taken.`,
    };

    /** password */
    static password = {
        /** Слишком короткий пароль */
        short: `These credentials do not match our records.`,

        /** Сообщение о регистрации на уже зарегестрированную почту*/
        incorrect: `These credentials do not match our records.`,

        /** Сообщение о том, что пароль должен содержать 8 и более символов */
        more8: `The password field must be at least 8 characters.`,

        /** Сообщение о не верном проверочном пароле*/
        confirmation: `The password field confirmation does not match.`,
    };

    /** ошибки для страницы восстановления пароля */
    static forget = {
        correct: "We have emailed your password reset link.",
        wrong: "Please wait before retrying.",
    };
}

// static email = { - статичная переменная которой присвоен обьект
// { } - тело обьекта
// withoutDomainAndAt: -метод обьекта (функция которая находится внутри тела обьекта)
// (email) - аргумент функции/аргумент метода
// => { открывает тело метода/тело функции
// return `Введите часть адреса после символа "@". Адрес "${email}" неполный.`  возврат результата функции
// withoutDot - свойство обьекта (переменная внутри обьекта)
