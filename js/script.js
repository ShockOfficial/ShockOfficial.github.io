import API_KEY from './apikey.js';
import TEMPLATE_ID from './apikey.js';
import SERVICE_ID from './apikey.js';

let $navBars;
let $menu;
let $exit;
let $bars;
let $menuItems;
let $menuMobbile;
let $footerYear;
let $home;
let $about;
let $projects;
let $contact;
let $contactBtn;
let $navContainer;

let $nameField;
let $surnameField;
let $emailField;
let $areaField;

let $error;
let $errorIcon;
let $errorTriangle;
let $errorTime;
let $errorTitle;
let $errorDesc;
let $notifySound;

function prepareDomElements() {
	$menu = document.querySelector('.nav');
	$menuMobbile = document.querySelector('.nav__menu-box');
	$navBars = document.querySelector('.nav__bars');
	$bars = document.querySelector('#bars');
	$exit = document.querySelector('#exit');
	$menuItems = document.querySelectorAll('.nav__link');
	$footerYear = document.querySelector('.footer__year');
	$footerYear.textContent = new Date().getFullYear();
	$navContainer = document.querySelector('.nav__container');

	$home = document.querySelector('#home');
	$about = document.querySelector('#about');
	$projects = document.querySelector('#projects');
	$contact = document.querySelector('#contact');

	$contactBtn = document.querySelector('.contact__btn');

	$nameField = document.querySelector('input#name');
	$surnameField = document.querySelector('input#surname');
	$emailField = document.querySelector('input#email');
	$areaField = document.querySelector('textarea#area');

	$error = document.querySelector('.error');
	$errorIcon = document.querySelector('#app');
	$errorTriangle = document.querySelector('.error__icon-triangle');
	$errorTime = document.querySelector('.error__time');
	$errorTitle = document.querySelector('.error__title');
	$errorDesc = document.querySelector('.error__description');
	$notifySound = new Audio('../sound/notifySound.mp3');
}

function prepareDomEvents() {
	$navBars.addEventListener('click', swipeMenu);
	for (const item of $menuItems) {
		item.addEventListener('click', swipeMenu);
	}

	$contactBtn.addEventListener('click', sendEmial);

	// Check if window width is lower than 900 if yes add hide to nav container
	window.addEventListener('load', () => {
		if (window.innerWidth < 900) {
			$navContainer.classList.add('hide');
		}
	});

	// Listen the window width change,
	window.addEventListener('resize', () => {
		if (window.innerWidth < 900) {
			$navContainer.classList.add('hide');
		} else {
			$navContainer.classList.remove('hide');
		}
	});

	// Listen scroll and add background to menu
	document.addEventListener('scroll', addBackgroundToMenu);

	// Animation on scroll
	VanillaTilt.init(document.querySelectorAll('.skills__item'), {
		max: 15,
		speed: 400,
		glare: true,
		scale: 1.1,
		'max-glare': 1,
		'glare-prerender': false,
		gyroscope: false,
	});

	// Scroll spy
	window.addEventListener('scroll', () => {
		let windo = window.pageYOffset + 200;
		const menuItems = document.querySelectorAll('.nav__menu-box a');
		menuItems.forEach((el) => {
			el.classList.remove('active');
		});
		if ($about.offsetTop <= windo && $projects.offsetTop >= windo) {
			menuItems[1].classList.add('active');
		} else if ($projects.offsetTop <= windo && $contact.offsetTop >= windo) {
			menuItems[2].classList.add('active');
		} else if ($contact.offsetTop <= windo) {
			menuItems[3].classList.add('active');
		} else {
			menuItems[0].classList.add('active');
		}
	});
}

function swipeMenuDown() {
	const navContainer = document.querySelector('.nav-container');
	navContainer.classList.toggle('hide');
	$menu.classList.toggle('swipe');
}

function swipeMenu() {
	if (window.innerWidth < 900) {
		$menu.classList.toggle('swipe');
		$menuMobbile.classList.toggle('swipe');
		$bars.classList.toggle('hide');
		$exit.classList.toggle('hide');
		$navContainer.classList.toggle('hide');
	}
}

function addBackgroundToMenu() {
	if (window.scrollY > 730) {
		$menu.classList.add('menuBackground');
	} else {
		$menu.classList.remove('menuBackground');
	}
}

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	console.log(new String(email).toLowerCase());
	console.log(re.test(new String(email).toLowerCase()));
	return re.test(new String(email).toLowerCase());
}

function sendEmial(params) {
	const numbers = /\d/;

	if (
		$nameField.value === '' ||
		$surnameField.value === '' ||
		$emailField.value === '' ||
		$areaField.value === ''
	) {
		$errorTitle.textContent = 'BŁĄD!';
		$errorIcon.innerHTML =
			'<img class="error__app" alt="Gmail icon (2020)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/32px-Gmail_icon_%282020%29.svg.png">';
		$errorDesc.textContent = 'Wypełnij wszystkie pola!';
	} else if (
		numbers.test($nameField.value) ||
		numbers.test($surnameField.value) ||
		$nameField.value.length < 3 ||
		$surnameField.value.length < 3
	) {
		$errorTitle.textContent = 'BŁĄD!';
		$errorIcon.innerHTML =
			'<img class="error__app" alt="Gmail icon (2020)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/32px-Gmail_icon_%282020%29.svg.png">';
		$errorDesc.textContent = 'Wpisz swoje dane prawidłowo!';
	} else if (!validateEmail($emailField.value)) {
		$errorTitle.textContent = 'BŁĄD!';
		$errorIcon.innerHTML =
			'<img class="error__app" alt="Gmail icon (2020)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/32px-Gmail_icon_%282020%29.svg.png">';
		$errorDesc.textContent = 'Wpisz poprawny email!';
	} else {
		let tempParams = {
			from_name: `${$nameField.value} ${$surnameField.value}`,
			from_email: $emailField.value,
			to_name: 'Paweł',
			message: $areaField.value,
		};

		emailjs
			.send(API_KEY.SERVICE_ID, API_KEY.TEMPLATE_ID, tempParams)
			.then(function (respond) {
				succesEmail();
				showPopup();
				console.log(respond);
				clearInputs();
			});

		return;
	}
	showPopup();
}

function succesEmail() {
	$errorTitle.textContent = 'sukces!';
	$errorTitle.style.color = '#009432';
	$errorTriangle.style.color = '#009432';
	$errorDesc.textContent = 'Wysłano wiadomość pomyślnie!';
	$errorIcon.innerHTML =
		'<img class="error__app" src="./img/success.svg" alt="">';
}

function clearInputs() {
	$nameField.value = '';
	$surnameField.value = '';
	$emailField.value = '';
	$areaField.value = '';
}

function showPopup() {
	$notifySound.play();
	$errorTime.textContent = new Date().toLocaleTimeString().slice(0, -3);
	$error.classList.remove('hide');
	$error.classList.add('notify');
	$contactBtn.disabled = true;
	setTimeout(() => {
		$error.classList.add('hide');
	}, 3500);
	setTimeout(() => {
		$error.classList.remove('notify');
		$errorTitle.removeAttribute('style');
		$errorTriangle.removeAttribute('style');
		$contactBtn.disabled = false;
	}, 3800);
}

function main() {
	(function () {
		emailjs.init(API_KEY.API_KEY);
	})();
	prepareDomElements();
	prepareDomEvents();
	AOS.init();
}

document.addEventListener('DOMContentLoaded', main);
