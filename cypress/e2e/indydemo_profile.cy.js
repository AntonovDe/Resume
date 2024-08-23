const $site = 'https://indydemo.cg28577.tmweb.ru' // Переменная для основного сайта
const $forgot = '/forgot-password' // Переменная для домена восстановления пароля

// _________________________1_________________________________

// describe('Тест 1.1 Заход на страницу профиля. Авторизованный пользователь. Через кнопки.', () => {
//   it('passes', () => {
//     cy.visit($site+'/login')
//     cy.get('#email').type('test@list.ru')
//     cy.get('#password').type('123456789')
//     cy.get('#btn_login').click()
//     cy.url().should('eq', $site + '/dashboard')
//     cy.get('button').first().click()
//     cy.get('a').eq('6').click()
//     cy.url().should('eq', $site + '/profile')
//   })
// })

// describe('Тест 1.2 Заход на страницу профиля. Авторизованный пользователь. Через строку браузера.', () => {
//   it('passes', () => {
//     cy.visit($site+'/login')
//     cy.get('#email').type('test@list.ru')
//     cy.get('#password').type('123456789')
//     cy.get('#btn_login').click()
//     cy.wait(1000)
//     cy.visit($site+'/profile')
//     cy.url().should('eq', $site + '/profile')
//   })
// })

// describe('Тест 1.3. Заход на страницу профиля. НЕ авторизованный пользователь', () => {
//     it('passes', () => {
//       cy.visit($site+'/profile')
//       cy.url().should('eq', $site + '/login')
//     })
//   })

// describe('Тест 1.4 Выход из профиля', () => {
//   it('passes', () => {
//     cy.visit($site+'/login')
//     cy.get('#email').type('test@list.ru')
//     cy.get('#password').type('123456789')
//     cy.get('#btn_login').click()
//     cy.url().should('eq', $site + '/dashboard')
//     cy.get('button').first().click()
//     cy.get('button').eq('1').click()
//     cy.url().should('eq', $site +'/')
//   })
// })

// _________________________2_________________________________


// describe('2.1. Наличие всех текстов, заголовков h2', () => {
//   it('passes', () => {
//     cy.visit($site+'/login')
//     cy.get('#email').type('test@list.ru')
//     cy.get('#password').type('123456789')
//     cy.get('#btn_login').click()
//     cy.wait(1000)
//     cy.visit($site+'/profile')
// cy.get("h2").then(($el) => $el[0].innerText).should('eq', 'Основная информация')
// cy.get('header p').then(($el) => $el[0].innerText).should('contain', 'Обновите информацию о себе')
// cy.get("form span").then(($el) => $el[0].innerText).should('eq', 'Добавить аватар')
// cy.get("form span").then(($el) => $el[1].innerText).should('eq', 'Никнейм')
// cy.get("form span").then(($el) => $el[2].innerText).should('eq', 'E-mail для связи')
// cy.get("form span").then(($el) => $el[3].innerText).should('eq', 'Номер телефона')
// cy.get("form span").then(($el) => $el[4].innerText).should('eq', 'Профессия/специальность')
// cy.get("form span").then(($el) => $el[5].innerText).should('eq', 'Город')
// cy.get("form span").then(($el) => $el[6].innerText).should('eq', 'Ссылка')
// cy.get("form span").then(($el) => $el[7].innerText).should('eq', 'О себе')

// cy.get("h2").then(($el) => $el[1].innerText).should('eq', 'Персональные данные')
// cy.get('header p').then(($el) => $el[1].innerText).should('contain', 'Обновите информацию профиля вашей учетной записи и адрес электронной почты')
// cy.get("form span").then(($el) => $el[8].innerText).should('eq', 'Логин')
// cy.get("form span").then(($el) => $el[9].innerText).should('eq', 'Электронная почта')

