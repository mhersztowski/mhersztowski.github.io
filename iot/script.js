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
