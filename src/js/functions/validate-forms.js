import JustValidate from 'just-validate';
import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";
function saveUTMParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  for (const [key, value] of urlParams.entries()) {
    if (key.startsWith('utm_')) {
      localStorage.setItem(key, value);
    }
  }
}
export const validateForms = (selector, rules, checkboxes = [], afterSend) => {
  const form = selector;
  const telSelector = form?.querySelector('input[type="tel"]');
  saveUTMParameters();
  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const mask = new Inputmask("+38 (999) 999 99 99");
    mask.mask(telSelector);

    // for (let item of rules) {
    //   if (item.tel) {
    //     item.rules.push({
    //       rule: 'function',
    //       validator: function() {
    //         const phone = telSelector.inputmask.unmaskedvalue();
    //         return phone.length === 10;
    //       },
    //       errorMessage: item.telError
    //     });
    //   }
    // }
  }

  const validation = new JustValidate(selector, {
    validateBeforeSubmitting: true,
  });

  for (let item of rules) {
    if (selector.querySelector(item.ruleSelector)) {
      validation.addField(item.ruleSelector, item.rules);
    }
  }

  if (checkboxes.length) {
    for (let item of checkboxes) {
      validation.addRequiredGroup(
          `${item.selector}`,
          `${item.errorMessage}`
      );
    }
  }

  // Функция для получения UTM меток из localStorage
  function getUTMParameters() {
    const utmParams = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('utm_')) {
        utmParams[key] = localStorage.getItem(key);
      }
    }
    return utmParams;
  }

  // Загрузка reCAPTCHA
  const siteKey = '6LfTAd4pAAAAANxcjGYM-qd8TixCbTs995_LC_eZ';
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  document.head.appendChild(script);

  script.onload = function() {
    grecaptcha.ready(function() {
      validation.onSuccess((ev) => {
        // Получение токена reCAPTCHA перед отправкой формы
        grecaptcha.execute(siteKey, { action: 'submit' }).then(function(token) {
          form.classList.add('loader')
          let formData = new FormData(ev.target);
          formData.append('recaptcha_response', token);

          const utmParams = getUTMParameters();
          for (const [key, value] of Object.entries(utmParams)) {
            formData.append(key, value);
          }

          let xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                if (afterSend) {
                  afterSend();
                }
                console.log('Отправлено');
              }
            }
          };

          xhr.open('POST', 'mail.php', true);
          xhr.send(formData);

          ev.target.reset();
        });
      });
    });
  };
};
