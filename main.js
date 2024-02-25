const menuToggle = document.getElementById('menu-toggle');
const menuUl = document.querySelector('#menu ul');

menuToggle.addEventListener('click', () => {
    menuUl.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('#menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});


