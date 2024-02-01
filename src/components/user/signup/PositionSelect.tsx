import Select from "@/components/ui/Select";
import { usePositionList } from "@/hooks/usePositionList";
import { getPositionSelectItems } from "@/utils/common";
import { SelectItem } from "@/utils/type";

interface PositionSelectProps {
  position: SelectItem | null;
  setPosition: (item: SelectItem) => void;
  required?: boolean;
}

const PositionSelect = ({ position, setPosition, required }: PositionSelectProps) => {
  const positionList = usePositionList();
  return <Select value={position} setValue={setPosition} items={getPositionSelectItems(positionList)} label="직무" placeholder="직무를 선택해주세요." required={required} />
}

export default PositionSelect;