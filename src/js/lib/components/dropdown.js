(function dropdown() {
	const triggers = document.querySelectorAll('[data-dd-target]');

	let index = -1,
		isOpened = false,
		focusedEl = '';

	function toggleClass(element, className) {

		if (element.classList.contains(className)) {
			setTimeout(() => {
				element.classList.remove(className);
				isOpened = false;
			});
		} else {
			setTimeout(() => {
				element.classList.add(className);
				isOpened = true;
			});
		}
	}

	function deleteActiveClassInArr(arr, className) {
		for (let i = 0; i < arr.length; i++) {
			arr[i].classList.remove(className);
		}
	}

	function addActiveClassMenuEl(arr, className) {
		deleteActiveClassInArr(arr, className);
		arr[index].classList.add(className);
	}

	function closeMenu(menu, activeClass) {
		index = -1;
		isOpened = false;
		menu.classList.remove(activeClass);
	}

	triggers.forEach(trigger => {
		const path = trigger.getAttribute('data-dd-target'),
			menu = document.querySelector(`[data-dd-path="${path}"]`),
			menuItems = menu.querySelectorAll('.dropdown-menu__link'),
			lastItem = menuItems[menuItems.length - 1];

		menuItems.forEach(item => {
			item.addEventListener('focus', (e) => {
				focusedEl = e.target;
			});

			item.addEventListener('keydown', (e) => {
				if (e.code === 'Enter' && e.target === focusedEl) {
					closeMenu(menu, 'dropdown-menu--active');
				}
			});
		});

		document.addEventListener('click', (e) => {
			const target = e.target;

			if (target && target === trigger) {
				e.preventDefault();
				toggleClass(menu, 'dropdown-menu--active');
			}

			if (target && !(target == menu || target.classList.contains('dropdown-menu__link'))) {
				index = -1;
				closeMenu(menu, 'dropdown-menu--active');
				deleteActiveClassInArr(menuItems, 'dropdown-menu__link--active');
			}
		});

		menu.addEventListener('mouseup', (e) => {
			const target = e.target;

			if (target && target.classList.contains('dropdown-menu__link')) {
				closeMenu(menu, 'dropdown-menu--active');
			}
		});

		lastItem.addEventListener('blur', () => {
			trigger.focus();
		});

		trigger.addEventListener('keydown', (e) => {
			if (e.code === 'Enter') {
				e.preventDefault();
				toggleClass(menu, 'dropdown-menu--active');
			}

			if (e.code === 'Escape') {
				closeMenu(menu, 'dropdown-menu--active');
				deleteActiveClassInArr(menuItems, 'dropdown-menu__link--active');
			}

			if (isOpened && menuItems.length > 0) {
				switch (e.code) {
					case 'ArrowUp':
						index--;
						if (index < 0) {
							index = menuItems.length - 1;
						}
						addActiveClassMenuEl(menuItems, 'dropdown-menu__link--active');
						break;

					case 'ArrowDown':
						index++;
						if (index > menuItems.length - 1) {
							index = 0;
						}
						addActiveClassMenuEl(menuItems, 'dropdown-menu__link--active');
						break;

					case 'Enter':
						deleteActiveClassInArr(menuItems, 'dropdown-menu__link--active');

						if (index > -1) {
							menuItems[index].click();
							closeMenu(menu, 'dropdown-menu--active');
						}
						break;
				}
			}
		});
	});
}());