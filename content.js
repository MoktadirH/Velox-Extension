// Function to toggle the panel visibility
function togglePanelVisibility() {
  const panel = document.querySelector("#mainPanel > div.bl_procedures");
  if (panel) {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  } else {
    console.warn("Velox panel not found.");
  }
}

// Function to add the toggle button
function addToggleButton() {
  let button = document.getElementById("veloxToggleButton");

  if (!button) {
    button = document.createElement("button");
    button.id = "veloxToggleButton";
    button.innerText = "Toggle Velox Panel";
    button.style.position = "fixed";
    button.style.top = "10px";
    button.style.right = "10px";
    button.style.zIndex = "10000";
    document.body.appendChild(button);
  }

  button.removeEventListener("click", togglePanelVisibility);
  button.addEventListener("click", togglePanelVisibility);
}


function waitForDOM() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      addToggleButton();
    });
  } else {
    addToggleButton();
  }
}

const observer = new MutationObserver(() => {
  if (document.querySelector("#mainPanel > div.bl_procedures")) {
    addToggleButton();
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

waitForDOM();
