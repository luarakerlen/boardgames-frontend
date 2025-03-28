export function showElement(element) {
	element.classList.remove('hidden');
	element.classList.add('visible');
}

export function hideElement(element) {
	element.classList.remove('visible');
	element.classList.add('hidden');
}

// Funções dos botões
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}
