import {
	availableGames,
	unavailableGames,
	setAvailableGames,
	setUnavailableGames,
} from './boardgames.js';

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
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: 'Excluído!',
				html: `O jogo <strong>${game.name}</strong> foi removido.`,
				icon: 'success',
				confirmButtonColor: '#007bff',
			});
		}
	});
}