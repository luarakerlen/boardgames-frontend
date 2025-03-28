import { boardgames } from '../data/boardgames.js';

const playersList = document.getElementById('playersList');
const playersNumber = Array.from({ length: 10 }, (_, i) => i + 1);
let chosenPlayersNumber = null;

const allGames = boardgames;
let availableGames = allGames;
let unavailableGames = [];
let randomGame = null;

// FUNÇÕES DOS BOTÕES INICIAIS DO HEADER
function scrollToUnavailableGames() {
	const unavailableGamesRef = document.getElementById('unavailable-games');
	if (unavailableGamesRef) {
		unavailableGamesRef.scrollIntoView({
			behavior: 'smooth',
		});
	}
}

function handleReset() {
	chosenPlayersNumber = null;
	availableGames = allGames;
	unavailableGames = [];
	randomGame = null;
	updateHeaderButtonsVisibility();
}

function updateHeaderButtonsVisibility() {
	const headerButtons = document.getElementById('headerButtons');
	const hasUnavailableGames = unavailableGames.length > 0;
	const shouldShowHeaderButtons = hasUnavailableGames || chosenPlayersNumber; // Defina essas variáveis conforme sua lógica

	if (shouldShowHeaderButtons) {
		headerButtons.classList.add('visible');
		headerButtons.classList.remove('hidden');
	} else {
		headerButtons.classList.add('hidden');
		headerButtons.classList.remove('visible');
	}
}

// FUNÇÕES DOS BOTÕES DE QUANTIDADE DE JOGADORES
function handlePlayersNumber(number) {
	chosenPlayersNumber = number;

	// Remove classe 'active' de todos os botões
	document.querySelectorAll('.playersNumber ul li button').forEach((button) => {
		button.classList.remove('active');
	});

	// Adiciona classe 'active' ao botão clicado
	const activeButton = document.querySelector(
		`button[data-number="${number}"]`
	);
	if (activeButton) {
		activeButton.classList.add('active');
	}

	// Filtrando os jogos disponíveis para a quantidade de jogadores escolhida
	availableGames = allGames.filter(
		(game) => game.minPlayers <= number && game.maxPlayers >= number
	);

	unavailableGames = allGames.filter(
		(game) => game.minPlayers > number || game.maxPlayers < number
	);

	updateHeaderButtonsVisibility();

	console.log('Jogos Disponíveis:', availableGames);
	console.log('Jogos Indisponíveis:', unavailableGames);
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

window.handleReset = handleReset;
window.scrollToUnavailableGames = scrollToUnavailableGames;
