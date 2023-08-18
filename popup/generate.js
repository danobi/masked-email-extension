let container = document.querySelector(".container");
let button = document.querySelector("#generate-button");
let input = document.querySelector("#description-input");

// Grey out the button
function disableButton() {
  button.style.backgroundColor = "#ccc";
  button.style.color = "#888";
  button.disabled = true;
}

// Replace the input box with `results`
function showResults(results) {
  const successMessage = document.createElement("div");
  successMessage.style = input.style.cssText;
  successMessage.innerText = results;
  input.replaceWith(successMessage);
}

function generate() {
  showResults("Done, yay!");
  disableButton();
};

// Add click event listener to the button
button.addEventListener("click", generate);
