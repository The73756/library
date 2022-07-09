function dropdown() {
	const trigger = document.querySelector('[data-dd-target]');

	let path = trigger.getAttribute('data-dd-target');

	const menu = document.querySelector(`[data-dd-path="${path}"]`);
	const menuItems = menu.querySelectorAll('li');
	const menuLinks = menu.querySelectorAll('a');

	trigger.addEventListener('focus', () => {
		menu.classList.add('dropdown-menu--active');
		let index = -1;

		trigger.addEventListener('keydown', (e) => {
			if (e.code === 'ArrowUp') {
				index--;

				if (index < 0) {
					index = menuItems.length - 1;
				}
				for (let i = 0; i < menuItems.length; i++) {
					menuItems[i].classList.remove('dropdown-menu__item--active');
				}

				menuItems[index].classList.add('dropdown-menu__item--active');
			} 
			
			if (e.code === 'ArrowDown') {
				index++;

				if (index > menuItems.length - 1) {
					index = 0;
				}

				for (let i = 0; i < menuItems.length; i++) {
					menuItems[i].classList.remove('dropdown-menu__item--active');
				}

				menuItems[index].classList.add('dropdown-menu__item--active');
			}

			if (e.code === 'Enter' && menuLinks) {
				menuLinks[index].click();
			}
		});
	});

}

export default dropdown;