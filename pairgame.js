(function() {
    const icons = [
        'fa-anchor',
        'fa-car',
        'fa-bug',
        'fa-key',
        'fa-paw',
    ];

    const getOneCard = (icon) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<div class="front">
            <i class="fa ${icon}"></i>
        </div>
        <div class="back">
            <img src="/card-back.png" alt="back">
        </div>`;
        return div;
    };

    const shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    // Show cards.
    const iconArray = icons.concat(icons);
    shuffle(iconArray);
    const row1 = document.querySelector('.card-row:nth-child(2)');
    const row2 = document.querySelector('.card-row:nth-child(3)');
    let i = 0;
    for (const icon of iconArray) {
        i++;
        const card = getOneCard(icon);
        if (i < 6) {
            row1.appendChild(card);
        } else {
            row2.appendChild(card);
        }

    }

    const cardClick = (ev) => {
        ev.currentTarget.classList.toggle('flipped');
    };

    const cards = document.querySelectorAll('.card');
    cards.forEach( card => {
        card.addEventListener('click', cardClick);
    })

})();