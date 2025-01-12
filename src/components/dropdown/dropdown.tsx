'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownProps {
  onSortChange: (sort: string) => void;
}

export default function Dropdown({ onSortChange }: DropdownProps) {
  const [sort, setSort] = useState('new');
  const handleSortChange = (value: string) => {
    setSort(value);
    onSortChange(value);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sort</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort Blogs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
          <DropdownMenuRadioItem value="new">Newest Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="old">Oldest Date</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
