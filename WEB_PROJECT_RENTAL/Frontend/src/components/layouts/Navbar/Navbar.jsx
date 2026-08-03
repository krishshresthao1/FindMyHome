import Container from "../../common/Container/Container";
import Logo from "../Logo/Logo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-[99] border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <NavLinks />

          <NavActions />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
