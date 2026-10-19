import Image from "next/image";
import logo from "./../../../public/images/logo.png";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Projets", href: "/#projets" },
    { name: "Procédure", href: "/#procedure" },
    { name: "Contactez-nous", href: "/#contact" },
  ];

  return (
    <>
      <footer className="bg-(--forest-deep) text-[#9FB0A3] pt-6 pb-9">
        <div className="w-full max-w-290 mx-auto px-5 sm:px-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 items-center lg:grid-cols-[1.2fr_0.8fr] gap-9 lg:gap-16 pb-6 border-b border-(--cream)/12">
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
              <p className="text-[14.5px] text-[#B7C4B9] max-w-[350px] leading-[1.6] mb-5">
                EPC Fournisseur photovoltaïque certifié — études, installation
                et maintenance pour particuliers et entreprises.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col">
              <span className="block text-[12.5px] font-semibold tracking-wider text-[#7E9089] mb-5">
                Navigation
              </span>
              <nav className="flex gap-3.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-[14.5px] text-[#B7C4B9] hover:text-(--cream) transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-wrap justify-between items-center pt-6.5 text-[13px] gap-2.5">
            <span>
              © {new Date().getFullYear()} Sun Solution. Tous droits réservés.
            </span>
            <span>Tunis, Tunisie</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
