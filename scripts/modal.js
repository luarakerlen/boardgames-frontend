import { showElement, hideElement } from './utils.js';
import {
	gameNameInput,
	gameMinPlayersInput,
	gameMaxPlayersInput,
	gameImageInput,
	gameLudopediaInput,
	toggleAddButton,
} from './addGame.js';

const modalOverlay = document.getElementById('modalOverlay');
const addGameModal = document.getElementById('addGameModal');
const gameModalTitle = document.getElementById('gameModalTitle');
const gameModalButton = document.getElementById('addGameButton');

let currentMode = 'add';
let currentGameId = null;

function openAddGameModal() {
	// Definir que estamos em modo de adição
	currentMode = 'add';
	currentGameId = null;
	gameModalTitle.textContent = 'Adicionar novo jogo';
	gameModalButton.textContent = 'Adicionar Jogo';

	showElement(addGameModal);
	showElement(modalOverlay);
	document.body.classList.add('modalOpen');
}

export function openEditGameModal(game) {
	// Definir que estamos em modo de edição
	currentMode = 'edit';
	currentGameId = game?.id ?? null;
	gameModalTitle.textContent = 'Editar jogo';
	gameModalButton.textContent = 'Salvar alterações';

	// Preencher os campos com os dados do jogo
	gameNameInput.value = game?.name ?? null;
	gameMinPlayersInput.value = game?.minPlayers ?? null;
	gameMaxPlayersInput.value = game?.maxPlayers ?? null;
	gameImageInput.value = game?.image ?? null;
	gameLudopediaInput.value = game?.ludopedia ?? null;

	showElement(addGameModal);
	document.body.classList.add('modalOpen');

	toggleAddButton();
}

export function closeAddGameModal() {
	hideElement(addGameModal);
	hideElement(modalOverlay);
	document.body.classList.remove('modalOpen');

	gameNameInput.value = null;
	gameMinPlayersInput.value = null;
	gameMaxPlayersInput.value = null;
	gameImageInput.value = null;
	gameLudopediaInput.value = null;

	toggleAddButton();
}

window.openAddGameModal = openAddGameModal;
window.closeAddGameModal = closeAddGameModal;

document
	.getElementById('modalOverlay')
	.addEventListener('click', closeAddGameModal);

gameModalButton.addEventListener('click', (event) => {
	event.preventDefault();
	
	if (currentMode === 'add') {
		window.handleAddGame(event);
	} else if (currentMode === 'edit') {
		window.handleEditGame(event);
	}
});

export { currentMode, currentGameId };
