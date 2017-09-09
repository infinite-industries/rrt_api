# Proposed Flow

1. *Get Random Artwork* Client makes an API call for an artwork ID. Unique ID is returned, client can check if the artwork has been shown already. If not, make another query for artwork by ID and proceed to show to user.

2. *Event Announcement* Client makes an API call for art event by {country, state, city, neighborhood, date-range} if specific scope yelds results an array of one to n members is returned.  

## TODO

+ implement alert messages


# Dependencies
+ MongoDB

# Seeding Dev
Note: Most seeds are still incomplete <br />
install https://www.npmjs.com/package/node-mongo-seeds <br />
mv to project dir <br />
run *seed*

# API

## Dev API Key
3b7344a8-29aa-4690-8ea7-415612d8834d <br />

Note: currently API key and corresponding middleware are omitted from this project

### Get Artwork info by ID
curl -H "Content-Type: application/json" -X POST -d '{"artwork_id":"cc432195-2a2c-49e4-9a55-32d9f10dcc97"}' http://localhost:3003/artworks/one-by-id
<p> or </p>
curl -H "Content-Type: application/json" -X POST -d '{"artwork_id":"cc432195-2a2c-49e4-9a55-32d9f10dcc97"}' https://test3.infinite.industries/artworks/one-by-id


### Get Event info by ID

### Get Random Artwork ID
### Register webhook
### Create a new event
