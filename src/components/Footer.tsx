import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full mb-17 lg:mb-0">
            <div className="relative mx-auto flex h-[430px] w-full  items-center justify-center overflow-hidden px-10 bg-[radial-gradient(circle_at_20%_30%,#1e3a8a,#1e40af,#020617)]">

                <div className="absolute -left-[10%] -top-[20%] h-[300px] w-[300px] animate-footer-float rounded-full bg-[#38bdf8] opacity-60 blur-[120px]" />

                <div className="absolute -bottom-[20%] -right-[10%] h-[300px] w-[300px] animate-footer-float rounded-full bg-[#6366f1] opacity-60 blur-[120px]" />

                {/* Card */}
                <div className="w-full max-w-[460px] rounded-[22px] border border-slate-400/20 bg-slate-800/70 p-5 text-center shadow-[0_0_25px_rgba(56,189,248,0.6),0_0_55px_rgba(99,102,241,0.4)]">

                    {/* Profile */}
                    <figure className="mx-auto h-[200px] w-[200px] overflow-hidden rounded-full border-4 border-[#38bdf8] shadow-[0_0_25px_#38bdf8]">
                        <Image
                            src="/images/IMG_0747.JPG"
                            alt="Amirmahdi Salamat"
                            width={200}
                            height={200}
                            className="h-full w-full object-cover"
                        />
                    </figure>

                    {/* Name */}
                    <h1 className="mt-3 text-[22px] text-sky-100">
                        Amirmahdi Salamat
                    </h1>

                    {/* Job */}
                    <h3 className="mt-1 text-[15px] text-blue-300">
                        Front-End Developer
                    </h3>

                    {/* Socials */}
                    <div className="mt-4 flex justify-center gap-[14px]">

                        {/* GitHub */}
                        <Link
                            href="#"
                            target="_blank"
                            aria-label="GitHub"
                            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-lg text-gray-200 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition duration-300 hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_0_25px_rgba(99,102,241,0.8)]"
                        >
                            <FaGithub />
                        </Link>

                        {/* LinkedIn */}
                        <Link
                            href="#"
                            target="_blank"
                            aria-label="LinkedIn"
                            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-lg text-blue-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition duration-300 hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_0_25px_rgba(99,102,241,0.8)]"
                        >
                            <FaLinkedinIn />
                        </Link>

                        {/* Instagram */}
                        <Link
                            href="#"
                            target="_blank"
                            aria-label="Instagram"
                            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-lg text-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition duration-300 hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_0_25px_rgba(99,102,241,0.8)]"
                        >
                            <FaInstagram />
                        </Link>

                    </div>
                </div>
            </div>
        </footer>
    );
}