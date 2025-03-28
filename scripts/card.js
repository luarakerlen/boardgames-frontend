export function renderChosenGameCard(boardgame) {
	const cardTitle = document.getElementById('chosenGameTitle');
	const cardImage = document.getElementById('chosenGameImage');
	const cardDescription = document.getElementById('chosenGameDescription');

	if (boardgame) {
		cardTitle.textContent = boardgame.name;
		cardImage.src = boardgame.image;
		cardImage.alt = boardgame.name;
		cardDescription.textContent = `Jogadores: ${boardgame.minPlayers} a ${boardgame.maxPlayers}`;
	}
}
