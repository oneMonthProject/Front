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
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
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
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
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
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
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
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
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
                                    userId: 2,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: 3,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: 4,
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
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
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
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
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
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
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
                                    profileImgSrc: null
                                }
                            },
                            {
                                projectMemberId: _.random(0, Number.MAX_SAFE_INTEGER),
                                user: {
                                    userId: _.random(0, Number.MAX_SAFE_INTEGER),
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
        console.log("ccessToken: ",req.headers);

        return res(
            ctx.status(200),
            ctx.delay(400),
            ctx.body(JSONReplaceBigInt({
                result: "success",
                message: "success",
                data:[
                    {
                        mileStoneId: 9007199254740991n,
                        projectId: projectId,
                        content: '마일스톤 내용 1',
                        startDate: '2023.11.18',
                        endDate:'2023.11.30',
                        expireStatus: false,
                        completeStatus: false,
                        createDate: '2023.11.10',
                        updateDate:'2023.11.10'

                    },
                    {
                        mileStoneId: 9007199254740992n,
                        projectId: projectId,
                        content: '마일스톤 내용 2',
                        startDate: '2023.11.25',
                        endDate:'2023.11.30',
                        expireStatus: false,
                        completeStatus: false,
                        createDate: '2023.11.10',
                        updateDate:'2023.11.10'

                    },
                    {
                        mileStoneId: 9007199254740994n,
                        projectId: projectId,
                        content: '마일스톤 내용 3',
                        startDate: '2023.11.20',
                        endDate:'2023.11.30',
                        expireStatus: false,
                        completeStatus: false,
                        createDate: '2023.11.10',
                        updateDate:'2023.11.10'

                    },
                    {
                        mileStoneId: 9007199254740996n,
                        projectId: projectId,
                        content: '마일스톤 내용 4',
                        startDate: '2023.12.01',
                        endDate:'2023.12.30',
                        expireStatus:false,
                        completeStatus: false,
                        createDate: '2023.11.10',
                        updateDate:'2023.11.10'

                    },
                    {
                        mileStoneId: 9007199254740998n,
                        projectId: projectId,
                        content: '마일스톤 내용 5',
                        startDate: '2023.12.18',
                        endDate:'2023.12.30',
                        expireStatus: false,
                        completeStatus: false,
                        createDate: '2023.11.10',
                        updateDate:'2023.11.10'

                    },
                ]
            }))
        )
    })

]