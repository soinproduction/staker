export function setupClipFunctionality({clipSelector = '[data-clip]', btnSelector = '[data-clip-btn]', itemSelector = '[data-clip-item]', transitionStyle = 'max-height 0.4s linear'} = {}) {
	const elements = document.querySelectorAll(clipSelector);

	if (elements) {
		elements.forEach(function (element) {
			const btn = element.querySelector(btnSelector);
			const box = element.querySelector(itemSelector);

			if (!btn || !box) return; // Если не нашли кнопку или элемент, пропускаем

			const computedStyle = window.getComputedStyle(box);
			const originalHeight = parseInt(computedStyle.getPropertyValue('max-height'), 10) || 0; // Устанавливаем 0, если значение не найдено
			const oldText = btn.textContent;

			btn.addEventListener('click', function (e) {
				e.preventDefault();
				const isOpen = box.getAttribute('data-clip-item') === 'true';

				if (!isOpen) {
					box.style.maxHeight = box.scrollHeight + 'px';
					btn.textContent = btn.getAttribute('data-clip-btn');
				} else {
					box.style.maxHeight = originalHeight + 'px';
					btn.textContent = oldText;
				}

				box.setAttribute('data-clip-item', !isOpen);
			});

			box.style.transition = transitionStyle;
		});
	}
}

// setupClipFunctionality({
// 	clipSelector: '[data-clip]',
// 	btnSelector: '[data-clip-btn]',
// 	itemSelector: '[data-clip-item]',
// 	transitionStyle: 'max-height 0.4s linear'
// });

