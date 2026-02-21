document.addEventListener('DOMContentLoaded', function() {
    initializeTypingEffect();
});

function initializeTypingEffect() {
    const element = document.querySelector('.subtitle');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    setTimeout(typeWriter, 1000);
}
