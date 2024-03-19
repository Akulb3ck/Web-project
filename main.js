var scores = JSON.parse(localStorage.getItem('scores')) || [];

// Menu
const menuToggle = document.getElementById('menu-toggle');
const menuUl = document.querySelector('#menu ul');

menuToggle.addEventListener('click', () => {
    menuUl.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Slow Scroll
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
    })
})

// Зберігання результату опитування 
document.getElementById('survey').addEventListener('submit', function(event) {
  event.preventDefault();
  var formData = new FormData(event.target);
  var surveyResult = {};
  formData.forEach(function(value, key) {
    surveyResult[key] = value;
  });

  var surveyId = new Date().getTime(); 
  localStorage.setItem('surveyResults_' + surveyId, JSON.stringify(surveyResult));
});

// Запити-фільтри
function filterByFaculty(faculty) {
  var results = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith('surveyResults_')) {
      var result = JSON.parse(localStorage.getItem(key));
      if (result.faculty === faculty) {
        results.push(result);
      }
    }
  }
  return results;
}

function filterByInterviewDate(date) {
  var results = [];
  var inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith('surveyResults_')) {
      var result = JSON.parse(localStorage.getItem(key));
      var interviewDate = new Date(result.interviewTime);
      interviewDate.setHours(0, 0, 0, 0);
      if (interviewDate.getTime() === inputDate.getTime()) {
        results.push(result);
      }
    }
  }
  return results;
}
  
function filterByAverageScore(min, max) {
  var results = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith('surveyResults_')) {
      var result = JSON.parse(localStorage.getItem(key));
      var score = parseFloat(result.averageScore);
      if (score >= min && score <= max) {
        results.push(result);
      }
    }
  }
  return results;
}

function displayResults(results) {
  var resultsElement = document.getElementById('results');
  resultsElement.innerHTML = '';

  results.forEach(function(result) {
    var table = document.createElement('table');
    for (var key in result) {
      var row = document.createElement('tr');

      var cellKey = document.createElement('td');
      cellKey.textContent = key;
      row.appendChild(cellKey);

      var cellValue = document.createElement('td');
      cellValue.textContent = result[key];
      row.appendChild(cellValue);

      table.appendChild(row);
    }
    resultsElement.appendChild(table);
  });
}


document.getElementById('filterForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var filter = event.target.elements.filter.value;
  var param1 = event.target.elements.param1.value;
  var param2 = event.target.elements.param2.value;
  var date = event.target.elements.datetime.value;

  var results;
  switch (filter) {
    case 'faculty':
      results = filterByFaculty(param1);
      break;
    case 'interviewDate':
      results = filterByInterviewDate(date);
      break;
    case 'averageScore':
      results = filterByAverageScore(param1, param2);
      break;
  }

  displayResults(results);
});

document.getElementById('filter').addEventListener('change', function(event) {
  var filter = event.target.value;
  var param1Label = document.getElementById('param1Label');
  var param1Input = document.getElementById('param1');
  var param2Label = document.getElementById('param2Label');
  var param2Input = document.getElementById('param2');
  var datetimeLabel = document.getElementById('datetimeLabel');
  var datetimeInput = document.getElementById('datetime');

  if (filter === 'averageScore') {
    param1Label.style.display = 'block';
    param1Input.style.display = 'block';
    param2Label.style.display = 'block';
    param2Input.style.display = 'block';
    datetimeLabel.style.display = 'none';
    datetimeInput.style.display = 'none';
  } else if (filter === 'interviewDate') {
    datetimeLabel.style.display = 'block';
    datetimeInput.style.display = 'block';
    param2Label.style.display = 'none';
    param2Input.style.display = 'none';
    param1Label.style.display = 'none';
    param1Input.style.display = 'none';
  } else if(filter === 'faculty') {
    param1Label.style.display = 'block';
    param1Input.style.display = 'block';
    param2Label.style.display = 'none';
    param2Input.style.display = 'none';
    datetimeLabel.style.display = 'none';
    datetimeInput.style.display = 'none';
  }
});

