"use client";

import Link from "next/link";
import Image from "next/image";
import BlueButton from "../ui/BlueButton";
import { ArrowIcon } from "../icons/ArrowIcon";
import logo from "./../../../public/images/logo.png";
import { useState } from "react";

const navLinks = [
  { name: "Accueil", href: "#accueil" },
  { name: "Services", href: "#services" },
  { name: "Projets", href: "#projets" },
  { name: "Procédure", href: "#procedure" },
];

export default function Navbar() {
  const [menuOpen, isMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-(--cream) backdrop-blur-md border-b border-(--line)">
      <div className="flex items-center justify-between py-3.5 px-8 max-w-[1160px] mx-auto gap-6">
        {/* Logo & Titre */}
        <Link href="#accueil" className="flex items-center gap-3 shrink-0">
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

        <Link href="#contact" className="hidden md:block">
          <BlueButton icon={<ArrowIcon />}>Demander un devis</BlueButton>
        </Link>
        {/* <button className="menu-btn" id="menuBtn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobileMenu">
      <span></span>
    </button> */}
      </div>
      {menuOpen && (
        <div className="block  bg-(--cream) border-t border-(--line) max-h-130 md:hidden">
          <nav className="mobile-menu-links">
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
          <Link href="#devis">
            <BlueButton icon={<ArrowIcon />}>Demander un devis</BlueButton>
          </Link>
        </div>
      )}

      {/* <nav class="mobile-menu-links">
      <a href="#accueil">Accueil</a>
      <a href="#services">Services</a>
      <a href="#projets">Projets</a>
      <a href="#procedure">Procédure</a>
    </nav> */}
      {/* <a href="#contact" class="btn-primary mobile-menu-cta">Demander un devis
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a> */}
    </header>
  );
}
