import MultiSelect from "@/components/ui/MultiSelect";
import { useTechStackList } from "@/hooks/useTechStackList";
import { getTechStackSelectItems } from "@/utils/common";
import { SelectItem } from "@/utils/type";

interface TechStackSelectProps {
  techStacks: SelectItem[];
  setTechStacks: (item: SelectItem[]) => void;
}

const TechStackSelect = ({ techStacks, setTechStacks }: TechStackSelectProps) => {
  const techStackList = useTechStackList();
  return <MultiSelect values={techStacks} setValues={setTechStacks} items={getTechStackSelectItems(techStackList)} label="사용 스택" placeholder="사용 스택을 선택해주세요." />
}

export default TechStackSelect;