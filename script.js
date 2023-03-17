let comments = [];

let commentList = document.querySelector('.comments__list');
let textArea = document.querySelector('.form__text');
let nameArea = document.querySelector('.form__name');
let date = document.querySelector('.form__date');
let btn = document.querySelector('.form__btn');
let form = document.querySelector('.form');

function addNewComment() {
	comments.unshift({
		text: textArea.value,
		name: nameArea.value,
		date: date.value
	})
	getComments(comments.slice(0, 1))
	date.value = '';
	textArea.value = '';
	nameArea.value = '';
	validation(form)
}

function validation(form) {

	function createError(input, text) {

		const parent = input.parentNode;

		const errorText = document.createElement('span');

		errorText.classList.add('error-text');

		errorText.textContent = text;

		parent.append(errorText)

		parent.classList.add('error');

	}

	function removeError(input) {

		const parent = input.parentNode;

		if (parent.classList.contains('error')) {
			parent.querySelector('.error-text').remove();
			parent.classList.remove('error');
		}
	}

	let inputs = form.querySelectorAll("input[type = 'text']");

	inputs.forEach(input => {

		removeError(input);

		if (input.value == '') {
			createError(input, 'Поле не заполнено');
		}
	});

	if (Array.from(inputs).every(input => input.value != '')) {
		btn.disabled = false;
	} else {
		btn.disabled = true
	}
}



textArea.oninput = function () {
	validation(form)
}
nameArea.oninput = function () {
	validation(form)
}


form.addEventListener('submit', function (event) {
	event.preventDefault();
})

btn.addEventListener('click', addNewComment);



function getDays(date) {

	let hours = new Date().getHours();
	if (hours < 10) hours = '0' + hours;
	let minutes = new Date().getMinutes();
	if (minutes < 10) minutes = '0' + minutes;
	let today = new Date();
	let currentDay = new Date(date);

	today.setHours(0, 0, 0, 0);
	currentDay.setHours(0, 0, 0, 0);

	function getPreviousDay(date = new Date()) {
		const previous = new Date(date.getTime());
		previous.setDate(date.getDate() - 1);
		previous.setHours(0, 0, 0, 0);
		return previous;
	}

	if (date === '') return `Сегодня, ${hours}:${minutes}`;
	if (currentDay.getTime() === today.getTime()) return `Сегодня, ${hours}:${minutes}`;
	if (currentDay.getTime() === getPreviousDay().getTime()) return `Вчера, ${hours}:${minutes}`;
	return `${date}, ${hours}:${minutes}`;
}



function getComments(allComments) {

	let commentElements = allComments.map((el) => {

		let div = document.createElement('div');

		div.className = 'comment';

		let deleteBtn = document.createElement('img');
		deleteBtn.className = 'del-btn';
		deleteBtn.src = './icons/bin.png';

		deleteBtn.onclick = () => {
			div.remove();
		}

		let likeBtn = document.createElement('img');
		likeBtn.src = './icons/heart.png';
		likeBtn.className = 'like-btn';

		likeBtn.onclick = () => likeBtn.classList.toggle('active');

		createComment(div, el.name, el.text, el.date);

		div.append(deleteBtn);
		div.append(likeBtn)
		return div;
	})

	return commentList.prepend(...commentElements);
}



function createComment(div, name, text, date) {
	return div.innerHTML = `<div >
	<div class = 'commnet__name'>
		${name}
		<span>${getDays(date)}</span>
	</div>
	<div class = 'comment__text'>
		${text}
	</div>
</div>`
}

getComments(comments)



