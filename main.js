const maxScore = 10;

//changement de la position de la cible après un clique
function changeTargetPosition(elem) {

    //changement de la postion
    elem.style.position = 'absolute';
    x = Math.floor(Math.random() * 1000) + document.getElementById('practiceZone').offsetLeft;
    y = Math.floor(Math.random() * 300) + document.getElementById('practiceZone').offsetTop + 75;
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
}

function toggleModal(modalId){
    document.getElementById(modalId).classList.toggle('fade');
    document.getElementById(modalId).classList.toggle('disable');
}

function checkWin() {
    var score = document.getElementById('score').innerText
    var nbDifficulties = document.getElementsByClassName('option-difficulty').length;
    var currentDifficulty = document.getElementById('difficulty');
    console.log(currentDifficulty.value);
    if ((score % maxScore)==0 && nbDifficulties>currentDifficulty.value) {
        increaseDifficulty();
    }else if((score % maxScore)==0 && nbDifficulties==currentDifficulty.value){
      toggleModal('gameEnd');
    }
}

//incrementation du score
function incrementScore() {
    var score = parseInt(document.getElementById('score').innerText);
    score += 1;
    document.getElementById('score').innerText = score;
    checkWin();
}

function increaseDifficulty() {
    var select = document.getElementById('difficulty');
    select.selectedIndex++;
    var event = new Event('change');

    // Dispatch it.
    select.dispatchEvent(event);
}

function resetDifficlty(){
    var select = document.getElementById('difficulty');
    select.selectedIndex=0;
    var event = new Event('change');

    // Dispatch it.
    select.dispatchEvent(event);
}


//supression des events de la cible
function removeEvents(id) {
    const elemold = document.getElementById(id);
    elemold.replaceWith(elemold.cloneNode(true));
    return document.getElementById(id);
}

//changement visuel du menu + consigne
function setActiveMenuItem(self, id) {

    var elem = removeEvents(id);

    resetDifficlty();

    var links = document.querySelectorAll('.button-menu, .button-menu-active');

    links.forEach(link => {
        link.classList.remove('button-menu-active');
        link.classList.add("button-menu");
    });

    self.classList.add("button-menu-active");
    self.classList.remove("button-menu");

    document.getElementById('score').innerText = 0;

    document.getElementById('practiceZone').classList.remove('disable');


    document.getElementById('consigne').innerText = self.dataset.consigne;
    document.getElementById('consigne_gif').src = self.dataset.gif;
    toggleModal('tuto');


    return elem

}

//pour le drag and drop
function drop_handler(e, elem) {
    changeTargetPosition(elem);
    changeTargetPosition(e.target);
}

function setDragDrop(id, zone, self) {

    var elem = setActiveMenuItem(self, id);
    var elem_zone = removeEvents(zone);

    elem_zone.classList.remove('disable');

    elem_zone.addEventListener('drop', (event) => {
        drop_handler(event, elem);
        incrementScore();
    });
}

// definition de l'event à metter sur la cible
function setClickEvent(id, eventType, self) {

    document.getElementById('dropZone').classList.add('disable');

    var elem = setActiveMenuItem(self, id);
    elem.classList.remove('disable');


    elem.addEventListener(eventType, (event) => {
        changeTargetPosition(elem, event);
        incrementScore();
    });
}

//event de la liste
function initDifficulty() {
    const selectDifficulty = document.getElementById('difficulty');

    selectDifficulty.addEventListener('change', (event) => {
        var img = document.getElementById('target');
        var targetZone = document.getElementById('dropZone');
        var dif = selectDifficulty.options[selectDifficulty.value-1].text;
        switch (dif) {
            case 'Facile':
                img.style.height = '100px';
                img.style.width = '100px';
                break;
            case 'Moyen':
                img.style.height = '50px';
                img.style.width = '50px';
                break;
            case 'Difficile':
                img.style.height = '25px';
                img.style.width = '25px';
                break;
        }
        targetZone.style.height = img.style.height;
        targetZone.style.width = img.style.width;
    });

}

initDifficulty()
// document.getElementsByClassName('item')[0].click();
document.addEventListener("dragover", function (event) {
    event.preventDefault();
});