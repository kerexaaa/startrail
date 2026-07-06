"use client";
import SearchPanel from "./SearchPanel";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { searchIcon } from "@/app/assets/icons";
import { useUIStore } from "@/app/states/useUIStore";
import { AnimatePresence } from "framer-motion";

export default function SearchButton() {
  // return;
  const { isMobileSearchOpen, isMobileMenuOpen, setMobileSearchOpen } =
    useUIStore();

  return (
    <>
      <div className="absolute left-4 top-4 lg:hidden z-40">
        <AnimatePresence>
          {isMobileSearchOpen && <SearchPanel />}
        </AnimatePresence>

        <Button
          className={
            isMobileSearchOpen || isMobileMenuOpen ? "hidden" : "block"
          }
          onClick={() => setMobileSearchOpen(!isMobileSearchOpen)}
          icon={<Icon src={searchIcon} alt="Search" />}
        />
      </div>

      <div className="hidden lg:block absolute left-8 top-8 z-40">
        <SearchPanel isDesktop={true} />
      </div>
    </>
  );
}
