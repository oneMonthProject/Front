import MultiSelect from "@/components/ui/MultiSelect";
import { usePositionList } from "@/hooks/usePositionList";
import { getPositionSelectItems } from "@/utils/common";
import { SelectItem } from "@/utils/type";

interface MultiPositionSelectProps {
  positions: SelectItem[];
  setPositions: (item: SelectItem[]) => void;
  required?: boolean;
}

const MultiPositionSelect = ({ positions, setPositions, required }: MultiPositionSelectProps) => {
  const positionList = usePositionList();
  return <MultiSelect values={positions} setValues={setPositions} items={getPositionSelectItems(positionList)} label="모집 분야" placeholder="모집 분야를 선택해주세요." required={required} />
}

export default MultiPositionSelect;