function dropdown() {
	const trigger = document.querySelector('[data-dd-target]');
	let path = trigger.getAttribute('data-dd-target');
	let index = -1;
	let isOpened = false;
	const menu = document.querySelector(`[data-dd-path="${path}"]`);
	const menuItems = menu.querySelectorAll('.dropdown-menu__link');

	function toggleClass(element, className, removeClass = true) {
		if (removeClass && element.classList.contains(className)) {
			element.classList.remove(className);
			isOpened = false;
		} else {
			element.classList.add(className);
			setTimeout (() => {
				isOpened = true;
			});
		}
	}

	function deleteActiveClass(className) {
		for (let i = 0; i < menuItems.length; i++) {
			menuItems[i].classList.remove(className);
		}
	}

	trigger.addEventListener('click', (e) => {
		e.preventDefault();
		toggleClass(menu, 'dropdown-menu--active');
	});

	trigger.addEventListener('blur', (e) => {
		menu.classList.remove('dropdown-menu--active');
	});

	trigger.addEventListener('keydown', (e) => {		
		if (e.code === 'Enter') {
			e.preventDefault();
			toggleClass(menu, 'dropdown-menu--active', false);
		}
	});

	trigger.addEventListener('keydown', (e) => {
		//if переписать на case 
		if (e.code === 'ArrowUp') {
			index--;
			if (index < 0) {
				index = menuItems.length - 1;
			}

			deleteActiveClass('dropdown-menu__link--active');
			menuItems[index].classList.add('dropdown-menu__link--active');
		}

		if (e.code === 'ArrowDown') {
			index++;

			if (index > menuItems.length - 1) {
				index = 0;
			}
			deleteActiveClass('dropdown-menu__link--active');
			menuItems[index].classList.add('dropdown-menu__link--active');
		}

		if (e.code === 'Enter' && isOpened) {
			console.log('sadasdad');
			menuItems[index].click();
			trigger.blur();
		}
	});

}

export default dropdown;