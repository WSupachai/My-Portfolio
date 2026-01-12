import { Download, Github, Linkedin, Youtube, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import MyJourney from '@/src/components/sections/MyJourney';

const socials = [
    {
        icon: Github,
        path: "https://github.com/WSupachai"
    },
    {
        icon: Linkedin,
        path: "https://www.linkedin.com/in/supachai-wijaiya-b7a236276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
        icon: Youtube,
        path: "https://www.youtube.com/@supachai.w"
    },
];

export default function AboutMeSection() {
    return (
        <section className={` h-full w-full  bg-[#080808] text-white py-12 xl:py-24`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
                    <div className="xl:w-1/2 flex justify-center xl:justify-center relative">
                        <div className="w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] relative">
                            <svg className="w-full h-full absolute top-0 left-0 z-0 pointer-events-none" viewBox="0 0 506 506" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle
                                    cx="253"
                                    cy="253"
                                    r="250"
                                    stroke="#00ff99"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    // ปรับ เช่น "10 20" เส้นจะถี่ขึ้น "50 50" เส้นจะห่าง
                                    strokeDasharray="20 40"
                                    className="animate-dash-flow origin-center"
                                />
                            </svg>

                            <div className="w-full h-full rounded-full overflow-hidden absolute top-0 left-0 z-10 mix-blend-lighten ">  {/* bg-neutral-800 */}
                                <Image
                                    src="/MARKER.png"
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center xl:text-left xl:w-1/2">
                        <span className="text-lg font-mono text-gray-300 mb-4 block">Software Developer</span>
                        <h1 className="text-5xl xl:text-7xl font-bold mb-6">
                            Hello I'm <br />
                            <span className="text-[#00ff99]">Supachai Wijaiya</span>
                        </h1>
                        <p className="max-w-[500px] mb-9 text-white/80 mx-auto xl:mx-0">
                            I am a full-stack developer who enjoys learning new technologies and building practical web applications.
                        </p>

                        <div className="flex flex-col xl:flex-row items-center gap-8">
                            <a className="uppercase flex items-center gap-2 border border-[#00ff99] text-[#00ff99] hover:bg-[#00ff99] hover:text-black transition-all duration-300 px-6 py-3 rounded-full tracking-wider font-semibold"
                                href="/Resume.pdf" // path นี้จะอ้างอิงจาก folder public โดยตรง
                                download="Supachai_Resume.pdf" 
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>Download CV</span>
                                <Download size={18} />
                            </a>

                            <div className="flex gap-4">
                                {socials.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 border border-[#00ff99] rounded-full flex justify-center items-center text-[#00ff99] hover:bg-[#00ff99] hover:text-black transition-all duration-300">
                                        <item.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
                <MyJourney />
            </div>
        </section>
    )
}