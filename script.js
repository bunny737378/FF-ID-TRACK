async function fetchData() {
    const ffId = document.getElementById("ff-id").value.trim();
    const result = document.getElementById("result");
    const loading = document.getElementById("loading");
    const errorAlert = document.getElementById("error-alert");

    // Reset states
    result.classList.add("hidden");
    errorAlert.classList.add("hidden");

    if (!ffId || !/^\d+$/.test(ffId)) {
        showError("Please enter a valid numeric UID");
        return;
    }

    try {
        loading.classList.remove("hidden");

        const apiUrl = `https://freefire-info.aryankumarsha20.workers.dev/ff?id=${ffId}`;
        const corsProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

        const response = await fetch(corsProxy);
        if (!response.ok) throw new Error("API Error");

        const data = await response.json();

        if (!data.name) {
            showError("Player not found or invalid UID.");
            return;
        }

        // Update UI
        document.getElementById("name").textContent = data.name || "N/A";
        document.getElementById("id").textContent = data.id || "N/A";
        document.getElementById("region").textContent = data.region || "N/A";
        document.getElementById("account_creation").textContent = data.account_creation_date || "N/A";
        document.getElementById("ban_status").textContent = data.is_banned ? "Banned 🔴" : "Active 🟢";

        result.classList.remove("hidden");
    } catch (error) {
        showError("Failed to fetch data. Please try again.");
        console.error(error);
    } finally {
        loading.classList.add("hidden");
    }
}

function showError(message) {
    const errorAlert = document.getElementById("error-alert");
    errorAlert.textContent = message;
    errorAlert.classList.remove("hidden");
    setTimeout(() => errorAlert.classList.add("hidden"), 5000);
}