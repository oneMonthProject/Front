import React, {Suspense} from 'react';
import MilestoneSection from "@/components/project/task/milestone/MilestoneSection";
import TaskSection from "@/components/project/task/task/TaskSection";
import MilestoneModal from '@/components/project/task/milestone/MilestoneModal';
import TaskModal from '@/components/project/task/task/TaskModal';

function TaskPage() {
    return (
        <>
            <Suspense fallback={<div>loading...</div>}>
                <MilestoneSection/>
                <TaskSection/>
                <MilestoneModal/>
                <TaskModal/>
            </Suspense>
        </>
    );
}

export default TaskPage;