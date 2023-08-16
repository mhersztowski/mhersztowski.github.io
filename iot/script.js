// Funkcja dostępna dla innych podstron
function rootFunction() {
    alert("Funkcja na stronie root została wywołana!");
}

function callRootFunction() {
    if (window.rootFunction) {
        window.rootFunction();
    }
}

function loadPage(pageName) {
    const contentDiv = document.querySelector(".content");

    // Wczytywanie zawartości strony
    fetch(pageName + ".html")
        .then((response) => response.text())
        .then((html) => {
            contentDiv.innerHTML = html;
            // Wywołanie funkcji na załadowanej stronie (jeśli potrzebne)
            if (typeof onPageLoad === "function") {
                onPageLoad();
            }
        });
}

function showNotification(message) {
    const notificationsDiv = document.querySelector(".notifications");
    const notificationElement = document.createElement("div");
    notificationElement.className = "notifications-container";
    notificationElement.textContent = message;
    notificationsDiv.appendChild(notificationElement);

    setTimeout(() => {
        notificationsDiv.removeChild(notificationElement);
    }, 5000); // Usuwa komunikat po 5 sekundach
}

// Przykładowe użycie
showNotification("To jest komunikat.");
