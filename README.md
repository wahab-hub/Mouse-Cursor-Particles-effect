# Particle Effect Extension

This Chrome extension adds a customizable particle effect to web pages. As you move your mouse around, colorful particles will burst and trail behind your cursor, creating a visually engaging experience.

## NOTE: There may be some error or some function might not work because im just a beginner and im still learning. Thank You. 

## Features

*   **Customization:** Tailor the particle effect to your liking with a variety of settings:
    *   **General:**
        *   **Particle Color:** Choose the base color of the particles.
        *   **Max Particles:** Set the maximum number of particles to display at once.
        *   **Particle Speed:** Adjust how fast the particles move.
        *   **Particle Length:** Control how long particles remain visible before fading out.
        *   **Color Variation:** Add randomness to the particle colors.
        *   **Glow Intensity:** Change the intensity of the glow effect around particles.
    *   **Shape Options:**
        *   **Trail Type:** Select from different particle shapes, including circles, squares, triangles, stars, or even a custom character.
        *   **Particle Size:** Change the size of the particles.
    *   **Character Options:**
        *   **Character:** Enter a custom character to use as the particle shape.
        *   **Font:** Choose the font for your custom character.
        *   **Size:** Adjust the size of the custom character.
    *   **Animation:**
        *   **Enable Velocity:** Toggle whether particles have initial random movement.
        *   **Velocity X & Y:** Control the horizontal and vertical velocity ranges.
        *   **Enable Rotation:** Make particles rotate as they move.
        *   **Rotation Speed:** Set the speed of particle rotation.
        *   **Cluster Factor:** Adjust how closely particles cluster together when created.

## How to Use

1. **Installation:**
    *   Download or clone the extension's code.
    *   Open Chrome and go to `chrome://extensions/`.
    *   Enable "Developer mode" (usually a toggle in the top-right corner).
    *   Click "Load unpacked".
    *   Select the folder where you saved the extension's code.

2. **Usage:**
    *   Once installed, the particle effect will be active on all web pages (reload web page if it wont active).
    *   Click the extension icon in your Chrome toolbar to open the popup menu.
    *   Use the settings in the menu to customize the particle effect.
    *   Click the "Save Settings" button to apply your changes.

## Menu Structure

The popup menu is organized into sections:

*   **General:** Controls the basic appearance and behavior of the particles.
*   **Shape Options:** Choose the shape of the particles and adjust their size.
*   **Character Options:** Set a custom character to be used as the particle shape.
*   **Animation:** Fine-tune the movement and animation of the particles.

## Notes

*   The extension uses `requestAnimationFrame` for smooth animation and debounces the mousemove event to prevent excessive particle creation.
*   Particle positions are calculated using `position: fixed;`, so they are relative to the browser window and are not affected by page scrolling.
*   If you experience performance issues, try reducing the "Max Particles" setting or simplifying the particle shape.

## Enjoy!

Have fun customizing your particle effect and making your browsing experience more visually appealing!
