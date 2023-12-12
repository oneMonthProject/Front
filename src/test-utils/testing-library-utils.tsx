import {render, RenderOptions} from "@testing-library/react";
import Providers from "@/app/Providers";


const renderWithContext = (ui:React.ReactElement, options?:RenderOptions) =>
    render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
