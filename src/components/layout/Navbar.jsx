import { useEffect, useState } from 'react';
import { FaGithub, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ title = 'Github Finder' }) {
  const [theme, setTheme] = useState(
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light',
  );

  useEffect(() => {
    updateTheme();
  }, [theme]);

  const updateTheme = () => {
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    const daisyThemeName = theme === 'dark' ? 'dracula' : 'winter';
    document.querySelector('html').setAttribute('data-theme', daisyThemeName);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // update state on toggle
  const handleThemeToggle = (e) => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className="inline pr-2 text-3xl" />
          <Link to="/" className="text-lg font-bold align-middle">
            {title}
          </Link>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              Home
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
            <button
              type="button"
              onClick={handleThemeToggle}
              className="btn btn-ghost btn-sm"
            >
              {theme === 'dark' && <FaMoon />}
              {theme === 'light' && <FaSun />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
