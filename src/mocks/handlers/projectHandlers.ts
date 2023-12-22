import {v4} from "uuid";
import {rest} from "msw";
import {setCookie} from "cookies-next";
import {cookies} from "next/headers";
import _ from "lodash";
import {JSONReplaceBigInt} from "@/utils/common";
// todo - accestoken, refresh 토큰 같이 보내기
//  응답 401로 오면 refresh api 요청 보내고, access token 갱신받고, 갱신받은 access token으로 서버에 재요청 보내기


const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

export const handlers = [
    rest.get(`${baseUrl}/api/project/me`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.body(JSONReplaceBigInt({
                result: "success",
                message: "success",
                data: [
                    {
                        projectId: 8158217909817575n,
                        name: "testProject2",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "3등급",
                            score: 3000
                        },
                        members: [
                            {
                                projectMemberId: 6379114668723193n,
                                user: {
                                    userId: 8671245028823303n,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 4,
                        startDate: "2023.11.22",
                        endDate: "2023.11.30",
                        createDate: "2023.11.25",
                        updateDate: "2023.11.26"
                    },
                    {
                        projectId: 610982576943438n,
                        name: "testProject - 5인 이상",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 5085325575507063n,
                                user: {
                                    userId: 8784621768554952n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 6067275819797378n,
                                user: {
                                    userId: 1824892188772111n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 3799173400723079n,
                                user: {
                                    userId: 6649100003868670n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 23490096947452n,
                                user: {
                                    userId: 419442895289751n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 6031686272149273n,
                                user: {
                                    userId: 5952697087499100n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 4921008197334084n,
                                user: {
                                    userId: 7963448788313203n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 5981173811926440n,
                                user: {
                                    userId: 2587432282257260n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 6058706431669701n,
                                user: {
                                    userId: 3044608492960147n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 8147998183048815n,
                                user: {
                                    userId: 2922647534482601n,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023.11.10",
                        endDate: "2023.12.30",
                        createDate: "2023.11.20",
                        updateDate: "2023.11.20"
                    },
                    {
                        projectId: 4390831685456485n,
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 218427875224132n,
                                user: {
                                    userId: 2379422813163040n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 5271670004164158n,
                                user: {
                                    userId: 1964085471797101n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 7976588790114165n,
                                user: {
                                    userId: 3922039079464121n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 6990337048559076n,
                                user: {
                                    userId: 2203651272182944n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 4166057818900218n,
                                user: {
                                    userId: 6481776431420529n,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023.11.30",
                        endDate: "2023.12.30",
                        createDate: "2023.11.20",
                        updateDate: "2023.11.20"
                    },
                    {
                        projectId: 3329178176257291n,
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "2등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 7757138493914215n,
                                user: {
                                    userId: 1644076980148020n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 2453163551841989n,
                                user: {
                                    userId: 858684349903642n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 4479868435977329n,
                                user: {
                                    userId: 6189360800687078n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 7195223822173460n,
                                user: {
                                    userId: 1271988327442842n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 2690773244473200n,
                                user: {
                                    userId: 8300469826719651n,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023.12.10",
                        endDate: "2023.12.30",
                        createDate: "2023.11.20",
                        updateDate: "2023.11.20"
                    },
                    {
                        projectId: 4096829539235474n,
                        name: "testProject14",
                        subject: "프로젝트 소개글14",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 2781158255878909n,
                                user: {
                                    userId: 1,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 3478219415774788n,
                                user: {
                                    userId: 2,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 4387856411088052n,
                                user: {
                                    userId: 3,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 3332910748706734n,
                                user: {
                                    userId: 4,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 4036879052417786n,
                                user: {
                                    userId: 5,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023.12.11",
                        endDate: "2023.12.30",
                        createDate: "2023.11.20",
                        updateDate: "2023.11.20"
                    },
                    {
                        projectId: 8495186803824311n,
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "1등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 4629301643664332n,
                                user: {
                                    userId: 6747558548032683n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 3713323465419491n,
                                user: {
                                    userId: 8280712418949559n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 5889584731248499n,
                                user: {
                                    userId: 1887175809512106n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 1813772699748602n,
                                user: {
                                    userId: 5673319249000975n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 7596156735339482n,
                                user: {
                                    userId: 6676862890055670n,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023.11.30",
                        endDate: "2023.12.30",
                        createDate: "2023.11.20",
                        updateDate: "2023.11.20"
                    },
                    {
                        projectId: 7155311406096988n,
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 5669334440021793n,
                                user: {
                                    userId: 3526105542951862n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 4288635235313982n,
                                user: {
                                    userId: 7100572053841249n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 5271883081611908n,
                                user: {
                                    userId: 2483797817629502n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 6299715041825388n,
                                user: {
                                    userId: 637912041355316n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 190919999452431n,
                                user: {
                                    userId: 6719364210500121n,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023.11.30",
                        endDate: "2023.12.30",
                        createDate: "2023.11.20",
                        updateDate: "2023.11.20"
                    },
                    {
                        projectId: 4738230789542638n,
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 6538190277315832n,
                                user: {
                                    userId: 5360521262178813n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 327014579118103n,
                                user: {
                                    userId: 5108270988712303n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 3902847789521854n,
                                user: {
                                    userId: 5815587105993491n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 6564701383906406n,
                                user: {
                                    userId: 3826820798903000n,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: 3614461667757317n,
                                user: {
                                    userId: 6470512870775799n,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023.11.30",
                        endDate: "2023.12.30",
                        createDate: "2023.11.20",
                        updateDate: "2023.11.20"
                    },
                ]
            }))
        );
    }),
    rest.get(`${baseUrl}/api/project/:id`, (req, res, ctx) => {
        const projectId = req.params.id;
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.json({
                result: "success",
                message: "success",
                data: {
                    projectId: projectId,
                    name: "trustcrews",
                    subject: "팀 프로젝트 매칭 서비스 개발",
                    trustGrade: {
                        name: "3등급",
                        score: 3000
                    },
                    status: "RECRUITING",
                    crewNumber: 4,
                    startDate: "2023.11.19",
                    endDate: "2023.11.23",
                    createDate: "2023.11.25",
                    updateDate: "2023.11.26"
                }
            }),
        )
    }),
    rest.get(`${baseUrl}/api/milestone/project/:projectId`, (req, res, ctx) => {
        const projectId = req.params.projectId;
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.body(JSONReplaceBigInt({
                result: "success",
                message: "success",
                data: [
                    {
                        mileStoneId: 9007199254740991n,
                        projectId: projectId,
                        content: '마일스톤 내용 1',
                        startDate: '2023.11.18',
                        endDate: '2023.11.20',
                        createDate: '2023.11.10',
                        updateDate: '2023.11.10',
                        progressStatus: '완료',

                    },
                    {
                        mileStoneId: 9007199254740992n,
                        projectId: projectId,
                        content: '마일스톤 내용 2',
                        startDate: '2023.11.25',
                        endDate: '2023.11.30',
                        createDate: '2023.11.10',
                        updateDate: '2023.11.10',
                        progressStatus: '진행중',

                    },
                    {
                        mileStoneId: 9007199254740994n,
                        projectId: projectId,
                        content: '마일스톤 내용 3',
                        startDate: '2023.11.20',
                        endDate: '2023.11.28',
                        createDate: '2023.11.10',
                        updateDate: '2023.11.10',
                        progressStatus: '만료',

                    },
                    {
                        mileStoneId: 9007199254740996n,
                        projectId: projectId,
                        content: '마일스톤 내용 4',
                        startDate: '2023.11.20',
                        endDate: '2023.12.30',
                        createDate: '2023.11.10',
                        updateDate: '2023.11.10',
                        progressStatus: '진행중',

                    },
                    {
                        mileStoneId: 9007199254740998n,
                        projectId: projectId,
                        content: '마일스톤 내용 5',
                        startDate: '2023.12.18',
                        endDate: '2023.12.30',
                        createDate: '2023.11.10',
                        updateDate: '2023.11.10',
                        progressStatus: '시작전'

                    },
                ]
            }))
        )
    }),
    rest.get(`${baseUrl}/api/projectmember/project/:projectId`, (req, res, ctx) => {
        const projectid = req.params.projectId;
        return res(
            ctx.delay(400),
            ctx.status(200),
            ctx.body(JSONReplaceBigInt({
                result: "success",
                message: "success",
                data:{
                    projectMembers: [
                        {
                            projectMemberId: 1108696616844722n,
                            user: {
                                userId: 3997864236230543n,
                                email: "testMng@naver.com",
                                nickname: "testMng",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 2250480098569726n,
                                projectMemberAuthName: "매니저",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 8940892384496279n,
                                name: "프론트엔드"
                            },
                            lastWorkDate: "2023.11.29",
                        },
                        {
                            projectMemberId: 375735316194929n,
                            user: {
                                userId: 3218660456435490n,
                                email: "testSubMng@naver.com",
                                nickname: "testSubMng",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 3027558438708031n,
                                projectMemberAuthName: "부매니저",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 6312625120458062n,
                                name: "백엔드"
                            },
                            lastWorkDate: "2023.11.25",
                        },
                        {
                            projectMemberId: 3518059751425604n,
                            user: {
                                userId: 454916253199480n,
                                email: "testBack@naver.com",
                                nickname: "testBack",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 7143406171440098n,
                                projectMemberAuthName: "구성원",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 8170206782643707n,
                                name: "백엔드"
                            },
                            lastWorkDate: "2023.11.25",
                        },
                        {
                            projectMemberId: 7019798472512025n,
                            user: {
                                userId: 1697494653215620n,
                                email: "testdesigner@naver.com",
                                nickname: "testDesigner",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 4880195611044783n,
                                projectMemberAuthName: "구성원",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 5829431028024876n,
                                name: "디자이너"
                            },
                            lastWorkDate: "2023.12.01",
                        },
                        {
                            projectMemberId: 6236182418588446n,
                            user: {
                                userId: 8812751134782901n,
                                email: "testFront1@naver.com",
                                nickname: "testFront1",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 8679044579342919n,
                                projectMemberAuthName: "구성원",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 7721875672670009n,
                                name: "프론트엔드"
                            },
                            lastWorkDate: "2023.11.11",
                        },
                        {
                            projectMemberId: 1321353313262357n,
                            user: {
                                userId: 2405133761163298n,
                                email: "testFront2@naver.com",
                                nickname: "testFront2",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 1315749288173680n,
                                projectMemberAuthName: "구성원",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 3070100992292214n,
                                name: "프론트엔드"
                            },
                            lastWorkDate: "2023.11.11",
                        },
                        {
                            projectMemberId: 757050957238690n,
                            user: {
                                userId: 8497214608422409n,
                                email: "testFront3@naver.com",
                                nickname: "testFront3",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 7031889676528004n,
                                projectMemberAuthName: "구성원",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 2257909142335102n,
                                name: "프론트엔드"
                            },
                            lastWorkDate: "2023.11.11",
                        },
                        {
                            projectMemberId: 2348090972584338n,
                            user: {
                                userId: 244147990805590n,
                                email: "testBack2@naver.com",
                                nickname: "testBack2",
                                profileImgSrc: null
                            },
                            projectMemberAuth: {
                                projectMemberAuthId: 4667270139738136n,
                                projectMemberAuthName: "구성원",
                                milestone_change_YN: true,
                                work_change_YN: false
                            },
                            position: {
                                positionId: 2450505711080114n,
                                name: "백엔드"
                            },
                            lastWorkDate: "2023.11.25",
                        },
                    ]
                }
            }))
        )
    }),
    rest.get(`${baseUrl}/api/projectmember/:projectMemberId`,(req,res,ctx)=>{
      const projectMemberId = req.params.projectMemberId;
        return res(
            ctx.delay(400),
            ctx.status(200),
            ctx.body(JSONReplaceBigInt({
                result: "success",
                message: "success",
                data: {
                    projectMemberId: projectMemberId,
                    projectId: 2340770828875055n,
                    projectCount: 2,
                    user: {
                        "userId": 7469233260597475n,
                        "email": 'test@test.com',
                        "nickname": 'test22',
                        "profileImgSrc": null,
                        "position": {
                            "positionId": 4805161936955970n,
                            "name": '프론트 엔드'
                        },
                        "trustGrade": {
                            "name": '3등급',
                            "score":3000
                        },
                        "trustScore": 0,
                "role": 'USER',
                        "createDate": '2023-11-12',
                        "updateDate": '2023-11-12'
                    },
                    "projectMemberAuthId": 2340160735689475n,
                    "position": {
                        "positionId": 8203571318086190n,
                        "name": '프론트엔드'
                    },
                    "status":  'PARTICIPATING'
                }
            }))
        )
    })
]