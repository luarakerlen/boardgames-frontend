import { closeAddGameModal } from './modal.js';
import { addGame } from './backend.js';

const addGameButton = document.getElementById('addGameButton');

export const gameNameInput = document.querySelector('#gameName');
export const gameMinPlayersInput = document.querySelector('#gameMinPlayers');
export const gameMaxPlayersInput = document.querySelector('#gameMaxPlayers');
export const gameImageInput = document.querySelector('#gameImage');

function isAddButtonDisabled() {
	return (
		!gameNameInput.value.trim() ||
		!gameMinPlayersInput.value ||
		!gameMaxPlayersInput.value
	);
}

async function handleAddGame(event) {
	event.preventDefault();
	closeAddGameModal();

	const formData = new FormData();
	formData.append('name', gameNameInput.value);
	formData.append('min_players', gameMinPlayersInput.value);
	formData.append('max_players', gameMaxPlayersInput.value);
	formData.append('image_url', gameImageInput.value);
	console.log('formData', formData);

	try {
		const result = await addGame(formData);

		Swal.fire({
				title: 'Sucesso!',
				text: 'O jogo foi adicionado à coleção.',
				icon: 'success',
				confirmButtonText: 'OK',
				confirmButtonColor: '#007bff',
			});
	} catch (error) {
		console.error('Erro ao adicionar jogo:', error.message || error);
		Swal.fire({
			title: 'Erro!',
			text: `Ocorreu um erro ao adicionar o jogo: ${error.message || 'Erro desconhecido'}`,
			icon: 'error',
			confirmButtonText: 'OK',
			confirmButtonColor: '#dc3545',
		});
	}
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
