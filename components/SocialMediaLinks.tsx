import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  followers: string;
  bgColor: string;
  hoverColor: string;
  iconColor: string;
}

interface SocialMediaLinksProps {
  variant?: "compact" | "full";
}

export function SocialMediaLinks({ variant = "full" }: SocialMediaLinksProps) {
  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "https://www.facebook.com/babelink",
      followers: "2.5K",
      bgColor: "bg-[#1877F2]",
      hoverColor: "hover:scale-105",
      iconColor: "text-white",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/babelink",
      followers: "3.2K",
      bgColor: "bg-gradient-to-br from-[#E1306C] via-[#C13584] to-[#833AB4]",
      hoverColor: "hover:scale-105",
      iconColor: "text-white",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://www.youtube.com/@babelink",
      followers: "1.8K",
      bgColor: "bg-[#FF0000]",
      hoverColor: "hover:scale-105",
      iconColor: "text-white",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="h-5 w-5" />,
      url: "https://www.tiktok.com/@babelink",
      followers: "4.1K",
      bgColor: "bg-black",
      hoverColor: "hover:scale-105",
      iconColor: "text-white",
    },
  ];

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.bgColor} ${social.hoverColor} ${social.iconColor} rounded-xl p-3 flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            <div className="shrink-0">{social.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs opacity-90 truncate">{social.name}</p>
              <p className="text-sm">{social.followers}</p>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.bgColor} ${social.hoverColor} ${social.iconColor} rounded-xl p-4 flex items-center justify-between transition-all duration-300 shadow-md hover:shadow-lg group`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 group-hover:bg-white/30 transition-all">
              {social.icon}
            </div>
            <div>
              <p className="text-sm opacity-90">{social.name}</p>
              <p className="text-xs opacity-75">Síguenos</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg">{social.followers}</p>
            <p className="text-xs opacity-75">seguidores</p>
          </div>
        </a>
      ))}
    </div>
  );
}
