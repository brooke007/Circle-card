// Mock data arrays
const users = [
    { account: 'johndoe', password: 'password123', customDomain: 'john' },
    { account: 'janedoe', password: 'password456', customDomain: 'jane' },
  ];
  
  const userUrls = [
    { customDomain: 'john', urls: [
      { platform: 'GitHub', url: 'https://github.com/johndoe' },
      { platform: 'Twitter', url: 'https://twitter.com/johndoe' },
    ]},
    { customDomain: 'jane', urls: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
      { platform: 'Instagram', url: 'https://instagram.com/janedoe' },
    ]},
  ];
  
  const cardHolders = [
    { customDomain: 'john', savedCards: ['jane', 'bob'] },
    { customDomain: 'jane', savedCards: ['john'] },
  ];
  
  // SQL-like methods
  export const findUser = (account: string, password: string) => {
    return users.find(user => user.account === account && user.password === password);
  };
  
  export const createUser = (account: string, password: string) => {
    if (users.some(user => user.account === account)) {
      return null;
    }
    const newUser = { account, password, customDomain: '' };
    users.push(newUser);
    return newUser;
  };
  
  export const updateCustomDomain = (account: string, customDomain: string) => {
    const user = users.find(user => user.account === account);
    if (user) {
      user.customDomain = customDomain;
      return true;
    }
    return false;
  };
  
  export const getUserUrls = (customDomain: string) => {
    return userUrls.find(item => item.customDomain === customDomain)?.urls || [];
  };
  
  export const updateUserUrls = (customDomain: string, newUrls: Array<{ platform: string, url: string }>) => {
    const index = userUrls.findIndex(item => item.customDomain === customDomain);
    if (index !== -1) {
      userUrls[index].urls = newUrls;
      return true;
    }
    userUrls.push({ customDomain, urls: newUrls });
    return true;
  };
  
  export const getSavedCards = (customDomain: string) => {
    return cardHolders.find(item => item.customDomain === customDomain)?.savedCards || [];
  };
  
  export const addSavedCard = (customDomain: string, savedCard: string) => {
    const cardHolder = cardHolders.find(item => item.customDomain === customDomain);
    if (cardHolder) {
      if (!cardHolder.savedCards.includes(savedCard)) {
        cardHolder.savedCards.push(savedCard);
      }
      return true;
    }
    cardHolders.push({ customDomain, savedCards: [savedCard] });
    return true;
  };
  
  export const getUserByCustomDomain = (customDomain: string) => {
    return users.find(user => user.customDomain === customDomain);
  };