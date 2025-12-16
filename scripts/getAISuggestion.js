import { getAISuggestion } from './backend.js';
import { chosenPlayersNumber } from './playersNumber.js';
import { allGames } from './boardgames.js';
import {
	setRandomGame,
	renderChosenGameCard,
	updateChooseGameButtonState,
} from './chooseGame.js';

const buttons = document.querySelectorAll('.chooseGameButton');
const AIText = document.getElementById('AIGameButtonText');

async function handleGetAISuggestion() {
	const aiGameInput = document.getElementById('aiGameInput');
	const userPreferences = aiGameInput.value.trim();

	buttons.forEach((btn) => (btn.disabled = true)); // Desabilita os botões
	AIText.textContent = 'Obtendo sugestão da IA...';

	try {
		const result = await getAISuggestion(chosenPlayersNumber, userPreferences);
		const { name, explanation } = result;

		if (name && explanation) {
			const game =
				allGames.find(
					(game) => game.name.toLowerCase() === name.toLowerCase()
				) || null;

			setRandomGame({ game, isFromAI: true, aiSuggestion: result });
			renderChosenGameCard();
		}
	} catch (error) {
		console.error('Erro ao obter sugestão da IA:', error);
		Swal.fire({
			title: 'Erro!',
			text: 'Não foi possível obter uma sugestão da IA no momento. Por favor, tente novamente mais tarde.',
			icon: 'error',
			confirmButtonText: 'OK',
			confirmButtonColor: '#dc3545',
		});
	} finally {
		updateChooseGameButtonState();
	}
}

window.handleGetAISuggestion = handleGetAISuggestion;
