import React from 'react';
import MilestoneSection from "@/components/project/task/milestone/MilestoneSection";
import TaskSection from "@/components/project/task/task/TaskSection";
import MilestoneModal from '@/components/project/task/milestone/MilestoneModal';
import TaskModal from '@/components/project/task/task/TaskModal';

function TaskPage() {
  return (
    <>
      <MilestoneSection />
      <TaskSection />
      <MilestoneModal />
      <TaskModal />
    </>
  );
}

export default TaskPage;