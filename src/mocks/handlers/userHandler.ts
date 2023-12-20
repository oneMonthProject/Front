import { v4 } from "uuid";
import { rest } from "msw";
import { JSONReplaceBigInt } from "@/utils/common";
// todo - accestoken, refresh 토큰 같이 보내기
//  응답 401로 오면 refresh api 요청 보내고, access token 갱신받고, 갱신받은 access token으로 서버에 재요청 보내기

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

export const handlers = [
  rest.get("/api/testCookie", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.cookie("accessToken", "abc-123"));
  }),
  // 로그인
  rest.post(`${baseUrl}/api/public/user/login`, async (req, res, ctx) => {
    return res(
      ctx.set("Authorization", v4()),
      ctx.status(200),
      ctx.delay(400),
      ctx.cookie("Refresh", v4()),
      ctx.body(
        JSONReplaceBigInt({
          data: {
            userId: 900719925474099n,
          },
          result: "success",
          message: "조회 완료~!",
        })
      )
    );
  }),
  // 기본 내 정보 조회
  rest.get(`${baseUrl}/api/user/simple-me`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(400),
      ctx.json({
        data: {
          nickname: "Robert",
          profileImgSrc: null,
        },
        result: "success",
        message: "조회 완료~!",
      })
    );
  }),
  // 내 정보 조회
  rest.get(`${baseUrl}/api/user/me`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(400),
      ctx.body(
        JSONReplaceBigInt({
          data: {
            userId: 900719925474099n,
            email: "test@gmail.com",
            nickname: "Robert",
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
            updateDate: "",
          },
          result: "success",
          message: "조회 완료~!",
        })
      )
    );
  }),
  // 내 프로젝트 이력 조회
  rest.get(
    `${baseUrl}/api/user/me/project-history?pageNumber=:pageNumber`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(400),
        ctx.body(
          JSONReplaceBigInt({
            data: [
              {
                userProjectHistoryId: 5579114668723193n,
                status: "FINISH",
                projectName: "A 프로젝트",
                updateDate: "2023.10.04",
              },
              {
                userProjectHistoryId: 1279123468723193n,
                status: "FORCED_WITHDRAWAL",
                projectName: "B 프로젝트",
                updateDate: "2023.09.30",
              },
              {
                userProjectHistoryId: 9779114623423193n,
                status: "WITHDRAWAL",
                projectName: "C 프로젝트",
                updateDate: "2023.09.28",
              },
              {
                userProjectHistoryId: 6379114668723827n,
                status: "FINISH",
                projectName: "D 프로젝트",
                updateDate: "2023.09.22",
              },
              {
                userProjectHistoryId: 1279114668721233n,
                status: "PARTICIPATING",
                projectName: "E 프로젝트",
                updateDate: "2023.09.20",
              },
            ],
            result: "success",
            message: "조회 완료~!",
          })
        )
      );
    }
  ),
  // 토큰 재발급
  rest.get(`${baseUrl}/api/user/token-reissue`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set("Authorization", v4()),
      ctx.cookie("Refresh", v4())
    );
  }),
  // 닉네임 중복체크
  rest.get(
    `${baseUrl}/api/public/user/check-nickname/:nickname`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: "success",
          message: "사용가능한 닉네임입니다.",
        })
      );
    }
  ),
  // 로그아웃
  rest.post(`${baseUrl}/api/user/logout`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: "success",
      })
    );
  }),
];
