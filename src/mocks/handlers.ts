import {v4} from "uuid";
import { rest} from "msw";
import {setCookie} from "cookies-next";
import {cookies} from "next/headers";
import  _ from "lodash";
// todo - accestoken, refresh 토큰 같이 보내기
//  응답 401로 오면 refresh api 요청 보내고, access token 갱신받고, 갱신받은 access token으로 서버에 재요청 보내기


const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

export const handlers = [
    rest.get(
        '/api/testCookie',
         async (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.cookie('accessToken','abc-123')
            )
        }
        ),
    // 로그인
    rest.post(`${baseUrl}/api/public/user/login`, async (req, res, ctx) => {
        const {id, password} =   req.params;
        
        return res(
            ctx.set("Authorization", v4()),
            ctx.status(200),
            ctx.delay(400),
            ctx.cookie("Refresh", v4()),
            ctx.json( {
                email: 'test@test,com',
                nickname: 'tester'
            })
        );
    }),
    // 내 정보 조회
    rest.get(`${baseUrl}/api/user/${9007199254740992n}`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.json({
                data: {
                    userId: "123",
                    email: "test@gmail.com",
                    nickname: "Robert Whistable",
                    profileImgSrc: null,
                    trustScore: 1200,
                    trustGrade: 1,
                    position: { positionId: 1, positionName: "프론트엔드" },
                    techStacks: [
                        { technologyStackId: 1, technologyStackName: "React" },
                        { technologyStackId: 2, technologyStackName: "TypeScript" },
                        { technologyStackId: 7, technologyStackName: "Java" },
                    ],
                    intro: "개발 N년차 웹 프론트엔드 개발자 입니다.",
                    projectHistoryTotalCount: 3,
                    createDate: "",
                    updateDate: ""
                },
                result: "success",
                message: "조회 완료~!"
            })
        );
    }),
    // 토큰 재발급
    rest.get(`${baseUrl}/api/user/token-reissue`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.set("Authorization", v4()),
            ctx.cookie("Refresh", v4()),
        );
    }),
    // 닉네임 중복체크
    rest.get(`${baseUrl}/api/public/user/check-nickname/${"test123"}`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                result: "success",
                message: "사용가능한 닉네임입니다."
            })
        );
    }),
    // // 프로젝트 목록 조회
    rest.get(`${baseUrl}/api/project/me`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.json({
                result: "success",
                message: "success",
                data: [
                    {
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject2",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "3등급",
                            score: 3000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
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
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject - 5인 이상",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
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
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
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
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "2등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
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
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject14",
                        subject: "프로젝트 소개글14",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: 1,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  2,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  3,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  4,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  5,
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
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "1등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
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
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
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
                        projectId: _.random(0, Number.MAX_SAFE_INTEGER),
                        name: "testProject4",
                        subject: "프로젝트 소개글",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId:  _.random(0, Number.MAX_SAFE_INTEGER),
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
            })
        );
    }),
    //
    // // 프로젝트 상세 조회
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
    })
]
