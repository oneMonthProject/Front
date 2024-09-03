import {PositionItem, PostDetailInfo, ResponseBody, TechStackWithCategory} from "@/utils/type";
import _, {isEqual} from "lodash";
import {request, requestWithAuth} from "@/service/project/request";
import {CreatePostForm} from "@/app/register/_utils/type";
import {throwErrorIfInvalid} from "@/utils/common";

export interface SearchParams {
    techStacks: TechStackWithCategory[];
    position: PositionItem | null;
    keyword: string;
    page: number;
}

const createQueryParams = (params: SearchParams) => {
    const {techStacks, position, keyword, page} = params;
    const queryParams = new URLSearchParams();

    techStacks.forEach((stack) =>
        queryParams.append("technologyIds", stack.techStackId.toString())
    );
    if (position) {
        queryParams.append("positionId", position.positionId.toString());
    }
    if (!isEqual(keyword, "")) {
        queryParams.append("keyword", keyword);
    }
    queryParams.append("page", page.toString());

    return decodeURI(queryParams.toString());
};

/**
 * 게시글 목록 조회
 * @param params
 */
export const getPostList = async (params: SearchParams = {techStacks: [], position: null, page: 0, keyword: ''}) => {
    const queryParams = createQueryParams(params);
    return await request('GET', `/api/post/search?${queryParams}`);
};

/**
 * 게시글 상세조회
 * @param postId
 */
export const getPost = async (postId: bigint):Promise<ResponseBody<PostDetailInfo>> => {
    return await request('GET', `/api/post?postId=${postId}`);
};

/**
 * 게시글 생성
 * @param createData
 */
export const createPost = async (createData: CreatePostForm) => {
    const {
        project:
            {
                technologyIds,
                name,
                crewNumber,
                subject,
                endDate,
                startDate
            },
        board: {
            title,
            content,
            contact,
            positionIds
        }
    } = createData;

    throwErrorIfInvalid(_.isEqual("", title), "제목을 입력해주세요.");
    throwErrorIfInvalid(_.isEqual("", name), "프로젝트 이름을 입력해주세요.");
    throwErrorIfInvalid(_.isEqual("", content), "프로젝트 소개를 입력해주세요.");
    throwErrorIfInvalid(_.isEqual("", contact), "연락 방법을 입력해주세요.");
    throwErrorIfInvalid(_.isEqual("", startDate), "시작 날짜를 선택해주세요.");
    throwErrorIfInvalid(_.isEqual("", endDate), "종료 날짜를 선택해주세요.");
    throwErrorIfInvalid(_.isEqual("", subject), "프로젝트 주제를 입력해주세요.");
    throwErrorIfInvalid(_.isNull(crewNumber), "모집 인원을 선택해주세요.");
    throwErrorIfInvalid(_.isEmpty(positionIds), "모집 분야를 선택해주세요.");
    throwErrorIfInvalid(_.isEmpty(technologyIds), "관심 스택을 선택해주세요.");


    return await requestWithAuth('POST', `/api/post`, createData);
};

export const changeRecruitmentStatus = async (boardId: bigint) => {
    return await requestWithAuth('PATCH', `/api/post/recruitment-status?boardId=${boardId}`);
};
