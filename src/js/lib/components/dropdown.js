function dropdown() {
	const triggers = document.querySelectorAll('[data-dd-target]');

	let index = -1,
		isOpened = false;

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
			menuItems = menu.querySelectorAll('.dropdown-menu__link');

		index = -1;
		isOpened = false;

		trigger.addEventListener('click', (e) => {
			e.preventDefault();
			toggleClass(menu, 'dropdown-menu--active');
		});

		trigger.addEventListener('blur', () => {
			if (!isOpened) {
				closeMenu(menu, 'dropdown-menu--active');
			}
		});

		menu.addEventListener('mouseup', (e) => {
			const target = e.target;

			if (target && target.classList.contains('dropdown-menu__link')) {
				trigger.blur();
				closeMenu(menu, 'dropdown-menu--active');
			}
		});

		trigger.addEventListener('keydown', (e) => {
			if (e.code === 'Enter') {
				e.preventDefault();
				toggleClass(menu, 'dropdown-menu--active');
			}

			if (isOpened) {
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
						isOpened = false;
						deleteActiveClassInArr(menuItems, 'dropdown-menu__link--active');

						if (index > -1) {
							menuItems[index].click();
							trigger.blur();
						}
						break;
				}
			}
		});
	});
}

export default dropdown;