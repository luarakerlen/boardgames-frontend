import { showElement, hideElement } from './utils.js';
import { availableGames } from './boardgames.js';
import { chosenPlayersNumber } from './playersNumber.js';

const chosenGameSection = document.getElementById('chosenGameSection');
const randomGameSection = document.getElementById('randomGameSection');
const AIExplanationSection = document.getElementById('AIExplanationSection');
const AIDivider = document.getElementById('AIDivider');
const AIChosenGameTitle = document.getElementById('AIChosenGameTitle');
const AIExplanationText = document.getElementById('AIExplanationText');

let randomGame = null;

export function setRandomGame({ game, isFromAI, aiSuggestion = {} }) {
	randomGame = game;
	hideElement(chosenGameSection);
	hideElement(AIExplanationSection);
	hideElement(randomGameSection);

	if (isFromAI) {
		if (game) {
			showElement(randomGameSection);
			showElement(AIDivider);
			AIChosenGameTitle.textContent = '';
		} else {
			randomGame = null;
			hideElement(AIDivider);
			AIChosenGameTitle.textContent = aiSuggestion.name;
		}
		AIExplanationText.textContent = aiSuggestion.explanation;
		showElement(chosenGameSection);
		showElement(AIExplanationSection);
	} else {
		hideElement(AIExplanationSection);
		if (game) {
			showElement(chosenGameSection);
			showElement(randomGameSection);
		} else {
			hideElement(chosenGameSection);
		}
	}
}

export function renderChosenGameCard() {
	const title = document.getElementById('chosenGameTitle');
	const image = document.getElementById('chosenGameImage');
	const description = document.getElementById('chosenGameDescription');
	const ludopedia = document.getElementById('chosenGameLudopediaLink');

	if (randomGame) {
		title.textContent = randomGame.name;
		image.src = randomGame.imageUrl;
		image.alt = randomGame.name;
		description.textContent = `Jogadores: ${randomGame.minPlayers} a ${randomGame.maxPlayers}`;
		ludopedia.href = randomGame.ludopediaUrl;
		ludopedia.target = '_blank';
	}
}

function chooseRandomGame() {
	const randomIndex = Math.floor(Math.random() * availableGames.length);
	setRandomGame({ game: availableGames[randomIndex], isFromAI: false });
	renderChosenGameCard();
}

export function updateChooseGameButtonState() {
	const buttons = document.querySelectorAll('.chooseGameButton');
	const randomGameButton = document.getElementById('randomGameButton');
	const AIGameButton = document.getElementById('AIGameButton');

	const randomText = document.getElementById('randomGameButtonText');
	const AIText = document.getElementById('AIGameButtonText');

	const textsHelp = document.querySelectorAll('.chooseGameButtonTextHelp');
	const randomTextHelp = document.getElementById('randomGameButtonTextHelp');
	const AITextHelp = document.getElementById('AIGameButtonTextHelp');

	const aiGameInput = document.getElementById('aiGameInput');

	randomText.textContent = 'Escolher um jogo aleatoriamente';
	AIText.textContent = 'Pedir sugestão para a IA';
	textsHelp.forEach(
		(el) => (el.textContent = '(escolha a quantidade de jogadores primeiro)')
	);

	if (!!chosenPlayersNumber && availableGames.length > 0) {
		buttons.forEach((btn) => (btn.disabled = false)); // Habilita os botões
		textsHelp.forEach((el) => (el.style.display = 'none')); // Esconde os textos de apoio
		aiGameInput.disabled = false; // Habilita o input de IA
	} else if (!!chosenPlayersNumber && availableGames.length === 0) {
		AIGameButton.disabled = false; // Habilita o botão de IA
		AITextHelp.style.display = 'none'; // Esconde o texto de apoio da IA
		aiGameInput.disabled = false; // Habilita o input de IA

		randomGameButton.disabled = true; // Desabilita o botão de escolher aleatoriamente
		randomText.textContent =
			'Nenhum jogo disponível para o número de jogadores escolhido.';
		randomTextHelp.textContent = 'Escolha outro número de jogadores.';
		randomTextHelp.style.display = 'block';
	} else {
		buttons.forEach((btn) => (btn.disabled = true)); // Desabilita os botões
		textsHelp.forEach((el) => (el.style.display = 'block')); // Exibe os textos de apoio
		aiGameInput.disabled = true; // Desabilita o input de IA
	}
}

window.chooseRandomGame = chooseRandomGame;
