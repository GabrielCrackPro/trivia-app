const API_URL = 'https://opentdb.com/api.php?amount=10'
//Souunds
const correctSound = new Audio('https://freesound.org/data/previews/476/476178_6101353-lq.mp3')
const wrongSound = new Audio('https://freesound.org/data/previews/476/476177_6101353-lq.mp3')
const bombSound = new Audio('https://freesound.org/data/previews/521/521620_9148183-lq.mp3')

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
    <p id='question-text' class='text-center'>${JSON.stringify(q.results[randomIndex].question).slice(1, q.results[randomIndex].question.length)}</p>
    <p id='question-category' class='mt-1 fs-6 text-decoration-underline text-align-center'>${JSON.stringify(q.results[randomIndex].category).slice(1, q.results[randomIndex].category.length + 1)}</p>
    <p id='total-points'>You have ${totalPoints} points</p>
    <div class='options'>
    <button class='shadow btn btn-dark btn-block mt-1 d-flex flex-column justify-content-center align-items-center vw-100'>${q.results[randomIndex].correct_answer}</button>
    </div>
    <div class="boosters mt-1"></div>
    ` //Create correct answer button
    const questionIcon = document.querySelector('#question-icon')
    const optionsContainer = document.querySelector('.options')
    for (let i = 0; i < q.results[randomIndex].incorrect_answers.length; i++) {
        optionsContainer.innerHTML += `
        <button class='shadow-lg btn btn-dark btn-block mt-1 d-flex flex-column justify-content-center align-items-center vw-100'>${q.results[randomIndex].incorrect_answers[i]}</button>
        `
    } //Create incorrect answers buttons
    const boostersContainer = document.querySelector('.boosters')
    boostersContainer.innerHTML = `
    <button class="shadow-sm btn btn-dark text-center bomb-button"><i class="fas fa-bomb"></i> (2 points)</button>
    <button class="shadow-sm btn btn-dark text-center skip-button"><i class="fas fa-forward"></i> (1 point)</button>
    <button class="shadow-sm btn btn-dark text-center help-button"><i class="fas fa-question"></i></button>
    <p class="info ml-1 text-center"></p>
    `
    const bombButton = document.querySelector('.bomb-button')
    const skipButton = document.querySelector('.skip-button')
    const helpButton = document.querySelector('.help-button')

    const info = document.querySelector('.info')

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
            correctSound.play()
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
            wrongSound.play()
            loadingSpinner.classList.remove('visually-hidden')
            setTimeout(() => {
                questionContainer.innerHTML = ''
                loadingSpinner.classList.add('visually-hidden')
                getQuestions()
            }, 1000)
        }
    }))
    bombButton.addEventListener('click', () => {
        optionsButtons.forEach(button => {
            if (totalPoints >= 2) {
                if (button.textContent != q.results[randomIndex].correct_answer) {
                    totalPoints -= 2
                    bombSound.play()
                    button.classList.add('disabled')
                }
            } else {
                info.textContent = 'You must have at least 2 points'
            }
        })
    })
    skipButton.addEventListener('click', () => {
        if (totalPoints >= 1) {
            totalPoints -= 1
            location.reload()
        }
    })
    //Create help menu
    helpButton.addEventListener('click', () => {
        const helpMenu = document.createElement('div')
        helpMenu.classList.add('position-absolute', 'top-2', 'w-100', 'h-100', 'bg-dark')
        helpMenu.style.height = '100vh'
        helpMenu.style.width = '100vw'
        helpMenu.style.color = '#fff'
        //Create exit button
        const exitButton = document.createElement('button')
        exitButton.textContent = 'X'
        exitButton.classList.add('btn', 'black', 'mt-2', 'p-2', 'ml-10', 'wtext')
        helpMenu.appendChild(exitButton)
        exitButton.addEventListener('click', () => {
            helpMenu.style.display = 'none'
        })
        //Create menu elements
        const gameInfo = document.createElement('div')
        gameInfo.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'w-100')
        gameInfo.innerHTML = `
        <div>
        <p class="text-center position-absolute top-0 fs-6 fw-bold text-decoration-underline">How To Play<span class="fs-3">?</span></p>
        <p class="text-center"><span class="fw-bold text-decoration-underline">Answer questions and get points</span><br>Each question has 4 possible answers</p>
        <hr>
        <p class="text-center">Each question has a category<br><span class=" fw-bold text-decoration-underline">Possible categories</span></p>
        <ul class="list-group full">
        <li class="text-center list-group-item bg-gkn wtext p-1"><i class="far fa-lightbulb"></i> General Knowledge</li>
        <li class="text-center list-group-item bg-en wtext p-1"><i class="fas fa-tv"></i> Entertainment</li>
        <li class="text-center list-group-item bg-sc wtext p-1"><i class="fas fa-flask"></i> Science</li>
        <li class="text-center list-group-item bg-my wtext p-1"><i class="fas fa-scroll"></i> Mythology</li>
        <li class="text-center list-group-item bg-sp wtext p-1"><i class="fas fa-football-ball"></i> Sports</li>
        <li class="text-center list-group-item bg-ge wtext p-1"><i class="fas fa-globe-americas"></i> Geography</li>
        <li class="text-center list-group-item bg-po wtext p-1"><i class="fas fa-balance-scale"></i> Politics</li>
        <li class="text-center list-group-item bg-ce wtext p-1"><i class="fas fa-user"></i> Celebrities</li>
        <li class="text-center list-group-item bg-al wtext p-1"><i class="fas fa-paw"></i> Animals</li>
        <li class="text-center list-group-item bg-ve wtext p-1"><i class="fas fa-car"></i> Vehicles</li>
        </ul>
        <p class="text-center">The points can be used to activate the boosters<br><span class="fw-bold text-decoration-underline">Available boosters</span></p>
        <ul class="list-group full">
        <li class="list-group-item black wtext mb-2 text-center"><i class="fas fa-bomb"></i> Bomb - Eliminates one or more incorrect answers <span class="fw-bold text-decoration-underline">Cost 2 points</span></li>
        <li class="list-group-item black wtext text-center"><i class="fas fa-forward"></i> Skip - Skips a question <span class="fw-bold text-decoration-underline">Cost 1 point</span></li>
        </ul>
        <div id="contact">
        <p class="text-center text-decoration-underline">About / Contact</p>
        <p class="text-center">All question are from <a href="https://opentdb.com" class="link-light fw-bold">this API</a></p>
        <div class="btn-group d-flex" role="group">
        <button type="button" class="btn wtext twitter" onclick="window.open('http://www.twitter.com/gabrielvr001')"><i class="fab fa-twitter fs-4"></i></button>
        <button type="button" class="btn wtext github" onclick="window.open('http://www.github.com/GabrielCrackPro')"><i class="fab fa-github fs-4"></i></button>
        <button type="button" class="btn wtext mail" onclick="mailto:gabrielcrackpro2001@gmail.com"><i class="fas fa-envelope fs-4"></i></button>
        </div>
        </div>
        </div>
        `
        helpMenu.appendChild(gameInfo)
        questionContainer.appendChild(helpMenu)
    })

}
getQuestions()

//TODO: ADD POINTS/LEADERBOARDS