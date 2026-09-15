import { majorEventsData } from "@/data/events";

export interface PastEvent {
  id: string;
  title: string;
  eventName: string;
  place: string;
  city: string;
  monthYear: string;
  tag: string;
  imageSrc: string;
  description: string;
  stat: string;
  driveFolderUrl: string;
  href: string; // for CardStack compatibility
}

export const top7PastEvents: PastEvent[] = [
  {
    id: "vibeverse-music-fest",
    title: majorEventsData[0]?.eventName || "VibeVerse Music Fest",
    eventName: majorEventsData[0]?.eventName || "VibeVerse Music Fest",
    place: "Campus Arena",
    city: "Bengaluru",
    monthYear: majorEventsData[0]?.monthYear || "OCT 2024",
    tag: majorEventsData[0]?.tag || "Campus Fest",
    imageSrc: majorEventsData[0]?.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    description: "Electrifying multi-stage music festival connecting top electronic artists and 15,000+ student attendees with immersive laser stage visuals.",
    stat: "15,000+ Attendees",
    driveFolderUrl: "#",
    href: "#",
  },
  {
    id: "neon-horizon-expo",
    title: majorEventsData[1]?.eventName || "Neon Horizon Expo",
    eventName: majorEventsData[1]?.eventName || "Neon Horizon Expo",
    place: "Exhibition Hub",
    city: "Mumbai",
    monthYear: majorEventsData[1]?.monthYear || "NOV 2024",
    tag: majorEventsData[1]?.tag || "Brand Experience",
    imageSrc: majorEventsData[1]?.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    description: "Futuristic brand showcase and product discovery zones engaging youth across multiple university campuses and creator hubs.",
    stat: "12,000+ Engagements",
    driveFolderUrl: "#",
    href: "#",
  },
  {
    id: "pulse-arena-league",
    title: majorEventsData[2]?.eventName || "Pulse Arena League",
    eventName: majorEventsData[2]?.eventName || "Pulse Arena League",
    place: "Sports Arena",
    city: "Delhi NCR",
    monthYear: majorEventsData[2]?.monthYear || "DEC 2024",
    tag: majorEventsData[2]?.tag || "Youth League",
    imageSrc: majorEventsData[2]?.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    description: "High-octane collegiate esports and athletic championship drawing competitive campus communities across the nation.",
    stat: "18,000+ Attendees",
    driveFolderUrl: "#",
    href: "#",
  },
  {
    id: "aura-electronic-night",
    title: majorEventsData[3]?.eventName || "Aura Electronic Night",
    eventName: majorEventsData[3]?.eventName || "Aura Electronic Night",
    place: "Waterfront Stage",
    city: "Goa",
    monthYear: majorEventsData[3]?.monthYear || "JAN 2025",
    tag: majorEventsData[3]?.tag || "Live Concert",
    imageSrc: majorEventsData[3]?.image || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    description: "Open-air waterfront concert production featuring high-energy DJ lineups, synchronized pyrotechnics, and kinetic light installations.",
    stat: "10,000+ Attendees",
    driveFolderUrl: "#",
    href: "#",
  },
  {
    id: "genesis-creator-summit",
    title: majorEventsData[4]?.eventName || "Genesis Creator Summit",
    eventName: majorEventsData[4]?.eventName || "Genesis Creator Summit",
    place: "Tech Park",
    city: "Hyderabad",
    monthYear: majorEventsData[4]?.monthYear || "FEB 2025",
    tag: majorEventsData[4]?.tag || "Creator Summit",
    imageSrc: majorEventsData[4]?.image || "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    description: "Exclusive student creator convention and brand collaboration forum featuring keynote industry leaders and creator masterclasses.",
    stat: "8,000+ Creators",
    driveFolderUrl: "#",
    href: "#",
  },
  {
    id: "hyperdrive-youth-carnival",
    title: majorEventsData[5]?.eventName || "HyperDrive Youth Carnival",
    eventName: majorEventsData[5]?.eventName || "HyperDrive Youth Carnival",
    place: "University Grounds",
    city: "Pune",
    monthYear: majorEventsData[5]?.monthYear || "MAR 2025",
    tag: majorEventsData[5]?.tag || "College Carnival",
    imageSrc: majorEventsData[5]?.image || "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    description: "Full-scale campus carnival featuring interactive sponsor pavilions, gaming zones, food villages, and indie musical acts.",
    stat: "14,000+ Footfall",
    driveFolderUrl: "#",
    href: "#",
  },
  {
    id: "velocity-arena-showcase",
    title: majorEventsData[6]?.eventName || "Velocity Arena Showcase",
    eventName: majorEventsData[6]?.eventName || "Velocity Arena Showcase",
    place: "Trade Complex",
    city: "Chennai",
    monthYear: majorEventsData[6]?.monthYear || "APR 2025",
    tag: majorEventsData[6]?.tag || "Brand Activation",
    imageSrc: majorEventsData[6]?.image || "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop",
    description: "High-impact campus product lounges and experiential brand tests bringing tier-1 consumer brands directly to college audiences.",
    stat: "11,000+ Engagements",
    driveFolderUrl: "#",
    href: "#",
  },
];
