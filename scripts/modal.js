import { showElement, hideElement } from './scripts.js';
import {
	gameNameInput,
	gameMinPlayersInput,
	gameMaxPlayersInput,
	gameImageInput,
	toggleAddButton,
} from './addGame.js';

const modalOverlay = document.getElementById('modalOverlay');
const addGameModal = document.getElementById('addGameModal');

function openAddGameModal() {
	showElement(addGameModal);
	showElement(modalOverlay);
	document.body.classList.add('modalOpen');
}

export function closeAddGameModal() {
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