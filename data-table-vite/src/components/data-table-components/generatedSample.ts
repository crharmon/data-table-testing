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

function generateIncomeTransaction(): Transaction {
    const incomeCategoryMap = new Map<string, string[]>([
      ['Salary', ['wages', 'salary']],
      ['Gifts', ['gifts', 'donations']],
      ['Investments', ['investments']]
    ]);
    const category = generateCategory(incomeCategoryMap);
    const label: string = generateIncomeLabel();
    const note = generateNote(label, category);
    const amount: number = generateRandomAmount(500, 9999); // Use the new function
    const dateMillis =  generateDataMillis();
    const date: string = new Date(dateMillis).toISOString();
    return {
      id: uuidv4(),
      label,
      note,
      category,
      type: 'income',
      amount,
      date
    };
  }
  

  function generateExpenseTransaction(): Transaction {
    const expenseCategoryMap = new Map<string, string[]>([
      ['Groceries', ['food', 'groceries']],
      ['Electricity Bill', ['electricity bill']],
      ['Car Maintenance', ['car maintenance']],
      ['Book Purchase', ['book purchase']],
      ['Gym Membership', ['gym membership']]
    ]);
    const category = generateCategory(expenseCategoryMap)
    const label: string = generateExpenseLabel();
    const note = generateNote(label, category);
    const amount: number = generateRandomAmount(500, 9999); // Use the new function
    const dateMillis = generateDataMillis();
    const date: string = new Date(dateMillis).toISOString();
    return {
      id: uuidv4(),
      label,
      note,
      category,
      type: 'expense',
      amount,
      date
    };
  }

export function generateDataMillis(): number{
  return Math.floor(Date.now()) + Math.floor(Math.random() * moment.duration(7, 'days').asMilliseconds());
}

function generateCategory(categoryMap: Map<string, string[]>) {
    const keys = Array.from(categoryMap.keys());
    const randomIndex = Math.floor(Math.random() * keys.length);
    const category = keys[randomIndex];
    return category;
}


function generateRandomAmount(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
 

function generateIncomeLabel(): string {
  const labels = [
    'Income from work',
    'Business income',
    'Investment income',
    'Interest earned'
  ];
  return labels[Math.floor(Math.random() * labels.length)];
}

function generateExpenseLabel(): string {
  const labels = [
    'Office supplies',
    'Transportation costs',
    'Entertainment expenses',
    'Personal spending'
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
    'Other Retailer'
  ];
  return vendors[Math.floor(Math.random() * vendors.length)];
}
const numItems:number = 15;

export const generatedTransactions = Array.from({ length: numItems }, () => {
  if (Math.random() < 0.5) {
    return generateIncomeTransaction();
  } else {
    return generateExpenseTransaction();
  }
});