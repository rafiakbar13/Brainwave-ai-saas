"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Conversation",
    description:
      "Enable intelligent interactions with a natural language processing-powered service",
    icon: MessageSquare,
    color: "text-violet-500",
  },
  {
    title: "Video",
    description:
      "Automatically create engaging videos by leveraging AI to combine visual elements and animations.",
    icon: VideoIcon,
    color: "text-orange-700",
  },
  {
    title: "Music",
    description:
      "Utilize AI to compose original and unique musical pieces tailored to genre, mood, or instrument preferences. ",
    icon: Music,
    color: "text-emerald-500",
  },
  {
    title: "Image",
    description: "Generate images from text descriptions",
    icon: ImageIcon,
    color: "text-pink-700",
  },
  {
    title: "Code",
    description: "Generate code from text descriptions",
    icon: Code,
    color: "text-green-500",
  },
];

export const LandingServices = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-white">
        Services
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services.map((service) => (
          <Card
            key={service.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <service.icon className={cn("w-8 h-8", service.color)} />
                  <p className="text-sm text-zinc-400 pt-2">{service.title}</p>
                </div>
              </CardTitle>
              <CardContent className="px-0 pt-4">
                {service.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
