import { Link, NavLink } from "react-router-dom";
import { GraduationCap, House, Megaphone, UserRound, UsersRound } from "lucide-react";
import "../styles/Layout.css";

const navigation = [
  { to: "/home", label: "Home", icon: House },
  { to: "/students", label: "Students", icon: UsersRound },
  { to: "/teachers", label: "Teachers", icon: GraduationCap },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/announcements", label: "Announcements", icon: Megaphone },
];

export default function Layout({ children }) {
  return (
    <div className="app">
      <aside className="side">
        <Link className="brand" to="/home">
          <span className="brand-mark">C</span>
          <span>ISA University</span>
        </Link>
        <nav className="nav-list" aria-label="Main navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
              >
                <span className="nav-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}