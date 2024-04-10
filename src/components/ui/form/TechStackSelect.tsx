import MultiSelect from "@/components/ui/MultiSelect";
import {useTechStackList} from "@/hooks/useTechStackList";
import {getTechStackSelectItems} from "@/utils/common";
import {SelectItem} from "@/utils/type";

interface TechStackSelectProps {
    techStacks: SelectItem<string,string>[];
    setTechStacks: (item: SelectItem<string, string>[]) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}


const TechStackSelect = ({techStacks, setTechStacks, label, placeholder, required}: TechStackSelectProps) => {
    const techStackList = useTechStackList();
    return <MultiSelect
                values={techStacks}
                setValues={setTechStacks}
                items={getTechStackSelectItems(techStackList)}
                label={label}
                placeholder={placeholder}
                required={required}
             />
}

export default TechStackSelect;