import clsx from "clsx";
import { useMDXComponent } from "next-contentlayer/hooks";

interface MdxProps {
    code: string;
    className?: string;
}

export function Mdx({ code, className }: MdxProps) {
    const Component = useMDXComponent(code);
    return <Component className={clsx(className)} />;
}