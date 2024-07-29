import { validateForms } from '../functions/validate-forms.js';



const rules = [
	{
		ruleSelector: '.input-tel',
		tel: true,
		telError: 'Введіть правильний номер',
		showErrorMessage: false,
		rules: [
			{
				rule: 'required',
				errorMessage: 'Введіть номер телефону!',
			},
			{
				rule: 'minLength',
				value: 10,
				errorMessage: 'Поле повинно містити 10 символів',
			},
			{
				rule: 'customRegexp',
				value: /^(\+?[\d\s\-\(\)]{7,})?$/,
				errorMessage: 'Введіть правильний номер',
			}
		]
	},
	{
		ruleSelector: '.input-name',
		rules: [
			{
				rule: 'minLength',
				value: 3,
				errorMessage: 'Мінімум 3 символи',
				showErrorMessage: false,
			},
			{
				rule: 'maxLength',
				value: 30,
				errorMessage: 'Не повинно перевищувати 30 символів',
			},
			{
				rule: 'required',
				errorMessage: 'Поле "Ваше ім’я" обов’язкове для заповнення',
			},
			{
				rule: 'customRegexp',
				value: /^[A-Za-zА-Яа-яЁё\s]+$/,
				errorMessage: 'Ім’я повинно містити тільки літери та пробіли',
			},
		]
	},
	{
		ruleSelector: '.input-email',
		rules: [
			{
				rule: 'required',
				errorMessage: 'Поле "Email" обов’язкове для заповнення',
			},
			{
				rule: 'email',
				errorMessage: 'Введіть коректний email',
			},
			{
				rule: 'minLength',
				value: 7,
				errorMessage: 'Email повинен містити мінімум 7 символів',
			},
			{
				rule: 'maxLength',
				value: 30,
				errorMessage: 'Email не повинен перевищувати 30 символів',
			}
		]
	},
	{
		ruleSelector: '.input-theme',
		rules: [
			{
				rule: 'required',
				errorMessage: 'Текст відгуку обов’язковий для заповнення',
			},
			{
				rule: 'minLength',
				value: 5,
				errorMessage: 'Відгук повинен містити мінімум 5 символів',
			},
			{
				rule: 'maxLength',
				value: 30,
				errorMessage: 'Текст не повинен перевищувати 40 символів',
			},
		]
	},
];

const afterForm = () => {
	window.location.href = 'thanks.html';
};

const error = () => {
	// modalClickHandler('fail', 'active');
};


const forms = document.querySelectorAll('.main-form');

for (const form of forms) {
	validateForms(form, rules, [], afterForm);
}
