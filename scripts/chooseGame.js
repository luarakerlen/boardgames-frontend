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
	const ludopedia = document.getElementById('chosenGameLudopediaLink');

	if (randomGame) {
		title.textContent = randomGame.name;
		image.src = randomGame.image;
		image.alt = randomGame.name;
		description.textContent = `Jogadores: ${randomGame.minPlayers} a ${randomGame.maxPlayers}`;
		ludopedia.href = randomGame.ludopediaURL;
		ludopedia.target = '_blank';
	}
}

function chooseRandomGame() {
	const randomIndex = Math.floor(Math.random() * availableGames.length);
	setRandomGame(availableGames[randomIndex]);
	renderChosenGameCard();
}

export function updateChooseGameButtonState() {
	const button = document.getElementById('randomGameButton');
	const text = document.getElementById('randomGameButtonText');
	const textHelp = document.getElementById('randomGameButtonTextHelp');

	if (!!chosenPlayersNumber && availableGames.length > 0) {
		button.disabled = false; // Habilita o botão
		textHelp.style.display = 'none'; // Esconde o texto de apoio

		text.textContent = 'Escolher um jogo aleatoriamente';
		textHelp.textContent = '(escolha a quantidade de jogadores primeiro)';
	} else {
		button.disabled = true; // Desabilita o botão
		textHelp.style.display = 'block'; // Exibe o texto de apoio
	}

	if (availableGames.length === 0) {
		text.textContent =
			'Nenhum jogo disponível para o número de jogadores escolhido.';
		textHelp.textContent = 'Escolha outro número de jogadores.';
	}
}

window.chooseRandomGame = chooseRandomGame;
