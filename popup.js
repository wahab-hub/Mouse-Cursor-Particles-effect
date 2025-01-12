document.addEventListener("DOMContentLoaded", () => {
  const particleColorInput = document.getElementById("particleColor");
  const particleSizeInput = document.getElementById("particleSize");
  const particleSpeedInput = document.getElementById("particleSpeed");
  const particleCountInput = document.getElementById("particleCount");
  const trailTypeSelect = document.getElementById("trailType");
  const customCharacterInput = document.getElementById("customCharacter");
  const characterFontSelect = document.getElementById("characterFont");
  const characterSizeInput = document.getElementById("characterSize");
  const enableVelocityCheckbox = document.getElementById("enableVelocity");
  const clusterFactorInput = document.getElementById("clusterFactor");
  const saveSettingsButton = document.getElementById("saveSettings");
  const colorVariationInput = document.getElementById("colorVariation");
  const glowIntensityInput = document.getElementById("glowIntensity");
  const velocityXInput = document.getElementById("velocityX");
  const velocityYInput = document.getElementById("velocityY");
  const enableRotationCheckbox = document.getElementById("enableRotation");
  const rotationSpeedInput = document.getElementById("rotationSpeed");

  // Get references to the sidebar, navigation items, and sections
  const sidebar = document.querySelector(".sidebar");
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");

  // Function to switch between sections
  function switchSection(sectionId) {
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add("active");
    }
  }

  // Event listener for navigation item clicks
  navItems.forEach((navItem) => {
    navItem.addEventListener("click", (event) => {
      // Remove active class from all nav items
      navItems.forEach((item) => {
        item.classList.remove("active");
      });

      // Add active class to the clicked nav item
      navItem.classList.add("active");

      // Switch to the corresponding section
      const sectionId = navItem.dataset.section;
      switchSection(sectionId);
    });
  });

  // Load settings from Chrome storage
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
      "rotationSpeed",
    ],
    (settings) => {
      particleColorInput.value = settings.particleColor || "#0000ff";
      particleSizeInput.value = settings.particleSize || 5;
      particleSpeedInput.value = settings.particleSpeed || 15;
      particleCountInput.value = settings.particleCount || 50;
      trailTypeSelect.value = settings.trailType || "circle";
      customCharacterInput.value = settings.customCharacter || "*";
      characterFontSelect.value = settings.characterFont || "Arial";
      characterSizeInput.value = settings.characterSize || 15;
      enableVelocityCheckbox.checked =
        settings.enableVelocity !== undefined ? settings.enableVelocity : true;
      clusterFactorInput.value =
        settings.clusterFactor !== undefined ? settings.clusterFactor : 10;
      colorVariationInput.value = settings.colorVariation || 50;
      glowIntensityInput.value = settings.glowIntensity || 5;
      velocityXInput.value = settings.velocityX || 2;
      velocityYInput.value = settings.velocityY || 3;
      enableRotationCheckbox.checked = settings.enableRotation || false;
      rotationSpeedInput.value = settings.rotationSpeed || 1;
    }
  );

  // Save settings to Chrome storage
  saveSettingsButton.addEventListener("click", () => {
    const settings = {
      particleColor: particleColorInput.value,
      particleSize: parseInt(particleSizeInput.value, 10),
      particleSpeed: parseInt(particleSpeedInput.value, 10),
      particleCount: parseInt(particleCountInput.value, 10),
      trailType: trailTypeSelect.value,
      customCharacter: customCharacterInput.value,
      characterFont: characterFontSelect.value,
      characterSize: parseInt(characterSizeInput.value, 10),
      enableVelocity: enableVelocityCheckbox.checked,
      clusterFactor: parseInt(clusterFactorInput.value, 10),
      colorVariation: parseInt(colorVariationInput.value, 10),
      glowIntensity: parseFloat(glowIntensityInput.value),
      velocityX: parseFloat(velocityXInput.value),
      velocityY: parseFloat(velocityYInput.value),
      enableRotation: enableRotationCheckbox.checked,
      rotationSpeed: parseFloat(rotationSpeedInput.value),
    };

    chrome.storage.local.set(settings, () => {
      alert("Settings saved!");
      window.close();
    });
  });
});
