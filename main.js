function getSel(select) {
    return document.querySelector(select)
}

class Users {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password
    }
}

let regExp = /^[A-Za-z]{1,20}$/
let regExpEmail = /^\w{1,}[@]\w{1,}\.\w{1,}$/
let regExpPass = /\w{8,15}/

let formSignUp = document.forms.signUp

function validateSignUp(formSignUp) {
    if (regExp.test(formSignUp.firstName.value)) {
        formSignUp.firstName.classList.add('input-green');
        formSignUp.firstName.classList.remove('input-red')
    } else {
        formSignUp.firstName.classList.add('input-red')
    }
    if (regExp.test(formSignUp.lastName.value)) {
        formSignUp.lastName.classList.add('input-green')
        formSignUp.lastName.classList.remove('input-red')
    } else {
        formSignUp.lastName.classList.add('input-red')
    }
    if (regExpEmail.test(formSignUp.email.value)) {
        formSignUp.email.classList.add('input-green')
        formSignUp.email.classList.remove('input-red')
    } else {
        formSignUp.email.classList.add('input-red')
    }
    if (regExpPass.test(formSignUp.password.value)) {
        formSignUp.password.classList.add('input-green')
        formSignUp.password.classList.remove('input-red')
    } else {
        formSignUp.password.classList.add('input-red')
    }
    if (regExp.test(formSignUp.firstName.value) && regExp.test(formSignUp.lastName.value) && regExpEmail.test(formSignUp.email.value) && regExpPass.test(formSignUp.password.value)) {
        checkLocalStorage()
    } else {
        console.log('wrong');
    }
}

getSel('.signInNow').addEventListener('click', function () {
    getSel('.form-signIn').style.display = 'block'
    getSel('.signUp').style.display = 'none'
})

getSel('.signUnNow').addEventListener('click', function () {
    getSel('.form-signIn').style.display = 'none'
    getSel('.signUp').style.display = 'block'
})

getSel('.btn-signIn').addEventListener('click', function () {
    if (localStorage.length > 0 && localStorage.getItem('users')) {
        profile()
    } else {
        getSel('.valueEmpty').style.display = 'block'
    }
})

let users_list = []

function checkLocalStorage() {
    let firstName = formSignUp.firstName.value
    let lastName = formSignUp.lastName.value
    let email = formSignUp.email.value
    let password = formSignUp.password.value
    let user = new Users(firstName, lastName, email, password)
    if (localStorage.length > 0 && localStorage.getItem('users')) {
        users_list = JSON.parse(localStorage.getItem('users'))
        const duplicatedUser = users_list.find((user) => user.email === email);
        if (duplicatedUser) {
            formSignUp.email.classList.remove('input-green')
            formSignUp.email.classList.add('input-red')
            return getSel('.emailExist').style.display = 'block'
        }
    }
    users_list.push(user)
    localStorage.setItem('users', JSON.stringify(users_list))
    formSignUp.reset()
    formSignUp.firstName.classList.remove('input-red')
    formSignUp.firstName.classList.remove('input-green')
    formSignUp.lastName.classList.remove('input-red')
    formSignUp.lastName.classList.remove('input-green')
    formSignUp.email.classList.remove('input-red')
    formSignUp.email.classList.remove('input-green')
    formSignUp.password.classList.remove('input-red')
    formSignUp.password.classList.remove('input-green')
    getSel('.emailExist').style.display = 'none'
}

getSel('.btn-primary').addEventListener('click', function () {
    validateSignUp(formSignUp)
})

let signIn = document.forms.signIn

function profile() {
    let users_list = JSON.parse(localStorage.getItem('users'))
    for (let i = 0; i < users_list.length; i++) {
        if (users_list[i].email == signIn.email.value && users_list[i].password == signIn.pass.value) {
            us = users_list[i]
            createProfile(us)
            getSel('.form-signIn').reset()
            getSel('.form-signIn').style.display = 'none'
        } else {
            getSel('.incorrect').style.display = 'block'
            getSel('.valueEmpty').style.display = 'none'
        }
    }
}

let info = getSel('.info')

function createProfile(us) {
    info.innerHTML = `
        <p class="nameSname">${us.firstName} ${us.lastName}</p>
        <p class="email">${us.email}</p>
        `
    let position = document.createElement('p')
    position.textContent = 'Designer & Web Developer'
    position.classList.add('position')
    info.innerHTML += position.innerHTML
    getSel('.profile').style.display = 'block'
}

getSel('.sign-Out').addEventListener('click', function () {
    getSel('.profile').style.display = 'none'
    getSel('.form-signIn').style.display = 'block'
    getSel('.incorrect').style.display = 'none'
    formSignUp.reset()
})
