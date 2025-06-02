# AuraCalc

A modern, intuitive, and responsive calculator application built entirely with **HTML, CSS, and JavaScript**. It provides a clean user interface with essential arithmetic functions and features a seamless theme toggle for personalized viewing.

## Live Demo
[Play with the Calculator](https://bit2swaz.github.io/AuraCalc/)

---

## Features
- **Core Arithmetic Operations:** Supports addition, subtraction, multiplication, and division.
- **Percentage Functionality:** Calculate percentages easily.
- **Sign Change:** Quickly toggle numbers between positive and negative.
- **Clear & Backspace:** Full control over input with clear all and single-digit backspace functions.
- **Responsive Design:** Adapts gracefully to various screen sizes, ensuring optimal usability on desktops, tablets, and mobile devices.
- **Theme Toggle:** Seamlessly switch between a modern dark mode and a clean light mode.
- **Persistent Theme Preference:** User's selected theme is saved in local storage, providing a consistent experience across sessions.
- **Keyboard Support:** Full calculator functionality accessible via keyboard inputs for faster operation.
- **Clean and Maintainable Codebase:** Structured HTML, well-organized CSS using custom properties for theming, and modular JavaScript for readability and extensibility.
- **Smooth Visuals:** Subtle transitions and hover effects on buttons for an engaging user experience.

---

## Tech Stack
- **HTML5:** For semantic structure and content.
- **CSS3:** For modern styling, responsiveness, and dynamic theme management using CSS Custom Properties (`:root`, `--var`, `var()`).
- **JavaScript (Vanilla):** For all interactive logic, DOM manipulation, and calculator functionality.
- **Font Awesome:** For scalable vector icons (theme toggle icon).

---

## What I Learned
- **Advanced CSS Theming:** Implementing dynamic light/dark modes efficiently using CSS Custom Properties and `body` classes.
- **Responsive Layouts:** Crafting a layout that centers the main application while allowing auxiliary elements (like the theme toggle) to be positioned absolutely within the viewport.
- **Flexbox for Layout:** Effective use of Flexbox for dynamic and responsive component arrangement, especially for button grids and overall page structure.
- **User Preference Persistence:** Utilizing `localStorage` to save user settings (like theme choice) for a persistent and enhanced user experience.
- **Calculator Logic & State Management:** Robust handling of calculator state (operands, operators, display values, pending operations) to ensure accurate calculations and correct display behavior.
- **Event Handling:** Implementing comprehensive event listeners for both mouse clicks and keyboard inputs for a versatile user interaction.
- **Display Sizing & Overflow:** Dynamically adjusting font size for long numbers and handling display overflow with `text-overflow: ellipsis`.

---

## How to Run Locally
```bash
git clone https://github.com/bit2swaz/awesome-calculator.git
cd awesome-calculator
open index.html
```

---

## Credits
Made with ❤️ by [bit2swaz](https://www.github.com/bit2swaz)

---

## What's Next
- Implement a basic calculation history feature.
- Add scientific functions (e.g., trigonometry, logarithms).
- Enhance error handling for more specific user feedback.
- Further optimize for touch interfaces.

---

## License
This project is open source and free to use.