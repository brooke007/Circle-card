class TokenMetadata {
  model: string;
  address: string | null;
  mintAddress: string | null;
  updateAuthorityAddress: string | null;
  json: any; // 你可以根据需要更改类型
  jsonLoaded: boolean;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  sellerFeeBasisPoints: number;
  editionNonce: number | null;
  creators: any[]; // 你可以根据需要更改类型
  tokenStandard: number | null;
  collection: any | null; // 你可以根据需要更改类型
  collectionDetails: any | null; // 你可以根据需要更改类型
  uses: any | null; // 你可以根据需要更改类型
  programmableConfig: any | null; // 你可以根据需要更改类型

  constructor({
    model,
    address,
    mintAddress,
    updateAuthorityAddress,
    json,
    jsonLoaded,
    name,
    symbol,
    uri,
    isMutable,
    primarySaleHappened,
    sellerFeeBasisPoints,
    editionNonce,
    creators,
    tokenStandard,
    collection,
    collectionDetails,
    uses,
    programmableConfig
  }: {
    model: string;
    address: string | null;
    mintAddress: string | null;
    updateAuthorityAddress: string | null;
    json: any;
    jsonLoaded: boolean;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    sellerFeeBasisPoints: number;
    editionNonce: number | null;
    creators: any[];
    tokenStandard: number | null;
    collection: any | null;
    collectionDetails: any | null;
    uses: any | null;
    programmableConfig: any | null;
  }) {
    this.model = model;
    this.address = address;
    this.mintAddress = mintAddress;
    this.updateAuthorityAddress = updateAuthorityAddress;
    this.json = json;
    this.jsonLoaded = jsonLoaded;
    this.name = name;
    this.symbol = symbol;
    this.uri = uri;
    this.isMutable = isMutable;
    this.primarySaleHappened = primarySaleHappened;
    this.sellerFeeBasisPoints = sellerFeeBasisPoints;
    this.editionNonce = editionNonce;
    this.creators = creators;
    this.tokenStandard = tokenStandard;
    this.collection = collection;
    this.collectionDetails = collectionDetails;
    this.uses = uses;
    this.programmableConfig = programmableConfig;
  }

  displayInfo() {
    console.log(`Token Name: ${this.name}, Symbol: ${this.symbol}`);
  }
}


function parseMetadata(rawMetadata: {
  model: string;
  address: { toBase58: () => string } | null;
  mintAddress: { toBase58: () => string } | null;
  updateAuthorityAddress: { toBase58: () => string } | null;
  json: any;
  jsonLoaded: boolean;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  sellerFeeBasisPoints: number;
  editionNonce: number | null;
  creators: any[];
  tokenStandard: number | null;
  collection: any | null;
  collectionDetails: any | null;
  uses: any | null;
  programmableConfig: any | null;
}): TokenMetadata | null {
  if (!rawMetadata) {
    return null;
  }

  const address = rawMetadata.address?.toBase58() || null;
  const mintAddress = rawMetadata.mintAddress?.toBase58() || null;
  const updateAuthorityAddress = rawMetadata.updateAuthorityAddress?.toBase58() || null;

  return new TokenMetadata({
    model: rawMetadata.model || '',
    address,
    mintAddress,
    updateAuthorityAddress,
    json: rawMetadata.json || null,
    jsonLoaded: rawMetadata.jsonLoaded || false,
    name: rawMetadata.name || '',
    symbol: rawMetadata.symbol || '',
    uri: rawMetadata.uri || '',
    isMutable: rawMetadata.isMutable || false,
    primarySaleHappened: rawMetadata.primarySaleHappened || false,
    sellerFeeBasisPoints: rawMetadata.sellerFeeBasisPoints || 0,
    editionNonce: rawMetadata.editionNonce || null,
    creators: rawMetadata.creators || [],
    tokenStandard: rawMetadata.tokenStandard || null,
    collection: rawMetadata.collection || null,
    collectionDetails: rawMetadata.collectionDetails || null,
    uses: rawMetadata.uses || null,
    programmableConfig: rawMetadata.programmableConfig || null,
  });
}
