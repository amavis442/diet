import {
    Activity,
    AlarmClock,
    Archive,
    Bell,
    Camera,
    Check,
    Clipboard,
    Cloud,
    Eye,
    Heart,
    Image,
    Link,
    Lock,
    Mail,
    Map,
    Menu,
    Mic,
    Moon,
    Music,
    Phone,
    Search,
    Settings,
    Star,
    Bed,
    Coffee,
    Utensils,
    Syringe,
    Candy,
    type Icon as IconType
} from '@lucide/svelte';

type IconItem = {
    name: string;
    icon: typeof IconType;
};



export const IconMap: Record<string, typeof IconType> = {
    Activity,
    AlarmClock,
    Archive,
    Bell,
    Camera,
    Check,
    Clipboard,
    Cloud,
    Eye,
    Heart,
    Image,
    Link,
    Lock,
    Mail,
    Map,
    Menu,
    Mic,
    Moon,
    Music,
    Phone,
    Search,
    Settings,
    Star,
    Bed, 
    Coffee, 
    Utensils, 
    Syringe, 
    Candy
};

export type IconName = keyof typeof IconMap;