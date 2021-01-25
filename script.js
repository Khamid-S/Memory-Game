var box = document.getElementById('box');
var levelholder = document.getElementById('level');

for (let i = 0; i < 25; i++) {
    var div = document.createElement('div');
    div.setAttribute('onclick', 'choose(' + i + ')');
    box.appendChild(div);
}
var level = 1;
var bricks = document.querySelectorAll('#box div');
var started = false;
var mistake = false;
var chosen_count = 0;
var chosenbrick = [];
var bluebrick = [];

for (let i = 0; i < 25; i++) {
    bluebrick[i] = false;
    chosenbrick[i] = false;
}

var start = document.querySelector('button');

start.addEventListener('click', function () {
    for (let i = 0; i < 25; i++) {
        bluebrick[i] = false;
        chosenbrick[i] = false;
        bricks[i].style.background = 'rgb(182, 182, 182)';
    }
    mistake = false;
    levelholder.innerHTML = 'LEVEL ' + level;
    for (let i = 0; i < level; i++) {

        do {
            var match = Math.floor(Math.random() * 25);
        } while (bluebrick[match] == true)

        bluebrick[match] = true;
        bricks[match].style.background = 'blue';
    }
    start.disabled = true;
    start.innerText = 'GO';
    setTimeout(function () {
        for (let i = 0; i < 25; i++) {
            bricks[i].style.background = 'rgb(182, 182, 182)';
            started = true;
        }
    }, 500);
})

function choose(e) {
    if (started) {
        if (!chosenbrick[e]) {
            chosen_count += 1;
            chosenbrick[e] = true;
        }
        bricks[e].style.background = 'rgb(63, 63, 255)';
    }
    if (chosen_count == level) {
        for (let i = 0; i < 25; i++) {
            bricks[i].style.background = 'rgb(182, 182, 182)';
            if (chosenbrick[i] && bluebrick[i]) {
                bricks[i].style.background = 'green';
            }
            else if (chosenbrick[i] && !bluebrick[i]) {
                bricks[i].style.background = 'red';
                mistake = true;
            }
            else if (!chosenbrick[i] && bluebrick[i]) {
                bricks[i].style.background = 'blue';
                mistake = true;
            }
        }

        started = false;
        start.disabled = false;
        if (mistake&&level!=1) {
            level -= 1;
        }
        else if(mistake&&level==1) {
            level = 1;
        }
        else if(level<=25){
            level+=1;
        }
        chosen_count = 0;
        levelholder.innerHTML = 'LEVEL ' + level;
    }
}

