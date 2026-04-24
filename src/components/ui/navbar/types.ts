import { LucideIcon } from "lucide-react";

export type DropdownItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

export type DropdownSection = {
    title: string;
    items: DropdownItem[];
};

export type NavItem = {
    id: string;
    label: string;
    icon: LucideIcon;
    href?: string;
    isDropdown?: boolean;
    dropdownContent?: DropdownSection[];
    requiresOfficer?: boolean;
};