// cy.get("h2").then(($el) => $el[2].innerText).should('eq', 'Изменить пароль')
// cy.get('header p').then(($el) => $el[2].innerText).should('contain', 'Чтобы обеспечить безопасность, в вашей учетной записи используется длинный случайный пароль')
// cy.get("form span").then(($el) => $el[10].innerText).should('eq', 'Текущий пароль')
// cy.get("form span").then(($el) => $el[11].innerText).should('eq', 'Новый пароль')
// cy.get("form span").then(($el) => $el[12].innerText).should('eq', 'Повторите пароль')

// cy.get("h2").then(($el) => $el[3].innerText).should('eq', 'Удалить аккаунт')
// cy.get('header p').then(($el) => $el[3].innerText).should('contain', 'После удаления вашей учетной записи все ее ресурсы и данные будут удалены без возможности восстановления. Прежде чем удалять свою учетную запись, загрузите все данные или информацию, которую вы хотите сохранить.')
    
// cy.get("h2").then(($el) => $el[4].innerText).should('eq', 'TW ELEMENTS')
//        })
// })


// describe('2.2 Наличие всех плейсхолдеров', () => {
//     it('passes', () => {
//       cy.visit($site+'/login')
//       cy.get('#email').type('test@list.ru')
//       cy.get('#password').type('123456789')
//       cy.get('#btn_login').click()
//       cy.wait(1000)
//       cy.visit($site+'/profile')
//     cy.get('button').then(($el) => $el[4].innerText).should("eq", "Добавить аватар")
//     cy.get('#nick').then(($el) => $el[0].placeholder).should("eq", "Придумайте себе никнейм или прозвище")
//     cy.get('#email').then(($el) => $el[0].placeholder).should("eq", "E-mail для связи (лучше не указывайте email своего аккаунта)")
//     cy.get('#phone').then(($el) => $el[0].placeholder).should("eq", "Номер телефона для связи")
//     cy.get('#job').then(($el) => $el[0].placeholder).should("eq", "Название свой профессии")
//     cy.get('#city').then(($el) => $el[0].placeholder).should("eq", "Город, в котором вы проживаете")
//     cy.get('#description').then(($el) => $el[0].placeholder).should("eq", "Несколько слов о себе, своих увлечениях, своей жизни")

//     cy.get('#name').then(($el) => $el[0].autocomplete).should("eq", "name")
//     cy.get('form input').then(($el) => $el[7].autocomplete).should("eq", "username")

//     cy.get('#current_password').then(($el) => $el[0].placeholder).should("eq", "текущий пароль")
//     cy.get('#password').then(($el) => $el[0].placeholder).should("eq", "новый пароль")
//     cy.get('#password_confirmation').then(($el) => $el[0].placeholder).should("eq", "повторите новый пароль")
//   })
// })

// describe('2.3 Наличие кнопки: "Сохранить", "сохранить", "сохранить пароль", "удалить аккаунт"', () => {
//     it('passes', () => {
//         cy.visit($site+'/login')
//         cy.get('#email').type('test@list.ru')
//         cy.get('#password').type('123456789')
//         cy.get('#btn_login').click()
//         cy.wait(1000)
//         cy.visit($site+'/profile')
//     cy.get('button').then(($el) => $el[5].innerText).should('eq', 'СОХРАНИТЬ')
//     cy.get('button').then(($el) => $el[6].innerText).should('eq', 'СОХРАНИТЬ')
//     cy.get('button').then(($el) => $el[7].innerText).should('eq', 'СОХРАНИТЬ ПАРОЛЬ')
//     cy.get('button').then(($el) => $el[8].innerText).should('eq', 'УДАЛИТЬ АККАУНТ')
//   })
// })

// _________________________3_________________________________


