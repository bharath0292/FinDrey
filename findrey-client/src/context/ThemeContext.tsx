import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
	theme: 'dark',
	toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	// Initialize to 'dark' for SSR hydration match; useEffect corrects on client.
	const [theme, setTheme] = useState<Theme>('dark');

	useEffect(() => {
		const stored = localStorage.getItem('theme') as Theme | null;
		const preferred: Theme = window.matchMedia('(prefers-color-scheme: light)')
			.matches
			? 'light'
			: 'dark';
		setTheme(stored ?? preferred);
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle('light', theme === 'light');
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
