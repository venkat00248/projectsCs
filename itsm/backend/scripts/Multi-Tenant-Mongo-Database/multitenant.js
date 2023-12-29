
/**
 * 
 * In this example, we define a Tenant schema with a name and databaseUrl field. The databaseUrl field  * will hold the URL to the MongoDB database for that specific tenant.

 * We also define functions for creating a new tenant, getting a tenant by name or ID, and getting all  * tenants. To connect to a tenant's database, we can call the connectToTenantDatabase function and      * pass in the tenant's databaseUrl.

 * We also define a connectToMasterDatabase function that can be used to connect to a separate master   * database. This master database can hold information about all tenants, such as their names and       * database URLs.

 * To use this multi-tenant database script, we would first connect to the master database using        * connectToMasterDatabase. Then, we could create new tenants using createTenant and retrieve tenant     * information using getTenantByName, getTenantById, or getAllTenants. Finally, to connect to a          * specific tenant's database, we would call connectToTenantDatabase with the tenant's databaseUrl.

 */

const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  databaseUrl: { type: String, required: true },
});

const Tenant = mongoose.model('Tenant', tenantSchema);

async function connectToTenantDatabase(databaseUrl) {
  return mongoose.createConnection(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function connectToMasterDatabase() {
  const masterDatabaseUrl = 'mongodb://localhost:27017/masterDatabase';
  // return mongoose.createConnection(masterDatabaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  return mongoose.connect(masterDatabaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function createTenant(name, databaseUrl) {
  const tenant = new Tenant({ name, databaseUrl });
  await tenant.save();
  return;
}

async function getTenantByName(name) {
  return Tenant.findOne({ name });
}

async function getTenantById(id) {
  return Tenant.findById(id);
}

async function getAllTenants() {
  return Tenant.find();
}

module.exports = {
  connectToTenantDatabase,
  connectToMasterDatabase,
  createTenant,
  getTenantByName,
  getTenantById,
  getAllTenants,
};


async function run() {
  try {
    console.log("inside run")
    await connectToMasterDatabase()
    await createTenant("T1", 'mongodb://localhost:27017/t1')
    await createTenant("T2", 'mongodb://localhost:27017/t2')
    // console.log(await getAllTenants())
    console.log("end of the program")
    process.exit(1)
  } catch (error) {
    console.log(error)
  }
  return;
}

process.on('exit', function() { 
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(1); 
});

try {
  run()  
} catch (error) {
  console.log(error)
}

