let container = document.querySelector(".container");
let button = document.querySelector("#generate-button");
let input = document.querySelector("#description-input");

function generate() {
  // Grey out the button
  button.style.backgroundColor = "#ccc";
  button.style.color = "#888";
  button.disabled = true;

  // Replace the input box with "Success!"
  const successMessage = document.createElement("div");
  successMessage.style = input.style.cssText;
  successMessage.innerText = "Success!";
  input.replaceWith(successMessage);
};

// Add click event listener to the button
button.addEventListener("click", generate);
