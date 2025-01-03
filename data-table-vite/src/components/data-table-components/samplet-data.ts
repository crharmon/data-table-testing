export interface Transaction {
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

  export const sampleData: Transaction[] = [
    {
      id: "1",
      label: "salary",
      note: "monthly salary",
      category: "income",
      type: "income",
      amount: 5000,
      date: secondsToIso8601(1687651200000),
    },
    {
      id: "2",
      label: "groceries",
      note: "weekly grocery shopping",
      category: "food",
      type: "expense",
      amount: 150,
      date: secondsToIso8601(1687564800000),
    },
    {
      id: "3",
      label: "electricity bill",
      note: "monthly electricity bill",
      category: "utilities",
      type: "expense",
      amount: 100,
      date: secondsToIso8601(1687478400000),
    },
    {
      id: "4",
      label: "freelance work",
      note: "payment for freelance project",
      category: "income",
      type: "income",
      amount: 800,
      date: secondsToIso8601(1687392000000),
    },
    {
      id: "5",
      label: "rent",
      note: "monthly rent payment",
      category: "housing",
      type: "expense",
      amount: 1200,
      date: secondsToIso8601(1687305600000),
    },
    {
      id: "6",
      label: "gym membership",
      note: "monthly gym fee",
      category: "health",
      type: "expense",
      amount: 50,
      date: secondsToIso8601(1687219200000),
    },
    {
      id: "7",
      label: "restaurant",
      note: "dinner at a restaurant",
      category: "food",
      type: "expense",
      amount: 75,
      date: secondsToIso8601(1687132800000),
    },
    {
      id: "8",
      label: "internet bill",
      note: "monthly internet bill",
      category: "utilities",
      type: "expense",
      amount: 60,
      date: secondsToIso8601(1687046400000),
    },
    {
      id: "9",
      label: "transport",
      note: "public transport pass",
      category: "transport",
      type: "expense",
      amount: 40,
      date: secondsToIso8601(1686960000000),
    },
    {
      id: "10",
      label: "office supplies",
      note: "stationery items for office",
      category: "work",
      type: "expense",
      amount: 30,
      date: secondsToIso8601(1686873600000),
    },
    {
      id: "11",
      label: "concert tickets",
      note: "tickets for a concert",
      category: "entertainment",
      type: "expense",
      amount: 100,
      date: secondsToIso8601(1686787200000),
    },
    {
      id: "12",
      label: "car maintenance",
      note: "annual car servicing",
      category: "transport",
      type: "expense",
      amount: 200,
      date: secondsToIso8601(1686700800000),
    },
    {
      id: "13",
      label: "book purchase",
      note: "buying a new book",
      category: "education",
      type: "expense",
      amount: 25,
      date: secondsToIso8601(1686614400000),
    },
    {
      id: "14",
      label: "movie night",
      note: "tickets for a movie",
      category: "entertainment",
      type: "expense",
      amount: 30,
      date: secondsToIso8601(1686528000000),
    },
    {
      id: "15",
      label: "gift",
      note: "birthday gift for a friend",
      category: "gifts",
      type: "expense",
      amount: 50,
      date: secondsToIso8601(1686441600000),
    },
  ];