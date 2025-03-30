interface MenuAction {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface MenuProps {
  label?: string;
  show: boolean;
  toggle: () => void;
  actions: MenuAction[];
}

const Menu = ({ label = "⋯", show, toggle, actions }: MenuProps) => (
  <div className="relative shrink-0 text-right">
    {show && <div className="fixed inset-0 z-10" onClick={() => toggle()} />}
    <button onClick={toggle} className="text-gray-400 hover:text-white text-lg">
      {label}
    </button>
    {show && (
      <div className="absolute right-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow text-sm z-10 min-w-[140px]">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              action.danger ? "text-red-300 hover:bg-red-700" : "text-white"
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default Menu;
