import { closeAddGameModal } from './modal.js';

const addGameButton = document.getElementById('addGameButton');

export const gameNameInput = document.querySelector('#gameName');
export const gameMinPlayersInput = document.querySelector('#gameMinPlayers');
export const gameMaxPlayersInput = document.querySelector('#gameMaxPlayers');
export const gameImageInput = document.querySelector('#gameImage');

function handleAddGame(event) {
  event.preventDefault();
  closeAddGameModal();

	Swal.fire({
		title: 'Sucesso!',
		text: 'O jogo foi adicionado à coleção.',
		icon: 'success',
		confirmButtonText: 'OK',
    confirmButtonColor: '#007bff',
	});
}

function isAddButtonDisabled() {
	return (
		!gameNameInput.value.trim() ||
		!gameMinPlayersInput.value ||
		!gameMaxPlayersInput.value
	);
}

export function toggleAddButton() {
	if (isAddButtonDisabled()) {
		addGameButton.setAttribute('disabled', 'true');
	} else {
		addGameButton.removeAttribute('disabled');
	}
}

gameNameInput.addEventListener('input', toggleAddButton);
gameMinPlayersInput.addEventListener('input', toggleAddButton);
gameMaxPlayersInput.addEventListener('input', toggleAddButton);

toggleAddButton();

window.handleAddGame = handleAddGame;
