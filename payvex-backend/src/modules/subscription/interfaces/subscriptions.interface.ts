export const PAYVEX_PLANS = {
  STANDARD: {
    name: 'Standard',
    price: 349.9,
    gatewaysLimit: 3,
    usersLimit: 5,
    transactionsLimit: 1500,
    hasAiAnalyst: false,
    multiAppLimit: 1,
  },
  PRO: {
    name: 'Pro',
    price: 499.9,
    gatewaysLimit: 10,
    usersLimit: 15,
    transactionsLimit: 10000,
    hasAiAnalyst: false,
    multiAppLimit: 3,
  },
  EXPERT_AI: {
    name: 'Expert AI',
    price: 2500.0,
    gatewaysLimit: 99,
    usersLimit: 99,
    transactionsLimit: 1000000, // Praticamente ilimitado
    hasAiAnalyst: true,
    multiAppLimit: 99,
  },
};
