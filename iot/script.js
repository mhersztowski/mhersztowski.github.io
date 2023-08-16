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
    }

    init() {
        start_search();
    }

    shoutdown() {}

    start_search() {
        alert("tototot");
        showNotification("Starting search local network");
    }

    on_end_search() {
        showNotification("Finishing search local network");
    }

    substringBeforeLastDot(str) {
        const lastDotIndex = str.lastIndexOf(".");

        if (lastDotIndex === -1) {
            return str; // Zwraca cały string, jeśli nie ma kropki w łańcuchu
        }

        return str.substring(0, lastDotIndex);
    }
}

const localDeviceList = new LocalDeviceList("192.168.1.42");
localDeviceList.init();
