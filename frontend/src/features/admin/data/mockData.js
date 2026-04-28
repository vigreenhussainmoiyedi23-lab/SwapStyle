export const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    location: "Ujjain",
    fraudScore: 12,
    swaps: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Riya Mehta",
    email: "riya@example.com",
    location: "Indore",
    fraudScore: 78,
    swaps: 2,
    status: "flagged",
  },
];

export const listings = [
  {
    id: 1,
    title: "Nike Hoodie",
    user: "Aarav Sharma",
    condition: "Good",
    swapValue: 1200,
  },
  {
    id: 2,
    title: "Zara Jacket",
    user: "Riya Mehta",
    condition: "Excellent",
    swapValue: 1800,
  },
];

export const disputes = [
  {
    id: 1,
    swapId: "SWP-12345",
    reason: "Item not as described",
    status: "open",
    users: ["Aarav", "Riya"],
  },
];