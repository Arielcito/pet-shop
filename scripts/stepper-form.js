const buttons = document.querySelectorAll('a')
buttons.forEach(button => {
    button.addEventListener('click', handleSteps)
})
const form = document.querySelector('form')
form.addEventListener('submit', handleSubmit)

getLocalStorage()

function handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
    setLocalStorage()
}

function setLocalStorage() {
    localStorage.setItem('submit', true)
}

function getLocalStorage() {
    localStorage.getItem('submit') && stepperFormDisable();
}

function stepperFormDisable() {
    const hiddenElements = document.querySelectorAll('.hidden')
    buttons.forEach(element => element.remove())
    hiddenElements.forEach(element => element.classList.remove("hidden"))
}

function handleSteps(e) {
    let step = parseInt(e.target.parentNode.classList[1].substr(5))
    let nextstep = document.getElementsByClassName(`step-${step + 1}`)[0]
    handleStates(e.target, nextstep)
}

// active - hidden - complete (STATES)
function handleStates(currentStep, nextStep) {

    currentStep.classList = 'hidden'
    currentStep.parentNode.classList += ' complete'
    nextStep.classList.remove('hidden')
    nextStep.classList = 'active ' + nextStep.classList

}