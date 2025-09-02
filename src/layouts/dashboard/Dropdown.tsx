import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/select.tsx";

interface DropDownProps{
    options: {
        label: string
        value: string
    } []
    defaultValue?: string
}

const Dropdown = ({options, defaultValue}:DropDownProps) => {
    return (
        <Select value={defaultValue|| options[0].value} onValueChange={(v: any) => {
            // @ts-ignore
            const f = v

        }}>
            <SelectTrigger className="w-full h-9">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default Dropdown;