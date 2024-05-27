import React from 'react';
import Button from "@/components/ui/Button";
import {useResetRecoilState} from "recoil";
import {projectSettingFormState} from "@/store/project/setting/ProjectSettingFormStateStore";

function ProjectSettingFormResetButton() {
    const resetProjectSettingForm = useResetRecoilState(projectSettingFormState);

    return (
        <Button
            theme="primary-hollow"
            size="md"
            onClickHandler={() => resetProjectSettingForm()}
        >
            초기화
        </Button>
    );
}

export default ProjectSettingFormResetButton;