// describe('3. Проверка текста при добавлении аватара', () => {
//     it('passes', () => {
//         cy.visit($site+'/login')
//         cy.get('#email').type('test@list.ru')
//         cy.get('#password').type('123456789')
//         cy.get('#btn_login').click()
//         cy.wait(1000)
//         cy.visit($site+'/profile')
//     cy.get('[alt="Image preview"]').then(($el) => $el[0]).click()
//     cy.get('input').then(($el) => $el[13]).click()
//     // Нужно выбрать картинку. хз как
//     cy.wait(1000)
//     cy.get('h2').then(($el) => $el[5].innerText).should('eq', 'Загрузить картинку?')
//     cy.get('h[class="mb-6 text-sm text-gray-600"]').then(($el) => $el[5].innerText).should('eq', 'После загрузки картинки вы сможете многократно использовать ее в своих созданных статьях, аккаунте, а также добавить коллекции и альбомы с ней или сделать ее приватной')
//     cy.get('div label span').then(($el) => $el[13].innerText).should('eq', 'Название картинки')
//     cy.get('div label span').then(($el) => $el[14].innerText).should('eq', 'Описание картинки')
//     cy.get('div label span').then(($el) => $el[15].innerText).should('eq', 'Название ссылки на латиннице')
//     cy.get('div label span').then(($el) => $el[16].innerText).should('eq', 'Загрузите картинку')

//     cy.get('div input').then(($el) => $el[13].innerText).should('eq', 'Название картинки (не более 50 символов)')
//     cy.get('div input').then(($el) => $el[14].innerText).should('eq', 'Описание картинки (не более 50 символов)')
//     cy.get('div input').then(($el) => $el[15].innerText).should('eq', 'Название ссылки на латиннице (не более 20 символов)')
//     cy.get('div input').then(($el) => $el[16].innerText).should('eq', 'Загрузите картинку')
//   })
// })

// describe('3. Добавление аватара в профиль', () => {
//     it('passes', () => {
//         cy.visit($site+'/login')
//         cy.get('#email').type('test@list.ru')
//         cy.get('#password').type('123456789')
//         cy.get('#btn_login').click()
//         cy.wait(1000)
//         cy.visit($site+'/profile')
//     cy.get('[alt="Image preview"]').then(($el) => $el[0]).click()
//     cy.get('input').then(($el) => $el[12]).type('название картинки')
//     cy.get('input').then(($el) => $el[13]).click()
//     // Нужно выбрать картинку. хз как
//     cy.wait(5000)
//     cy.get('description').then(($el) => $el[0]).type('описание')
//     cy.get('link').then(($el) => $el[0]).type('ссылка')
//     cy.get('button').then(($el) => $el[10]).click()
//     cy.wait(1000)
//     cy.get('figure img').then(($el) => $el[1].currentSrc).should('contain', '/storage/images/load')
//     cy.get('button').then(($el) => $el[4]).click()
//   })
// })

// describe('3. Смена аватара в профиле', () => {
//     it('passes', () => {
//         cy.visit($site+'/login')
//         cy.get('#email').type('test@list.ru')
//         cy.get('#password').type('123456789')
//         cy.get('#btn_login').click()
//         cy.wait(1000)
//         cy.visit($site+'/profile')
//     cy.get('[alt="Image preview"]').then(($el) => $el[0]).click()
//     cy.get('[alt="название картинки"]').then(($el) => $el[0]).click()
//     // cy.get('[alt="ава"]').then(($el) => $el[0]).click() //альтернативная ава
//     cy.get('button').then(($el) => $el[4]).click()
//     cy.wait(1000)
//     cy.get('[alt="Image preview"]').then(($el) => $el[0].currentSrc).should('eq', 'https://indydemo.cg28577.tmweb.ru/storage/images/load/thumbnail/H8gw5NoEVrtn0GoRejZxvnyg0ubsfUCxFLj13iwh.jpg')
//     // cy.get('[alt="Image preview"]').then(($el) => $el[0].currentSrc).should('eq', 'https://indydemo.cg28577.tmweb.ru/storage/images/load/thumbnail/eaOfs84VmpI6dveOWYSrYO51DRXqiMY2WnRs1fb3.jpg') // альтернативная ава
//   })
// })

