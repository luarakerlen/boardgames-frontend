import { deleteGame } from './backend.js';
import { showElement, hideElement } from './scripts.js';
import { updateHeaderButtonsVisibility } from './header.js';
import {
	availableGames,
	unavailableGames,
	setAvailableGames,
	setUnavailableGames,
	setAllGames,
	allGames,
} from './boardgames.js';

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

export function renderGamesList() {
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

export function handleGameCardClick(game, isAvailable) {
	if (isAvailable) {
		setGameUnavailable(game);
	} else {
		setGameAvailable(game);
	}
	renderGamesList();
}

export function handleDeleteGameClick(game) {
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
