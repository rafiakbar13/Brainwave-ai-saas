import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const BotAvatar = () => {
    return (
        <Avatar className="w-8 h8">
            <AvatarImage className="p-1" src="/logo.png" />
        </Avatar>
    )
}