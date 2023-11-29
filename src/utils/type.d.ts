import {ReactNode} from "react";

export type DropDownItem = {
    name: string;
    value: string;
    onClickHandler?: (value: string) => void;
}

export interface DropDownProps {
    items: DropDownItems[];
}

export interface NavTabItem {
    name: string;
    href: string;
    current?: boolean;
}

export interface ProjectNavTabItem extends NavTabItem {
    name: string;
    href: string;
}

export interface BadgeProps {
    color?: string;
    size?: string;
    text?: string;
}

export type SelectItem = {
    value: string | number | null | undefined;
    name: string;
}

export interface SelectProps {
    items: SelectItem[];
}

export interface SingleSelectProps extends SelectProps {
    value: SelectItem | null;
    setValue: (value: SelectItem) => void;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export interface MultiSelectProps extends SingleSelectProps {
    values: SelectItem[];
    setValues: (value: SelectItem[]) => void;
    value?: SelectItem | null;
    setValue?: (value: SelectItem) => void;
}

export interface NoticeItemProp {
    alertId: string;
    createUserId: string;
    content: string;
    type: string;
    createDate: string;
    position?: string;
}

interface ModalProps {
    title: string;
    isOpen: boolean;
    close: () => void;
    onClickConfirmHandler?: () => void;
    children: ReactNode;
}