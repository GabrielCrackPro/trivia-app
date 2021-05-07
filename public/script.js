const API_URL = 'https://opentdb.com/api.php?amount=10'
const questionContainer = document.querySelector('.question')
let randomIndex = Math.floor(Math.random() * 10) //Get a random question based on index

function fetchQuestions() {
    let questions = fetch(API_URL)
        .then((response) => response.json())
    return questions
}
const getQuestions = async () => {
    const q = await fetchQuestions()
    questionContainer.innerHTML += `
    <p id='question-text'>${JSON.stringify(q.results[randomIndex].question)}</p>
    <div class='options'>
    <button>${q.results[randomIndex].correct_answer}</button>
    </div>
    ` //Crreate correct answer button
    const optionsContainer = document.querySelector('.options')
    for (let i = 0; i < q.results[randomIndex].incorrect_answers.length; i++) {
        optionsContainer.innerHTML += `
        <button>${q.results[randomIndex].incorrect_answers[i]}</button>
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
        'E9DF00', //History
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
    }
    //Verify the answers
    optionsButtons.forEach(button => button.addEventListener('click', () => {
        if (button.textContent === q.results[randomIndex].correct_answer) {
            button.style.backgroundColor = 'green'
        } else {
            button.style.backgroundColor = 'red'
            button.color = '#fff'
            location.reload()
        }
    }))

}
getQuestions()

//TODO: REFACTOR COLOR SELECTION
//TODO: ADD NEXT BUTTON
//TODO: ADD POINTS/LEADERBOARDS