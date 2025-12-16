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

export function filterGamesByPlayers(games) {
	let updatedAvailableGames = [];
	let updatedUnavailableGames = [];

	if (chosenPlayersNumber) {
		updatedAvailableGames = games.filter(
			(game) =>
				game.minPlayers <= chosenPlayersNumber &&
				game.maxPlayers >= chosenPlayersNumber
		);
		updatedUnavailableGames = games.filter(
			(game) =>
				game.minPlayers > chosenPlayersNumber ||
				game.maxPlayers < chosenPlayersNumber
		);
	} else {
		updatedAvailableGames = games;
		updatedUnavailableGames = [];
	}

	setAvailableGames(updatedAvailableGames);
	setUnavailableGames(updatedUnavailableGames);
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
	filterGamesByPlayers(allGames);
	setRandomGame({ game: null, isFromAI: false });

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
