document.getElementById("search-input").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll(".searchable-item");

    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? "block" : "none";
    });
});
