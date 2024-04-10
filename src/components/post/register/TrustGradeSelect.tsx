import Select from "@/components/ui/Select"
import {getTrustGradeListByUser} from "@/service/user/user";
import {ResponseBody, SelectItem, TrustGradeItem} from "@/utils/type";
import {useSuspenseQuery} from "@tanstack/react-query";
import {bigIntToString} from "@/utils/common";

interface TrustGradeSelectProps {
    trustGrade: SelectItem<string, string>;
    setTrustGrade: (item: SelectItem<string, string>) => void;
}


const TrustGradeSelect = ({trustGrade, setTrustGrade}: TrustGradeSelectProps) => {
    const {data} = useSuspenseQuery<ResponseBody<TrustGradeItem[]>, Error>({
        queryKey: ['trustGradeListByUser'],
        queryFn: () => getTrustGradeListByUser()
    });
    const {data: trustGradeList} = data;

    const getTrustGradeSelectItems = (items: TrustGradeItem[]) => {
        if (items.length > 0) {
            const selectArr: SelectItem<string, string>[] = [{name: '신뢰등급 선택', value: ''}];
            items.forEach(
                ({trustGradeId, trustGradeName}) => {
                    selectArr.push(({value: bigIntToString(trustGradeId), name: trustGradeName}));
                }
            );
            return selectArr;
        }
        return [];
    }

    return <Select value={trustGrade} setValue={setTrustGrade} items={getTrustGradeSelectItems(trustGradeList)}
                   label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요."/>
}

export default TrustGradeSelect;