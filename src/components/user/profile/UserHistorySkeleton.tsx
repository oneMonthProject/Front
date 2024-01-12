import Skeleton from "@/components/ui/skeleton/Skeleton";

const UserHistorySkeleton = () => {
  return (
    <>
      <div className='flex items-center my-8 mobile:my-4'>
        <Skeleton sizeClassName="w-[240px] h-8 mobile:h-7" />
      </div>
      <div className='flex-col space-y-4 mobile:space-y-2'>
        <Skeleton sizeClassName="w-full h-12" />
        <Skeleton sizeClassName="w-full h-12" />
        <Skeleton sizeClassName="w-full h-12" />
        <Skeleton sizeClassName="w-full h-12" />
        <Skeleton sizeClassName="w-full h-12" />
      </div>
    </>
  );
}

export default UserHistorySkeleton;