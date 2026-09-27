import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useAdminTheme } from './AdminThemeContext';
import { AdminTheme } from './tokens';

interface AdminThemeSwitcherProps {
  compact?: boolean;
}

export const AdminThemeSwitcher: React.FC<AdminThemeSwitcherProps> = ({ compact = false }) => {
  const { theme, resolvedTheme, isDark, setTheme, tokens } = useAdminTheme();

  const options: { id: AdminTheme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop },
  ];

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-lg border transition-all ${
        isDark
          ? 'bg-slate-900/90 border-slate-800'
          : 'bg-slate-100 border-slate-200'
      }`}
      role="group"
      aria-label="Admin Interface Theme Selector"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTheme(opt.id)}
            title={`Switch to ${opt.label} Mode${opt.id === 'system' ? ` (Currently ${resolvedTheme})` : ''}`}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer select-none ${
              isSelected
                ? isDark
                  ? 'bg-slate-800 text-amber-300 shadow-xs border border-slate-700 font-bold'
                  : 'bg-white text-blue-950 shadow-xs border border-slate-200 font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? (opt.id === 'light' ? 'text-amber-500' : opt.id === 'dark' ? 'text-blue-400' : 'text-slate-400') : ''}`} />
            {!compact && <span className="text-[11px]">{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
};
