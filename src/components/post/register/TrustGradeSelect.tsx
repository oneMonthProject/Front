import Select from "@/components/ui/Select"
import { getTrustGradeListByUser } from "@/service/user/user";
import { ResponseBody, SelectItem, TrustGradeItem } from "@/utils/type";
import { useSuspenseQuery } from "@tanstack/react-query";

interface TrustGradeSelectProps {
  trustGrade: SelectItem | null;
  setTrustGrade: (item: SelectItem) => void;
}

const TrustGradeSelect = ({ trustGrade, setTrustGrade }: TrustGradeSelectProps) => {
  const { data } = useSuspenseQuery<ResponseBody<TrustGradeItem[]>, Error>({
    queryKey: ['trustGradeListByUser'],
    queryFn: () => getTrustGradeListByUser()
  });
  const { data: trustGradeList } = data;

  const getTrustGradeSelectItems = (items: TrustGradeItem[]) => {
    if (items.length > 0) {
      return items.map(
        (item) =>
          ({ value: item.trustGradeId, name: item.trustGradeName } as SelectItem)
      );
    }

    return [];
  }

  return <Select value={trustGrade} setValue={setTrustGrade} items={getTrustGradeSelectItems(trustGradeList)} label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요." />
}

export default TrustGradeSelect;