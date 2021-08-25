module.exports = [
    {
      username: 'mike',
      config: {
        visualization1: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID,
          filters: [{"column": "companyId", "operator": "IN", "values": [701]}]
        },
        visualization2: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID2,
        },
        visualization3: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID3,
        },
        visualization4: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID4,
        },
        visualization5: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID5,
        },
        visualization6: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID6,
        } 
      }
    },
    {
      username: 'susan',
      config: {
        visualization1: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID,
          filters: [{"column": "companyId", "operator": "IN", "values": [591]}]
        },
      }
    },
    {
      username: 'tom',
      config: {
        visualization1: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID,
          filters: [{"column": "companyId", "operator": "IN", "values": [591]}, {"column": "locationId", "operator": "IN", "values": [1041]}]
        },
      }
    },
    {
      username: 'in',
      config: {
        visualization1: {
          clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, embedId: process.env.EMBED_ID, 
          filters: [{"column": "locationId", "operator": "IN", "values": [594]}]
        },
      }
    }
  ];