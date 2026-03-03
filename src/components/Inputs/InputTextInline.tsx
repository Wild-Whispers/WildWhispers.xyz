export default function InputTextInline({ ...props }: & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="
                min-w-10
                p-1

                outline-none
                border-1
                border-slate-50/20
                focus:border-slate-50

                text-md
                rounded-sm
            "
            type="text"
            {...props}
        />
    );
}