document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});
