const answerForms = document.querySelectorAll('.answer-form')

answerForms.forEach(answerForm => {
    answerForm.addEventListener('submit', function (event) {
        event.preventDefault() // Prevent the default form submission

        // Fetch notes from the server
        fetch('/profile/notes')
        .then(response => response.json())
        .then(notes => {
            const questionElement = this.closest('.note').querySelector('.question')
            const answerElement = this.querySelector('.answer')
            const addButton = this.querySelector('.answer-btn')
            const question = questionElement.innerText
            const answer = answerElement.value

            // Update the backend
            fetch('/notes', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, answer })
            })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                console.log(data)
                // Update the UI
                const newAnswerElement = document.createElement('span')
                newAnswerElement.textContent = ' ' + answer // Add a space before the answer
                questionElement.appendChild(newAnswerElement)
                this.classList.add("hidden") // Hide the entire form
            })

        // Update the corresponding note in the notes array
        const noteIndex = Array.from(this.closest('.notes').children).indexOf(this.closest('.note'))
        notes[noteIndex].answer = answer
        })
    })
})

const trashButtons = document.querySelectorAll('.fa-trash')

// Add event listeners for trash buttons
trashButtons.forEach(trashButton => {
    trashButton.addEventListener('click', function () {
        const question = this.closest('.note').querySelector('.question').innerText

        // Update the backend
        fetch('/notes', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        })
        // Update the UI
        .then(function (response) {
            window.location.reload()
        })
    })
})