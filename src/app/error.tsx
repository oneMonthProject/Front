'use client'

import Button from '@/components/ui/Button'
import { activeTabState, selectedPositionState, selectedTechStackState } from '@/store/post/PostStateStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useResetRecoilState } from 'recoil'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();
  const resetActiveTab = useResetRecoilState(activeTabState);
  const resetSelectedTechStacks = useResetRecoilState(selectedTechStackState);
  const resetSelectedPosition = useResetRecoilState(selectedPositionState);

  const goHome = () => {
    resetActiveTab();
    resetSelectedTechStacks();
    resetSelectedPosition();

    router.push("/");
  }

  useEffect(() => {
    console.error(error);
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <h1 className='text-2xl font-semibold w-full text-center mb-5'>에러가 발생했습니다.</h1>
      <div className='flex-col space-x-1'>
      <Button onClickHandler={() => reset()}>재시도</Button>
      <Button onClickHandler={goHome}>홈으로</Button>
      </div>
    </div>
  )
}