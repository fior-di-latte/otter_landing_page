import { calendarCodes, weekdays } from "./calendar.js";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const game = document.querySelector("[data-game]");
if (game) {
  const dates = [
    [1969, 7, 20],
    [2000, 1, 1],
    [2024, 2, 29],
    [1989, 11, 9],
    [2026, 9, 22],
    [2030, 12, 25],
  ];
  const format = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const buttons = [...game.querySelectorAll("[data-day]")];
  const ask = game.querySelector("[data-ask]");
  const liv = game.querySelector("[data-liv]");
  const hint = game.querySelector("[data-hint]");
  const next = game.querySelector("[data-next]");
  const feedback = game.querySelector("[data-feedback]");
  const promise = game.querySelector("[data-learning-promise]");
  let round = 0,
    complete = false;
  const answer = () => calendarCodes(...dates[round]).weekday;
  function revealLiv() {
    if (!liv.hidden) return;
    liv.hidden = false;
    hint.textContent = `“It’s a ${weekdays[answer()]}. You’ve got this.”`;
    ask.setAttribute("aria-expanded", "true");
    ask.textContent = "Liv is here ✓";
    ask.disabled = true;
  }
  function render() {
    complete = false;
    promise.hidden = true;
    liv.hidden = true;
    hint.textContent = "";
    ask.disabled = false;
    ask.textContent = "Ask Liv ✧";
    ask.setAttribute("aria-expanded", "false");
    game.querySelector("[data-date]").textContent = format.format(
      new Date(Date.UTC(dates[round][0], dates[round][1] - 1, dates[round][2])),
    );
    game.querySelector("[data-round]").textContent =
      `${String(round + 1).padStart(2, "0")} / 06`;
    feedback.textContent = "Pick a weekday. Ask Liv if you need help.";
    next.disabled = true;
    next.textContent =
      round === dates.length - 1 ? "Play again ↻" : "Next date →";
    buttons.forEach((button) => {
      button.disabled = false;
      button.className = "";
      button.removeAttribute("aria-pressed");
    });
  }
  ask.addEventListener("click", revealLiv);
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      if (complete) return;
      const correct = Number(button.dataset.day) === answer();
      buttons.forEach((item) => {
        item.className = "";
        item.setAttribute("aria-pressed", String(item === button));
      });
      button.className = correct ? "correct" : "incorrect";
      if (!correct) {
        revealLiv();
        feedback.textContent = "Not quite. Liv has a clue — try again.";
        return;
      }
      complete = true;
      feedback.textContent = `Correct — ${weekdays[answer()]}!`;
      promise.hidden = false;
      buttons.forEach((item) => {
        if (item !== button) item.disabled = true;
      });
      next.disabled = false;
    }),
  );
  next.addEventListener("click", () => {
    round = (round + 1) % dates.length;
    render();
    buttons[0].focus({ preventScroll: true });
  });
  render();
}
document.querySelectorAll('a[href^="#"]').forEach((link) =>
  link.addEventListener("click", (event) => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, "", link.hash);
    const focus =
      link.hash === "#top"
        ? document.querySelector("#hero-download a")
        : target.querySelector("a,button,input") || target;
    target.scrollIntoView({
      behavior: reducedMotion.matches ? "instant" : "smooth",
      block: "start",
    });
    if (!focus.matches("a,button,input")) focus.setAttribute("tabindex", "-1");
    focus.focus({ preventScroll: true });
  }),
);
const track = document.querySelector(".review-track");
if (track) {
  document
    .querySelectorAll("[data-review-prev], [data-review-next]")
    .forEach((button) => {
      button.disabled = false;
    });
  const cards = [...track.children];
  function move(direction) {
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const max = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;
    const target =
      direction > 0
        ? left >= max - 4
          ? 0
          : Math.min(max, left + step)
        : left <= 4
          ? max
          : Math.max(0, left - step);
    const index = Math.min(cards.length - 1, Math.round(target / step));
    track.scrollTo({
      left: target,
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
    document.querySelector("[data-review-status]").textContent =
      `Sample review ${index + 1} of ${cards.length}. ${cards[index].querySelector("blockquote").textContent}`;
  }
  document
    .querySelector("[data-review-prev]")
    .addEventListener("click", () => move(-1));
  document
    .querySelector("[data-review-next]")
    .addEventListener("click", () => move(1));
  track.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  });
}
const calculator = document.querySelector("[data-calculator]");
if (calculator) calculator.querySelector("button").disabled = false;
if (calculator)
  calculator.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = calculator.querySelector("input");
    if (!input.reportValidity()) return;
    const codes = calendarCodes(...input.value.split("-").map(Number));
    calculator.querySelector("output").textContent =
      `${codes.day} + ${codes.month} + ${codes.year} = ${codes.day + codes.month + codes.year}. Remainder ${codes.weekday} → ${weekdays[codes.weekday]}.`;
  });
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
}
