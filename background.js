// Listen for the extension being installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Set default settings if not already set
  chrome.storage.local.get(
    [
      "particleColor",
      "particleSize",
      "particleSpeed",
      "particleCount",
      "trailType",
      "customCharacter",
      "characterFont",
      "characterSize",
      "enableVelocity",
      "clusterFactor",
      "colorVariation",
      "glowIntensity",
      "velocityX",
      "velocityY",
      "enableRotation",
      "rotationSpeed"
    ],
    (settings) => {
      // Check if particleColor setting exists (or any other setting)
      if (!settings.particleColor) {
        // Set default settings for the extension
        chrome.storage.local.set({
          particleColor: "#0000ff", // Default color in #rrggbb format
          particleSize: 5,
          particleSpeed: 15,
          particleCount: 50,
          trailType: "circle",
          customCharacter: "*",
          characterFont: "Arial",
          characterSize: 12,
          enableVelocity: true,
          clusterFactor: 10,
          colorVariation: 50,
          glowIntensity: 5,
          velocityX: 2,
          velocityY: 3,
          enableRotation: false,
          rotationSpeed: 1
        });
      }
    }
  );
});
