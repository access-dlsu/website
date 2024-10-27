document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('star-container');
    if (!starContainer) {
        console.error('Star container not found');
        return;
    }

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 5 + 2}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 6 + 4}s`;
        starContainer.appendChild(star);
    }

    setTimeout(() => {
        const accessLogo = document.createElement('img');
        accessLogo.src = 'logo/access.png';
        accessLogo.alt = 'Access Logo';
        accessLogo.classList.add('access-logo');
        accessLogo.style.position = 'absolute';
        accessLogo.style.top = '50%';
        accessLogo.style.left = '50%';
        accessLogo.style.transform = 'translate(-50%, -50%)';
        accessLogo.style.width = '200px';
        accessLogo.style.height = 'auto';
        accessLogo.style.opacity = '0';
        accessLogo.style.transition = 'opacity 3s, top 3s, left 3s, width 3s, transform 3s';
        starContainer.appendChild(accessLogo);

        setTimeout(() => {
            accessLogo.style.opacity = '1';
        }, 0);

        setTimeout(() => {
            accessLogo.style.top = '25px';
            accessLogo.style.left = '25px';
            accessLogo.style.transform = 'translate(0, 0)';
            accessLogo.style.width = '80px';
        }, 3000);

        setTimeout(() => {
            const csoLogo = document.createElement('img');
            csoLogo.src = 'logo/cso.png';
            csoLogo.alt = 'CSO Logo';
            csoLogo.classList.add('cso-logo');
            csoLogo.style.position = 'absolute';
            csoLogo.style.top = '20px';
            csoLogo.style.left = '110px';
            csoLogo.style.width = '90px';
            csoLogo.style.height = 'auto';
            csoLogo.style.opacity = '0';
            csoLogo.style.transition = 'opacity 3s';
            starContainer.appendChild(csoLogo);

            setTimeout(() => {
                csoLogo.style.opacity = '1';
            }, 6000);
        }, 0);

        
        setTimeout(() => {
            const comingSoon = document.createElement('div');
            comingSoon.classList.add('coming-soon');
            comingSoon.textContent = 'Coming Soon...';
            comingSoon.style.transition = 'opacity 3s';
            starContainer.appendChild(comingSoon);

            const nav = document.querySelector('nav');
            nav.style.transition = 'opacity 3s';
            nav.style.opacity = '0';

            setTimeout(() => {
                comingSoon.style.opacity = '1';
                nav.style.opacity = '1';
            }, 3000);
        }, 4500);
    }, 0);
});