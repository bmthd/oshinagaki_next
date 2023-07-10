interface Props {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const H3 = ({ children, className, id }: Props) => {
    const defaultClassName = `p-1 ${className}`;
    return (
        <h3 className={defaultClassName} id={id}>
            <span className="w-4 h-4 bg-accent inline-block rounded-full mr-2"></span>
            {children}
        </h3>
    )
}