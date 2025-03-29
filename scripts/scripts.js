import {
	gameNameInput,
	gameMinPlayersInput,
	gameMaxPlayersInput,
	gameImageInput,
	toggleAddButton,
} from './addGame.js';

export function showElement(element) {
	element.classList.remove('hidden');
	element.classList.add('visible');
}

export function hideElement(element) {
	element.classList.remove('visible');
	element.classList.add('hidden');
}

// Funções dos botões
const modalOverlay = document.getElementById('modalOverlay');
const addGameModal = document.getElementById('addGameModal');
const scrollToTopButton = document.getElementById('scrollToTopButton');
const SCROLL_THRESHOLD = 250;

function toggleVisible() {
	if (document.documentElement.scrollTop > SCROLL_THRESHOLD) {
		showElement(scrollToTopButton);
	} else {
		hideElement(scrollToTopButton);
	}
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

function openAddGameModal() {
	showElement(addGameModal);
	showElement(modalOverlay);
	document.body.classList.add('modalOpen');
}

function closeAddGameModal() {
	hideElement(addGameModal);
	hideElement(modalOverlay);
	document.body.classList.remove('modalOpen');

	gameNameInput.value = null;
	gameMinPlayersInput.value = null;
	gameMaxPlayersInput.value = null;
	gameImageInput.value = null;

	toggleAddButton();
}

window.openAddGameModal = openAddGameModal;
window.closeAddGameModal = closeAddGameModal;
document
	.getElementById('modalOverlay')
	.addEventListener('click', closeAddGameModal);

window.scrollToTop = scrollToTop;
window.addEventListener('scroll', toggleVisible);
