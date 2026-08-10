import DesktopSearch from "./DesktopSearch";
import MobileSearch from "./MobileSearch";


export default function Search() {
  return (
    <>
      <div className="hidden lg:block w-120 xl:w-140 2xl:w-160">
        <DesktopSearch />
      </div>

      <div className="lg:hidden">
        <MobileSearch />
      </div>
    </>
  );
}