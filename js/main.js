function getIndentLevel(command, previousMoves, category) {
  if (!command) return 0;

  const clean = command.replace(/\s+/g, "").toUpperCase();

  let bestMatch = null;

  for (const prev of previousMoves) {
    if (!prev.command) continue;
    if (prev.category !== category) continue;

    const isCancel = prev.tags?.some(t => t.toLowerCase() === "cancel");
    if (isCancel) continue;

    const prevClean = prev.command.replace(/\s+/g, "").toUpperCase();

    if (
      clean.startsWith(prevClean) &&
      prevClean.length < clean.length
    ) {
      if (!bestMatch || prevClean.length > bestMatch.clean.length) {
        bestMatch = {
          clean: prevClean,
          indent: prev._indentLevel || 0
        };
      }
    }
  }

  if (!bestMatch) return 0;

  return bestMatch.indent + 1;
}

function countSegments(command) {
  const tokens = command.match(/(D\+F|U\+F|D\+B|D|F|U|B|R1|[1-4])/gi);
  return tokens ? tokens.length : 0;
}

function toggleChildren(parentId, collapsed) {
  const tableBody = document.getElementById("movelist-body");
  const children = tableBody.querySelectorAll(`tr[data-child][data-parent-id="${parentId}"]`);

  children.forEach(r => {
    if (collapsed) {
      // expand
      r.style.display = ""; 
      const h = r.scrollHeight; 
      r.style.height = "0px";
      requestAnimationFrame(() => {
        r.style.transition = "height 0.3s ease, opacity 0.3s ease";
        r.style.height = h + "px";
        r.style.opacity = 1;
      });
      r.addEventListener("transitionend", () => {
        r.style.height = "auto";
      }, { once: true });
    } else {
      // collapse
      const h = r.scrollHeight;
      r.style.height = h + "px";
      requestAnimationFrame(() => {
        r.style.height = "0px";
        r.style.opacity = 0;
      });
      r.addEventListener("transitionend", () => {
        r.style.display = "none";
      }, { once: true });
    }
  });
}

function parseMoves(rawText) {
  if (!rawText) return [];

  let currentCategory = null;

  return rawText
    .trim()
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const categoryMatch = line.match(/^::(.+?)::$/);
      if (categoryMatch) {
        currentCategory = categoryMatch[1];
        return { category: currentCategory };
      }

      let manualIndent = 0;
      const indentMatch = line.match(/^>+/);
      if (indentMatch) {
        manualIndent = indentMatch[0].length;
        line = line.replace(/^>+\s*/, "");
      }

      let tags = [];
      const tagMatch = line.match(/\[(.*?)\]/);
      if (tagMatch) {
        tags = tagMatch[1]
          .split(",")
          .map(t => t.trim())
          .filter(t => t.length > 0);
        line = line.replace(tagMatch[0], "").trim();
      }

      const parts = line.split("-").map(s => s.trim());

      return {
        command: parts[0] || "",
        damage: parts[1] || "",
        tags: tags,
        category: currentCategory,
        manualIndent: manualIndent
      };
    });
}

function replaceNotation(text) {
  if (!text) return "";

  const combinedMap = { "d+f": "df", "u+f": "uf", "d+b": "db" };
  const tokens = ["d+f","u+f","d+b","d","f","u","b","1","2","3","4","R1"];
  const regex = new RegExp(tokens.map(t => t.replace("+", "\\+")).join("|"), "gi");

  let replaced = text.replace(regex, match => {
    const lower = match.toLowerCase();
    const iconName = combinedMap[lower] || lower;
    return `<img src="icons/${iconName}.png" class="icon ${iconName}" alt="${match}">`;
  });

  replaced = replaced.replace(/\bAS\b/gi,
    `<img src="icons/airseek.png" class="icon airseek" alt="AS">`
  );

  replaced = replaced.replace(/~/g,
    `<img src="icons/cancel.png" class="icon cancel" alt="~">`
  );

  return replaced;
}

function buildTreeNode() {
  return `<span class="tree-node"></span>`;
}

