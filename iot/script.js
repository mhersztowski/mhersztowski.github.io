const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", function () {
    menu.style.width = menu.style.width === "250px" || menu.style.width === "" ? "0" : "250px";
});

menu.addEventListener("mouseleave", function () {
    menu.style.width = "0";
});

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

function ShowMessage(message) {
    const contentDiv = document.querySelector(".messages");
    const notificationElement = document.createElement("div");
    //notificationElement.className = "notifications-container";
    notificationElement.textContent = message;
    contentDiv.appendChild(notificationElement);
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

function substringBeforeLastDot(str) {
    const lastDotIndex = str.lastIndexOf(".");

    if (lastDotIndex === -1) {
        return str; // Zwraca cały string, jeśli nie ma kropki w łańcuchu
    }

    return str.substring(0, lastDotIndex + 1);
}

/*
class TypeDef {
    constructor() {}

    isValidTypeName(typename) {
        if (
            typename == "bool" ||
            typename == "int" ||
            typename == "float" ||
            typename == "string"
        ) {
            return true;
        }
        return false;
    }
}

class Property {
    construtor() {
        this.typename = "int";
        this.value = 0;
        this.isChanged = false;
    }

    getValue() {
        return this.value;
    }

    setValue(newValue) {}
}

class Device {}
*/

class LocalDeviceList {
    constructor(ip_adress) {
        this.ip_adress = ip_adress;
        this.ip_prefix = substringBeforeLastDot(ip_adress);
        this.lastSearchIp = 0;
    }

    on_end_search() {
        if (!this.searchIsEnd) {
            //showNotification("Finishing search local network");
        }
        this.searchIsEnd = true;
    }

    search_start_dev() {
        if (this.lastSearchIp > 255) {
            this.on_end_search();
            return;
        }

        this.xhr = new XMLHttpRequest();
        let url = "http://" + this.ip_prefix + this.lastSearchIp;
        //let url = "http://onet.pl";
        showNotification("Starting search local network " + url);
        this.xhr.open("GET", url, true);
        this.lastSearchIp++;
        this.xhr.timeout = 1000; // Czas w milisekundach, tutaj 5 sekund

        this.xhr.onload = () => {
            // Zapytanie zakończone sukcesem
            //console.log(this.xhr.responseText);
            ShowMessage("XRP load ");
            this.search_start_dev();
        };

        this.xhr.ontimeout = () => {
            // Zapytanie przekroczyło czas
            console.log("Request timed out");
            ShowMessage("XRP timeout " + this.xhr.responseURL);
            this.search_start_dev();
        };

        this.xhr.onerror = () => {
            // Inne błędy (np. brak sieci)
            console.log("Request failed");
            ShowMessage(
                "XRP error " +
                    this.xhr.responseURL +
                    " " +
                    this.xhr.statusText +
                    " " +
                    this.xhr.status
            );
            this.search_start_dev();
        };

        this.xhr.send();
    }

    search_start() {
        this.searchIsEnd = false;
        this.lastSearchIp = 0;
        showNotification("Starting search local network");

        for (let i = 0; i < 5; i++) {
            this.search_start_dev();
        }
    }

    init() {
        this.search_start();
    }

    shoutdown() {}
}

//let localDeviceList = new LocalDeviceList("192.168.1.42");
//localDeviceList.init();

class WSLocalDeviceList {
    constructor(ip_adress) {
        this.ip_adress = ip_adress;
        this.ip_prefix = substringBeforeLastDot(ip_adress);
        this.lastSearchIp = 0;
    }

    on_end_search() {
        if (!this.searchIsEnd) {
            //showNotification("Finishing search local network");
        }
        this.searchIsEnd = true;
    }

    search_start_dev() {
        if (this.lastSearchIp > 255) {
            this.on_end_search();
            return;
        }

        const ipAddress = this.ip_prefix + this.lastSearchIp;
        const port = "8080";
        this.lastSearchIp++;

        // Inicjalizacja połączenia WebSocket
        const socket = new WebSocket(`ws://${ipAddress}:${port}`);

        showNotification("Starting search local network " + ipAddress);
        // Zdefiniowanie różnych zdarzeń dla połączenia WebSocket

        // Zdarzenie wywoływane, gdy połączenie zostanie otwarte
        socket.onopen = function (event) {
            ShowMessage("WebSocketOpen ");
            this.search_start_dev();
            //console.log("Połączenie WebSocket zostało otwarte:", event);
            //socket.send("Witaj, serwerze!");
        };

        // Zdarzenie wywoływane, gdy zostanie otrzymana wiadomość od serwera
        socket.onmessage = function (event) {
            //console.log("Otrzymano wiadomość od serwera:", event.data);
        };

        // Zdarzenie wywoływane, gdy wystąpi błąd w połączeniu
        socket.onerror = function (event) {
            ShowMessage("WebSocketError ");
            this.search_start_dev();
            //console.log("Błąd w połączeniu WebSocket:", event);
        };

        // Zdarzenie wywoływane, gdy połączenie zostanie zamknięte
        socket.onclose = function (event) {
            ShowMessage("WebSocketClose ");
            //console.log("Połączenie WebSocket zostało zamknięte:", event);
        };
        /*
        //let url = "http://onet.pl";
        showNotification("Starting search local network " + url);
        this.xhr.open("GET", url, true);
        this.lastSearchIp++;
        this.xhr.timeout = 1000; // Czas w milisekundach, tutaj 5 sekund

        this.xhr.onload = () => {
            // Zapytanie zakończone sukcesem
            //console.log(this.xhr.responseText);
            ShowMessage("XRP load ");
            this.search_start_dev();
        };

        this.xhr.ontimeout = () => {
            // Zapytanie przekroczyło czas
            console.log("Request timed out");
            ShowMessage("XRP timeout " + this.xhr.responseURL);
            this.search_start_dev();
        };

        this.xhr.onerror = () => {
            // Inne błędy (np. brak sieci)
            console.log("Request failed");
            ShowMessage(
                "XRP error " +
                    this.xhr.responseURL +
                    " " +
                    this.xhr.statusText +
                    " " +
                    this.xhr.status
            );
            this.search_start_dev();
        };

        this.xhr.send();
        */
    }

    search_start() {
        this.searchIsEnd = false;
        this.lastSearchIp = 0;
        showNotification("Starting search local network");

        for (let i = 0; i < 5; i++) {
            this.search_start_dev();
        }
    }

    init() {
        this.search_start();
    }

    shoutdown() {}
}

let localDeviceList = new WSLocalDeviceList("192.168.1.42");
localDeviceList.init();
