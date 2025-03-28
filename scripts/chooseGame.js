import { showElement, hideElement } from './scripts.js';
import { availableGames } from './boardgames.js';
import { chosenPlayersNumber } from './playersNumber.js';

const chosenGameSection = document.getElementById('chosenGameSection');

let randomGame = null;

export function setRandomGame(game) {
	randomGame = game;

	if (!game) {
		hideElement(chosenGameSection);
	} else {
		showElement(chosenGameSection);
	}
}

function renderChosenGameCard() {
	const title = document.getElementById('chosenGameTitle');
	const image = document.getElementById('chosenGameImage');
	const description = document.getElementById('chosenGameDescription');

	if (randomGame) {
		title.textContent = randomGame.name;
		image.src = randomGame.image;
		image.alt = randomGame.name;
		description.textContent = `Jogadores: ${randomGame.minPlayers} a ${randomGame.maxPlayers}`;
	}
}

function chooseRandomGame() {
	const randomIndex = Math.floor(Math.random() * availableGames.length);
	setRandomGame(availableGames[randomIndex]);
	renderChosenGameCard();
}

export function updateChooseGameButtonState() {
	const button = document.getElementById('randomGameButton');
	const textHelp = document.getElementById('randomGameButtonTextHelp');

	if (chosenPlayersNumber) {
		button.disabled = false; // Habilita o botão
		textHelp.style.display = 'none'; // Esconde o texto
	} else {
		button.disabled = true; // Desabilita o botão
		textHelp.style.display = 'block'; // Exibe o texto
	}
}

window.chooseRandomGame = chooseRandomGame;
