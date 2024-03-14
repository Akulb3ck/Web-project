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
    })
})

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
  } else {
    param2Label.style.display = 'none';
    param2Input.style.display = 'none';
    datetimeLabel.style.display = 'none';
    datetimeInput.style.display = 'none';
  }
});



  
  