const $site = 'https://indydemo.cg28577.tmweb.ru' // Переменная для основного сайта
const $forgot = '/forgot-password' // Переменная для домена восстановления пароля

// _________________________1_________________________________

describe('1 . Проверка перехода на сайт, на форму авторизации', () => {
  it('passes', () => {
    cy.visit($site)
    cy.get('#login').click()
    cy.get('#login_forget').click()
    cy.url().should('eq', $site + $forgot)
  })
})

// _________________________1_________________________________



describe('1.1 Наличие лого и верная ссылка на него', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('svg').then(($el) => $el[0].attributes[1].value).should("eq", "http://www.w3.org/2000/svg")
  })
})

describe('1.2 Наличие всех текстов, заголовков', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get("div").then(($el) => $el[0].children[0]).invoke('text').should('contain', 'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.')
    cy.get("label").then(($el) => $el[0].innerText).should("eq", "Email")
  })
})


describe('1.3 Наличие кнопки сброса пароля', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('button').then(($el) => $el[0].innerText).should("eq", "EMAIL PASSWORD RESET LINK")
  })
})

// _________________________2_________________________________

describe('2.1 Корректный сброс пароля. Почта: корректная', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('#email').type('alatus@list.ru')
    cy.get('button').click()
    cy.get('[class="mb-4 text-sm font-medium text-green-600"]').then(($el) => $el[0]).invoke('text').should('contain', 'We have emailed your password reset link.')
  })
})

// _________________________3_________________________________

describe('3.1 Не корректный сброс пароля. Почта: корректная. Слишком быстрый повторный сброс.', () => {
    it('passes', () => {
      cy.visit($site + $forgot)
      cy.get('#email').type('alatus@list.ru')
      cy.get('button').click()
      cy.get("form").then(($el) => $el[0].children[0]).last().should('contain', 'Please wait before retrying.') // Оба рабочих варианта
    //   cy.get("form").then(($el) => $el[0].children[0]).invoke('text').should('contain', 'Please wait before retrying.') // Оба рабочих варианта
    })
  })

describe('3.2 Не корректный сброс пароля. Email: пустой.', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('button').click()
    cy.get("#email").then(($el) => $el[0].validationMessage).should('eq', 'Заполните это поле.');
    cy.get("#email").then(($el) => $el[0].validity.valid).should('be.false');
  })
})

describe('3.3 Не корректный сброс пароля.. Не корретный email (отсутствует Знак @)', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('#email').type('notcorrectlist.ru')
    cy.get('button').click()
    cy.get("#email").then(($el) => $el[0].validationMessage).should('eq', 'Адрес электронной почты должен содержать символ \"@\". В адресе \"notcorrectlist.ru" отсутствует символ \"@\".');
    cy.get("#email").then(($el) => $el[0].validity.valid).should('be.false');
  })
})

describe('3.4 Не корректный сброс пароля.. Не корретный email (текст после @)', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('#email').type('notcorrect@')
    cy.get('button').click()
    cy.get("#email").then(($el) => $el[0].validationMessage).should('eq', 'Введите часть адреса после символа \"@\". Адрес "notcorrect@" неполный.')
    cy.get("#email").then(($el) => $el[0].validity.valid).should('be.false');
  })
})

describe('3.5 Не корректный сброс пароля.. Не корретный email (запятая вместо точки)', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('#email').type('notcorrect@list,ru')
    cy.get('button').click()
    cy.get("#email").then(($el) => $el[0].validationMessage).should('eq', 'Часть адреса после символа "@" не должна содержать символ ",".')
    cy.get("#email").then(($el) => $el[0].validity.valid).should('be.false');
  })
})

describe('3.6 Не корректный сброс пароля. Не корретный email', () => {
  it('passes', () => {
    cy.visit($site + $forgot)
    cy.get('#email').type('notcorrect@list.ru')
    cy.get('button').click()
      cy.get("form").then(($el) => $el[0].children[0]).invoke('text').should('contain', "We can't find a user with that email address.")
  })
})