// тест
document.addEventListener("DOMContentLoaded", function() {
  const testData = {
    testName: "Тест по Porsche 930",
    question: [
        {
            question: "Вкажіть потужність двигуна Porsche 930 1975 року:",
            answers: [
                {
                    answers: "253 к.с",
                    isCorrect: false,
                },
                {
                    answers: "276 к.с",
                    isCorrect: false,
                },
                {
                    answers: "260 к.с",
                    isCorrect: true,
                },
                {
                    answers: "245 к.с",
                    isCorrect: false,
                },
            ]
        },
        {
            question: "Вкажіть час розгону Porsche 930 1975 року до 100км/год:",
            answers: [
                {
                    answers: "5.0 с",
                    isCorrect: false,
                },
                {
                    answers: "5.2 с",
                    isCorrect: true,
                },
                {
                    answers: "5.4 с",
                    isCorrect: false,
                },
                {
                    answers: "4.9 с",
                    isCorrect: false,
                },
            ]
        },
        {
            question: "Вкажіть період випуску Porsche 930:",
            answers: [
                {
                    answers: "1971-1983 рр.",
                    isCorrect: false,
                },
                {
                    answers: "1976-1989 рр.",
                    isCorrect: false,
                },
                {
                    answers: "1979-1986 рр.",
                    isCorrect: false,
                },
                {
                    answers: "1975-1989 рр.",
                    isCorrect: true,
                },
            ]
        },
        {
            question: "Вкажіть тип двигуна Porsche 930:",
            answers: [
                {
                    answers: "Бензиновий двигун",
                    isCorrect: true,
                },
                {
                    answers: "Дизельний двигун",
                    isCorrect: false,
                },
                {
                    answers: "Електричний двигун",
                    isCorrect: false,
                },
                {
                    answers: "Гібридний двигун",
                    isCorrect: false,
                },
            ]
        },
        {
            question: "Вкажіть країну автовиробника Porsche:",
            answers: [
                {
                    answers: "Німеччина",
                    isCorrect: true,
                },
                {
                    answers: "Франція",
                    isCorrect: false,
                },
                {
                    answers: "Японія",
                    isCorrect: false,
                },
                {
                    answers: "США",
                    isCorrect: false,
                },
            ]
        }
    ]
  }

    const questionsContainer = document.getElementById('questions-container');
    const submitButton = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');

    testData.question.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
            <ul>
                ${question.answers.map(answer => `<li><label><input type="radio" name="question${index}" value="${answer.isCorrect}">${answer.answers}</label></li>`).join('')}
            </ul>
        `;
        questionsContainer.appendChild(questionElement);
    });

    function checkResults() {
        const answerInputs = document.querySelectorAll('input[type="radio"]');
        let score = 0;
        answerInputs.forEach(input => {
            if (input.checked && input.value === "true") {
                score++;
            }
        });
        resultContainer.innerHTML = `<p>Ви відповіли правильно на ${score} з ${testData.question.length} питань.</p>`;
    }

    submitButton.addEventListener('click', checkResults);
});


// Змійка
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var gridSize = 25;
var tileCount = canvas.width / gridSize;

var headTexture = new Image();
var bodyTexture = new Image();
var tailTexture = new Image();
var bendRTexture = new Image();
var bendLTexture = new Image();
var eggTexture = new Image();
var backgroundTexture = new Image();
var MenuStartTexture = new Image();
var MenuPauseTexture = new Image();
var MenuEndTexture = new Image();
var ScoreTexture = new Image();

headTexture.src = 'image/Head.png';
bodyTexture.src = 'image/Body.png';
tailTexture.src = 'image/Tail.png';
bendRTexture.src = 'image/bendR.png';
bendLTexture.src = 'image/bendL.png';
eggTexture.src = 'image/Egg.png';
backgroundTexture.src = 'image/Background.png';
MenuStartTexture.src = 'image/MenuStart.png';
MenuPauseTexture.src = 'image/MenuPause.png';
MenuEndTexture.src = 'image/MenuEnd.png';
ScoreTexture.src = 'image/Score.png';

var player = {
  x: gridSize * Math.floor(tileCount / 2),
  y: gridSize * Math.floor(tileCount / 2),
  dx: gridSize,
  dy: 0,
  cells: [],
  maxCells: 4
};

var egg = {
  x: gridSize * Math.floor(Math.random() * tileCount),
  y: gridSize * Math.floor(Math.random() * tileCount)
};

var scores = [];
var count = 0;
var score = 0;
var totalScore = 0;
var bestScore = 0;
var worstScore = 0;
var gamePlaying = false;
var gameOver = false;
var gamePaused = false;

function drawMenu() {
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  var x = canvas.width / 4; 
  var y = canvas.height / 4; 
  context.drawImage(MenuStartTexture, x, y, canvas.width / 2, canvas.height / 2);
}

function drawEndScreen() {
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  var x = canvas.width / 4; 
  var y = canvas.height / 4; 
  context.drawImage(MenuEndTexture, x, y, canvas.width / 2, canvas.height / 2);
  drawNumber(totalScore, canvas.width - 220, canvas.height - 130);
}

function drawPauseScreen() {
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  var x = canvas.width / 4; 
  var y = canvas.height / 4; 
  context.drawImage(MenuPauseTexture, x, y, canvas.width / 2, canvas.height / 2);
}

var digitTextures = [];
for (var i = 0; i <= 9; i++) {
  digitTextures[i] = new Image();
  digitTextures[i].src = 'image/Number/digit' + i + '.png';
}

function drawNumber(number, x, y) {
  var digits = number.toString().split('');
  for (var i = 0; i < digits.length; i++) {
    var digit = parseInt(digits[i]);
    if (digitTextures[digit].complete) {
      context.drawImage(digitTextures[digit], x + i * gridSize, y, gridSize, gridSize);
    }
  }
}

function updateScore() {
  context.drawImage(ScoreTexture, canvas.width - 190, 0, gridSize * 4, gridSize);
  drawNumber(score, canvas.width - 90, 0);
}

function updateScoreList() {
  var storedScores = localStorage.getItem('totalScore');
  if (storedScores) {
    scores = JSON.parse(storedScores);
  } else {
    scores = [];
  }
  scores.sort(function(a, b){return b-a});

  var bestScores = scores.slice(0, 3);
  var worstScores = scores.slice(-3).reverse();

  var bestScoresList = document.getElementById('bestScores');
  bestScoresList.innerHTML = '';
  for (var i = 0; i < bestScores.length; i++) {
    var li = document.createElement('li');
    li.textContent = bestScores[i];
    bestScoresList.appendChild(li);
  }

  var worstScoresList = document.getElementById('worstScores');
  worstScoresList.innerHTML = '';
  for (var i = 0; i < worstScores.length; i++) {
    var li = document.createElement('li');
    li.textContent = worstScores[i];
    worstScoresList.appendChild(li);
  }
}

window.onload = function() {
  updateScoreList();
}

function loop() {
  requestAnimationFrame(loop);
  
  if (++count < 16) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  if (!gamePlaying) {
    if (gameOver) {
      drawEndScreen();
    } else {
      drawMenu();
    }
    return;
  }

  player.cells.forEach(function(cell, index) {
    var texture;
    var vx = player.dx / gridSize;
    var vy = player.dy / gridSize;
    if (!gamePlaying) return;

    if (index === 0) {
      texture = headTexture;
    } else if (index === player.cells.length - 1) {
      texture = tailTexture;
    } else {
      texture = bodyTexture;
    }
 
    context.save();
 
    context.translate(cell.x + gridSize / 2, cell.y + gridSize / 2);

    if (index === 0) {
      texture = headTexture;
    } else if (index === player.cells.length - 1) {
      texture = tailTexture;
    } else { 
      // Перевіряємо, чи є згин у поточній клітинці
      if (player.cells[index + 1]) {
        var dx = cell.x - player.cells[index - 1].x;
        var dy = cell.y - player.cells[index - 1].y;
        var nextDx = player.cells[index + 1].x - cell.x;
        var nextDy = player.cells[index + 1].y - cell.y;
        if (dx !== nextDx || dy !== nextDy) {
          var turnDirection = (dx * nextDy - dy * nextDx) > 0 ? 'right' : 'left';
          texture = turnDirection === 'right' ? bendRTexture : bendLTexture;
        }
      } else {
        texture = bodyTexture;
      }
    }

    var angle;
    if (index === 0) { // Для голови змії
      if (vx === 1) angle = Math.PI * 3 / 2; // вправо
      else if (vx === -1) angle = Math.PI / 2; // вліво
      else if (vy === -1) angle = Math.PI; // вгору
      else if (vy === 1) angle = 0; // вниз
    } else { // Для тіла та хвоста змії
      var dx = cell.x - player.cells[index - 1].x;
      var dy = cell.y - player.cells[index - 1].y;
      angle = Math.atan2(dy, dx) + Math.PI / 2;
    }
    context.rotate(angle);
    context.drawImage(texture, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
    context.restore();

    if (cell.x === egg.x && cell.y === egg.y) {
      player.maxCells++;
      score++;
      egg.x = gridSize * Math.floor(Math.random() * tileCount);
      egg.y = gridSize * Math.floor(Math.random() * tileCount);
    }

    for (var i = index + 1; i < player.cells.length; i++) {
      if (cell.x === player.cells[i].x && cell.y === player.cells[i].y) {
        totalScore = score;
        player.x = gridSize * Math.floor(tileCount / 2);
        player.y = gridSize * Math.floor(tileCount / 2);
        player.cells = [];
        player.maxCells = 4;
        player.dx = gridSize;
        player.dy = 0;

        egg.x = gridSize * Math.floor(Math.random() * tileCount);
        egg.y = gridSize * Math.floor(Math.random() * tileCount);

        gamePlaying = false;
        gameOver = true;
        if (!gamePlaying && gameOver) {
          scores.push(score);
          scores.sort(function(a, b){return b-a});
          localStorage.setItem('totalScore', JSON.stringify(scores));
      
          var bestScores = scores.slice(0, 3);
          var worstScores = scores.slice(-3).reverse();
      
          var bestScoresList = document.getElementById('bestScores');
          bestScoresList.innerHTML = '';
          for (var i = 0; i < bestScores.length; i++) {
            var li = document.createElement('li');
            li.textContent = bestScores[i];
            bestScoresList.appendChild(li);
          }
      
          var worstScoresList = document.getElementById('worstScores');
          worstScoresList.innerHTML = '';
          for (var i = 0; i < worstScores.length; i++) {
            var li = document.createElement('li');
            li.textContent = worstScores[i];
            worstScoresList.appendChild(li);
          }
        }
        score = 0;
      }
    }
  });
  
  if (gamePaused) {
    drawPauseScreen();
    return;
  }

  player.x += player.dx;
  player.y += player.dy;

  if (player.x < 0) {
    player.x = canvas.width - gridSize;
  }
  else if (player.x >= canvas.width) {
    player.x = 0;
  }
  if (player.y < 0) {
    player.y = canvas.height - gridSize;
  }
  else if (player.y >= canvas.height) {
    player.y = 0;
  }
  player.cells.unshift({x: player.x, y: player.y});
  if (player.cells.length > player.maxCells) {
    player.cells.pop();
  }

  context.drawImage(eggTexture, egg.x, egg.y, gridSize, gridSize);

  updateScore();
}

document.addEventListener('keydown', function(e) {
  if (e.which === 37 && player.dx === 0) {
    player.dx = -gridSize;
    player.dy = 0;
  }
  else if (e.which === 38 && player.dy === 0) {
    player.dy = -gridSize;
    player.dx = 0;
  }
  else if (e.which === 39 && player.dx === 0) {
    player.dx = gridSize;
    player.dy = 0;
  }
  else if (e.which === 40 && player.dy === 0) {
    player.dy = gridSize;
    player.dx = 0;
  }
  else if (e.which === 13) {
    gamePlaying = true;
    gameOver = false;
    gamePaused = false;
  }
  else if (e.which === 80) { 
    if (gamePlaying) {
      gamePaused = !gamePaused;
    }
  }
});

window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

requestAnimationFrame(loop);
