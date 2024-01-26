import Select from "@/components/ui/Select";

interface SelectSkeletonProps {
  label: string;
  placeholder?: string
}

const SelectSkeleton = ({ label, placeholder = "" }: SelectSkeletonProps) => {
  return <Select value={null} setValue={() => null} items={[]} label={label} placeholder={placeholder} />
}

export default SelectSkeleton;