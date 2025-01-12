// 1. Array to store particles
const particles = [];

// 2. Function to create a particle
function createParticle(
  x,
  y,
  color,
  size,
  shape,
  speed,
  customCharacter,
  characterFont,
  characterSize,
  enableVelocity,
  clusterFactor,
  colorVariation,
  glowIntensity,
  velocityX,
  velocityY,
  enableRotation,
  rotationSpeed
) {
  // 3. Create a new div element for the particle
  const particle = document.createElement("div");
  // 4. Add the "particle" class to the particle element
  particle.classList.add("particle");
  // 5. Set the particle's position to fixed
  particle.style.position = "fixed"; // Use fixed positioning
  // 6. Disable pointer events on the particle
  particle.style.pointerEvents = "none";

  // 7. Add randomness to size, with a minimum size of 2
  const randomSize = size * (Math.random() * 0.5 + 0.8) + 2;

  // 8. Conditional styling based on shape
  if (shape === "circle") {
    // 9. Set background color for circle
    particle.style.backgroundColor = color;
    // 10. Set width and height for circle
    particle.style.width = `${randomSize}px`;
    particle.style.height = `${randomSize}px`;
    // 11. Make the particle circular
    particle.style.borderRadius = "50%";
  } else if (shape === "square") {
    // 13. Set background color for square
    particle.style.backgroundColor = color;
    // 14. Set width and height for square
    particle.style.width = `${randomSize}px`;
    particle.style.height = `${randomSize}px`;
  } else if (shape === "triangle") {
    // 16. Set width and height to 0 for triangle
    particle.style.width = "0";
    particle.style.height = "0";
    // 17. Create the triangle using borders
    particle.style.borderLeft = `${randomSize / 2}px solid transparent`;
    particle.style.borderRight = `${randomSize / 2}px solid transparent`;
    particle.style.borderBottom = `${randomSize}px solid ${color}`;
  } else if (shape === "star") {
    // 19. Create a star using CSS clip-path
    particle.style.width = `${randomSize}px`;
    particle.style.height = `${randomSize}px`;
    particle.style.backgroundColor = color;
    particle.style.clipPath =
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  } else if (shape === "character") {
    // 20. Use the custom character
    particle.textContent = customCharacter;
    particle.style.fontFamily = characterFont;
    particle.style.fontSize = `${characterSize}px`; // Use the character size setting
    particle.style.color = color;
    particle.style.width = `${characterSize}px`; // Set width to match size
    particle.style.height = `${characterSize}px`; // Set height to match size
    particle.style.lineHeight = `${characterSize}px`; // Vertically center text
    particle.style.textAlign = "center"; // Horizontally center text
    particle.style.overflow = "hidden"; // Hide any overflowing text
  }

  // Set initial position
  particle.style.left = `${x - randomSize / 2}px`;
  particle.style.top = `${y - randomSize / 2}px`;

  // 21. Add color variation
  const colorVariationValue = colorVariation / 100; // Convert percentage to a decimal
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const randomR = r + Math.floor((Math.random() - 0.5) * 2 * colorVariationValue * r);
  const randomG = g + Math.floor((Math.random() - 0.5) * 2 * colorVariationValue * g);
  const randomB = b + Math.floor((Math.random() - 0.5) * 2 * colorVariationValue * b);
  const variedColor = `rgb(${randomR}, ${randomG}, ${randomB})`;

  particle.style.backgroundColor = variedColor;
  if (shape === "character") {
    particle.style.color = variedColor; // Apply color variation to text as well
  }
  // 22. Apply a box shadow for the glow effect
  particle.style.boxShadow = `0 0 ${glowIntensity * 2}px ${variedColor}`;

  // 23. Append the particle to the body
  document.body.appendChild(particle);

  // 24. Add randomness to the initial position for clustering
  const clusterX = x + (Math.random() - 0.5) * clusterFactor;
  const clusterY = y + (Math.random() - 0.5) * clusterFactor;

  // 25. Store the particle and its initial position
  particles.push({
    element: particle,
    x: clusterX, // Use the clustered initial position
    y: clusterY,
    velocityX: enableVelocity ? (Math.random() - 0.5) * velocityX : 0, // Use user-defined velocity
    velocityY: enableVelocity ? (Math.random() - 0.5) * velocityY : 0, // Use user-defined velocity
    scale: 1,
    opacity: 1, // Add initial opacity
    shape,
    color: variedColor, // Use the varied color
    size: randomSize, // Use the randomized size
    speed,
    rotation: 0, // Initial rotation angle
    rotationSpeed: enableRotation ? (Math.random() - 0.5) * rotationSpeed : 0, // Use user-defined rotation speed
  });

  // 26. Animate the particle
  animateParticle(particle);
}

