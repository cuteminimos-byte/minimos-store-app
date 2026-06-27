
export type Category = {
  value: string;   // URL-safe slug, used in /category/[value] route
  label: string;   // Display name shown to users
};

export const CATEGORIES: Category[] = [
  { value: 'summer-basics',     label: 'Summer Basics' },
  { value: 'hand-embroidered',  label: 'Hand Embroidered' },
  { value: 'hand-painted',      label: 'Hand Painted' },
  { value: 'shadi-season',      label: 'Shadi Season' },
  { value: 'mommy-and-me',      label: 'Mommy And Me' },
  { value: 'siblings-duo',      label: 'Siblings Duo' },
  { value: 'b-boys',            label: 'B.Boys' },
  { value: 'women-classic',     label: 'Women Classic' },
  { value: 'accessories',       label: 'Accessories' }, // Potli Bag, Hair Bows, Dupatta — sab isi ke andar
];

// Helper: slug se label nikalne ke liye (header / breadcrumbs mein kaam aata hai)
export function getCategoryLabel(value: string): string {
  return CATEGORIES.find(c => c.value === value)?.label || value;
}