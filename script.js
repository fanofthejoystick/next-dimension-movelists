const combinedMap = {
  "d+f": "df",
  "u+f": "uf",
  "d+b": "db"
};

const tokens = [
  "d+f", "u+f", "d+b",   // combined first
  "d", "f", "u", "b",
  "1", "2", "3", "4"
].sort((a, b) => b.length - a.length);

const regex = new RegExp(tokens.map(t => t.replace("+", "\\+")).join("|"), "gi");

function replaceNotation(text) {
  return text.replace(regex, match => {
    const lower = match.toLowerCase();

    if (combinedMap[lower]) {
      return `<img src="icons/${combinedMap[lower]}.png" class="icon">`;
    }

    return `<img src="icons/${lower}.png" class="icon">`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".move").forEach(move => {
    move.innerHTML = replaceNotation(move.textContent);
  });
});
