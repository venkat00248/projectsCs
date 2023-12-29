import { IDBPDatabase, openDB } from 'idb';            //IDBPObjectStore

class IndexedDbService {
    private database: string;
    private db: any;

    constructor(database: string) {
        this.database = database;
    }

    public async createObjectStore(tableNames: string[]) {
        try {
            if(this) {
                this.db = await openDB(this.database, 1, {
                    upgrade(db: IDBPDatabase) {
                        for (const tableName of tableNames) {
                            if (db.objectStoreNames.contains(tableName)) {
                                continue;
                            }
                            db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
                        }
                    },
                });
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    public async getValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        console.log('Get Data ', JSON.stringify(result));
        return result;
    }

    public async getAllValue(tableName: string) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.getAll();
        // console.log('Get All Data', JSON.stringify(result));
        return result;
    }

    public async putValue(tableName: string, value: object) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value);
        // console.log('Put Data ', JSON.stringify(result));
        return result;
    }

    public async putBulkValue(tableName: string, values: object[]) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        for (const value of values) {
            const result = await store.put(value);
            console.log('Put Bulk Data ', JSON.stringify(result));
        }
        return this.getAllValue(tableName);
    }

    public async deleteValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }

    public async deleteBulk(tableName: string, ids: number[]) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const deletedIds = [];
    
        for (const id of ids) {
            const result = await store.get(id);
            if (!result) {
                console.log('Id not found', id);
            } else {
                await store.delete(id);
                deletedIds.push(id);
            }
        }
        // console.log('Deleted Data', deletedIds);
        return deletedIds;
    }

    public async deleteAll(tableName: string) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const allKeys = await store.getAllKeys();
        await Promise.all(allKeys.map((key:any) => store.delete(key)));
        // console.log(`Deleted all records from ${tableName}`);
    }

    // public async observeStore(tableName: string, callback: (event: Event) => void): Promise<IDBPObjectStore | null> {
    //     if (!this.db) {
    //       return null;
    //     }
    //     const tx = this.db.transaction(tableName, 'readonly');
    //     const store = tx.objectStore(tableName);
      
    //     return new Promise<IDBPObjectStore>((resolve, reject) => {
    //       const cursorRequest = store.openCursor();
    //       cursorRequest.onerror = reject;
      
    //       cursorRequest.onsuccess = async () => {
    //         const cursor = cursorRequest.result;
    //         if (cursor) {
    //           // observe changes using the cursor
    //           callback(cursor);
    //           await cursor.continue();
    //         } else {
    //           // when cursor is null, the iteration is complete
    //           resolve(store);
    //         }
    //       };
    //     });
    //   }
      
}

export default IndexedDbService;