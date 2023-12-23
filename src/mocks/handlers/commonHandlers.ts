import { rest } from "msw";
import { JSONReplaceBigInt } from "@/utils/common";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
export const handlers = [
  // 전체 포지션 조회
  rest.get(`${baseUrl}/api/position-list/public`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(400),
      ctx.body(
        JSONReplaceBigInt({
          result: "success",
          message: "success",
          data: [
            {
              positionId: 9007199254740991n,
              positionName: "프론트엔드",
            },
            {
              positionId: 1234599254740991n,
              positionName: "백엔드",
            },
            {
              positionId: 5337199252340991n,
              positionName: "디자이너",
            },
            {
              positionId: 6607199254440991n,
              positionName: "IOS",
            },
            {
              positionId: 9307199254740991n,
              positionName: "안드로이드",
            },
            {
              positionId: 9007199251140991n,
              positionName: "데브옵스",
            }
          ],
        })
      )
    );
  }),
  // 전체 기술스택 조회
  rest.get(`${baseUrl}/api/technology-stack-list/public`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(400),
      ctx.body(
        JSONReplaceBigInt({
          result: "success",
          message: "success",
          data: [
            {
              techStackId: 2839199254740991n,
              techStackName: "React",
            },
            {
              techStackId: 3334599254740991n,
              techStackName: "TypeScript",
            },
            {
              techStackId: 1237199252340991n,
              techStackName: "JavaScript",
            },
            {
              techStackId: 5457199254440991n,
              techStackName: "Vue",
            },
            {
              techStackId: 8857199254740991n,
              techStackName: "Nextjs",
            },
            {
              techStackId: 8997199251140991n,
              techStackName: "Node.js",
            },
            {
              techStackId: 3227199254440991n,
              techStackName: "Java",
            },
            {
              techStackId: 7757199254740991n,
              techStackName: "Spring",
            },
            {
              techStackId: 4497199251140991n,
              techStackName: "Kotlin",
            },
            {
              techStackId: 3837199254440991n,
              techStackName: "Nestjs",
            },
            {
              techStackId: 7667199254740991n,
              techStackName: "Swift",
            },
            {
              techStackId: 5677199251140991n,
              techStackName: "Flutter",
            },
            {
              techStackId: 8897199254420991n,
              techStackName: "Figma",
            }
          ],
        })
      )
    );
  }),
];
