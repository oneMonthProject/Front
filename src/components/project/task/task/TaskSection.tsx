import React from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";

function TaskSection() {
    return (
        <section className='w-full flex flex-col items-start'>
            <TaskSectionHeader/>
            <Tasks/>
        </section>
    );
}

export default TaskSection;