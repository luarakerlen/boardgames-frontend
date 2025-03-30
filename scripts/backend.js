import { renderGamesList } from './gamesList.js';
export const boardgames = [];

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de jogos de tabuleiro existentes do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
	let url = 'http://127.0.0.1:5001/boardgames';
	try {
		const response = await fetch(url, { method: 'get' });
		const data = await response.json();

		boardgames.push(
			...data.boardgames.map((game) => ({
				id: game.id,
				name: game.name,
				minPlayers: game.min_players,
				maxPlayers: game.max_players,
				image: game.image_url ?? null,
				description: game.description ?? null,
				ludopediaURL: game.ludopedia_url ?? null,
			}))
		);

		renderGamesList(boardgames);
	} catch (error) {
		console.error('Error:', error);
	}
};

getList();
