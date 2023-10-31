'use client';

import React, {ReactNode, useEffect, useRef} from 'react';
import {useRecoilState} from "recoil";
import {modalState} from "@/app/store/ModalStateStore";

function Modal({children}:{children:ReactNode}) {
    const [{isOpen}, setIsOpen] = useRecoilState(modalState);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.overflowY = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflowY = 'auto';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    const clickModalOutside = (event: MouseEvent) => {
        if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen({isOpen: false});
        }
    };


    useEffect(() => {
        ref.current?.scrollTo(0, 0);

        if (isOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        document.addEventListener('mousedown', clickModalOutside);
        return () => {
            document.removeEventListener('mousedown', clickModalOutside);
        };
    });

    if(!isOpen) return null;

    return (
        <div className="inset-0 z-10 w-full h-screen overflow-y-auto">
            <div className="absolute inset-0 w-full h-full bg-gray-500 opacity-75">
            </div>
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            </span>
                {/*모달 컨텐츠 시작 */}
                <div
                    ref={ref}
                    className="relative inline-block overflow-hidden transition-all transform sm:align-middle sm:max-w-lg"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div>
                        <div className="rounded-lg p-8 bg-white shadow">
                            {/*close button 시작 */}
                            <div className="absolute right-4 top-4">
                                <button type='button' className="bg-transparent border border-transparent"
                                        onClick={() => setIsOpen({isOpen:false})}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="w-6 h-6 text-gray-700"
                                         viewBox="0 0 1792 1792">
                                        <path
                                            d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                            {/*close button 끝 */}
                            {children}
                        </div>
                    </div>
                </div>
                {/*모달 컨텐츠 끝 */}
            </div>
        </div>


    );
}

export default Modal;