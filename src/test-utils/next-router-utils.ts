import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

mockRouter.useParser(
    createDynamicRouteParser([
        // @see https://github.com/scottrippey/next-router-mock#dynamic-routes
    ])
);

jest.mock<typeof import("next/navigation")>("next/navigation", () => {
    const actual = jest.requireActual("next/navigation");
    const nextRouterMock = jest.requireActual("next-router-mock");
    const { useRouter } = nextRouterMock;
    const usePathname = jest.fn().mockImplementation(() => {
        const router = useRouter();
        return router.asPath;
    });

    const useSearchParams = jest.fn().mockImplementation(() => {
        const router = useRouter();
        return new URLSearchParams(router.query);
    });

    const useQueryString = jest.fn().mockImplementation((param:string) => {
        const router = useRouter();
        const params = new URLSearchParams(router.query);
        return params.get(param);
    })

    return {
        ...actual,
        useRouter: jest.fn().mockImplementation(useRouter),
        usePathname,
        useSearchParams,
        useQueryString
    };
});

export { mockRouter };