import {mockRouter} from '../src/test-utils/next-router-utils';
// import {screen} from '../src/test-utils/testing-library-utils';
import {renderHook, waitFor} from "@testing-library/react";
import {createWrapper, renderWithClient} from "@/test-utils/testing-react-query-utils";
import {useProjectInfo} from "@/hooks/useProjectInfo";
import ProjectInfo from "@/components/project/layout/ProjectInfo";

jest.mock('next/router',() => mockRouter);
jest.mock('next/navigation',() => mockRouter);
describe('Test With Cookie', () => {
    describe('Existing users', () => {
        beforeAll(async () => {
            Object.defineProperty(document, 'cookie', {
                writable: true,
                value: 'accessToken=abc-123'
            });
            // mockRouter.useParser(
            //     createDynamicRouteParser([
            //         // @see https://github.com/scottrippey/next-router-mock#dynamic-routes
            //         "/static/path"
            //     ])
            // );

        });

        // it('renders ProjectInfo correctly', async () => {
        //     document.cookie = 'accessToken=abc-123';
        //     // console.log("cokkkie:::: ",document.cookie);
        //     await mockRouter.push('/project/task?projectId=id');
        //
        //     const result = renderWithClient(<ProjectInfo/>);
        //     screen.debug();
        //     // eslint-disable-next-line testing-library/prefer-screen-queries
        //     // expect(await result.findByRole('cell',{name:'팀 프로젝트 매칭 서비스 개발'})).toBeInTheDocument();
        //
        // });

        it('successful query hook', async () => {
            // console.log("cokkkie:::: ",document.cookie);

            await mockRouter.push('/project/task?projectId=id');

            expect(mockRouter).toMatchObject({
                pathname:'/project/task',
                query:{projectId:'id'}
            });


            renderWithClient(<ProjectInfo/>);
            const {result, rerender} = renderHook(() => useProjectInfo(), {wrapper:createWrapper})
            await waitFor(() =>  !result.current.isLoading);

            expect(result.current.data?.name).toBe('trustcrews');

            await waitFor(() => !result.current.isLoading);
            // screen.debug();


            // console.log("re/**/sult::: ",result.current.data);

            //
            // expect(result.current.data?.data.name).toBe('trustcrews');
        })
    })

})
