import { getAISuggestion } from './backend.js';
import { chosenPlayersNumber } from './playersNumber.js';

async function handleGetAISuggestion() {
	const aiGameInput = document.getElementById('aiGameInput');
	const userPreferences = aiGameInput.value.trim();

	const result = await getAISuggestion(chosenPlayersNumber, userPreferences);
	console.log('AI Suggested Game:', result);
}

window.handleGetAISuggestion = handleGetAISuggestion;
