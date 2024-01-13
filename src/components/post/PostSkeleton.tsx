import AvatarSkeleton from "@/components/ui/skeleton/AvatarSkeleton";
import Skeleton from "@/components/ui/skeleton/Skeleton";

const PostSkeleton = () => {
  return (
    <div className="p-5 mobile:p-1 m-auto">
      <div className="flex-col">
        <Skeleton sizeClassName="w-40 h-10 mobile:h-8 mt-5" />
        <div className="flex gap-3 items-center mt-8 mobile:mt-3 border-b-2 pb-8 mobile:pb-3">
          <div className="flex items-center gap-2">
            <AvatarSkeleton size="md" className='relative inline-block h-8 w-8 mobile:h-7 mobile:w-7' />
            <Skeleton sizeClassName="w-56 mobile:w-48 h-8 mobile:h-7" />
          </div>
        </div>
      </div>
      <div className="py-10 mobile:py-4 px-2 grid gap-x-1 grid-cols-2 gap-y-6 auto-rows-auto mobile:grid-cols-1 mobile:gap-y-0">
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
        <div className="flex gap-5 h-10 items-center break-words">
          <Skeleton sizeClassName="w-[110px] mobile:w-[80px] h-7 mobile:h-5" />
          <Skeleton sizeClassName="w-[calc(100%-110px)] h-7 mobile:h-5 mr-5 mobile:mr-0" />
        </div>
      </div>
        <div>
          <Skeleton sizeClassName="w-56 mobile:w-48 h-8 mobile:h-7" />
          <div className="py-10 mobile:py-5 border-t-2 border-b-2 mt-5 mobile:mt-3">
            <Skeleton sizeClassName="w-full h-40 mobile:h-32" />
          </div>
        </div>
    </div>
  );
}

export default PostSkeleton;