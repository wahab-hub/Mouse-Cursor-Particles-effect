// 1. Add an event listener that triggers when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // 2. Get references to the particle color input and the save settings button
  const particleColorInput = document.getElementById("particleColor");
  const saveSettingsButton = document.getElementById("saveSettings");

  // 3. Load settings from Chrome storage
  chrome.storage.sync.get(["particleColor"], (settings) => {
    // 4. Set the value of the particle color input from the stored settings or use a default value
    particleColorInput.value = settings.particleColor || "#0000ff"; // Default color
  });

  // 5. Add a click event listener to the save settings button
  saveSettingsButton.addEventListener("click", () => {
    // 6. Get the selected color from the input
    const color = particleColorInput.value;
    // 7. Save the settings to Chrome storage
    chrome.storage.sync.set({ particleColor: color }, () => {
      // 8. Alert the user that settings are saved
      alert("Settings saved!");
    });
  });
});
