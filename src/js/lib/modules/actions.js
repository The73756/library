import $ from '../core';

$.prototype.html = function (content) {
	for (let i = 0; i < this.length; i++) {
		if (content) {
			this[i].innerHTML = content;
		} else {
			return this[i].innerHTML;
		}
	}

	return this;
};

$.prototype.index = function (content) {
	const parent = this[0].parentNode;
	const childs = [...parent.children];

	const findMyIndex = (child) => {
		return child == this[0];
	};

	return childs.findIndex(findMyIndex);
};	

$.prototype.find = function (selector) {
	let numberOfItems = 0,
		counter = 0;

	const copyObj = Object.assign({}, this);

	for (let i = 0; i < copyObj.length; i++) {
		const arr = copyObj[i].querySelectorAll(selector);
		if (arr.length == 0 ) {
			continue;
		}

		for (let j = 0; j < arr.length; j++) {
			this[counter] = arr[j];
			counter++;
		}

		numberOfItems += arr.length;
	}

	this.length = numberOfItems;
	const objlength =  Object.keys(this).length;
	for (; numberOfItems < objlength; numberOfItems++) {
		delete this[numberOfItems];
	}
	return this;
};	 