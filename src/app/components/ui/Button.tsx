export default function Button() {
    return (
        <>
            {/* primary 버튼 */}
            <button type="button"
                    className="w-fit py-2 px-4 bg-primary hover:bg-primaryDark text-white transition ease-in duration-50 text-center text-base font-semibold shadow-md rounded-lg ">
                확인
            </button>
            <button type="button"
                    className="w-fit py-1 px-2 bg-primary hover:bg-primaryDark  text-white transition ease-in duration-50 text-center text-sm font-semibold shadow-md focus:outline-none rounded-md ">
                확인
            </button>

            {/* secondary 버튼 */}
            <button type="button"
                    className="w-fit py-2 px-4 bg-secondary hover:bg-secondaryLight text-white transition ease-in duration-50 text-center text-base font-semibold shadow-md rounded-lg ">
                확인
            </button>
            <button type="button"
                    className="w-fit py-1 px-2 bg-primary hover:bg-primaryDark  text-white transition ease-in duration-50 text-center text-sm font-semibold shadow-md focus:outline-none rounded-md ">
                확인
            </button>

            {/* 라운드 버튼 */}

            <button type="button"
                    className="py-2 px-4  bg-primary hover:bg-primaryDark text-white w-transition ease-in duration-50 text-center text-base font-semibold shadow-md rounded-full">
                Follow
            </button>


            <button
                className=" px-6 py-2  transition ease-in duration-200 uppercase rounded-full hover:bg-secondary text-black100 hover:text-white hover:border-secondary border-2 border-black100  focus:outline-none">
                프로젝트 참가
            </button>

        </>
    )
}
