import {mockRouter} from '../src/test-utils/next-router-utils';
// import {screen} from '../src/test-utils/testing-library-utils';
import {renderHook, waitFor, screen} from "@testing-library/react";
import {createWrapper, renderWithClient} from "../src/test-utils/testing-react-query-utils";
import {useProjectInfo} from "../src/hooks/useProjectInfo";
import ProjectInfo from "../src/components/project/layout/ProjectInfo";

jest.mock('next/router',() => mockRouter);
jest.mock('next/navigation',() => mockRouter);
describe('Get and render project detail test', () => {
    describe('Existing users', () => {
        beforeAll(async () => {
            Object.defineProperty(document, 'cookie', {
                writable: true,
                value: 'accessToken=abc-123'
            });
        });

        it('renders ProjectInfo correctly', async () => {
            document.cookie = 'accessToken=abc-123';
            // console.log("cokkkie:::: ",document.cookie);
            await mockRouter.push('/project/task?projectId=id');

            const result = renderWithClient(<ProjectInfo/>);
            // eslint-disable-next-line testing-library/prefer-screen-queries
            expect(await result.findByText('프로젝트 이름 : trustcrews')).toBeInTheDocument();
            expect(await result.findByText('프로젝트 주제 : 팀 프로젝트 매칭 서비스 개발')).toBeInTheDocument();
            expect(await result.findByText('모임 등급 : 3등급')).toBeInTheDocument();
            expect(await result.findByText('프로젝트 기간 : 2023-11-19 ~ 2023-11-23')).toBeInTheDocument();

        });

        it('successful query hook', async () => {
            // console.log("cokkkie:::: ",document.cookie);

            await mockRouter.push('/project/task?projectId=id');

            expect(mockRouter).toMatchObject({
                pathname:'/project/task',
                query:{projectId:'id'}
            });

            const {result} = renderHook(() => useProjectInfo(), {wrapper:createWrapper})
            await waitFor(() => expect(result.current.data.data?.name).toBe('trustcrews'));

            await waitFor(() => !result.current.isLoading);
        })
    })

})
