import { OrderDataTable } from '../../types';

// Helper function to generate random date
const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

// Helper to generate unique IDs
const generateId = (index: number): string => {
  return (index + 1).toString().padStart(3, '0');
};

// Sample data arrays
const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Charles', 'Linda', 'Joseph', 'Elizabeth', 'Thomas', 'Barbara', 'Christopher', 'Susan', 'Daniel', 'Jessica', 'Matthew', 'Sarah', 'Anthony', 'Karen', 'Mark', 'Nancy', 'Donald', 'Lisa', 'Steven', 'Betty', 'Paul', 'Helen', 'Andrew', 'Sandra', 'Joshua', 'Donna'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Lewis', 'Robinson', 'Walker'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'];
const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Cedar Ln', 'Birch Way', 'Maple Dr', 'Spruce Ct', 'Walnut St', 'Willow Ave', 'Elmwood Dr', 'Rosewood Ln', 'River Rd', 'Sunset Blvd', 'Park Ave', 'Highland Dr', 'Meadow Ln', 'Forest St', 'Lakeview Dr', 'Mountain Rd'];
const statuses: Array<'Complete' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit'> = ['Complete', 'Processing', 'Rejected', 'On Hold', 'In Transit'];
const types: Array<'Purchase' | 'Rental'> = ['Purchase', 'Rental'];

// Generate 78 order records
export const ORDER_DATA: OrderDataTable[] = Array.from({ length: 78 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const streetNumber = Math.floor(Math.random() * 9999) + 1;
  const street = streets[index % streets.length];
  const city = cities[index % cities.length];
  const stateCode = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'GA', 'NC', 'OH', 'WA', 'CO', 'VA', 'MI', 'NJ', 'MA', 'TN', 'IN', 'MO', 'MD'][index % 20];
  const zipCode = Math.floor(Math.random() * 90000) + 10001;

  return {
    id: generateId(index),
    name: `${firstName} ${lastName}`,
    address: `${streetNumber} ${street}, ${city}, ${stateCode} ${zipCode}`,
    date: generateRandomDate(new Date('2024-01-01'), new Date('2024-12-31')),
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)]
  };
});

export const TABLE_HEADERS = {
  id: 'ID',
  name: 'Name',
  address: 'Address',
  date: 'Date',
  type: 'Type',
  status: 'Status'
} as const;