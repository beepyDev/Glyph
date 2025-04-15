import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
	const [isCollapsed, setIsCollapsed] = useState(() => {
		const savedState = localStorage.getItem('sidebarCollapsed');
		return savedState ? JSON.parse(savedState) : false;
	});

	useEffect(() => {
		localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
	}, [isCollapsed]);

	const toggleSidebar = () => {
		setIsCollapsed(prev => !prev);
	};

	return (
		<SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (context === undefined) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
}