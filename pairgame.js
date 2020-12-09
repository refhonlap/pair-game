(function() {
    const icons = [
        'fa-anchor',
        'fa-car',
        'fa-bug',
        'fa-key',
        'fa-paw',
    ];

    let points = 0;

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

    let blockClick = false;
    const cardClick = (ev) => {
        if (blockClick) {
            return;
        }

        ev.currentTarget.classList.toggle('flipped');
        const flippedCards = document.querySelectorAll('.card.flipped');
        if (flippedCards.length > 1) {
            blockClick = true;
            const to = setTimeout( () => {
                clearTimeout(to);
                blockClick = false;
                document.querySelectorAll('.card').forEach( card => {
                    card.classList.remove('flipped');
                });
            }, 2000);

            checkPair();
        }
    };

    const cards = document.querySelectorAll('.card');
    cards.forEach( card => {
        card.addEventListener('click', cardClick);
    });

    const showPoints = (points) => {
        document.querySelector('.user-points').textContent = points;
    }

    const checkPair = () => {
        const firstCardIcon = document.querySelector('.card.flipped i');
        if (firstCardIcon) {
            const firstIconClass = firstCardIcon.className.split(' ');
            const pair = document.querySelectorAll(`.card.flipped .${firstIconClass.pop()}`);
            if (pair.length == 2) {
                points++;
                showPoints(points);
                document.querySelectorAll(`.card.flipped`).forEach(
                    card => card.classList.add('found')
                );
            }
        }
    }
})();