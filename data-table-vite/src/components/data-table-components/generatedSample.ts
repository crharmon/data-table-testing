import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

interface Transaction {
  id: string;
  label: string;
  note: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  date: string; // Milliseconds since epoch
}

/**
 * Converts seconds since the epoch to an ISO 8601 string.
 *
 * @param milliseconds - The number of millis since the epoch.
 * @returns An ISO 8601 string representation of the given seconds.
 */
function secondsToIso8601(milliseconds: number): string {
    // Convert seconds to a Date object
    const date = new Date(milliseconds);
    
    // Use the toISOString() method to get the ISO 8601 string
    return date.toISOString();
  }

function generateTransaction(): Transaction {
  const type:'income' | 'expense' = Math.random() < 0.5 ? 'income' : 'expense';

  const categoryMap: { [key: string]: string[] } = {
    income: ['salary', 'gift', 'investment'],
    expense: [
        'groceries',
        'electricity bill',
        'car maintenance',
        'book purchase',
        'gym membership',
        'restaurant',
        'internet bill',
        'transport',
        'office supplies',
        'concert tickets',
        'gifts',
        'food',
        'personal care',
        'entertainment',
        'clothing',
        'home decor',
        'electronics',
        'travel',
        'health and wellness',
        'education',
    ],
  };

 
 const category = categoryMap[type][Math.floor(Math.random() * categoryMap[type].length)];

  const label = generateLabel(category);
  const note = generateNote(label, category);

  const amount: number = Math.floor(Math.random() * (10000 - 500)) + 500; // Random amount between $500 and $9,999.99

  const dateMillis = Math.floor(Date.now()) + Math.floor(Math.random() * moment.duration(7, 'days').asMilliseconds() ); // Add some randomness to the year
  const date:string = new Date(dateMillis).toISOString(); 

  return {
    id: uuidv4(),
    label,
    note,
    category,
    type,
    amount,
    date,
  };
}

function generateLabel(category: string): string {
  const labels = [
    `Purchase of ${category}`,
    `${category} Bill`,
    `Payment for ${category}`,
    `Shopping for ${category}`,
    `Expense for ${category}`,
  ];

  return labels[Math.floor(Math.random() * labels.length)];
}

function generateNote(label: string, category: string): string {
  const notes = [
    'This was a one-time payment',
    'This is a recurring expense',
    'I will try to reduce my spending on this category in the future',
    `I purchased ${category} from ${generateVendor()}`,
    `${category} is an essential item that I need`,
  ];

  return notes[Math.floor(Math.random() * notes.length)];
}

function generateVendor(): string {
  const vendors = [
    'Amazon',
    'Walmart',
    'Target',
    'Best Buy',
    'Home Depot',
    'Lowe\'s',
    'eBay',
    'Other Retailer',
  ];

  return vendors[Math.floor(Math.random() * vendors.length)];
}

export const generatedTransactions = Array.from({ length: 15 }, () => generateTransaction());

console.log(generatedTransactions);