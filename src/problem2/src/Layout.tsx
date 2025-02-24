import { FC, useCallback, useState } from "react";
import { NavLink, Outlet } from "react-router";

const Layout: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className="bg-black min-h-screen text-white">
      <header className="relative p-3">
        <nav className="flex justify-between w-full">
          <div
            className={`bg-black duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] flex md:items-center gap-[1.5vw] top-[100%] left-[-100%] px-5 md:py-0 py-5 ${
              isOpen && "left-[0%]"
            }`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/swap" end>
                  Swap
                </NavLink>
              </li>
            </ul>
            
          </div>
          <div className="w-full flex justify-between md:justify-end items-start">
          <button
              type="button"
              className="border-solid border-2 border-white hover:border-[#cf6f21] hover:text-[#cf6f21] text-white font-bold px-5 py-2 rounded-2xl"
            >
              Connect
            </button>
            <img
              className="cursor-pointer md:hidden hover:scale-125"
              onClick={toggleMenu}
              src="/public/svg-menu.svg"
              alt="Menu Icon"
            />
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
