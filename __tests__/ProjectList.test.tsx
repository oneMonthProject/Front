import {mockRouter} from "../src/test-utils/next-router-utils";
import {renderWithClient} from "../src/test-utils/testing-react-query-utils";
import MyProjectPosts from "../src/components/main/myProjectPost/MyProjectPosts";

jest.mock('next/router', () => mockRouter);
jest.mock('next/navigation', () => mockRouter);

describe('Get and render project list test', () => {
    describe('Existing users', () => {
        beforeAll(async () => {
            Object.defineProperty(document, 'cookie', {
                writable: true,
                value: 'accessToken=abc-123'
            });
        });

        it('Project post list render test', async () => {
            const result = renderWithClient(<MyProjectPosts/>);
            const projectPostCards = await result.findAllByRole('heading', {name: /정보 카드/});
            expect(projectPostCards).toHaveLength(8);

            const firstProjectPostCard = projectPostCards[0];

            // startDate 오름차순으로 정렬 되었는지 테스트
            expect(firstProjectPostCard).toContainElement(result.getByText('testProject14'));
            expect(firstProjectPostCard).toContainElement(result.getAllByText('4등급')[0]);
            expect(firstProjectPostCard).toContainElement(result.getByText('2023-12-11'));
            expect(firstProjectPostCard).toContainElement(result.getByText('프로젝트 소개글14'));

            expect(firstProjectPostCard).toContainElement(result.getByRole('img', {name: '1'}));
            expect(firstProjectPostCard).toContainElement(result.getByRole('img', {name: '2'}));
            expect(firstProjectPostCard).toContainElement(result.getByRole('img', {name: '3'}));
            expect(firstProjectPostCard).toContainElement(result.getByRole('img', {name: '4'}));
            expect(firstProjectPostCard).toContainElement(result.getByRole('img', {name: '5'}));
            expect(firstProjectPostCard).toContainElement(result.getAllByText('업데이트 : 2023-11-20')[0]);

        });

    })

})