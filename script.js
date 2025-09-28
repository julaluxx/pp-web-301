const form = document.getElementById("filterForm");
const checkboxes = form.querySelectorAll("input[type=checkbox]");
const cards = document.querySelectorAll(".card");

form.addEventListener("change", () => {
    const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    cards.forEach(card => {
        const tags = card.dataset.tags.split(" ");
        const match = selected.length === 0 || selected.some(s => tags.includes(s));
        card.style.display = match ? "flex" : "none";
    });
});

form.addEventListener("reset", () => {
    setTimeout(() => {
        cards.forEach(card => card.style.display = "flex");
    }, 0);
});
