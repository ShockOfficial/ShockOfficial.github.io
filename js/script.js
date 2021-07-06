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

function swipeMenu() {
	$menu.classList.toggle('swipe');
}

function prepareDomElements() {
	$menu = document.querySelector('.nav');
	$menuMobbile = document.querySelector('.nav__menu-box');
	$navBars = document.querySelector('.nav__bars');
	$bars = document.querySelector('#bars');
	$exit = document.querySelector('#exit');
	$menuItems = document.querySelectorAll('.nav__link');
	$footerYear = document.querySelector('.footer__year');
	$footerYear.textContent = new Date().getFullYear();

	$home = document.querySelector('#home');
	$about = document.querySelector('#about');
	$projects = document.querySelector('#projects');
	$contact = document.querySelector('#contact');
}

function prepareDomEvents() {
	$navBars.addEventListener('click', swipeMenu);
	for (const item of $menuItems) {
		item.addEventListener('click', swipeMenu);
	}
	document.addEventListener('scroll', addBackgroundToMenu);
	VanillaTilt.init(document.querySelectorAll('.skills__item'), {
		max: 15,
		speed: 400,
		glare: true,
		scale: 1.1,
		'max-glare': 1,
		'glare-prerender': false,
	});

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

function swipeMenu() {
	if (window.innerWidth < 900) {
		$menu.classList.toggle('swipe');
		$menuMobbile.classList.toggle('swipe');
		$bars.classList.toggle('hide');
		$exit.classList.toggle('hide');
	}
}

function addBackgroundToMenu() {
	if (window.scrollY > 730) {
		$menu.classList.add('menuBackground');
	} else {
		$menu.classList.remove('menuBackground');
	}
}

function main() {
	prepareDomElements();
	prepareDomEvents();
	AOS.init();
}

document.addEventListener('DOMContentLoaded', main);
