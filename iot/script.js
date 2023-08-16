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

showNotification("To jest komunikat222.");

/*
function getLocalIP(callback) {
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel("");
    pc.createOffer().then(pc.setLocalDescription.bind(pc));

    pc.onicecandidate = (ice) => {
        if (ice && ice.candidate && ice.candidate.candidate) {
            const localIP = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate)[1];
            callback(localIP);
        }
    };
}

getLocalIP((ip) => showNotification("Twój lokalny adres IP:", ip));
*/

class LocalDeviceList {
    constructor(ip_adress) {
        this.ip_adress = ip_adress;
        this.ip_prefix = substringBeforeLastDot(ip_adress);
        this.lastSearchIp = 0;
    }

    init() {
        start_search();
        for (let i = 0; i < 5; i++) {
            search_start();
        }
    }

    shoutdown() {}

    start_search() {
        this.searchIsEnd = false;
        alert("tototot");
        showNotification("Starting search local network");
    }

    on_end_search() {
        if (!this.searchIsEnd) {
            showNotification("Finishing search local network");
        }
        this.searchIsEnd = true;
    }

    substringBeforeLastDot(str) {
        const lastDotIndex = str.lastIndexOf(".");

        if (lastDotIndex === -1) {
            return str; // Zwraca cały string, jeśli nie ma kropki w łańcuchu
        }

        return str.substring(0, lastDotIndex);
    }

    search_start() {
        if (lastSearchIp > 255) {
            on_end_search();
        }

        showNotification("Starting search local network" + lastSearchIp);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + ip_prefix + lastSearchIp, true);
        lastSearchIp++;
        xhr.timeout = 5000; // Czas w milisekundach, tutaj 5 sekund

        xhr.onload = function () {
            // Zapytanie zakończone sukcesem
            console.log(xhr.responseText);
            search_start();
        };

        xhr.ontimeout = function () {
            // Zapytanie przekroczyło czas
            console.log("Request timed out");
            search_start();
        };

        xhr.onerror = function () {
            // Inne błędy (np. brak sieci)
            console.log("Request failed");
            search_start();
        };

        xhr.send();
    }
}

let localDeviceList = new LocalDeviceList("192.168.1.42");
localDeviceList.init();
