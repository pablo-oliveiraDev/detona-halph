const state = {
    view: {
        square: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function initialize() {
    addListinerHitBox();
};
initialize();

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
};
function tryAgain() {
    if (confirm('O seu resultado foi: ' + state.values.result + ' \n Deseja continuar ?') === true) {
        state.values.lives -= 1;
        state.view.lives.textContent = state.values.lives < 0 ? 0 : state.values.lives;
        state.values.currentTime += 60;
        state.view.timeLeft.textContent = state.values.currentTime;

    } else {
        alert('Game Over');
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        location.reload();
    }

}
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        tryAgain();
        // clearInterval(state.actions.countDownTimerId);
        // clearInterval(state.actions.timerId);       
    } else if (state.values.lives < 0) {
        alert('Game Over');
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        location.reload();
    }
}
function randomSquare() {
    state.view.square.forEach((square) => {
        square.classList.remove('enemy');
    });
    let randomNumber = Math.floor(Math.random() * 16);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
};
function addListinerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit');
            }else{
                state.values.result--;
                state.view.score.textContent = state.values.result;
            }
        })
    });
};

