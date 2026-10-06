const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const message = document.querySelector("textarea").value;
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }
    alert("Thank you, " + name + "! Your message has been received.");
    form.reset();
});

const message = document.querySelector("#welcome-message");
message.textContent = "Welcome! Enjoy your coffee.";

const specialButton = document.querySelector("#special-button");
const special = document.querySelector("#special");
specialButton.addEventListener("click", function() {
    special.textContent = "Today's special: Iced Latte - $4.50";
});