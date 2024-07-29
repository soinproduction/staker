import vars from "../_vars.js";
import { disableScroll } from "../functions/disable-scroll.js";
import { enableScroll } from "../functions/enable-scroll.js";
import {
  removeClassInArray,
  addCustomClass,
  removeCustomClass,fadeOut,fadeIn
} from "../functions/customFunctions.js";


export function closeModal() {
  commonFunction();
}
export function modalClickHandler(attribute, activeClass, overlayClass = activeClass) {
  const curentModal = overlay.querySelector(`[data-popup="${attribute}"]`);
  removeClassInArray(modals, activeClass);
  addCustomClass(overlay, overlayClass);
  addCustomClass(curentModal, activeClass);
  fadeIn(curentModal, 200)
  disableScroll();

  innerButton = overlay.querySelector(`${"[data-popup]"}.${activeClass} .close`);
}

const {
  overlay,
  activeClass,
  mobileMenu,
  modals,
  modalsButton,
  activeMode,
  innerButtonModal,
  burger
} = vars;
let innerButton;
const commonFunction = function () {
  removeCustomClass(overlay, activeMode);
  removeCustomClass(overlay, activeClass);
  removeClassInArray(modals, activeClass);

  modals.forEach((modal) => fadeOut(modal, 300))
  enableScroll();
};

function findAttribute(element, attributeName) {
  let target = element;
  while (target && target !== document) {
    if (target.hasAttribute(attributeName)) {
      return target.getAttribute(attributeName);
    }
    target = target.parentNode;
  }
  return null;
}

function buttonClickHandler(e, buttonAttribute, activeClass = 'active') {
  e.preventDefault();
  const currentModalId = findAttribute(e.target, buttonAttribute);
  if (!currentModalId) {return}

  const currentModal = overlay.querySelector(`[data-popup="${currentModalId}"]`);

  mobileMenu && removeCustomClass(mobileMenu, activeClass);
  burger && removeClassInArray(burger, activeClass);

  removeClassInArray(modals, activeClass);
  addCustomClass(overlay, activeClass);
  addCustomClass(currentModal, activeClass);
  fadeIn(currentModal, 200, 'flex');

  disableScroll();
  innerButton = overlay.querySelector(`${"[data-popup]"}.${activeClass} .close`);

}

function overlayClickHandler(e, activeClass) {
  if (e.target === overlay || e.target === innerButton) commonFunction();
}

function modalInit(buttonsArray, buttonAttribute, activeClass) {
  buttonsArray.map(function (btn) {
    btn.addEventListener("click", (e) => {
      buttonClickHandler(e, buttonAttribute, activeClass);

      if (btn.dataset.formName) {
        const form = document.querySelector(`[data-popup="${btn.getAttribute(buttonAttribute)}"] .main-form`);

        if (form) {
          let hiddenInput = form.querySelector('input[name="form_name"]');
          if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'form_name';
            form.appendChild(hiddenInput);
          }
          hiddenInput.value = btn.dataset.formName;
        }
      }


    });
  });
}

overlay && overlay.addEventListener("click", function (e) {
  overlayClickHandler(e, activeClass);
});

modalInit(modalsButton, "data-btn-modal", activeClass);

innerButtonModal && innerButtonModal.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    enableScroll();
    e.preventDefault();

    const prevId = findAttribute(this.closest('[data-popup]'), 'data-popup');
    if (!prevId) {return}

    const currentModalId = this.getAttribute("data-btn-inner");
    const currentModal = overlay.querySelector(`[data-popup="${currentModalId}"]`);
    removeClassInArray(modals, activeClass);
    addCustomClass(overlay, activeClass);
    fadeOut(document.querySelector(`[data-popup="${prevId}"]`), 0);
    fadeIn(currentModal, 200);
    addCustomClass(currentModal, activeClass);
    disableScroll();
    innerButton = overlay.querySelector(`${"[data-popup]"}.${activeClass} .close`);
  });
});



document.querySelectorAll('.custom-checkbox').forEach(function (item){
  const form = item.closest('.main-form');

  if (form) {
    const checkbox = item.querySelector('.custom-checkbox__input');
    const button = form.querySelector('.main-button');

    function updateButtonState() {
      checkbox.checked ?
          button.removeAttribute('disabled') :
          button.setAttribute('disabled', 'true');
    }

    updateButtonState();
    checkbox.addEventListener('click', updateButtonState);
  }
})