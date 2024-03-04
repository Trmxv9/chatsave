
let messages = [];

const alert = document.getElementById("alert");

const input = document.getElementById("input");

const send = document.getElementById("send");

const download = document.getElementById("download");

download.addEventListener("click", () => {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const text = messages.join('\n');
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `trmenus-${Math.floor(Math.random() * 1000)}.txt`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


send.addEventListener("click", () => {
    const message = input.value.trim();

    if (message !== "") {
        messages.push(message);

        input.value = "";

        const messagesContainer = document.getElementById("messages");

        messagesContainer.innerHTML = "";

        messages.forEach((message) => {
            messagesContainer.innerHTML += `<div class="bg-white p-4 mb-3 md:p-6 rounded-lg shadow-lg flex flex-col gap-4 md:flex-row md:max-h-300 overflow-auto" >${message}</div>`;

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
        alert.classList.add("hidden");
        localStorage.setItem("messages", JSON.stringify(messages));
    } else {
        alert.innerHTML =
            '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Please enter a message before sending!</div>';
        alert.classList.remove("hidden");
    }
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (input.value.trim() !== "") {
            send.click();
            alert.classList.add("hidden");
        } else {
            alert.innerHTML =
                '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Please enter a message before sending!</div>';
            alert.classList.remove("hidden");
        }
        event.preventDefault();
        return false;
    } else {
        return true;
    }
});

messages = JSON.parse(localStorage.getItem("messages")) || [];

const messagesContainer = document.getElementById("messages");

messages.forEach((message) => {
    messagesContainer.innerHTML += `<div class="bg-white p-4 mb-3 md:p-6 rounded-lg shadow-lg flex flex-col gap-4 md:flex-row md:max-h-300 overflow-auto" >${message}</div>`;

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    localStorage.setItem("messages", JSON.stringify(messages));
});

if (messages.length === 0) {
    messagesContainer.innerHTML = `<div class="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative" role="alert">No messages found</div>`;
}

// Clear all messages
const clear = document.getElementById("clear");

clear.addEventListener("click", () => {
    localStorage.clear("messages");
    location.reload();
});
