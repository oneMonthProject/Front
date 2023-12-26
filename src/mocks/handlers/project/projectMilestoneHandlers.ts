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
    rest.post(`${baseUrl}/api/milestone/project/:projectId`, (req, res, ctx) => {
        return res(
            ctx.delay(400),
            ctx.status(200),
            ctx.json({
                result:'success',
                message:'success'
            })
        )
    }),
    rest.patch(`${baseUrl}/api/milestone/:mileStoneId`, (req, res, ctx) => {
        return res(
            ctx.delay(400),
            ctx.status(200),
            ctx.json({
                result:'success',
                message:'success'
            })
        )
    })
]