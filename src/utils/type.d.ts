type DropDownItems = {
    name: string;
    value: string;
    onClickHandler?:(value:string) => void;
}

interface DropDownProps {
    items: DropDownItems[];
}