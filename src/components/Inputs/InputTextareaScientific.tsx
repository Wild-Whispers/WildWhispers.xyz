import { ReactNode } from "react";
import MixedEditor from "@/lib/math/editor/MixedEditor";
import { EditorNode } from "@/_Interfaces/Editor/EditorNode";

export default function InputTextareaScientific({ label, updateValue, useFieldPlaceholder }: { label: ReactNode, updateValue: (data: EditorNode) => void, useFieldPlaceholder?: boolean } & React.InputHTMLAttributes<HTMLTextAreaElement>) {
    return <MixedEditor label={label} onUpdate={updateValue} useFieldPlaceholder={useFieldPlaceholder} />;
}