"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./types";

export const NavbarLink = ({ item, isFocusMode }: { item: NavItem; isFocusMode: boolean }) => (
    <Link
        className={`navbar-item ${isFocusMode ? "navbar-item-hidden" : ""}`}
        href={item.href || "#"}
    >
        <span className="inline-flex items-center gap-1.5">
            <item.icon className="w-4 h-4" aria-hidden />
            <span>{item.label}</span>
        </span>
    </Link>
);

export const NavbarDropdownTrigger = ({
    item,
    isActive,
    isFocusMode,
    toggleDropdown,
}: {
    item: NavItem;
    isActive: boolean;
    isFocusMode: boolean;
    toggleDropdown: (id: string) => void;
}) => (
    <div
        className={`navbar-dropdown ${isActive ? "navbar-dropdown-active" : ""} ${isFocusMode && !isActive ? "navbar-item-hidden" : ""}`}
    >
        <button
            className="navbar-dropdown-trigger hover:underline"
            onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(item.id);
            }}
        >
            <span className="inline-flex items-center gap-1.5">
                <item.icon className="w-4 h-4" aria-hidden />
                <span>{item.label}</span>
                <ChevronDown
                    className={`w-3 h-3 transition-transform ${isActive ? "rotate-180" : ""}`}
                    aria-hidden
                />
            </span>
        </button>
    </div>
);

export const DropdownMenu = ({
    item,
    activeDropdown,
    isCompressed,
}: {
    item: NavItem;
    activeDropdown: string | null;
    isCompressed: boolean;
}) => {
    if (activeDropdown !== item.id || isCompressed || !item.dropdownContent) return null;

    return (
        <div className="dropdown-menu-container dropdown-expanded">
            <div className="navbar-dropdown-menu">
                {item.dropdownContent.map((section, idx) => (
                    <div key={idx} className="dropdown-section">
                        <div className="dropdown-subcategory">{section.title}</div>
                        <div className="dropdown-items-row">
                            {section.items.map((dropItem, dIdx) => (
                                <Link key={dIdx} href={dropItem.href} className="navbar-dropdown-item">
                                    <dropItem.icon className="w-4 h-4" aria-hidden />
                                    <span>{dropItem.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export * from "./types";
