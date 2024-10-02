import React, {ChangeEvent, useState} from 'react';

type VoteBarProps = {
    label: string;
    counts: number;
    maxCounts: number;
    barColor: string
    disabled: boolean;
    onChangeVoteHandler: (value: string) => void;
    value: string;

}

function VoteBar({label, counts, barColor, maxCounts, onChangeVoteHandler, disabled, value}: VoteBarProps) {
    const [checked, setChecked] = useState(false);

    const barBackgroundColorColor = disabled ? 'bg-gray-400/40' : 'bg-gray-400/80';
    const barWidth = counts > 0 ? Math.floor((counts / maxCounts) * 100) : 0;
    const trueBarColor = disabled ? `${barColor}/30` : `${barColor}`;

    const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (confirm("투표하시겠습니까?")) {
            onChangeVoteHandler(e.target.value);
        } else {
            setChecked(false);
            e.target.blur();
        }
    }

    return (
        <div className='flex mobile:flex-col justify-center items-center mobile:items-start'>
            <div className='text-nowrap tablet:basis-[50px] text-[18px] mobile:text-base text-greyDarkblue font-medium'>{label}</div>
            <div className='flex w-full justify-around items-center space-x-12 mobile:space-x-9'>
                <div
                    className={`relative tablet:basis-[70%] mobile:w-full h-2 ${barBackgroundColorColor} rounded-full`}>
                    <div
                        style={{width: `${barWidth}%`}}
                        className={`${trueBarColor} h-full text-center text-xs text-white rounded-full`}>
                    </div>
                    <span
                        className='absolute top-[-7px] left-[102%] mobile:text-sm text-greyBlue font-medium'>{`${counts}/${maxCounts}`}</span>
                </div>
                <div className='flex space-x-2 h-5 items-center'>
                    {
                        !disabled &&
                        <input
                            type="radio" name='voteOption' id='voteOption_agree'
                            onChange={onChangeCheckedHandler}
                            value={value}
                            checked={checked}
                            className='self-stretch border-gray-400 text-indigo-600 focus:ring-none'
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default VoteBar;