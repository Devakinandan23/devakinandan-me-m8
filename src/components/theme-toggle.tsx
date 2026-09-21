export function ThemeToggle() {
  return (
    <button
      aria-label="Toggle color theme"
      className="theme-toggle"
      data-theme-toggle
      title="Toggle color theme"
      type="button"
    >
      <svg aria-hidden="true" className="theme-icon moon-icon" viewBox="0 0 24 24">
        <path d="M20.7 15.1A8.4 8.4 0 0 1 8.9 3.3 8.7 8.7 0 1 0 20.7 15.1Z" />
      </svg>
      <svg aria-hidden="true" className="theme-icon sun-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
