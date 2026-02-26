import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

const join = (...parts: Array<string | null | undefined | false>) =>
    parts.filter(Boolean).join(" ");

export const Button = ({ variant = "primary", className, ...props }: Props) => {
    return (
        <button
            {...props}
            className={join("btn", variant === "secondary" ? "secondary" : null, className)}
        />
    );
};