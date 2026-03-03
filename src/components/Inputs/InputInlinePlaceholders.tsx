import { ChangeEvent, ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import FormSectionCol from "../Forms/FormSectionCol";
import Image from "next/image";
import Row from "../Row";
import Col from "../Col";
import { safeUUID } from "@/lib/crypto/crypto";
import { InlinePlaceholderValue } from "@/_Interfaces/Problems/InlineOptions/InlinePlaceholderValue";
import { InlinePlaceholderMatch } from "@/_Types/InlineOptions/Dropdown/InlinePlaceholderMatch";
import { UUID } from "crypto";

const FieldPlaceholderButton = ({ onClick, disabled, image }: { onClick: () => void, disabled: boolean, image: string }) => (
    <Image
        alt="Rich text format button"
        onClick={onClick}
        src={image}
        width={512}
        height={512}
        className={`
            flex
            flex-row
            items-center
            w-20

            bg-gradient-to-br

            bg-gradient-to-br
            from-stone-300
            to-stone-500

            hover:from-stone-300
            hover:to-stone-200

            border-1
            border-stone-50/20

            text-sm
            font-semibold
            cursor-pointer
            gap-2

            ${disabled && "opacity-35 hover:from-stone-300 hover:to-stone-500 !cursor-auto"}
        `}
    />
);

export default function InputInlinePlaceholders({ children, updater }: { children: (props: InlinePlaceholderValue) => ReactNode, updater: (newValue: InlinePlaceholderValue) => void}) {
    const input = useRef<HTMLInputElement>(null);
    const [textVal, setTextVal] = useState<string>("");
    const [activePlaceholder, setActivePlaceholder] = useState<InlinePlaceholderMatch | null>(null);
    const nextCursorPosition = useRef<number | null>(null);

    const MAGIC_CHAR = '\ufffc';
    const OPEN_TAG = `{{${MAGIC_CHAR}`;
    const CLOSE_TAG = `}}`;
    const PLACEHOLDER_PATTERN = new RegExp(`\\{\\{${MAGIC_CHAR}(.*?)\\}\\}`, 'g');

    useEffect(() => {
        if (nextCursorPosition.current !== null && input.current) {
            input.current.focus();
            input.current.setSelectionRange(nextCursorPosition.current, nextCursorPosition.current);
            
            // Re-check logic after cursor move
            const match = getPlaceholderAtCaret(input.current.value, nextCursorPosition.current);

            setActivePlaceholder(match);
            
            nextCursorPosition.current = null;
        }

        updater({
            value: textVal,
            placeholderSelection: activePlaceholder
        });
    }, [textVal]); /* eslint-disable-line react-hooks/exhaustive-deps */

    const getPlaceholderAtCaret = (text: string, caretIndex: number | null): InlinePlaceholderMatch | null => {
        if (caretIndex === null) return null;

        // We must reset lastIndex because we are using the global 'g' flag
        PLACEHOLDER_PATTERN.lastIndex = 0;
        
        // Iterate through all matches in the text
        let match;
        while ((match = PLACEHOLDER_PATTERN.exec(text)) !== null) {
            const start = match.index;
            const end = start + match[0].length;

            // caret > start (strictly inside, left edge doesn't count)
            // caret <= end (inside or directly at the right edge counts)
            if (caretIndex > start && caretIndex <= end) return {
                id: match[1] as UUID, // Capture group 1 is the ID
                start: start,
                end: end,
                length: match[0].length
            };
        }

        return null;
    };

    const handleTextValChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTextVal(newValue);
        
        // Check new position
        const match = getPlaceholderAtCaret(newValue, e.target.selectionStart);

        setActivePlaceholder(match);
    };

    const handleSelectionChange = (e: SyntheticEvent<HTMLInputElement, Event>) => {
        const target = e.currentTarget;
        const match = getPlaceholderAtCaret(target.value, target.selectionStart);

        setActivePlaceholder(match);
    };

    const insertFieldPlaceholder = () => {
        if (!input.current) return;
        
        const index = input.current.selectionStart || 0;
        const id = safeUUID(); 
        const newTag = ` ${OPEN_TAG}${id}${CLOSE_TAG}`;
        
        // Insert at cursor
        const newVal = textVal.slice(0, index) + newTag + textVal.slice(index);

        // Schedule cursor to jump AFTER the new tag
        nextCursorPosition.current = index + newTag.length;
        
        setTextVal(newVal);
    };

    const removeFieldPlaceholder = () => {
        // We rely on the state calculated by our helper
        if (!activePlaceholder || !input.current) return;

        // Slice using the absolute start/end from the helper
        // This works regardless of whether the cursor is at the end or in the middle of the token
        const newVal = 
            textVal.slice(0, activePlaceholder.start) + 
            textVal.slice(activePlaceholder.end);

        // Schedule cursor to jump back to where the placeholder started
        nextCursorPosition.current = activePlaceholder.start;
        
        setTextVal(newVal);
    };

    return (
        <FormSectionCol classes="p-2 bg-slate-600 rounded-sm">
            <Row classes="items-center p-1.5 flex-wrap bg-slate-700 rounded-sm">
                <FieldPlaceholderButton 
                    onClick={insertFieldPlaceholder}
                    disabled={false /* Any amount can be inserted */}
                    image="/assets/rich-text/insert-field.png"
                />
                <FieldPlaceholderButton 
                    onClick={removeFieldPlaceholder}
                    disabled={!activePlaceholder}
                    image="/assets/rich-text/remove-field.png"
                />
            </Row>

            <Col classes="p-1.5 flex-wrap bg-slate-700 rounded-sm gap-1">
                <Col>
                    <p className="text-xs font-semibold">Write the text where the fields should be inserted.</p>
                    <p className="text-xs font-semibold">- When you insert a field, it will insert it at the current cursor position.</p>
                    <p className="text-xs font-semibold">- Select a field by placing your cursor anywhere inside of it.</p>
                    <p className="text-xs font-semibold">- Delete a field by selecting it, and then clicking the &apos;- Remove Field&apos; button.</p>
                </Col>

                <input
                    ref={input}
                    type="text"
                    value={textVal}
                    onChange={handleTextValChange}
                    onSelect={handleSelectionChange}
                    className="
                        min-w-10
                        p-1

                        bg-slate-700

                        outline-none
                        border-1
                        border-slate-50/20
                        focus:border-slate-50

                        text-md
                        rounded-sm
                    "
                />
            </Col>

            <Col classes="p-1.5 flex-wrap bg-slate-700 rounded-sm">
                {
                    children({
                        value: textVal,
                        placeholderSelection: activePlaceholder
                    })
                }
            </Col>
        </FormSectionCol>
    );
}