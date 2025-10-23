
interface SocialButtonProps{
    title: string;
    color: string;
    textColor: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick: () => void; 

};

export default function SocialButton({
                                    title,
                                    color,
                                    textColor,
                                    icon: Icon,
                                    onClick,
                                    }: SocialButtonProps) {
    return (
        <div className={`${color && (color)}
                            ${textColor && (textColor)} 
                            rounded-xl 
                            items-center
                            text-xs
                            font-bold
                            py-1
                            px-3
                            flex
                            justify-between`} 
                            onClick={onClick}>
            {title}
            {Icon && <Icon className="w-3 h-3 ml-2" strokeWidth={2} />}
        </div>
    ) 
}