// 27. Function to animate a particle
function animateParticle(particle) {
  // 28. Find the index of the particle
  let index = particles.findIndex((p) => p.element === particle);
  // 29. If not found, return
  if (index === -1) return;

  // 30. Get the particle from the array
  const p = particles[index];

  // 31. Apply velocity to the particle's position
  p.x += p.velocityX;
  p.y += p.velocityY;

  // 32. Apply scaling to the entire element (including triangles)
  p.scale -= 0.03;
  p.element.style.transform = `scale(${p.scale})`;

  // 33. Fade out the particle
  p.opacity -= 0.02;
  p.element.style.opacity = p.opacity;

  // Apply rotation
  if (p.rotationSpeed !== 0) {
    p.rotation += p.rotationSpeed;
    p.element.style.transform += ` rotate(${p.rotation}deg)`;
  }

  // 34. Update the particle's position using fixed positioning
  p.element.style.left = `${p.x - p.size / 2}px`;
  p.element.style.top = `${p.y - p.size / 2}px`;

  // 37. Check if the particle should be removed
  if (p.opacity <= 0 || p.scale <= 0) {
    // 38. Remove the particle from the array
    particles.splice(index, 1);
    // 39. Remove the particle element from the DOM
    p.element.remove();
    return; // Early return to avoid further processing
  }

  // 40. Continue the animation after a delay
  //     Check if the context is still valid before rescheduling
  if (chrome.runtime?.id) {
    setTimeout(() => {
      // Re-check for validity within the timeout
      if (chrome.runtime?.id) {
        animateParticle(particle);
      }
    }, p.speed);
  }
}

// 41. Function to handle mouse movement
function handleMouseMove(event) {
  try {
    // 42. Retrieve settings from storage only if the runtime is valid
    if (chrome.runtime?.id) {
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
          // 43. Set default values for settings
          const color = settings.particleColor || "#0000ff"; // Default color
          const size = settings.particleSize || 5; // Default size
          const speed = settings.particleSpeed || 15; // Default speed
          const maxParticles = settings.particleCount || 50; // Default count
          const shape = settings.trailType || "circle"; // Default trail type
          const customCharacter = settings.customCharacter || "*"; // Default custom character
          const characterFont = settings.characterFont || "Arial"; // Default character font
          const characterSize = settings.characterSize || 15; // Default character size
          const enableVelocity =
            settings.enableVelocity !== undefined
              ? settings.enableVelocity
              : true;
          const clusterFactor =
            settings.clusterFactor !== undefined ? settings.clusterFactor : 10;
          const colorVariation =
            settings.colorVariation !== undefined
              ? settings.colorVariation
              : 50;
          const glowIntensity =
            settings.glowIntensity !== undefined
              ? settings.glowIntensity
              : 5;
          const velocityX =
            settings.velocityX !== undefined ? settings.velocityX : 2;
          const velocityY =
            settings.velocityY !== undefined ? settings.velocityY : 3;
          const enableRotation = settings.enableRotation || false;
          const rotationSpeed = settings.rotationSpeed || 1;

          // 44. Create multiple particles in a burst for the trail effect
          const particlesPerBurst = 5; // Adjust as needed
          // 45. Loop to create particles
          for (let i = 0; i < particlesPerBurst; i++) {
            // 46. Create a particle on mouse move
            createParticle(
              event.clientX,
              event.clientY,
              color,
              size,
              shape,
              speed,
              customCharacter,
              characterFont,
              characterSize,
              enableVelocity,
              clusterFactor,
              colorVariation,
              glowIntensity,
              velocityX,
              velocityY,
              enableRotation,
              rotationSpeed
            );
          }
        }
      );
    }
  } catch (error) {
    console.warn("Context invalidated during mouse move:", error);
  }
}

// 47. Add an event listener for mouse movement
document.addEventListener("mousemove", handleMouseMove);
