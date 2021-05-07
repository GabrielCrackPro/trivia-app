const API_URL = 'https://opentdb.com/api.php?amount=10'
const questionContainer = document.querySelector('.question')
const loadingSpinner = document.querySelector('#spinner')
let randomIndex = Math.floor(Math.random() * 10) //Get a random question based on index
let totalPoints = 0

function fetchQuestions() {
    let questions = fetch(API_URL)
        .then((response) => response.json())
    return questions
}
const getQuestions = async () => {
    const q = await fetchQuestions()
    questionContainer.innerHTML += `
    <i class="fs-1 fw-bold fas fa-question"></i>
    <p id='question-text fw-bold'>${JSON.stringify(q.results[randomIndex].question)}</p>
    <p id='question-category' class='mt-1 fs-6 text-decoration-underline'>${JSON.stringify(q.results[randomIndex].category)}</p>
    <p id='total-points'>You have ${totalPoints} points</p>
    <div class='options'>
    <button class='shadow btn btn-dark btn-block mt-1 d-flex flex-column justify-content-center align-items-center vw-100'>${q.results[randomIndex].correct_answer}</button>
    </div>
    ` //Create correct answer button
    const optionsContainer = document.querySelector('.options')
    for (let i = 0; i < q.results[randomIndex].incorrect_answers.length; i++) {
        optionsContainer.innerHTML += `
        <button class='shadow-lg btn btn-dark btn-block mt-1 d-flex flex-column justify-content-center align-items-center vw-100'>${q.results[randomIndex].incorrect_answers[i]}</button>
        `
    } //Create incorrect answers buttons
    const optionsButtons = document.querySelectorAll('.options button')
    let questionsCategories = [
        'General Knowledge',
        'Entertainment',
        'Science & Nature',
        'Mythology',
        'Sports',
        'Geography',
        'History',
        'Politics',
        'Art',
        'Celebrities',
        'Animals',
        'Vehicles'
    ]
    let questionColors = [
        '#040F16', //General Knowlege
        '#AF125A', //Entertainment/Art
        '8AC926', //Science
        '#37123C', //Mitology
        '#FB5012', //Sports
        '#0A369D', //Geography
        '#E9DF00', //History
        '#363537', //Politics
        '#730071', //Celebrities
        '#093824',//Animals
        '#F21B3F' //Vehicles
    ]
    if (q.results[randomIndex].category.includes(questionsCategories[0])) {
        questionContainer.style.backgroundColor = questionColors[0]
        questionContainer.style.color = '#ccc'
    } else if (q.results[randomIndex].category.includes(questionsCategories[1])) {
        questionContainer.style.backgroundColor = questionColors[1]
        questionContainer.style.color = '#ccc'
    } else if (q.results[randomIndex].category.includes(questionsCategories[2])) {
        questionContainer.style.backgroundColor = questionColors[2]
        questionContainer.style.color = '#ccc'
    } else if (q.results[randomIndex].category.includes(questionsCategories[3])) {
        questionContainer.style.backgroundColor = questionColors[3]
        questionContainer.style.color = '#fff'
    } else if (q.results[randomIndex].category.includes(questionsCategories[4])) {
        questionContainer.style.backgroundColor = questionColors[4]
        questionContainer.style.color = '#fff'
    } else if (q.results[randomIndex].category.includes(questionsCategories[5])) {
        questionContainer.style.backgroundColor = questionColors[5]
        questionContainer.style.color = '#fff'
    } else if (q.results[randomIndex].category.includes(questionsCategories[6])) {
        questionContainer.style.backgroundColor = questionColors[6]
        questionContainer.style.color = '#fff'
    } else if (q.results[randomIndex].category.includes(questionsCategories[7])) {
        questionContainer.style.backgroundColor = questionColors[7]
        questionContainer.style.color = '#fff'
    } else if (q.results[randomIndex].category.includes(questionsCategories[8])) {
        questionContainer.style.backgroundColor = questionColors[8]
        questionContainer.style.color = '#fff'
    } else if (q.results[randomIndex].category.includes(questionsCategories[9])) {
        questionContainer.style.backgroundColor = questionColors[9]
        questionContainer.style.color = '#fff'
    } else if (q.results[randomIndex].category.includes(questionsCategories[10])) {
        questionContainer.style.backgroundColor = questionColors[10]
        questionContainer.style.color = '#fff'
    }
    //Verify the answers
    optionsButtons.forEach(button => button.addEventListener('click', () => {
        if (button.textContent === q.results[randomIndex].correct_answer) {
            button.classList.remove('btn-dark')
            button.classList.add('btn-success')
            button.style.pointerEvents = 'none'
            totalPoints += 1
            loadingSpinner.classList.remove('visually-hidden')
            setTimeout(() => {
                questionContainer.innerHTML = ''
                loadingSpinner.classList.add('visually-hidden')
                getQuestions()
            }, 1000)
        } else {
            button.classList.remove('btn-dark')
            button.classList.add('btn-danger')
            button.color = '#fff'
            totalPoints = 0
            loadingSpinner.classList.remove('visually-hidden')
            setTimeout(() => {
                questionContainer.innerHTML = ''
                loadingSpinner.classList.add('visually-hidden')
                getQuestions()
            }, 1000)
        }
    }))

}
getQuestions()

//TODO: REFACTOR COLOR SELECTION
//TODO: ADD POINTS/LEADERBOARDS