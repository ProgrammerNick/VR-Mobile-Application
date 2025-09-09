import { useState, useEffect } from "react";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface VRContentDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  developer: string;
  category: string;
  duration: string;
  rating: number;
  totalRatings: number;
  price?: number;
  thumbnails: string[];
  features: string[];
  requirements: string[];
  ageRating: string;
  releaseDate: string;
  fileSize: string;
  reviews: Review[];
  screenshots: string[];
}

export function useVRContentData() {
  // Mock detailed content data - in a real app this would come from your API
  const [contentDetails, setContentDetails] = useState<
    Record<string, VRContentDetails>
  >({
    "1": {
      id: "1",
      title: "Cyberpunk City 2077",
      description:
        "Explore a neon-lit futuristic metropolis with flying cars and towering skyscrapers.",
      longDescription:
        "Welcome to the dark, neon-soaked future of Cyberpunk City 2077. This immersive experience transports you to a dystopian metropolis where mega-corporations rule and technology has merged with humanity. Navigate through towering skyscrapers, bustling markets, and underground districts while experiencing the gritty atmosphere of cyberpunk culture. The experience features interactive storytelling, multiple branching paths, and stunning visual effects that bring this futuristic world to life. You'll encounter cyborgs, hackers, and street vendors in a world where the line between human and machine has blurred.",
      developer: "CyberReality Studios",
      category: "Adventure",
      duration: "45 min",
      rating: 4.8,
      totalRatings: 453,
      price: 12.99,
      thumbnails: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5fGVufDF8fHx8MTc1NjM1NzIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      features: [
        "Interactive cyberpunk storyline",
        "Multiple exploration paths",
        "Futuristic vehicle rides",
        "Character interaction system",
        "Neon-lit environment design",
        "Immersive sound design",
      ],
      requirements: [
        "VR Headset: Meta Quest 2/3 or PC VR",
        "Storage: 4.5GB available space",
        "Performance: Medium to high graphics recommended",
        "Age: 16+ due to mature themes",
      ],
      ageRating: "M for Mature",
      releaseDate: "January 2024",
      fileSize: "4.8 GB",
      screenshots: [
        "https://images.unsplash.com/photo-1636036704268-017faa3b6557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlbnZpcm9ubWVudCUyMG5lb258ZW58MXx8fHwxNzU2MzU3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwY2l0eXxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      reviews: [
        {
          id: "1",
          username: "CyberNinja",
          rating: 5,
          comment:
            "Absolutely mind-blowing! The atmosphere is incredible and the story had me hooked from start to finish.",
          date: "1 week ago",
          helpful: 42,
        },
        {
          id: "2",
          username: "TechReviewer",
          rating: 5,
          comment:
            "Best cyberpunk VR experience I've tried. The attention to detail in the environment is phenomenal.",
          date: "4 days ago",
          helpful: 38,
        },
        {
          id: "3",
          username: "SciFiFan",
          rating: 4,
          comment:
            "Great visuals and sound design. Some minor performance issues but overall fantastic experience.",
          date: "2 weeks ago",
          helpful: 27,
        },
      ],
    },
    "2": {
      id: "2",
      title: "Space Station Alpha",
      description:
        "Experience life aboard an international space station with zero gravity physics.",
      longDescription:
        "Embark on an authentic space exploration adventure aboard Space Station Alpha, a detailed recreation of life in orbit around Earth. This educational and thrilling experience lets you float through realistic space station modules, conduct scientific experiments, and witness breathtaking views of Earth from 400 kilometers above. The experience features accurate zero-gravity physics, real astronaut procedures, and stunning Earth imagery. You'll learn about space science, the challenges of living in microgravity, and participate in daily space station operations including maintenance tasks, research activities, and communication with mission control.",
      developer: "Orbital Dynamics VR",
      category: "Simulation",
      duration: "30 min",
      rating: 4.6,
      totalRatings: 321,
      price: 9.99,
      thumbnails: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZXxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      features: [
        "Realistic zero gravity physics",
        "Authentic space station environment",
        "Scientific experiment simulations",
        "Earth observation activities",
        "Astronaut training modules",
        "Communication with mission control",
      ],
      requirements: [
        "VR Headset: Meta Quest 2/3 or equivalent",
        "Motion: Comfort settings for zero-g movement",
        "Space: Standing experience recommended",
        "Internet: Optional for real-time Earth data",
      ],
      ageRating: "E for Everyone",
      releaseDate: "November 2023",
      fileSize: "3.2 GB",
      screenshots: [
        "https://images.unsplash.com/photo-1634893661513-d6d1f579fc63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc3BhY2UlMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb25hdXQlMjBzcGFjZXxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      reviews: [
        {
          id: "4",
          username: "SpaceEnthusiast",
          rating: 5,
          comment:
            "Incredible experience! As close as I'll get to being an astronaut. The Earth views are breathtaking.",
          date: "5 days ago",
          helpful: 33,
        },
        {
          id: "5",
          username: "STEMEducator",
          rating: 4,
          comment:
            "Perfect for teaching space science. Students are completely engaged when using this.",
          date: "1 week ago",
          helpful: 28,
        },
        {
          id: "6",
          username: "VRExplorer",
          rating: 5,
          comment:
            "The zero gravity movement feels so realistic. Great attention to scientific accuracy.",
          date: "3 days ago",
          helpful: 21,
        },
      ],
    },
    "fallback-1": {
      id: "fallback-1",
      title: "VR Tutorial Island",
      description:
        "Learn the basics of VR interaction in this beginner-friendly experience.",
      longDescription:
        "Welcome to VR Tutorial Island, your gateway to the virtual world! This comprehensive tutorial experience is designed specifically for newcomers to VR technology. You'll learn essential interaction techniques including object manipulation, teleportation, menu navigation, and spatial awareness. The island features beautiful tropical environments where you can practice picking up objects, solving simple puzzles, and getting comfortable with VR movement. Our friendly AI guide will walk you through each step, ensuring you feel confident before diving into more complex VR experiences.",
      developer: "VR Learning Labs",
      category: "Tutorial",
      duration: "15 min",
      rating: 4.3,
      totalRatings: 289,
      thumbnails: [
        "https://images.unsplash.com/photo-1547930206-82ac0a7aa08d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjB3b3JsZHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      features: [
        "Interactive VR tutorial system",
        "Hand tracking support",
        "Voice guidance in 12 languages",
        "Adjustable comfort settings",
        "Progress tracking",
        "Practice environments",
      ],
      requirements: [
        "VR Headset: Meta Quest 2/3, PICO 4, or PC VR",
        "Space: 2m x 2m play area minimum",
        "Controllers: Hand tracking or VR controllers",
        "Age: 13+ recommended",
      ],
      ageRating: "E for Everyone",
      releaseDate: "March 2024",
      fileSize: "1.2 GB",
      screenshots: [
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGdhbWluZ3xlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1636036704268-017faa3b6557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlbnZpcm9ubWVudCUyMG5lb258ZW58MXx8fHwxNzU2MzU3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      reviews: [
        {
          id: "1",
          username: "VRNewbie",
          rating: 5,
          comment:
            "Perfect introduction to VR! The tutorial is very well structured and helped me get comfortable with the technology quickly.",
          date: "2 weeks ago",
          helpful: 23,
        },
        {
          id: "2",
          username: "TechEnthusiast",
          rating: 4,
          comment:
            "Great for beginners. My kids loved it too. The hand tracking tutorial was especially helpful.",
          date: "1 month ago",
          helpful: 15,
        },
      ],
    },
    "3": {
      id: "3",
      title: "Ancient Rome VR",
      description:
        "Walk through the Roman Forum and Colosseum in their full glory.",
      longDescription:
        "Step back in time to ancient Rome at the height of its power and glory. This meticulously researched historical experience lets you explore the Roman Forum, Colosseum, and other iconic landmarks as they appeared 2,000 years ago. Based on extensive archaeological evidence and historical records, every building, statue, and detail has been carefully reconstructed. You'll witness gladiator battles, chariot races, political speeches, and daily life in the world's greatest ancient civilization. The experience includes guided tours with expert historians and interactive elements that bring the ancient world to life.",
      developer: "HistoryVR Studios",
      category: "Education",
      duration: "60 min",
      rating: 4.9,
      totalRatings: 876,
      price: 14.99,
      thumbnails: [
        "https://vr-room.ch/wp-content/uploads/2022/06/Screenshot-2022-06-27-at-13-58-15-Ancient-Rome-comes-to-life-with-Virtual-Reality-Bus.png",
      ],
      features: [
        "Historically accurate reconstruction",
        "Expert-guided audio tours",
        "Interactive historical events",
        "Multiple time periods",
        "Educational mini-games",
        "Multilingual support",
      ],
      requirements: [
        "VR Headset: High-end PC VR or Meta Quest Pro",
        "Storage: 8GB available space",
        "Performance: High graphics settings recommended",
        "Internet: Required for initial download",
      ],
      ageRating: "T for Teen",
      releaseDate: "January 2024",
      fileSize: "8.4 GB",
      screenshots: [
        "https://unimersiv.com/wp-content/uploads/2017/01/screen_2560x1440_2017-01-12_10-25-04-1024x576.png",
        "https://www.thehistoryblog.com/wp-content/uploads/2022/06/Theater-of-Marcellus-virtual-reconstruction.jpg",
      ],
      reviews: [
        {
          id: "4",
          username: "HistoryBuff",
          rating: 5,
          comment:
            "Absolutely incredible! As a history teacher, this is exactly what I needed. The attention to detail is phenomenal.",
          date: "1 week ago",
          helpful: 45,
        },
        {
          id: "5",
          username: "RomanFan",
          rating: 5,
          comment:
            "Felt like I was actually there. The gladiator fights gave me chills!",
          date: "3 days ago",
          helpful: 28,
        },
        {
          id: "6",
          username: "EduTech",
          rating: 4,
          comment:
            "Great educational value. Using this in my classroom. Students are engaged like never before.",
          date: "2 weeks ago",
          helpful: 22,
        },
      ],
    },
    "4": {
      id: "4",
      title: "Deep Ocean Explorer",
      description: "Dive to the depths of the ocean and discover marine life.",
      longDescription:
        "Embark on an extraordinary underwater journey to the deepest parts of our oceans. This immersive experience takes you from sunny coral reefs to the mysterious abyssal depths, encountering incredible marine life along the way. Swim alongside whales, explore underwater caves, discover bioluminescent creatures, and witness the alien-like life forms that inhabit the deep sea trenches. The experience combines stunning photorealistic visuals with educational content about marine biology, ocean conservation, and the latest deep-sea discoveries. Perfect for nature lovers and anyone curious about the 95% of our oceans that remain unexplored.",
      developer: "Ocean VR",
      category: "Nature",
      duration: "40 min",
      rating: 4.7,
      totalRatings: 492,
      price: 11.99,
      thumbnails: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWZ8ZW58MXx8fHwxNzU2MzU3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      features: [
        "Photorealistic underwater environments",
        "Scientifically accurate marine life",
        "Multiple depth levels to explore",
        "Conservation education content",
        "Underwater photography mode",
        "Relaxation and meditation modes",
      ],
      requirements: [
        "VR Headset: Meta Quest 2/3 or equivalent",
        "Comfort: Motion sickness settings available",
        "Space: Seated experience recommended",
        "Audio: Headphones recommended for 3D audio",
      ],
      ageRating: "E for Everyone",
      releaseDate: "February 2024",
      fileSize: "5.7 GB",
      screenshots: [
        "https://images.unsplash.com/photo-1634893661513-d6d1f579fc63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc3BhY2UlMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwc2NlbmV8ZW58MXx8fHwxNzU2MzU3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      reviews: [
        {
          id: "7",
          username: "NatureLover",
          rating: 5,
          comment:
            "Breathtaking! I felt like I was actually swimming with whales. The visuals are stunning.",
          date: "5 days ago",
          helpful: 18,
        },
        {
          id: "8",
          username: "ScubaSteve",
          rating: 4,
          comment:
            "As a real diver, this captures the magic of being underwater perfectly. Great for those who can't dive.",
          date: "1 week ago",
          helpful: 12,
        },
      ],
    },
    "5": {
      id: "5",
      title: "Music Festival VR",
      description:
        "Experience the energy of a live concert from the front row.",
      longDescription:
        "Get ready to rock! Experience the ultimate music festival from the best seats in the house - or rather, the best spot in the mosh pit. This high-energy VR experience puts you right in the middle of the action at a massive outdoor music festival. Feel the bass shake your bones, see the crowd surge with excitement, and enjoy performances from multiple genres across different virtual stages. The experience features motion-captured performances from real musicians, crowd simulation technology that makes you feel part of the audience, and interactive elements that let you wave your hands, dance, and even crowd surf safely in VR.",
      developer: "Concert VR Productions",
      category: "Entertainment",
      duration: "90 min",
      rating: 4.5,
      totalRatings: 634,
      price: 8.99,
      thumbnails: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGNyb3dkfGVufDF8fHx8MTc1NjM1NzIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      features: [
        "Multiple music stages and genres",
        "Real musician performances",
        "Crowd interaction and dancing",
        "Different viewing positions",
        "Social multiplayer mode",
        "Custom playlist integration",
      ],
      requirements: [
        "VR Headset: Any modern VR headset",
        "Audio: Good headphones or speakers essential",
        "Space: Standing room recommended",
        "Movement: Full body tracking supported",
      ],
      ageRating: "T for Teen",
      releaseDate: "December 2023",
      fileSize: "6.2 GB",
      screenshots: [
        "https://flourishprosper.net/wp-content/uploads/2024/01/Imagine-a-futuristic-music-festival-in-virtual-reality.-In-the-center-a-large-holographic-stage-is-surrounded-by-virtual-avatars-of-people-from-diff-1024x585.png",
        "https://fortune.com/img-assets/wp-content/uploads/2016/01/coldplay-virtual-reality-concert-oculus-rift-nextvr-2.jpg",
      ],
      reviews: [
        {
          id: "9",
          username: "MusicFan",
          rating: 5,
          comment:
            "This is the closest thing to being at a real festival! The energy is infectious.",
          date: "4 days ago",
          helpful: 25,
        },
        {
          id: "10",
          username: "RockOn",
          rating: 4,
          comment:
            "Great way to experience live music when you can't make it to actual concerts. The sound quality is excellent.",
          date: "1 week ago",
          helpful: 16,
        },
      ],
    },
    "new-1": {
      id: "new-1",
      title: "Space Station Alpha",
      description: "Live and work aboard the International Space Station.",
      longDescription:
        "Experience life as an astronaut aboard the International Space Station in this incredibly detailed simulation. Float through the various modules, conduct scientific experiments, perform spacewalks, and witness Earth from 400 kilometers above. This experience combines real NASA data and footage with interactive elements that let you operate actual ISS equipment and procedures. You'll learn about space science, the challenges of living in microgravity, and the international cooperation that makes the ISS possible.",
      developer: "NASA VR Labs",
      category: "Simulation",
      duration: "45 min",
      rating: 4.6,
      totalRatings: 543,
      price: 12.99,
      thumbnails: [
        "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb25hdXQlMjBzcGFjZXxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      features: [
        "Authentic ISS environment",
        "Real NASA procedures",
        "Spacewalk simulation",
        "Zero gravity physics",
        "Scientific experiments",
        "Earth observation deck",
      ],
      requirements: [
        "VR Headset: Meta Quest 2/3 or PC VR",
        "Internet: Required for real-time Earth data",
        "Space: Standing/seated experience",
        "Motion: Comfort settings available",
      ],
      ageRating: "E for Everyone",
      releaseDate: "November 2023",
      fileSize: "4.8 GB",
      screenshots: [
        "https://images.unsplash.com/photo-1621685484364-a8a2439e10df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHN0YXRpb24lMjBhc3Ryb25hdXR8ZW58MXx8fHwxNzU2MzU0ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZXxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib-rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
      reviews: [
        {
          id: "11",
          username: "SpaceExplorer",
          rating: 5,
          comment:
            "This is the closest I'll ever get to being an astronaut! The detail is incredible and the spacewalk was breathtaking.",
          date: "1 week ago",
          helpful: 34,
        },
        {
          id: "12",
          username: "STEMTeacher",
          rating: 5,
          comment:
            "Perfect educational tool for teaching about space exploration. My students were amazed!",
          date: "2 weeks ago",
          helpful: 21,
        },
      ],
    },
    "new-2": {
      id: "new-2",
      title: "Prehistoric World",
      description: "Walk with dinosaurs in their natural habitat.",
      longDescription:
        "Journey back 65 million years to the Cretaceous period and experience the world of dinosaurs like never before. This paleontologist-approved experience lets you observe T-Rex hunts, witness massive herbivore migrations, and explore lush prehistoric landscapes. Based on the latest scientific research, every dinosaur behavior and environment detail is crafted for accuracy. You'll learn about different species, their behaviors, and the events that led to their extinction, all while safely observing these magnificent creatures in their natural habitat.",
      developer: "Paleo Interactive",
      category: "Adventure",
      duration: "35 min",
      rating: 4.4,
      totalRatings: 289,
      price: 9.99,
      thumbnails: [
        "https://blog.vive.com/express_media/images/Jurassic_Park_comes_to_life_-_Travel_back_to_p.scale-100.png",
      ],
      features: [
        "Scientifically accurate dinosaurs",
        "Multiple prehistoric environments",
        "Educational paleontology content",
        "Day/night cycle observation",
        "Dinosaur behavior simulation",
        "Fossil discovery mini-games",
      ],
      requirements: [
        "VR Headset: Any VR headset supported",
        "Age: Recommended 8+",
        "Space: 2m x 2m play area",
        "Content: Some intense dinosaur encounters",
      ],
      ageRating: "E10+ (Mild Fantasy Violence)",
      releaseDate: "October 2023",
      fileSize: "6.1 GB",
      screenshots: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaPc5C9YHw0A5gleq9qhGBTT-PZ3cy2qKu4Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLdlEHhVtt4SaleYu49CeqdGDAe2Kx2gJWLQ&s",
      ],
      reviews: [
        {
          id: "13",
          username: "DinoFan",
          rating: 5,
          comment:
            "Absolutely amazing! The T-Rex encounter had my heart racing. My kids love it too.",
          date: "3 days ago",
          helpful: 19,
        },
        {
          id: "14",
          username: "PaleoNerd",
          rating: 4,
          comment:
            "Great attention to scientific detail. The feathered raptors were a nice touch!",
          date: "1 week ago",
          helpful: 13,
        },
      ],
    },
    "6": {
      id: "6",
      title: "VR Tutorial Island",
      description:
        "Learn the basics of VR interaction in this beginner-friendly experience.",
      longDescription:
        "Welcome to VR Tutorial Island, your gateway to the virtual world! This comprehensive tutorial experience is designed specifically for newcomers to VR technology. You'll learn essential interaction techniques including object manipulation, teleportation, menu navigation, and spatial awareness. The island features beautiful tropical environments where you can practice picking up objects, solving simple puzzles, and getting comfortable with VR movement.",
      developer: "VR Learning Labs",
      category: "Tutorial",
      duration: "15 min",
      rating: 4.3,
      totalRatings: 289,
      thumbnails: [
        "https://d201n44z4ifond.cloudfront.net/wp-content/uploads/sites/6/2018/04/06143345/islandtime-ss-carlclaw.jpg",
      ],
      features: [
        "Interactive VR tutorial system",
        "Hand tracking support",
        "Voice guidance in 12 languages",
        "Adjustable comfort settings",
        "Progress tracking",
        "Practice environments",
      ],
      requirements: [
        "VR Headset: Meta Quest 2/3, PICO 4, or PC VR",
        "Space: 2m x 2m play area minimum",
        "Controllers: Hand tracking or VR controllers",
        "Age: 13+ recommended",
      ],
      ageRating: "E for Everyone",
      releaseDate: "March 2024",
      fileSize: "1.2 GB",
      screenshots: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcSJ0yb_LGmK23Kxi-OrunpvOVyNbPENjRnQ&s",
        "https://gamingtrend.com/content/images/2025/02/islanders_vredition_screenshots_01.jpg",
      ],
      reviews: [
        {
          id: "15",
          username: "VRNewbie",
          rating: 5,
          comment:
            "Perfect introduction to VR! The tutorial is very well structured and helped me get comfortable with the technology quickly.",
          date: "2 weeks ago",
          helpful: 23,
        },
        {
          id: "16",
          username: "TechEnthusiast",
          rating: 4,
          comment:
            "Great for beginners. My kids loved it too. The hand tracking tutorial was especially helpful.",
          date: "1 month ago",
          helpful: 15,
        },
      ],
    },
  });

  const getContentDetails = (id: string): VRContentDetails | null => {
    return contentDetails[id] || null;
  };

  return { getContentDetails };
}
