const buttons = document.querySelectorAll('form .step')
const inputs = document.querySelectorAll('form input')
const form = document.querySelector('form .submit')
const setCount = document.querySelector('.stepper-title #stepper-count')

inputs.forEach(input => {
    input.addEventListener('keydown', handleStepsOnKeyboard)
})
buttons.forEach(button => {
    button.addEventListener('click', handleSteps)
})
form.addEventListener('click', handleSubmit)


let contador = 1
setCount.innerHTML = `${contador}/6`
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
    setCount.parentNode.remove()
    setCount.remove()
}

function handleSteps(e) {
    let step = parseInt(e.target.parentNode.classList[1].substr(5))
    setCount.innerHTML = `${contador + step}/5`
    let nextstep = document.getElementsByClassName(`step-${step + 1}`)[0]
    handleStates(e.target, nextstep, step)
}
function handleStepsOnKeyboard(e) {
    let step = parseInt(e.target.parentNode.classList[1].substr(5))
    let nextstep = document.getElementsByClassName(`step-${step + 1}`)[0]
    if (e.keyCode === 13) {
        setCount.innerHTML = `${contador + step}/5`
        handleStates(buttons[step - 1], nextstep, step)
    }
}
// active - hidden - complete (STATES)
function handleStates(currentStep, nextStep, step) {

    currentStep.classList = 'hidden'
    currentStep.parentNode.classList += ' complete'
    nextStep.classList.remove('hidden')
    nextStep.classList = 'active ' + nextStep.classList
    if (document.getElementById(`input-${step + 1}`)) {

        document.getElementById(`input-${step + 1}`).focus()
    }


}