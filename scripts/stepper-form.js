const buttons = document.querySelectorAll('a')
buttons.forEach(button => {
    button.addEventListener('click', handleSteps)
})
const form = document.querySelector('form')
form.addEventListener('submit', handleSumbit)

// active - hidden - complete (STATES)

function handleSumbit(e) {
    e.preventDefault();
    console.log('submit');
}

function handleSteps(e) {
    let step = parseInt(e.target.parentNode.classList[1].substr(5))
    let nextstep = document.getElementsByClassName(`step-${step + 1}`)[0]
    handleStates(e.target, nextstep)
}

function handleStates(currentStep, nextStep) {

    currentStep.classList = 'hidden'
    currentStep.parentNode.classList += ' complete'
    nextStep.classList.remove('hidden')
    nextStep.classList = 'active ' + nextStep.classList

}