const { MongoClient, ObjectId } = require("mongodb");
const { Client } = require("@elastic/elasticsearch");

const Transform = require("stream").Transform;
const serverShutDownMins = 2 * 60 * 1000;

let esClient = {};

const movieMappings = {
  _id: {
    type: "keyword",
  },
  plot: {
    type: "text",
  },
  genres: {
    type: "keyword",
  },
  runtime: {
    type: "integer",
  },
  cast: {
    type: "keyword",
  },
  num_mflix_comments: {
    type: "integer",
  },
  title: {
    type: "text",
  },
  fullplot: {
    type: "text",
  },
  countries: {
    type: "keyword",
  },
  released: {
    type: "date",
  },
  directors: {
    type: "keyword",
  },
  rated: {
    type: "keyword",
  },
  awards: {
    properties: {
      wins: {
        type: "integer",
      },
      nominations: {
        type: "integer",
      },
      text: {
        type: "text",
      },
    },
  },
  lastupdated: {
    type: "date",
  },
  year: {
    type: "integer",
  },
  imdb: {
    properties: {
      rating: {
        type: "float",
      },
      votes: {
        type: "integer",
      },
      id: {
        type: "integer",
      },
    },
  },
  type: {
    type: "keyword",
  },
  tomatoes: {
    properties: {
      viewer: {
        properties: {
          rating: {
            type: "float",
          },
          numReviews: {
            type: "integer",
          },
          meter: {
            type: "integer",
          },
        },
      },
      lastUpdated: {
        type: "date",
      },
    },
  },
};

const transformedStreamData = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
});

transformedStreamData._transform = function (item, enc, cb) {
  if (item) {
    item.last_sync_at = new Date();
    transformedStreamData.push(item);
    cb();
  } else {
    process.exit(1);
  }
};

const defaultElasticSettings = {
  index: {
    number_of_replicas: 0,
  },
};

async function _connectToMongo() {
  const dbName = "mflix_sample_dataset";
  const mongoUri = "mongodb://localhost:27017";
  const mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  const db = mongoClient.db(dbName);
  return db;
}

const fs = require('fs');

// Read the SSL certificate and private key files
const sslCert = fs.readFileSync('src/http_ca.crt');
// const sslKey = fs.readFileSync('path/to/private.key');

async function _connectToES(index) {
  const isNonProd = "prod";
  const esUri = process.env.ES_URI || "https://localhost:9200";
 	esClient = new Client({
    node: esUri,
    sniffOnStart: false,
    ssl: {
		ca: sslCert,
      	rejectUnauthorized: false,
    },
  });
  
  try {
    if (false) {
      const indexFound = await client.indices.exists({
        index,
      });

      if (indexFound.body === true) {
        return client;
      }
    } else {
      await _createIndex(index);
      await _putSettings(index);
      await _putMapping(index);
      return esClient;
    }
  } catch (ex) {
    console.error("Error connecting to ES:", ex);
    throw ex; // Rethrow the exception to handle it in the caller
  }
}

async function _createIndex(index) {
	console.log(esClient, "client")
  try {
    await esClient.indices.create({
      index,
      body: {
        settings: {
          index: {
            number_of_replicas: 0,
          },
        },
      },
    });
  } catch (ex) {
    console.error("Error creating index:", ex);
    throw ex;
  }
}

async function _putSettings(index, settings = defaultElasticSettings) {
  try {
    await esClient.indices.putSettings({
      index,
      body: {
        settings,
      },
    });
  } catch (ex) {
    console.error("Error putting settings:", ex);
    throw ex;
  }
}

async function _putMapping(index, properties = movieMappings) {
  try {
    await esClient.indices.putMapping({
      index,
      body: {
        properties,
      },
    });
  } catch (ex) {
    console.error("Error putting mapping:", ex);
    throw ex;
  }
}

// Other functions remain unchanged...

async function sync() {
  try {
    const searchIndex = "users";
    const db = await _connectToMongo();
    await _connectToES(searchIndex);
    const lastDocId = await _getLastDocFromES(searchIndex);
    await _fetchFromMongodb(db, lastDocId, searchIndex);
  } catch (ex) {
    console.error("EXCEPTION:", ex);
    process.exit(1);
  }
}

sync();
