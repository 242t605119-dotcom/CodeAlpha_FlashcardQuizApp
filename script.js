let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is used to add functionality to web pages."
    }
];

let currentIndex = 0;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const counterElement = document.getElementById("counter");

function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayCard() {
    questionElement.textContent = flashcards[currentIndex].question;
    answerElement.textContent = "";

    if (counterElement) {
        counterElement.textContent =
            "Card " + (currentIndex + 1) + " of " + flashcards.length;
    }
}

document.getElementById("showAnswer").addEventListener("click", function() {
    answerElement.textContent = flashcards[currentIndex].answer;
});

document.getElementById("next").addEventListener("click", function() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        displayCard();
    }
});

document.getElementById("previous").addEventListener("click", function() {
    if (currentIndex > 0) {
        currentIndex--;
        displayCard();
    }
});

document.getElementById("add").addEventListener("click", function() {
    let question = prompt("Enter your question:");
    let answer = prompt("Enter your answer:");

    if (question && answer) {
        flashcards.push({
            question: question,
            answer: answer
        });

        saveFlashcards();

        currentIndex = flashcards.length - 1;
        displayCard();
    }
});

document.getElementById("edit").addEventListener("click", function() {
    let newQuestion = prompt(
        "Edit question:",
        flashcards[currentIndex].question
    );

    let newAnswer = prompt(
        "Edit answer:",
        flashcards[currentIndex].answer
    );

    if (newQuestion && newAnswer) {
        flashcards[currentIndex].question = newQuestion;
        flashcards[currentIndex].answer = newAnswer;

        saveFlashcards();

        displayCard();
    }
});

document.getElementById("delete").addEventListener("click", function() {
    if (flashcards.length === 1) {
        alert("You must keep at least one flashcard.");
        return;
    }

    flashcards.splice(currentIndex, 1);

    if (currentIndex >= flashcards.length) {
        currentIndex = flashcards.length - 1;
    }

    saveFlashcards();

    displayCard();
});

displayCard();