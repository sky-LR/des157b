(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const h3s = document.querySelectorAll('h3');
    const header = document.querySelector('header');
    const slider = document.querySelector('#slider');
    const toggle = document.querySelector('#toggle');
    const p = document.querySelector('p');
    const smile = document.querySelector('#web3Smile');
    const dead = document.querySelector('#smiley');

    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            header.className = 'switch';
            slider.className = 'switch';
            toggle.className = 'switch';
            smile.className = 'switch';
            
            slider.innerHTML = "<p>2023</p>";
            p.className = 'switch';

            for (const section of sections) {
                section.className = 'switch';
            }
            for (const h3 of h3s) {
                h3.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            header.removeAttribute('class');
            slider.removeAttribute('class');
            toggle.removeAttribute('class');
            p.removeAttribute('class');
            smile.removeAttribute('class');

            slider.innerHTML = "<p>2000</p>";
            for (const section of sections) {
                section.removeAttribute('class');
            }
            for (const h3 of h3s) {
                h3.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()