import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { FormFields, TouchedFields } from '@/types/types';
import { z } from 'zod';

interface BlogFormFieldsProps {
  fields: FormFields;
  touched: TouchedFields;
  clientErrors: z.ZodError | null;
  onFieldChange: (field: keyof FormFields, value: any) => void;
  onFieldBlur: (field: keyof TouchedFields) => void;
  isPending: boolean;
  submitText: string;
}

export function BlogFormFields({
  fields,
  touched,
  clientErrors,
  onFieldChange,
  onFieldBlur,
  isPending,
  submitText,
}: BlogFormFieldsProps) {
  const renderError = (field: keyof TouchedFields) => {
    if (
      touched[field] &&
      clientErrors?.errors?.find((err) => err.path.includes(field))
    ) {
      return (
        <Label className="text-red-500">
          {
            clientErrors.errors?.find((err) => err.path.includes(field))
              ?.message
          }
        </Label>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-5">
      <div className="grid space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <Label htmlFor="title">Title</Label>
            {renderError('title')}
          </div>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={fields.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
            onBlur={() => onFieldBlur('title')}
          />
        </div>
      </div>

      <div className="grid space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <Label htmlFor="content">Content</Label>
            {renderError('content')}
          </div>
          <Textarea
            id="content"
            name="content"
            placeholder="Enter content"
            value={fields.content}
            onChange={(e) => onFieldChange('content', e.target.value)}
            onBlur={() => onFieldBlur('content')}
          />
        </div>
      </div>

      <div className="grid space-y-4">
        <div className="flex flex-col">
          <div className="flex justify-between mb-1">
            <Label htmlFor="date">Date</Label>
            {renderError('date')}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal mt-1',
                  !fields.date && 'text-muted-foreground'
                )}
                onBlur={() => onFieldBlur('date')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fields.date ? (
                  format(fields.date, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fields.date}
                onSelect={(date) => onFieldChange('date', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Button type="submit" className="duration-150" disabled={isPending}>
          {isPending ? `${submitText}ing...` : submitText}
        </Button>
      </div>
    </div>
  );
}
