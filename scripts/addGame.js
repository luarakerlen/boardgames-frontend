import { closeAddGameModal, currentGameId } from './modal.js';
import { addGame, updateGame } from './backend.js';
import { chosenPlayersNumber, filterGamesByPlayers } from './playersNumber.js';
import { renderGamesList } from './cardList.js';
import {
	allGames,
	setAllGames,
	availableGames,
	unavailableGames,
	setAvailableGames,
	setUnavailableGames,
} from './boardgames.js';

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
		const newGame = await addGame(formData);

		// atualiza a lista de jogos
		setAllGames([...allGames, newGame]);

		if (
			!!chosenPlayersNumber &&
			(newGame.minPlayers > chosenPlayersNumber ||
				newGame.maxPlayers < chosenPlayersNumber)
		) {
			setUnavailableGames([...unavailableGames, newGame]);
		} else {
			setAvailableGames([...availableGames, newGame]);
		}

		renderGamesList();
		closeAddGameModal();

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

async function handleEditGame(event) {
	event.preventDefault();

	// Captura os valores dos inputs
	const game = {
		name: gameNameInput.value.trim(),
		min_players: parseInt(gameMinPlayersInput.value),
		max_players: parseInt(gameMaxPlayersInput.value),
		image_url: gameImageInput.value.trim() || null,
		ludopedia_url: gameLudopediaInput.value.trim() || null,
	};

	// Adiciona os valores ao FormData
	const formData = new FormData();
	Object.entries(game).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			formData.append(key, value);
		}
	});

	try {
		const editedGame = await updateGame(currentGameId, formData);

		// atualiza a lista de jogos
		const updatedGames = allGames.map((game) =>
			game.id === currentGameId ? editedGame : game
		);

		setAllGames(updatedGames);
		filterGamesByPlayers(updatedGames);

		closeAddGameModal();
		renderGamesList();

		Swal.fire({
			title: 'Sucesso!',
			text: 'O jogo foi editado com sucesso!',
			icon: 'success',
			confirmButtonText: 'OK',
			confirmButtonColor: '#007bff',
		});
	} catch (error) {
		console.error('Erro ao editar jogo:', error.message || error);
		Swal.fire({
			icon: 'error',
			title: 'Erro ao editar jogo',
			text: error.message || 'Tente novamente mais tarde.',
		});
	}
}

window.handleAddGame = handleAddGame;
window.handleEditGame = handleEditGame;
