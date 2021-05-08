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
    <i class="fs-1 fw-bold fas fa-question" id="question-icon"></i>
    <p id='question-text' class='text-align-center'>${JSON.stringify(q.results[randomIndex].question).slice(1, q.results[randomIndex].question.length)}</p>
    <p id='question-category' class='mt-1 fs-6 text-decoration-underline text-align-center'>${JSON.stringify(q.results[randomIndex].category).slice(1, q.results[randomIndex].category.length + 1)}</p>
    <p id='total-points'>You have ${totalPoints} points</p>
    <div class='options'>
    <button class='shadow btn btn-dark btn-block mt-1 d-flex flex-column justify-content-center align-items-center vw-100'>${q.results[randomIndex].correct_answer}</button>
    </div>
    ` //Create correct answer button
    const questionIcon = document.querySelector('#question-icon')
    const optionsContainer = document.querySelector('.options')
    for (let i = 0; i < q.results[randomIndex].incorrect_answers.length; i++) {
        optionsContainer.innerHTML += `
        <button class='shadow-lg btn btn-dark btn-block mt-1 d-flex flex-column justify-content-center align-items-center vw-100'>${q.results[randomIndex].incorrect_answers[i]}</button>
        `
    } //Create incorrect answers buttons
    const optionsButtons = document.querySelectorAll('.options button')
    const questionInfo = [
        {
            'category': 'General Knowledge',
            'color': '#040F16',
            'icon': '<i class="far fa-lightbulb"></i>'
        },
        {
            'category': 'Entertainment',
            'color': '#AF125A',
            'icon': '<i class="fas fa-tv"></i>'
        },
        {
            'category': 'Science',
            'color': '#8AC926',
            'icon': '<i class="fas fa-flask"></i>'
        },
        {
            'category': 'Mythology',
            'color': '#37123C',
            'icon': '<i class="fas fa-scroll"></i>'
        },
        {
            'category': 'Sports',
            'color': '#FB5012',
            'icon': '<i class="fas fa-football-ball"></i>'
        },
        {
            'category': 'Geography',
            'color': '#0A369D',
            'icon': '<i class="fas fa-globe-americas"></i>'
        },
        {
            'category': 'History',
            'color': '#E9DF00',
            'icon': '<i class="fas fa-landmark"></i>'
        },
        {
            'category': 'Politics',
            'color': '#363537',
            'icon': '<i class="fas fa-balance-scale"></i>'
        },
        {
            'category': 'Celebrities',
            'color': '#730071',
            'icon': '<i class="fas fa-user"></i>'
        },
        {
            'category': 'Animals',
            'color': '#093824',
            'icon': '<i class="fas fa-paw"></i>'
        },
        {
            'category': 'Vehicles',
            'color': '#F21B3F',
            'icon': '<i class="fas fa-car"></i>'
        }
    ]
    for (let i = 0; i <= 10; i++) {
        if (q.results[randomIndex].category.includes(questionInfo[i].category)) {
            questionContainer.style.backgroundColor = questionInfo[i].color
            questionIcon.innerHTML = questionInfo[i].icon
            questionContainer.style.color = '#fff'
        }
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
            if (totalPoints != 0) totalPoints -= 1
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

//TODO: ADD POINTS/LEADERBOARDS