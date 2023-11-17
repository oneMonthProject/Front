type DropDownItem = {
    name: string;
    value: string;
    onClickHandler?:(value:string) => void;
}

interface DropDownProps {
    items: DropDownItems[];
}

interface NavTabItem {
    name:string;
    href:string;
    current:boolean;
}

interface ProjectNavTabItem extends NavTabItem {
    name:string;
    href:string;
    current:boolean;
}

