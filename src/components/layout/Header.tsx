"use client";

import Link from "next/link";
import Image from "next/image";
import BlueButton from "../ui/BlueButton";
import BurgerIcon from "../icons/BurgerIcon";
import { ArrowIcon } from "../icons/ArrowIcon";
import logo from "./../../../public/images/logo.png";
import { useState } from "react";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Projets", href: "/#projets" },
  { name: "Procédure", href: "/#procedure" },
];

export default function Navbar() {
  const [menuOpen, isMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-(--cream) backdrop-blur-md border-b border-(--line)">
      <div className="flex items-center justify-between py-3.5 px-8 max-w-290 mx-auto gap-6">
        {/* Logo & Titre */}
        <Link href="/#accueil" className="flex items-center gap-3 shrink-0">
          <div className="relative w-14 h-14">
            <Image
              src={logo}
              alt="Sun Solution"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-serif font-medium text-lg text-ink leading-tight">
            <i className="block not-italic font-sans font-medium text-[10.5px] text-slateCustom tracking-wider mt-0.5">
              Votre satisfaction est notre engagement
            </i>
          </span>
        </Link>

        {/* Menu central arrondi */}
        <nav className="hidden md:flex items-center gap-0.5 bg-(--white) border border-(--line) rounded-full p-1.5 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slateCustom px-4 py-2 rounded-full hover:text-(--ink) hover:bg-(--sage) transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="hidden md:block">
          <BlueButton icon={<ArrowIcon />}>Demander un devis</BlueButton>
        </Link>
        <button
          className="flex items-center justify-center cursor-pointer w-10.5 h-10.5 bg-(--white) border border-(--line) rounded-full md:hidden "
          onClick={() => isMenuOpen(!menuOpen)}
        >
          <BurgerIcon menuOpen={menuOpen} />
        </button>
      </div>
      {menuOpen && (
        <div className="bg-(--cream) border-t border-(--line) max-h-130">
          <nav className="flex flex-col pt-3.5 pb-1.5 px-8">
            {navLinks.map((link) => (
              <Link
                onClick={() => isMenuOpen(!menuOpen)}
                key={link.name}
                href={link.href}
                className="text-base font-medium text-(--slate) py-3.75 border-b border-(--line) cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/etude">
              <BlueButton
                icon={<ArrowIcon />}
                className="my-3.75"
                onClick={() => isMenuOpen(!menuOpen)}
              >
                Faire une etude
              </BlueButton>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
