import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const join = (...parts: Array<string | null | undefined | false>) =>
    parts.filter(Boolean).join(" ");

export const Card = ({ className, ...props }: Props) => {
    return <div {...props} className={join("card", className)} />;
};