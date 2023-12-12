import {v4} from "uuid";
import {rest} from "msw";
// todo - accestoken, refresh 토큰 같이 보내기
//  응답 401로 오면 refresh api 요청 보내고, access token 갱신받고, 갱신받은 access token으로 서버에 재요청 보내기
// accesstoken은 private 변수에 저장.

// req:
//  Header:
// Authorization: “String”,
// content_type: application/json

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
    rest.post(`${baseUrl}/api/user/login`, async (req, res, ctx) => {
        const {id, password} =   req.params;
        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.json( {
                email: 'test@test,com',
                nickname: 'tester',
                accessToken: v4(),
                refreshToken: v4()
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
    rest.get(`http://43.202.197.30:8080/api/project/id`, (req, res, ctx) => {
        console.log("vmfhwprxm tkdtp whghl");
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
                    startDate: "2023-11-19T09:53:13.539",
                    endDate: "2023-11-23T09:53:13.539",
                    createDate: "2023-11-25T18:24:18.915942",
                    updateDate: "2023-11-26T00:08:35.511061"
                }
            }),
        )
    })
]
