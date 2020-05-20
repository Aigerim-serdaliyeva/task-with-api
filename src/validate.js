import { extend } from 'vee-validate';

import {
    required,
    confirmed,
    numeric,
    min
} from 'vee-validate/dist/rules';

extend('startLatin', {
    validate: (value) => /^[A-z].*$/.test(value),
    message: 'Первый символ должен быть латинской буквой'
});

extend('login', {
    validate: (value) => /^[A-z0-9]+$/.test(value),
    message: 'Только латинские буквы и числы'
});

extend('required', {
    ...required,
    message: 'Поле обязательно к заполнению'
});

extend('confirmed', {
    ...confirmed,
    message: 'Пароль не совпадает'
});

extend('numeric', {
    ...numeric,
    message: 'Это поле должно состоять только из чисел.'
});

extend('min', {
    ...min,
    message: 'Длина проверяемого поля должна быть не меньше {length} символов.'
});
