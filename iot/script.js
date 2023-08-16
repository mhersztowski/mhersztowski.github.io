// Funkcja dostępna dla innych podstron
function rootFunction() {
    alert("Funkcja na stronie root została wywołana!");
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
