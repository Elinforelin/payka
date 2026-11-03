export const THEME_STORAGE_KEY = "theme";

// Runs before first paint so a saved (or system) dark preference doesn't flash light.
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");if(s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;
