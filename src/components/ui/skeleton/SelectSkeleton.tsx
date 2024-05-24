import Select from "@/components/ui/selector/Select";

interface SelectSkeletonProps {
    label: string;
    placeholder?: string;
    required?: boolean;
}

const SelectSkeleton = ({label, placeholder = "", required}: SelectSkeletonProps) => {
    return <Select value={{name: '불러오는 중..', value: ''}} setValue={() => {}} items={[]} label={label}
                   placeholder={placeholder} required={required}/>
}

export default SelectSkeleton;