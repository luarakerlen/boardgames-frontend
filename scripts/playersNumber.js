import { updateHeaderButtonsVisibility } from './header.js';
import { updateChooseGameButtonState, setRandomGame } from './chooseGame.js';
import { renderGamesList } from './cardList.js';
import {
	allGames,
	setAvailableGames,
	setUnavailableGames,
} from './boardgames.js';

const playersList = document.getElementById('playersList');
const playersNumber = Array.from({ length: 10 }, (_, i) => i + 1);

export let chosenPlayersNumber = null;
export function setChosenPlayersNumber(number) {
	chosenPlayersNumber = number;
}

export function removeAllActiveClass() {
	document.querySelectorAll('.playersNumber ul li button').forEach((button) => {
		button.classList.remove('active');
	});
}

function handlePlayersNumber(number) {
	setChosenPlayersNumber(number);
	removeAllActiveClass();

	// Adiciona classe 'active' ao botão clicado
	const activeButton = document.querySelector(
		`button[data-number="${number}"]`
	);
	if (activeButton) {
		activeButton.classList.add('active');
	}

	// Filtrando os jogos disponíveis para a quantidade de jogadores escolhida
	const availableGames = allGames.filter(
		(game) => game.minPlayers <= number && game.maxPlayers >= number
	);

	const unavailableGames = allGames.filter(
		(game) => game.minPlayers > number || game.maxPlayers < number
	);

	setAvailableGames(availableGames);
	setUnavailableGames(unavailableGames);
	setRandomGame(null);

	updateHeaderButtonsVisibility();
	updateChooseGameButtonState();

	renderGamesList();
}

// CRIANDO OS BOTÕES DE QUANTIDADE DE JOGADORES DINAMICAMENTE
playersNumber.forEach((number) => {
	const li = document.createElement('li');
	const button = document.createElement('button');

	button.textContent = number;
	button.setAttribute('data-number', number);
	button.onclick = () => handlePlayersNumber(number);

	li.appendChild(button);
	playersList.appendChild(li);
});
