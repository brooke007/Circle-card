// Mock data arrays
// const users = [
//     { account: 'jojo', password: '111', customDomain: 'jojo' },
//     { account: 'janedoe', password: 'password456', customDomain: 'jane' },
//   ];

const users = [
  { account: "jojo", password: "111", customDomain: "jojo", avatarUrl: "/pizza00.png?height=100&width=100" },
  { account: "janedoe", password: "password456", customDomain: "jane", avatarUrl: "/tool01.png?height=100&width=100" },
];

// const userUrls = [
//   { customDomain: 'jojo', urls: [
//     { platform: 'GitHub', url: 'https://github.com/johndoe' },
//     { platform: 'Twitter', url: 'https://twitter.com/johndoe' },
//   ]},
//   { customDomain: 'jane', urls: [
//     { platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
//     { platform: 'Instagram', url: 'https://instagram.com/janedoe' },
//   ]},
// ];
const userUrls = [
  {
    customDomain: "jojo",
    urls: [
      { platform: "wechat", url: "https://wechat.com/johndoe" },
      { platform: "email", url: "mailto:john@example.com" },
      { platform: "telegram", url: "https://t.me/johndoe" },
      { platform: "twitter", url: "https://twitter.com/johndoe" },
      { platform: "GitHub", url: "https://github.com/johndoe" },
      { platform: "bilibili", url: "https://bilibili.com/johndoe" },
      { platform: "微博", url: "https://weibo.com/johndoe" },
    ],
  },
  {
    customDomain: "jane",
    urls: [
      { platform: "QQ", url: "https://qq.com/janedoe" },
      { platform: "discord", url: "https://discord.com/users/janedoe" },
      { platform: "phonenumber", url: "tel:+1234567890" },
      { platform: "Facebook", url: "https://facebook.com/janedoe" },
      { platform: "ins", url: "https://instagram.com/janedoe" },
      { platform: "steam", url: "https://steamcommunity.com/id/janedoe" },
      { platform: "豆瓣", url: "https://douban.com/people/janedoe" },
      { platform: "小红书", url: "https://xiaohongshu.com/user/janedoe" },
      { platform: "抖音", url: "https://douyin.com/user/janedoe" },
      { platform: "抖音", url: "https://douyin.com/user/janedoe" },
    ],
  },
];

const cardHolders = [
  { customDomain: "jojo", savedCards: ["jane", "bob"] },
  { customDomain: "jane", savedCards: ["jojo"] },
];

// SQL-like methods
export const findUser = (account: string, password: string) => {
  return users.find(user => user.account === account && user.password === password);
};

export const createUser = (account: string, password: string) => {
  if (users.some(user => user.account === account)) {
    return null;
  }
  const newUser = { account, password, customDomain: "", avatarUrl: "" };
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

export const updateUserUrls = (customDomain: string, newUrls: Array<{ platform: string; url: string }>) => {
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
