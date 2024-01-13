import Skeleton from "@/components/ui/skeleton/Skeleton";

const PostListSkeleton = ({ itemCount = 8 }: { itemCount: number }) => {
  const items = new Array(itemCount).fill(null);
  return (
    <div className="mt-6 mobile:mt-2">
      <div className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 gap-10 mobile:gap-0">
        {
          items.length > 0 && items.map((_, idx) => (
            <div key={idx} className="flex-col w-[280px] rounded-xl mobile:w-full mobile:rounded-none mobile:mt-2">
              <Skeleton key={idx} sizeClassName="w-full h-[270px]" />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default PostListSkeleton;