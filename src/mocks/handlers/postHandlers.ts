import { rest } from "msw";
import { JSONReplaceBigInt } from "@/utils/common";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
export const handlers = [
  // 전체 게시물 검색
  rest.get(`${baseUrl}/api/board/search/public`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(400),
      ctx.body(
        JSONReplaceBigInt({
          result: "success",
          message: "success",
          data: {
            content: [
              {
                boardId: 8495186803824311n,
                boardTitle: "FE, BE 모집합니다.",
                boardPositions: [
                  {
                    boardPositionId: 8447386803824311n,
                    position: {
                      positionId: 9007199254740991n,
                      positionName: "프론트엔드",
                    },
                  },
                  {
                    boardPositionId: 1247386803824311n,
                    position: {
                      positionId: 8807199254740998n,
                      positionName: "백엔드",
                    },
                  },
                ],
                project: {
                  projectId: 9007199254740998n,
                  name: "trustcrews",
                  subject: "팀프로젝트 매칭 서비스 개발",
                  trustGrade: {
                    name: "3등급",
                    minimumScore: 3000,
                    maximumScore: 5000,
                  },
                  startDate: "2023-11-19",
                  endDate: "2023-11-23",
                  technologyStacks: [
                    {
                      techStackId: 4629301643664332n,
                      techStackName: "REACT",
                    },
                    {
                      techStackId: 3713323465419491n,
                      techStackName: "TYPESCRIPT",
                    },
                    {
                      techStackId: 5889584731248499n,
                      techStackName: "JAVASCRIPT",
                    },
                    {
                      techStackId: 1813772699748602n,
                      techStackName: "VUE",
                    },
                  ],
                },
                boardPageView: 0,
                user: {
                  email: "test@naver.com",
                  nickname: "찐개발자",
                  profileImgSrc:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                  trustGrade: {
                    name: "4등급",
                    minimumScore: 4000,
                    maximumScore: 5000,
                  },
                },
                createDate: "2023-11-25",
                updateDate: "2023-11-26",
              },
              {
                boardId: 9007199254740996n,
                boardTitle: "testBoard4",
                boardPositions: [
                  {
                    boardPositionId: 8447386803824311n,
                    position: {
                      positionId: 9007199254740991n,
                      positionName: "프론트엔드",
                    },
                  },
                  {
                    boardPositionId: 5432186803824311n,
                    position: {
                      positionId: 7770512870775799n,
                      positionName: "기획자",
                    },
                  },
                ],
                project: {
                  projectId: 6470512870775799n,
                  name: "testProject4",
                  subject: "testProject4",
                  trustGrade: {
                    name: "4등급",
                    minimumScore: 4000,
                    maximumScore: 5000,
                  },
                  startDate: "2023-11-19",
                  endDate: "2023-11-23",
                  technologyStacks: [
                    {
                      techStackId: 3713323465419491n,
                      techStackName: "TYPESCRIPT",
                    },
                    {
                      techStackId: 5889584731248499n,
                      techStackName: "JAVASCRIPT",
                    },
                    {
                      techStackId: 1813772699748602n,
                      techStackName: "VUE",
                    },
                  ],
                },
                startDate: "2023-12-19",
                endDate: "2023-12-23",
                boardPageView: 0,
                user: {
                  email: "tes2t@naver.com",
                  nickname: "test2",
                  profileImgSrc: null,
                  trustGrade: {
                    name: "4등급",
                    minimumScore: 4000,
                    maximumScore: 5000,
                  },
                },
                createDate: "2023-11-25",
                updateDate: "2023-11-25",
              },
            ],
            totalPages: 1,
          },
        })
      )
    );
  }),
  // 게시글 상세 조회
  rest.get(`${baseUrl}/api/board/:postId/public`, async (req, res, ctx) => {
    const postId = req.params.postId;
    return res(
      ctx.status(200),
      ctx.delay(400),
      ctx.body(
        JSONReplaceBigInt({
          result: "success",
          message: "success",
          data: {
            board: {
              boardId: postId,
              title: "FE, BE 모집합니다.",
              content: "안녕하세요 프로젝트에 대한 설명글이 있는 공간입니다.",
              pageView: 0,
              completeStatus: true,
              user: {
                // userId: 123719925474099n,
                // 현재 사용자가 게시글 작성자 테스트 시
                userId: 900719925474099n,
                nickName: "찐개발자",
                userProfileImgSrc:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              contact: "testBoard2@naver.com",
              createDate: "2023-11-25",
              updateDate: "2023-11-26",
              boardPositions: [
                {
                  boardPositionId: 8447386803824311n,
                  position: {
                    positionId: 9007199254740991n,
                    name: "프론트엔드",
                  },
                },
                {
                  boardPositionId: 1247386803824311n,
                  position: {
                    positionId: 8807199254740998n,
                    name: "백엔드",
                  },
                },
              ],
            },
            project: {
              projectId: 9007199254740998n,
              name: "trustcrews",
              subject: "팀프로젝트 매칭 서비스 개발",
              trustGrade: {
                name: "3등급",
                minimumScore: 3000,
                maximumScore: 5000,
              },
              user: {
                // userId: 123719925474099n,
                // 현재 사용자가 게시글 작성자 테스트 시
                userId: 900719925474099n,
                email: "test@naver.com",
                nickName: "찐개발자",
                profileImgSrc:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              },
              status: "RECRUITING",
              crewNumber: 4,
              startDate: "2023-11-19",
              endDate: "2023-11-23",
              createDate: "2023-11-25",
              updateDate: "2023-11-26",
              technologyStacks: [
                {
                  techStackId: 4629301643664332n,
                  techStackName: "REACT",
                },
                {
                  techStackId: 3713323465419491n,
                  techStackName: "TYPESCRIPT",
                },
                {
                  techStackId: 5889584731248499n,
                  techStackName: "JAVASCRIPT",
                },
                {
                  techStackId: 1813772699748602n,
                  techStackName: "VUE",
                },
              ],
            },
          },
        })
      )
    );
  }),
];
