export function showElement(element) {
	element.classList.remove('hidden');
	element.classList.add('visible');
}

export function hideElement(element) {
	element.classList.remove('visible');
	element.classList.add('hidden');
}

// Botão de scroll para cima
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
