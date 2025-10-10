import { useState } from "react";
import { Button } from "./button";

export interface MyPaginationProps {
    total: number;
    page: number;
    onPageChange: (page: number) => void;
}

export function MyPagination(props: MyPaginationProps) {
    const [inputValue, setInputValue] = useState(props.page);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setInputValue("" as any);
        } else {
            const parsedValue = parseInt(value, 10);
            setInputValue(isNaN(parsedValue) ? 1 : parsedValue);
        }
    };

    const handleInputBlur = () => {
        const newPage = Math.min(Math.max(1, inputValue), props.total);
        setInputValue(newPage);
        props.onPageChange(newPage);
    };

    return (
        <div className="my-pagination">
            <Button
                onClick={() => {
                    const p = Math.max(1, props.page - 1);
                    props.onPageChange(p);
                    setInputValue(p);
                }}
                disabled={props.page === 1}
                className={`next-button px-6 py-2 rounded text-white 
                    text-xs md:text-sm
                    w-10 lg:w-16
                    ${props.page === 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
            >
                Prev
            </Button>
            <input
                className="mx-2 w-16 text-center border-2"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                min={1}
                max={props.total}
            />
            <span className="mr-2">/ {props.total} pages</span>
            <Button
                onClick={() => {
                    const p = Math.min(props.total, props.page + 1);
                    props.onPageChange(p);
                    setInputValue(p);
                }}
                disabled={props.page === props.total}
                className={`
                    w-10 lg:w-16
                    text-xs md:text-sm
                    next-button px-6 py-2 rounded text-white ${props.page === props.total
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
            >
                Next
            </Button>
        </div>
    );
}