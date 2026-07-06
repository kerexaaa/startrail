import Button from "../common/Button";
import Icon from "../common/Icon";
import { menuIcon } from "@/app/assets/icons";
import Menu from "./Menu";
import { useUIStore } from "@/app/states/useUIStore";
import { AnimatePresence } from "framer-motion";

export default function MenuButton() {
  const { setMobileMenuOpen, isMobileMenuOpen, isMobileSearchOpen } =
    useUIStore();

  return (
    <div className="absolute right-4 top-4 z-40 lg:hidden">
      <AnimatePresence>{isMobileMenuOpen && <Menu />}</AnimatePresence>
      <Button
        className={isMobileMenuOpen || isMobileSearchOpen ? "hidden" : "block"}
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        icon={<Icon src={menuIcon} alt="Menu" />}
      />
    </div>
  );
}
