const FEED_URL = '/feed.json'; // Your JSON feed endpoint
const DB_NAME = 'notificationsDB2';
const STORE_NAME = 'notifiedItems';

self.addEventListener('message', (event) => {
  console.log('Received message in service worker:', event.data);
  if (event.data.action === 'checkForNewItems') {
    event.waitUntil(checkForNewFeedItems());
  }
});

// Fetch feed and check for new notifications
async function checkForNewFeedItems() {
    try {
        const response = await fetch(FEED_URL);
        const json = await response.json(); // Parse JSON directly

        const items = json.items; // Adjust based on your JSON structure
        const notifiedItems = await getNotifiedItems();

        // Get the current date and calculate the date one month ago
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract one month

        for (const item of items) {
            console.log(item)
            const { title, summary, guid, url, date_published } = item;
            const date = new Date(date_published); // Assuming item.date is the date property

            // Check if the item date is within the last month
            if (date >= oneMonthAgo) {
                if (!notifiedItems.includes(guid)) {
                    // Notify the user
                    await self.registration.showNotification(title, { body: summary, data: { url } });

                    // Store notified item
                    await storeNotifiedItem(guid);
                }
            }
        }
    } catch (error) {
        console.error('Failed to fetch feed:', error);
    }
}

// Open IndexedDB and get notified items
async function getNotifiedItems() {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.getAll();

        request.onsuccess = (event) => {
            const items = event.target.result;
            resolve(Array.isArray(items) ? items.map(item => item.guid) : []);
        };

        request.onerror = (event) => {
            console.error('Error fetching notified items:', event.target.error);
            reject(event.target.error);
        };
    });
}

// Store notified item in IndexedDB
async function storeNotifiedItem(guid) {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await store.put({ guid });
}

// Open the IndexedDB
async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(STORE_NAME, { keyPath: 'guid' });
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log(event)
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
