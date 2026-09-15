import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

interface ContactPageProps {
  onNavigate?: (pageId: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: "", email: "", projectDetails: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 600);
  };

  const socialCards = [
    {
      name: "WhatsApp",
      handle: "+91 98765 43210",
      href: "#",
      icon: <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-current transition-transform duration-300 group-hover:scale-110" />,
      glowColor: "rgba(37,211,102,0.25)",
      hoverBorder: "hover:border-[#25D366]/40 hover:shadow-[0_0_30px_rgba(37,211,102,0.2)]",
      iconGlow: "group-hover:drop-shadow-[0_0_18px_rgba(37,211,102,0.85)]",
    },
    {
      name: "Email",
      handle: "contact@meridian7x.in",
      href: "#",
      icon: <Mail className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-110" />,
      glowColor: "rgba(222,183,255,0.25)",
      hoverBorder: "hover:border-[#8F1CE8]/40 hover:shadow-[0_0_30px_rgba(143,28,232,0.2)]",
      iconGlow: "group-hover:drop-shadow-[0_0_18px_rgba(222,183,255,0.85)]",
    },
    {
      name: "Instagram",
      handle: "@meridian7x",
      href: "#",
      icon: <InstagramIcon className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-110" />,
      glowColor: "rgba(207,1,202,0.25)",
      hoverBorder: "hover:border-[#cf01ca]/40 hover:shadow-[0_0_30px_rgba(207,1,202,0.2)]",
      iconGlow: "group-hover:drop-shadow-[0_0_18px_rgba(207,1,202,0.85)]",
    },
    {
      name: "LinkedIn",
      handle: "Meridian 7X",
      href: "#",
      icon: <LinkedInIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-current transition-transform duration-300 group-hover:scale-110" />,
      glowColor: "rgba(0,119,181,0.25)",
      hoverBorder: "hover:border-[#0077B5]/40 hover:shadow-[0_0_30px_rgba(0,119,181,0.2)]",
      iconGlow: "group-hover:drop-shadow-[0_0_18px_rgba(0,119,181,0.85)]",
    },
    {
      name: "Twitter",
      handle: "@meridian7x",
      href: "#",
      icon: <XIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-current transition-transform duration-300 group-hover:scale-110" />,
      glowColor: "rgba(255,255,255,0.2)",
      hoverBorder: "hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
      iconGlow: "group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.85)]",
      span: "col-span-2 justify-self-center mx-auto w-[calc(50%-7px)] sm:w-[calc(50%-8px)]",
    },
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-24 text-center overflow-hidden">
      {/* Ambient Cyber-Luxury Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[400px] bg-gradient-to-r from-[#8F1CE8]/20 via-[#D20ACD]/15 to-transparent blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-[#8F1CE8]/10 blur-[130px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center"
      >
        {/* Display Headline */}
        <h1 className="font-syne text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] text-[#F5F5F7] mb-5 drop-shadow-2xl break-words">
          Get In{" "}
          <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(207,1,202,0.45)]">
            Touch
          </span>
        </h1>

        {/* Subtitle with first sentence on a single line */}
        <div className="font-outfit text-base sm:text-lg md:text-xl text-[#A7A7B0] max-w-5xl mx-auto leading-relaxed mb-12 sm:mb-16">
          <p className="whitespace-normal md:whitespace-nowrap">
            Ready to ignite unforgettable campus activations or partner with Meridian 7X?
          </p>
          <p className="mt-1.5 text-[#F5F5F7] font-medium">
            Let's build your next breakthrough together.
          </p>
        </div>

        {/* Side by Side Single Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Left Side: Contact Form (7 cols) with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 relative rounded-3xl border border-white/10 bg-[#111116]/85 backdrop-blur-xl p-5 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Corner ambient glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-52 h-52 bg-[#cf01ca]/15 blur-3xl rounded-full" />

            <div className="relative z-10">
              {/* Clean header without "Send a Dispatch" and without Message icon */}
              <div className="mb-8 pb-4 border-b border-white/10">
                <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">Project Inquiry</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block font-syne text-sm sm:text-base uppercase tracking-wider font-bold text-white/90 mb-2.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Name"
                    className="w-full rounded-xl bg-black/40 border border-white/15 px-4 sm:px-5 py-3.5 sm:py-4 text-white placeholder:text-white/35 font-outfit text-base sm:text-lg focus:outline-none focus:border-[#cf01ca] focus:ring-1 focus:ring-[#cf01ca] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-syne text-sm sm:text-base uppercase tracking-wider font-bold text-white/90 mb-2.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@meridian7x.in"
                    className="w-full rounded-xl bg-black/40 border border-white/15 px-4 sm:px-5 py-3.5 sm:py-4 text-white placeholder:text-white/35 font-outfit text-base sm:text-lg focus:outline-none focus:border-[#cf01ca] focus:ring-1 focus:ring-[#cf01ca] transition-all"
                  />
                </div>

                {/* Tell us about your project */}
                <div>
                  <label className="block font-syne text-sm sm:text-base uppercase tracking-wider font-bold text-white/90 mb-2.5">
                    Tell us about your project
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Tell us about your project requirements"
                    className="w-full rounded-xl bg-black/40 border border-white/15 px-4 sm:px-5 py-3.5 sm:py-4 text-white placeholder:text-white/35 font-outfit text-base sm:text-lg focus:outline-none focus:border-[#cf01ca] focus:ring-1 focus:ring-[#cf01ca] transition-all resize-none"
                  />
                </div>

                {/* Send Message Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-4.5 px-6 sm:px-8 rounded-xl font-syne text-base sm:text-lg uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#8F1CE8] via-[#D20ACD] to-[#8F1CE8] bg-[length:200%_auto] hover:bg-right shadow-[0_0_25px_rgba(210,10,205,0.45)] hover:shadow-[0_0_35px_rgba(210,10,205,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-white/20 disabled:opacity-50"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <span>Message Sent Successfully</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {isSubmitted && (
                  <p className="font-outfit text-sm sm:text-base text-emerald-400 text-center animate-fadeIn font-medium">
                    Thank you! Your message has been sent. We'll be in touch within 24 hours.
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Side: 2*2 Icon-Based Social Media Cards (5 cols) with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative rounded-3xl border border-white/10 bg-[#111116]/85 backdrop-blur-xl p-5 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Corner ambient glow */}
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-52 h-52 bg-[#8F1CE8]/20 blur-3xl rounded-full" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-white/10">
                  <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">Direct Channels</h2>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs sm:text-sm text-emerald-400 uppercase tracking-wider font-bold">Active</span>
                  </div>
                </div>

                {/* Direct Channels Icon Cards Grid */}
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                  {socialCards.map((card) => (
                    <a
                      key={card.name}
                      href={card.href}
                      target={card.href === "#" || card.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={card.href === "#" || card.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      onClick={(e) => {
                        if (card.href === "#") {
                          e.preventDefault();
                        }
                      }}
                      className={cn(
                        "group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300 min-h-[130px] sm:min-h-[145px] overflow-hidden text-center cursor-pointer select-none",
                        card.span || "",
                        card.hoverBorder
                      )}
                    >
                      {/* Corner subtle glow */}
                      <div
                        className="pointer-events-none absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                        style={{ background: card.glowColor }}
                      />

                      {/* Footer-styled icon (Bigger, Borderless, Smooth Hover Glow & Scale) */}
                      <div className={cn("text-[#A7A7B0] group-hover:text-white transition-all duration-300", card.iconGlow)}>
                        {card.icon}
                      </div>

                      {/* Name */}
                      <h3 className="font-syne text-base sm:text-lg font-bold text-white tracking-tight mt-3 transition-transform duration-300 group-hover:-translate-y-0.5">
                        {card.name}
                      </h3>

                      {/* Handle: Shown only on hover */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out w-full">
                        <div className="overflow-hidden">
                          <p className="font-outfit text-xs sm:text-sm text-[#deb7ff] font-medium pt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                            {card.handle}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Response Note */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center gap-2.5 text-sm sm:text-base text-[#A7A7B0] font-outfit font-medium">
                <span className="h-2 w-2 rounded-full bg-[#cf01ca] animate-pulse" />
                <span>Turnaround under 24 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