function buildTreeVisual(move, allMoves) {
  const level = move._indentLevel;
  if (level === 0) return "";

  let html = "";

  for (let i = 0; i < level; i++) {
    const isLastAtLevel = isLastSibling(move, allMoves, i);
    html += `<span class="tree-line ${isLastAtLevel ? "last" : ""}"></span>`;
  }

  html += `<span class="tree-branch-node"></span>`;

  return html;
}

function isLastSibling(move, allMoves, level) {
  const index = allMoves.indexOf(move);
  for (let i = index + 1; i < allMoves.length; i++) {
    const next = allMoves[i];
    if (!next._indentLevel && next._indentLevel !== 0) continue;

    if (next._indentLevel < move._indentLevel) break;
    if (next._indentLevel === move._indentLevel) return false;
  }
  return true;
}

function renderMovelist(character) {
  const tableBody = document.getElementById("movelist-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  const previousMoves = [];
  let parentCounter = 0;

  const childrenMap = new Map();

  const moves = Array.isArray(character.moves)
    ? character.moves
    : parseMoves(character.moves);

  const basePadding = 16;
  const indentPerLevel = 30;

  let activeCancellable = null;

  moves.forEach(move => {
    if (move.category && !move.command) {
      const catRow = document.createElement("tr");
      catRow.className = "category-row";
      catRow.innerHTML = `<td colspan="3" class="category-header">${move.category}</td>`;
      tableBody.appendChild(catRow);
      return;
    }

    if (!move.command) return;

    const isParent = move.tags.some(t => t.toLowerCase() === "cancellable");
    const isCancelChild = move.tags.some(t => t.toLowerCase() === "cancel");

    let indentLevel;

    // ------------------
    // CANCELLABLE PARENT
    // ------------------
    if (isParent) {
      indentLevel = getIndentLevel(move.command, previousMoves, move.category);

      parentCounter++;
      move.parentId = parentCounter;
      childrenMap.set(parentCounter, []);

      activeCancellable = move;
    }

    // -------------
    // CANCEL CHILD
    // -------------
    else if (isCancelChild && activeCancellable) {
      const parentIndent = activeCancellable._indentLevel ?? 0;

      indentLevel = parentIndent + 1;

      move.parentId = activeCancellable.parentId;
      childrenMap.get(activeCancellable.parentId).push(move);
    }

    // ------------
    // NORMAL MOVE
    // ------------
    else {
      indentLevel = getIndentLevel(move.command, previousMoves, move.category);
      activeCancellable = null;
      move.parentId = 0;
    }

    move._indentLevel = indentLevel;

    const totalPadding = basePadding + indentLevel * indentPerLevel;

    let displayCommand = move.command;
    let hasAirPrefix = false;

    if (/^AIR\b/i.test(displayCommand)) {
      hasAirPrefix = true;
      displayCommand = displayCommand.replace(/^AIR\b\s*/i, "");
    }

    const row = document.createElement("tr");

    if (isParent) row.dataset.parent = "true";

    if (isCancelChild) {
      row.dataset.child = "true";
      row.style.display = "none";
      row.classList.add("cancel-child");
    }

    row.dataset.parentId = move.parentId || 0;

    const tagsHtml = move.tags.map(t => {
      const lower = t.toLowerCase();

      if (lower.startsWith("note:")) {
        const noteText = t.substring(5).trim();
        return `<span class="tag note" data-note="${noteText}">Note</span>`;
      }

      if (lower === "cancel") return "";
      if (lower === "chained") return "";

      return `<span class="tag">${t}</span>`;
    }).join(" ");

    const indicatorHtml = isParent
      ? `<span class="collapse-indicator">▶</span>`
      : "";

   // inside renderMovelist, replace row.innerHTML td portion with:
row.innerHTML = `
  <td style="padding-left:${totalPadding}px" class="command-cell">
    <span class="bullet"></span>
    ${hasAirPrefix ? `<span class="air-tag">AIR</span>` : ""}
    ${replaceNotation(displayCommand)}
  </td>
  <td>${move.damage || ""}</td>
  <td>
    ${tagsHtml}
    ${indicatorHtml}
  </td>
`;

    tableBody.appendChild(row);

    // ---- Set bullet line length ----
    const parentIndent = move.parentId
      ? previousMoves.find(m => m.parentId === move.parentId)?._indentLevel || 0
      : 0;

    const lineLength = (move._indentLevel - parentIndent) * indentPerLevel;

    const bulletEl = row.querySelector('.bullet');
    if (bulletEl) {
      bulletEl.style.setProperty('--line-length', `${lineLength}px`);
    }

    // ------------------
    // COLLAPSE TOGGLE
    // ------------------
    if (isParent) {
      const indicator = row.querySelector(".collapse-indicator");

      indicator.addEventListener("click", () => {
        const collapsed = indicator.textContent === "▶";
        indicator.textContent = collapsed ? "▼" : "▶";

        const children = childrenMap.get(move.parentId);
        if (!children) return;

        if (collapsed) {
          let insertAfter = row;

          children.forEach(childMove => {
            const childRow = document.createElement("tr");
            childRow.classList.add("cancel-child");
            childRow.dataset.child = "true";
            childRow.dataset.parentId = move.parentId;

            const childPadding =
              basePadding + childMove._indentLevel * indentPerLevel;

            childRow.innerHTML = `
              <td style="padding-left:${childPadding}px; position: relative;">
                <span class="tree-connector" style="left:${childMove._indentLevel * indentPerLevel - 12}px"></span>
                ${replaceNotation(childMove.command)}
              </td>
              <td>${childMove.damage || ""}</td>
              <td></td>
            `;

            tableBody.insertBefore(childRow, insertAfter.nextSibling);
            insertAfter = childRow;
          });
        } else {
          const toRemove = tableBody.querySelectorAll(
            `tr[data-child][data-parent-id="${move.parentId}"]`
          );
          toRemove.forEach(r => r.remove());
        }
      });
    }

    previousMoves.push(move);
  });
}

function renderCombos(character) {
  const tableBody = document.getElementById("combos-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  if (!character.combos) return;

  const combos = character.combos
    .trim()
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      let tags = [];
      const tagMatch = line.match(/\[(.*?)\]/);
      if (tagMatch) {
        tags = tagMatch[1]
          .split(",")
          .map(t => t.trim())
          .filter(t => t.length > 0);
        line = line.replace(tagMatch[0], "").trim();
      }

      let command = line;
      let damage = "";
      const parts = line.split("-");
      if (parts.length > 1) {
        command = parts[0].trim();
        damage = parts.slice(1).join("-").trim();
      }

      return { command, damage, tags };
    });

  combos.forEach(combo => {
    if (!combo.command) return;

    const row = document.createElement("tr");
    const totalPadding = 16;

    let displayCommand = combo.command;
    let hasAirPrefix = false;
    if (/^AIR\b/i.test(displayCommand)) {
      hasAirPrefix = true;
      displayCommand = displayCommand.replace(/^AIR\b\s*/i, "");
    }

    row.innerHTML = `
      <td class="command" style="padding-left:${totalPadding}px">
        <span class="command-inner">
          ${hasAirPrefix ? `<span class="air-tag">AIR</span>` : ""}
          ${replaceNotation(displayCommand)}
        </span>
      </td>
      <td class="damage">${combo.damage || ""}</td>
      <td class="tags">
        ${combo.tags.length
          ? combo.tags.map(t => `<span class="tag">${t}</span>`).join(" ")
          : ""
        }
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function showPortrait(character) {
  const container = document.getElementById("character-portrait-container");
  container.innerHTML = "";

  if (!character || !character.icon) return;

  const portraitSrc = `images/${character.key}portrait.png`;

  const img = new Image();
  img.src = portraitSrc;

  img.onload = () => container.appendChild(img);
  img.onerror = () => console.warn(`Portrait not found: ${portraitSrc}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const charKey = params.get("char");
  const character = characters[charKey];

  const title = document.getElementById("character-name");
  if (!title) return;

  if (!character) {
    title.textContent = "Character not found";
    return;
  }

  title.textContent = character.name;
  character.key = charKey;

  renderMovelist(character);
  renderCombos(character);
  showPortrait(character);
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = scrollTop / docHeight;
  document.body.style.backgroundPosition = `center ${percent * 100}%`;
});

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");

    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

document.querySelector(".tab-button.active")?.click();