import { Input } from '@/components/ui/input'

interface SearchProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <Input
      type="text"
      placeholder="Search title or content..."
      className="text-white"
      value={value}
      onChange={onChange}
    />
  )
}
