import Select from "@/components/ui/Select"
import {getTrustGradeListByUser} from "@/service/user/user";
import {ResponseBody, SelectItem, TrustGradeItem} from "@/utils/type";
import {useQuery} from "@tanstack/react-query";
import {TrustGradeIdType} from "@/app/project/@setting/_utils/type";

interface TrustGradeSelectProps {
    trustGrade: SelectItem<string, TrustGradeIdType>;
    setTrustGrade: (item: SelectItem<string, TrustGradeIdType>) => void;
}


const TrustGradeSelect = ({trustGrade, setTrustGrade}: TrustGradeSelectProps) => {
    const {data} = useQuery<Promise<ResponseBody<TrustGradeItem[]>>, Error, ResponseBody<TrustGradeItem[]>>({
        queryKey: ['trustGradeListByUser'],
        queryFn: () => getTrustGradeListByUser()
    });
    const {data: trustGradeList} = data!;

    const selectItems: SelectItem<string, TrustGradeIdType>[] = [{name: '신뢰등급 선택', value: null}];
    trustGradeList.forEach(
        ({trustGradeId, trustGradeName}) => {
            selectItems.push(({value: trustGradeId, name: trustGradeName}));
        }
    );

    return <Select value={trustGrade} setValue={setTrustGrade} items={selectItems}
                   label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요."/>
}

export default TrustGradeSelect;