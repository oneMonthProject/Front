import Select from "@/components/ui/Select";

interface SelectSkeletonProps {
    label: string;
    placeholder?: string;
    required?: boolean;
}

const SelectSkeleton = ({label, placeholder = "", required}: SelectSkeletonProps) => {
    return <Select value={{name: '', value: ''}} setValue={() => null} items={[]} label={label}
                   placeholder={placeholder} required={required}/>
}

export default SelectSkeleton;