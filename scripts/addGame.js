import { closeAddGameModal } from './modal.js';
import { addGame } from './backend.js';

const addGameButton = document.getElementById('addGameButton');

export const gameNameInput = document.querySelector('#gameName');
export const gameMinPlayersInput = document.querySelector('#gameMinPlayers');
export const gameMaxPlayersInput = document.querySelector('#gameMaxPlayers');
export const gameImageInput = document.querySelector('#gameImage');
export const gameLudopediaInput = document.querySelector('#gameLudopedia');

function isAddButtonDisabled() {
	return (
		!gameNameInput.value.trim() ||
		!gameMinPlayersInput.value ||
		!gameMaxPlayersInput.value
	);
}

async function handleAddGame(event) {
	event.preventDefault();

	// Captura os valores dos inputs
	const name = gameNameInput.value.trim();
	const minPlayers = gameMinPlayersInput.value.trim();
	const maxPlayers = gameMaxPlayersInput.value.trim();
	const imageUrl = gameImageInput.value.trim();
	const ludopediaUrl = gameLudopediaInput.value.trim();

	// Adiciona os valores ao FormData
	const formData = new FormData();
	formData.append('name', name);
	formData.append('min_players', minPlayers);
	formData.append('max_players', maxPlayers);
	formData.append('image_url', imageUrl);
	formData.append('ludopedia_url', ludopediaUrl);

	try {
		await addGame(formData);

		Swal.fire({
			title: 'Sucesso!',
			text: 'O jogo foi adicionado à coleção.',
			icon: 'success',
			confirmButtonText: 'OK',
			confirmButtonColor: '#007bff',
		});

		closeAddGameModal();
	} catch (error) {
		console.error('Erro ao adicionar jogo:', error.message || error);
		Swal.fire({
			title: 'Erro!',
			text: `Ocorreu um erro ao adicionar o jogo: ${
				error.message || 'Erro desconhecido'
			}`,
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
