
let cache_name = "restaurant_review_cache_v1";
let urlsToCache=  [
    '/',
    '/index.html',
    '/restaurant.html',
    '/restaurant.html?id=1',
    '/css/styles.css',
    '/js/main.js',
    'js/dbhelper.js',
    'js/restaurant_info.js',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'data/restaurants.json',

]

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
            console.log("Opened Cache");
            return cache.addAll(urlsToCache);
        }).catch(function(err) {
            console.log(err);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) {
                console.log(`found ${event.request} in cache`);
                return response;
            }

            let resquestClone = event.request.clone();

            return fetch(event.request).then(function(response) {

                if(!response || response.status !== 202 || response.type !== 'basic') {
                    return response;
                }

                let responseClone = response.clone();

                caches.open(cache_name)
                    .then(function(cache) {
                        cache.put(event.request, responseClone)
                    });
                    
                return response;
                
            })
        })
    );
}); 

