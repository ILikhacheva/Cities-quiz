// Получение данных городов с API и генерация викторины
// Fetch cities data from API and generate quiz
async function fetchCitiesData() {
  const res = await fetch("http://localhost:3000/api/cities");
  return await res.json();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getQuizQuestions(data, numQuestions = 10) {
  const questions = [];
  const usedCountries = new Set();
  const dataCopy = [...data];
  shuffle(dataCopy);
  for (let i = 0; i < dataCopy.length && questions.length < numQuestions; i++) {
    const { country, city } = dataCopy[i];
    if (!usedCountries.has(country)) {
      // Получаем 9 неправильных столиц
      // Get 9 wrong capitals
      const wrongCities = data
        .filter((item) => item.city !== city)
        .map((item) => item.city);
      shuffle(wrongCities);
      const options = shuffle([city, ...wrongCities.slice(0, 9)]);
      questions.push({ country, correct: city, options });
      usedCountries.add(country);
    }
  }
  return questions;
}

let currentQuestions = [];
// Рендеринг викторины в DOM
// Render quiz to DOM
function renderQuiz(questions) {
  currentQuestions = questions;
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";
  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "quiz-question";
    div.style.marginBottom = "24px";
    div.innerHTML = `
          <div style="margin-bottom:8px;font-size:20px;text-align:center;">${
            idx + 1
          }. What is the capital of <b>${q.country}</b>?</div>
          <div style="display:flex;justify-content:center;align-items:center;gap:12px;">
            <select id="answer-${idx}" class="quiz-select">
              <option value="">Choose the capital</option>
              ${q.options
                .map((opt) => `<option value="${opt}">${opt}</option>`)
                .join("")}
            </select>
            <span id="result-icon-${idx}"></span>
          </div>
        `;
    quizContainer.appendChild(div);
  });
  // Добавляем кнопку Проверить по центру
  // Add Check button centered
  const checkBtn = document.createElement("button");
  checkBtn.id = "check-quiz-btn";
  checkBtn.textContent = "Check";
  checkBtn.style.margin = "32px auto 32px auto";
  checkBtn.style.display = "block";
  checkBtn.onclick = checkQuizAnswers;
  quizContainer.appendChild(checkBtn);
}
// Проверка ответов викторины и отображение результатов
// Check quiz answers and display results
function checkQuizAnswers() {
  let score = 0;
  currentQuestions.forEach((q, idx) => {
    const select = document.getElementById(`answer-${idx}`);
    const userAnswer = select.value;
    const icon = document.getElementById(`result-icon-${idx}`);
    icon.innerHTML = "";
    select.style.border = "";
    if (userAnswer === q.correct) {
      score++;
      select.style.border = "2px solid #2ecc40";
      icon.innerHTML = "✅";
      icon.style.color = "#2ecc40";
    } else {
      select.style.border = "2px solid #e74c3c";
      icon.innerHTML = userAnswer ? "❌" : "";
      icon.style.color = "#e74c3c";
    }
    select.disabled = true;
  });
  // Показать очки  крупно
  // Show score
  const stats = document.getElementById("quiz-stats");
  stats.style.display = "block";
  stats.innerHTML = `<span style="font-size:28px;font-weight:bold;">Score: ${score} / ${currentQuestions.length}</span>`;
  // Hide the Check button
  document.getElementById("check-quiz-btn").style.display = "none";
}

document
  .getElementById("start-quiz-btn")
  .addEventListener("click", async () => {
    const citiesData = await fetchCitiesData();
    const questions = getQuizQuestions(citiesData, 10);
    document.getElementById("welcomeGif").style.display = "none";
    renderQuiz(questions);
  });
