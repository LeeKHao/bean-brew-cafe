const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKdcLXYCRCjXZGdeZ3eU1oU1YtqRdlUeag4qxXJsUu6un145ij_HZC3H3DyU8gTe0oSA/exec";
const postForm = document.getElementById("post-form");

if (postForm) {
    postForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("post-name").value.trim();
        const content = document.getElementById("post-content").value.trim();
        const message = document.getElementById("post-message");
        const submitButton = document.getElementById("post-submit");

        if (!name || !content) {
            message.textContent = "Please fill in both fields.";
            return;
        }

        submitButton.disabled = true;
        message.textContent = "Submitting your post...";

        try {
            // Apps Script can redirect its response. Using no-cors
            // avoids browser CORS blocking, but means we cannot read
            // the response or confirm that the server saved the post.
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify({ name, content })
            });

            message.textContent =
                "Your post was sent. Please allow time for review.";

            postForm.reset();

        } catch (error) {
            console.error("Post submission failed:", error);
            message.textContent =
                "We couldn't send your post. Please try again.";
        } finally {
            submitButton.disabled = false;
        }
    });
}

const message = document.querySelector("#welcome-message");
message.textContent = "Welcome! Enjoy your coffee.";

const specialButton = document.querySelector("#special-button");
const special = document.querySelector("#special");
specialButton.addEventListener("click", function() {
    special.textContent = "Today's special: Iced Latte - $4.50";
});

function loadMenu() {
    const menuContainer = document.getElementById("menu-container");

    if (!menuContainer) {
        console.error('Could not find element with id="menu-container".');
        return;
    }

    menuContainer.textContent = "Loading menu...";

    // Create a globally accessible callback for the JSONP response.
    window.showMenu = function (products) {
        try {
            menuContainer.replaceChildren();

            if (!Array.isArray(products) || products.length === 0) {
                menuContainer.textContent = "No menu items available.";
                return;
            }

            products.forEach(function (product) {
                const card = document.createElement("div");
                card.className = "menu-item";

                const name = document.createElement("h3");
                name.textContent = product.name ?? "";

                const description = document.createElement("p");
                description.textContent = product.description ?? "";

                const price = document.createElement("p");
                const numericPrice = Number(product.price);
                price.textContent = Number.isFinite(numericPrice)
                    ? `$${numericPrice.toFixed(2)}`
                    : "Price unavailable";

                card.append(name, description, price);
                menuContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error displaying menu:", error);
            menuContainer.textContent = "Unable to display the menu.";
        }
    };

    const script = document.createElement("script");
    script.src = SCRIPT_URL + "?callback=showMenu";
    script.onerror = function () {
        menuContainer.textContent = "Unable to load the menu. Please try again later.";
        console.error("Could not load the Apps Script API.");
        delete window.showMenu;
    };

    document.body.appendChild(script);
}

// Load the menu when the page is ready.
document.addEventListener("DOMContentLoaded", loadMenu);


loadMenu();