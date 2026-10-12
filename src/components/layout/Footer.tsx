import Image from "next/image";
import logo from "./../../../public/images/logo.png";
import Link from "next/link";
import Arrow2Icon from "../icons/Arrow2Icon";
import MailIcon from "../icons/MailIcon";
import MapsIcon from "../icons/MapsIcon";
import PhoneIcon from "../icons/PhoneIcon";

const Footer = () => {
  return (
    <>
      <footer className="bg-(--forest-deep) text-[#9FB0A3] pt-10 pb-7">
        <div className="w-full max-w-[1160px] mx-auto px-5 sm:px-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 items-center lg:grid-cols-[1.3fr_0.7fr] gap-9 lg:gap-16 pb-6 border-b border-(--cream)/12">
            {/* Brand & Info */}
            <div className="flex flex-col">
              <div className="mb-4.5">
                <Image
                  src={logo}
                  alt="Sun Solution"
                  width={180}
                  height={44}
                  className="h-11 w-auto"
                  priority
                />
              </div>
              <p className="text-[14.5px] text-[#B7C4B9] max-w-[38ch] leading-[1.6] mb-5">
                Fournisseur photovoltaïque certifié — études, installation et
                maintenance pour particuliers et entreprises.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col">
              <span className="block text-[12.5px] font-semibold tracking-[0.05em] text-[#7E9089] mb-5">
                Navigation
              </span>
              <nav className="flex gap-3.5">
                <Link
                  href="/#accueil"
                  className="text-[14.5px] text-[#B7C4B9] hover:text-(--cream) transition-colors"
                >
                  Accueil
                </Link>
                <Link
                  href="/#services"
                  className="text-[14.5px] text-[#B7C4B9] hover:text-(--cream) transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/#projets"
                  className="text-[14.5px] text-[#B7C4B9] hover:text-(--cream) transition-colors"
                >
                  Projets
                </Link>
                <Link
                  href="/#procedure"
                  className="text-[14.5px] text-[#B7C4B9] hover:text-(--cream) transition-colors"
                >
                  Procédure
                </Link>
                <Link
                  href="/#contact"
                  className="text-[14.5px] text-[#B7C4B9] hover:text-(--cream) transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-wrap justify-between items-center pt-6.5 text-[13px] gap-2.5">
            <span>© 2026 Sun Solution. Tous droits réservés.</span>
            <span>Tunis, Tunisie</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
