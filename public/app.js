const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-status]");
const empty = document.querySelector("#filter-empty");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.toggle("active", item === button));
    let count = 0;
    cards.forEach((card) => {
      const visible =
        button.dataset.filter === "all" ||
        card.dataset.status === button.dataset.filter;
      card.hidden = !visible;
      if (visible) count++;
    });
    if (empty) empty.hidden = count !== 0;
  }),
);
const dialog = document.querySelector("#delete-dialog");
if (dialog) {
  const trigger = document.querySelector(".delete-trigger");
  const cancel = document.querySelector("#cancel-delete");
  const close = () => {
    dialog.hidden = true;
    document.body.classList.remove("modal-open");
    trigger.focus();
  };
  trigger.addEventListener("click", () => {
    document.querySelector("#delete-book-name").textContent =
      trigger.dataset.deleteTitle;
    document.querySelector("#delete-form").action =
      trigger.dataset.deleteAction;
    dialog.hidden = false;
    document.body.classList.add("modal-open");
    cancel.focus();
  });
  cancel.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.hidden) close();
    if (event.key === "Tab" && !dialog.hidden) {
      const items = [cancel, document.querySelector("#delete-form button")];
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items[1].focus();
      } else if (!event.shiftKey && document.activeElement === items[1]) {
        event.preventDefault();
        items[0].focus();
      }
    }
  });
}
