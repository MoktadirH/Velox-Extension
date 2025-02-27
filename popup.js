const button = document.getElementById("togglePanel");

if (!button) {
} else {
  button.addEventListener("click", async () => {

    // Get the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab || !tab.id) {
      console.error("No active tab found!");
      return;
    }

    // Execute the script in the active tab
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: togglePanelInjected
    }).then(() => {
      console.log("Script executed successfully!");
    }).catch(err => console.error("Script execution failed:", err));
  });
}

// This function runs inside the page
function togglePanelInjected() {
  const panel = document.querySelector("#mainPanel > div.bl_procedures");
  if (panel) {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  } else {
    console.warn("Velox panel not found.");
  }
}
