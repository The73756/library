function dropdown() {  
	const triggers = document.querySelectorAll('[data-dd-target]');

	triggers.forEach(trigger => {
		trigger.addEventListener('click', (e) => {
			e.preventDefault();
			let path = e.target.getAttribute('data-dd-target');
			let menu = document.querySelector(`[data-dd-path="${path}"]`);
			menu.classList.toggle('active');
		});
	});
}

export default dropdown;