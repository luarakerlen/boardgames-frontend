/**
 * VARIABLES
 */
const BASE_URL = 'http://127.0.0.1:5001';
const boardgames = [];

const defaultLudopediaUrl = 'https://ludopedia.com.br/search?search=';
const defaultImage =
	'data:image/png;base64,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';

let chosenPlayersNumber = null;

/**
 * BACKEND - INÍCIO
 */

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de jogos de tabuleiro existentes do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
async function getList() {
	const url = `${BASE_URL}/boardgames`;

	try {
		const response = await fetch(url, { method: 'get' });
		const data = await response.json();

		if (response.ok) {
			boardgames.push(
				...data.boardgames.map((game) => convertAPIResponseToGameObject(game))
			);

			renderGamesList();
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

getList();

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo jogo de tabuleiro ao servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

async function addGame(game) {
	const url = `${BASE_URL}/boardgame`;

	try {
		const response = await fetch(url, {
			method: 'post',
			body: game,
		});

		if (!response.ok) {
			const errorMessage = await response.text();

			throw new Error(
				JSON.parse(errorMessage).message ||
					'Erro desconhecido ao adicionar o jogo'
			);
		}

		const data = await response.json();
		const newGame = convertAPIResponseToGameObject(data);

		return newGame;
	} catch (error) {
		console.error('Erro ao adicionar jogo no backend:', error.message || error);
		throw error;
	}
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um jogo de tabuleiro do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/

async function deleteGame(id) {
	const url = `${BASE_URL}/boardgame?id=${id}`;

	try {
		const response = await fetch(url, {
			method: 'delete',
		});

		if (!response.ok) {
			const errorMessage = await response.text();

			throw new Error(
				JSON.parse(errorMessage).message ||
					'Erro desconhecido ao deletar o jogo'
			);
		}
	} catch (error) {
		console.error('Erro ao deletar jogo no backend:', error.message || error);
		throw error;
	}
}

function convertAPIResponseToGameObject(game) {
	return {
		id: game.id,
		name: game.name,
		minPlayers: game.min_players,
		maxPlayers: game.max_players,
		imageUrl: game.image_url || defaultImage,
		ludopediaUrl: game.ludopedia_url || `${defaultLudopediaUrl}${game.name}`,
	};
}

/**
 * BACKEND - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * BOARDGAMES - INÍCIO
 */

let allGames = boardgames;
function setAllGames(games) {
	allGames = games;
}

let availableGames = allGames;
function setAvailableGames(games) {
	availableGames = games;
}

let unavailableGames = [];
function setUnavailableGames(games) {
	unavailableGames = games;
}

/**
 * BOARDGAMES - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * UTILS - INÍCIO
 */

function showElement(element) {
	element.classList.remove('hidden');
	element.classList.add('visible');
}

function hideElement(element) {
	element.classList.remove('visible');
	element.classList.add('hidden');
}

/**
 * UTILS - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * SCROLL TOP - INÍCIO
 */

const scrollToTopButton = document.getElementById('scrollToTopButton');
const SCROLL_THRESHOLD = 250;

function toggleVisible() {
	if (document.documentElement.scrollTop > SCROLL_THRESHOLD) {
		showElement(scrollToTopButton);
	} else {
		hideElement(scrollToTopButton);
	}
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

window.scrollToTop = scrollToTop;
window.addEventListener('scroll', toggleVisible);

/**
 * SCROLL TOP - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * CARD LIST - INÍCIO
 */

const unavailableGamesSection = document.getElementById(
	'unavailableGamesSection'
);

const availableGamesCount = document.getElementById('availableGamesCount');
const unavailableGamesCount = document.getElementById('unavailableGamesCount');

const availableGamesList = document.getElementById('availableGamesList');
const unavailableGamesList = document.getElementById('unavailableGamesList');

function renderGameCard(game, list, isAvailable) {
	// Cria o título do header
	const title = document.createElement('h3');
	title.classList.add('cardTitle');
	title.textContent = game.name;

	// Define as classes do botão e do ícone de acordo com a disponibilidade do jogo
	const classButton = isAvailable
		? 'cardButtonIconAvailable'
		: 'cardButtonIconUnavailable';
	const classIcon = isAvailable ? 'fa-ban' : 'fa-square-plus';
	const classTypeIcon = isAvailable ? 'fa-solid' : 'fa-regular';

	// Cria os ícones dos botões
	const deleteIcon = document.createElement('i');
	deleteIcon.classList.add('fa-solid', 'fa-trash', 'fa-xl');

	const availabilityIcon = document.createElement('i');
	availabilityIcon.classList.add('fa-xl', classIcon, classTypeIcon);

	// Cria os tooltips
	const deleteTooltip = document.createElement('span');
	deleteTooltip.classList.add('tooltipText');
	deleteTooltip.textContent = 'Deletar jogo';

	const availabilityTooltip = document.createElement('span');
	availabilityTooltip.classList.add('tooltipText');
	availabilityTooltip.textContent = isAvailable
		? 'Tornar indisponível'
		: 'Tornar disponível';

	// Cria o botão de deletar
	const deleteButton = document.createElement('button');
	deleteButton.classList.add(
		'cardButton',
		'tooltip',
		'cardButtonIconAvailable'
	);
	deleteButton.appendChild(deleteIcon);
	deleteButton.appendChild(deleteTooltip);
	deleteButton.addEventListener('click', () => {
		handleDeleteGameClick(game);
	});

	// Cria o botão de tornar disponível ou indisponível
	const availabilityButton = document.createElement('button');
	availabilityButton.classList.add('cardButton', 'tooltip', classButton);
	availabilityButton.appendChild(availabilityIcon);
	availabilityButton.appendChild(availabilityTooltip);
	availabilityButton.addEventListener('click', () => {
		handleGameCardClick(game, isAvailable);
	});

	// Cria o container dos botões
	const buttonContainer = document.createElement('div');
	buttonContainer.classList.add('cardButtonsContainer');
	buttonContainer.appendChild(deleteButton);
	buttonContainer.appendChild(availabilityButton);

	// Cria o header da card
	const header = document.createElement('div');
	header.classList.add('cardHeader');
	header.appendChild(title);
	header.appendChild(buttonContainer);

	// Cria a imagem do jogo
	const image = document.createElement('img');
	image.classList.add('cardImage');
	image.src = game.imageUrl;
	image.alt = game.name;

	// Cria a descrição do jogo
	const description = document.createElement('p');
	description.classList.add('cardDescription');
	description.textContent = `Jogadores: ${game.minPlayers} a ${game.maxPlayers}`;

	// Cria o container do elemento li
	const container = document.createElement('li');
	container.classList.add('cardContainer');
	container.appendChild(header);
	container.appendChild(image);
	container.appendChild(description);

	list.appendChild(container);
}

function renderGamesList() {
	if (unavailableGames.length > 0) {
		showElement(unavailableGamesSection);
	} else {
		hideElement(unavailableGamesSection);
	}

	availableGamesCount.textContent = availableGames.length || 0;
	unavailableGamesCount.textContent = unavailableGames.length || 0;

	availableGamesList.innerHTML = '';
	unavailableGamesList.innerHTML = '';

	availableGames.forEach((game) => {
		renderGameCard(game, availableGamesList, true);
	});

	unavailableGames.forEach((game) => {
		renderGameCard(game, unavailableGamesList, false);
	});

	updateHeaderButtonsVisibility();
}

// FUNÇÕES DOS BOTÕES DO CARD
function setGameUnavailable(game) {
	setAvailableGames(
		availableGames.filter((availableGame) => availableGame.name !== game.name)
	);
	setUnavailableGames([...unavailableGames, game]);
}

function setGameAvailable(game) {
	setUnavailableGames(
		unavailableGames.filter(
			(unavailableGame) => unavailableGame.name !== game.name
		)
	);
	setAvailableGames([...availableGames, game]);
}

function handleGameCardClick(game, isAvailable) {
	if (isAvailable) {
		setGameUnavailable(game);
	} else {
		setGameAvailable(game);
	}
	renderGamesList();
}

function handleDeleteGameClick(game) {
	Swal.fire({
		title: 'Tem certeza?',
		html: `Você está deletando o jogo <strong>${game.name}</strong>.<br>Você não poderá desfazer essa ação!`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Sim, excluir!',
		cancelButtonText: 'Cancelar',
		confirmButtonColor: '#007bff',
	}).then(async (result) => {
		if (result.isConfirmed) {
			try {
				await deleteGame(game.id);

				// Atualiza a lista de jogos
				setAvailableGames(
					availableGames.filter((availableGame) => availableGame.id !== game.id)
				);
				setUnavailableGames(
					unavailableGames.filter(
						(unavailableGame) => unavailableGame.id !== game.id
					)
				);
				setAllGames(allGames.filter((allGame) => allGame.id !== game.id));

				renderGamesList();

				Swal.fire({
					title: 'Excluído!',
					html: `O jogo <strong>${game.name}</strong> foi removido.`,
					icon: 'success',
					confirmButtonColor: '#007bff',
				});
			} catch (error) {
				console.error('Erro ao deletar jogo:', error.message || error);
				Swal.fire({
					title: 'Erro!',
					html: `Ocorreu um erro ao deletar o jogo: ${
						error.message || 'Erro desconhecido'
					}`,
					icon: 'error',
					confirmButtonText: 'OK',
					confirmButtonColor: '#dc3545',
				});
			}
		}
	});
}

renderGamesList();

/**
 * CARD LIST - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * PLAYERS NUMBER - INÍCIO
 */

const playersList = document.getElementById('playersList');
const playersNumber = Array.from({ length: 10 }, (_, i) => i + 1);

function setChosenPlayersNumber(number) {
	chosenPlayersNumber = number;
}

function removeAllActiveClass() {
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
	activeButton.classList.add('active');

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

/**
 * PLAYERS NUMBER - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * HEADER - INÍCIO
 */

function scrollToUnavailableGames() {
	const unavailableGamesRef = document.getElementById(
		'unavailableGamesSection'
	);
	unavailableGamesRef.scrollIntoView({
		behavior: 'smooth',
	});
}

function handleReset() {
	setChosenPlayersNumber(null);
	setAvailableGames(allGames);
	setUnavailableGames([]);
	setRandomGame(null);
	updateHeaderButtonsVisibility();
	updateChooseGameButtonState();
	removeAllActiveClass();
	renderGamesList();
}

function updateHeaderButtonsVisibility() {
	const headerButtons = document.getElementById('headerButtons');
	const resetButton = document.getElementById('resetButton');
	const seeUnavailableGamesButton = document.getElementById(
		'seeUnavailableGamesButton'
	);

	const hasUnavailableGames = unavailableGames.length > 0;
	const shouldShowHeaderButtons = hasUnavailableGames || !!chosenPlayersNumber;
	const shouldShowSeeUnavailableGamesButton = hasUnavailableGames;
	const shouldShowResetButton = hasUnavailableGames || !!chosenPlayersNumber;

	if (shouldShowHeaderButtons) {
		showElement(headerButtons);
	} else {
		hideElement(headerButtons);
	}

	if (shouldShowSeeUnavailableGamesButton) {
		showElement(seeUnavailableGamesButton);
	} else {
		hideElement(seeUnavailableGamesButton);
	}

	if (shouldShowResetButton) {
		showElement(resetButton);
	} else {
		hideElement(resetButton);
	}
}

window.handleReset = handleReset;
window.scrollToUnavailableGames = scrollToUnavailableGames;

/**
 * HEADER - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * CHOOSE GAME - INÍCIO
 */

const chosenGameSection = document.getElementById('chosenGameSection');

let randomGame = null;

function setRandomGame(game) {
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
		image.src = randomGame.imageUrl;
		image.alt = randomGame.name;
		description.textContent = `Jogadores: ${randomGame.minPlayers} a ${randomGame.maxPlayers}`;
		ludopedia.href = randomGame.ludopediaUrl;
		ludopedia.target = '_blank';
	}
}

function chooseRandomGame() {
	const randomIndex = Math.floor(Math.random() * availableGames.length);
	setRandomGame(availableGames[randomIndex]);
	renderChosenGameCard();
}

function updateChooseGameButtonState() {
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

/**
 * CHOOSE GAME - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * MODAL - INÍCIO
 */

const modalOverlay = document.getElementById('modalOverlay');
const addGameModal = document.getElementById('addGameModal');

function openAddGameModal() {
	showElement(addGameModal);
	showElement(modalOverlay);
	document.body.classList.add('modalOpen');
}

function closeAddGameModal() {
	hideElement(addGameModal);
	hideElement(modalOverlay);
	document.body.classList.remove('modalOpen');

	gameNameInput.value = null;
	gameMinPlayersInput.value = null;
	gameMaxPlayersInput.value = null;
	gameImageInput.value = null;
	gameLudopediaInput.value = null;

	toggleAddButton();
}

window.openAddGameModal = openAddGameModal;
window.closeAddGameModal = closeAddGameModal;
document
	.getElementById('modalOverlay')
	.addEventListener('click', closeAddGameModal);

/**
 * MODAL - FIM
 */
/* --------------------------------------------------------------------------------------
/**
 * ADD GAME - INÍCIO
 */

const addGameButton = document.getElementById('addGameButton');

const gameNameInput = document.querySelector('#gameName');
const gameMinPlayersInput = document.querySelector('#gameMinPlayers');
const gameMaxPlayersInput = document.querySelector('#gameMaxPlayers');
const gameImageInput = document.querySelector('#gameImage');
const gameLudopediaInput = document.querySelector('#gameLudopedia');

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

function toggleAddButton() {
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

/**
 * ADD GAME - FIM
 */
