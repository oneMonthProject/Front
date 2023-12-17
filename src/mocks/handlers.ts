import {v4} from "uuid";
import { rest} from "msw";
import {setCookie} from "cookies-next";
import {cookies} from "next/headers";
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
    rest.get(`${baseUrl}/api/user/me`, async (req, res, ctx) => {
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
    // 내 프로젝트 이력 조회
    rest.get(`${baseUrl}/api/user/me/project-history?pageNumber=${0}`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.json({
                data: [
                    {
                        userProjectHistoryId: 1794167162383090,
                        status: "완료",
                        projectName: "A 프로젝트",
                        updateDate: "2023.10.04"
                    },
                    {
                        userProjectHistoryId: _.random(0, Number.MAX_SAFE_INTEGER),
                        status: "강제탈퇴",
                        projectName: "B 프로젝트",
                        updateDate: "2023.09.30"
                    },
                    {
                        userProjectHistoryId: _.random(0, Number.MAX_SAFE_INTEGER),
                        status: "탈퇴",
                        projectName: "C 프로젝트",
                        updateDate: "2023.09.28"
                    },
                    {
                        userProjectHistoryId: _.random(0, Number.MAX_SAFE_INTEGER),
                        status: "완료",
                        projectName: "D 프로젝트",
                        updateDate: "2023.09.22"
                    },
                    {
                        userProjectHistoryId: _.random(0, Number.MAX_SAFE_INTEGER),
                        status: "참여",
                        projectName: "E 프로젝트",
                        updateDate: "2023.09.20"
                    },
                ],
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
                        projectId: 1,
                        name: "testProject2",
                        subject: "testProject2 프로젝트 소개글",
                        trustGrade: {
                            name: "3등급",
                            score: 3000
                        },
                        members: [
                            {
                                projectMemberId: 6,
                                user: {
                                    userId: 1,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 4,
                        startDate: "2023-11-19T09:53:13.539",
                        endDate: "2023-11-23T09:53:13.539",
                        createDate: "2023-11-25T18:24:18.915942",
                        updateDate: "2023-11-26T00:08:35.511061"
                    },
                    {
                        projectId: 8,
                        name: "testProject4",
                        subject: "testProject4",
                        trustGrade: {
                            name: "4등급",
                            score: 2000
                        },
                        members: [
                            {
                                projectMemberId: 13,
                                user: {
                                    userId: 1,
                                    profileImgSrc: null
                                }
                            }
                        ],
                        status: "RECRUITING",
                        crewNumber: 5,
                        startDate: "2023-11-19T09:53:13.539",
                        endDate: "2023-11-23T09:53:13.539",
                        createDate: "2023-11-25T18:50:55.91436",
                        updateDate: "2023-11-25T18:50:55.91436"
                    }
                ]
            })
        );
    }),
    //
    // // 프로젝트 상세 조회
    rest.get(`${baseUrl}/api/project/id`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.json({
                result: "success",
                message: "success",
                data: {
                    projectId: 1,
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
