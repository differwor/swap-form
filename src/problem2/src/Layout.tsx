import { FC, useCallback, useState } from "react";
import { NavLink, Outlet } from "react-router";

const Layout: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className="bg-core1 min-h-screen text-white">
      <header className="relative p-3">
        <nav className="flex justify-between w-full">
          <div
            className={`bg-core1 duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] flex md:items-center gap-[1.5vw] top-[100%] left-[-100%] px-5 md:py-0 py-5 ${
              isOpen && "left-[0%]"
            }`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
              <li>
                <NavLink className={({ isActive }) => isActive ? "text-core3" : ""} to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "text-core3" : ""} to="/swap" end>
                  Swap
                </NavLink>
              </li>
            </ul>
            
          </div>
          <div className="w-full flex justify-between md:justify-end items-center">
          <button
              type="button"
              className="border-solid bg-core3 text-white font-bold px-5 py-2 rounded-2xl"
            >
              Connect
            </button>
            <img
              width="40"
              className="cursor-pointer md:hidden hover:scale-110"
              onClick={toggleMenu}
              src="/menu.svg"
              alt="Menu Icon"
            />
          </div>
        </nav>
      </header>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
