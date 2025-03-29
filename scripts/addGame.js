const addGameButton = document.getElementById('addGameButton');

export const gameNameInput = document.querySelector('#gameName');
export const gameMinPlayersInput = document.querySelector('#gameMinPlayers');
export const gameMaxPlayersInput = document.querySelector('#gameMaxPlayers');
export const gameImageInput = document.querySelector('#gameImage');

function isAddButtonDisabled() {
	console.log('gameNameInput.value', gameNameInput.value);
	console.log('gameMinPlayersInput.value', gameMinPlayersInput.value);
	console.log('gameMaxPlayersInput.value', gameMaxPlayersInput.value);
	console.log('gameImageInput.value', gameImageInput.value);

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
