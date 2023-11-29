'use client';
import {useSearchParams} from "next/navigation";

export function useQueryString(name:string): string{
    const searchParams = useSearchParams();
    return searchParams.get(name)!;
}