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
	const cardTitle = document.getElementById('chosenGameTitle');
	const cardImage = document.getElementById('chosenGameImage');
	const cardDescription = document.getElementById('chosenGameDescription');

	if (randomGame) {
		cardTitle.textContent = randomGame.name;
		cardImage.src = randomGame.image;
		cardImage.alt = randomGame.name;
		cardDescription.textContent = `Jogadores: ${randomGame.minPlayers} a ${randomGame.maxPlayers}`;
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
