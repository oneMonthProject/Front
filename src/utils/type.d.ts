import {ReactNode} from "react";

type DropDownItem = {
    name: string;
    value: string;
    onClickHandler?: (value: string) => void;
}

interface DropDownProps {
    items: DropDownItems[];
}

interface NavTabItem {
    name: string;
    href: string;
    current: boolean;
}

interface ProjectNavTabItem extends NavTabItem {
    name: string;
    href: string;
    current: boolean;
}

interface BadgeProps {
    color?: string;
    size?: string;
    text?: string;
}

type SelectItem = {
    value: string | number | null | undefined;
    name: string;
}

interface SelectProps {
    items: SelectItem[];
}

interface NoticeItem {
    alertId: string;
    content: string;
    type: string;
    createDate: string;
}

interface ModalProps {
    title: string;
    isOpen: boolean;
    close: () => void;
    children: ReactNode;
}