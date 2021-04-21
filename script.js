// Random Choice Picker

const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");
const answer = document.getElementById("answer");

textarea.focus();
answer.innerHTML = "";

textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);

  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 10);

    randomSelect();
  }
});

function createTags(input) {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  tagsEl.innerHTML = "";

  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      removeHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
      answer.innerText = randomTag.textContent;
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function removeHighlightTag(tag) {
  tag.classList.remove("highlight");
}

// Jokes Generator

const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("joke-btn");

jokeBtn.addEventListener("click", getJoke);

getJoke();

async function getJoke() {
  try {
    const options = {
      headers: {
        Accept: "application/json",
      },
    };

    const resp = await fetch("https://icanhazdadjoke.com/", options);
    data = await resp.json();

    jokeEl.innerHTML = data.joke;
  } catch (err) {
    alert("Couldn't fetch the joke! Please try again.");
    console.log("Couldn't fetch the joke!");
  }
}
