import {mockRouter} from "@/test-utils/next-router-utils";
import {renderWithClient} from "@/test-utils/testing-react-query-utils";
import ProjectTaskLayout from "@/app/project/@task/layout";
import MilestoneSection from "@/components/project/task/milestone/MilestoneSection";
import exp from "constants";

jest.mock('next/router',() => mockRouter);
jest.mock('next/navigation',() => mockRouter);

jest.mock('swiper/react', () => ({
    Swiper: ({ children }:{children:React.ReactNode}) => <div data-testid="swiper-testid">{children}</div>,
    SwiperSlide: ({ children }:{children:React.ReactNode}) => (
        <div data-testid="swiper-slide-testid">{children}</div>
    ),
}));
jest.mock('swiper/modules', () => ({
    Navigation: (props) => null,
    Pagination: (props) => null,
    Scrollbar: (props) => null,
    A11y: (props) => null,
}));


describe('Project task integration test', () => {
    beforeAll(async () => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: 'accessToken=abc-123'
        });
    });

    it('Get project milestones and render milestone section test',async () => {
        await mockRouter.push('/project/task?projectId=id');
        const result = renderWithClient(<MilestoneSection/>);

        // 마일스톤 추가 버튼 render
        const addMilestoneButton = await result.findByRole('button',{name:'마일스톤 추가'});
        expect(addMilestoneButton).toBeInTheDocument();



    })
})