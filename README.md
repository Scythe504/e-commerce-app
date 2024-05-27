**-------------------------------------------------------------------------------------------------------------------------**
# Live_URL - https://scythe-s-neo-com.vercel.app
# About Project
## This is an e-commerce fullstack app i have built, with NextJs(Typescript), where user's can sell and buy others product(No real transactions). This is my first ever full stack project i have built by myself.

# Features
- Typescript - The project is entirely built with typescript.
- OAuth & Authentication - The project uses AuthJs Library(Next Auth v5) for authentication.
- ORM - The project uses Prisma ORM with PostgreSQL for the database.
- Password Hashing - The project hashes the password using bcryptjs and stores the password in the database.
- Image Upload For Products sold on the App - The project uses Uploadthing for uploading and storing images for the products.
- The app has multiple endpoints:-
  - /item - ``Fetches all the items uploaded by the users``
  - /item/* - ``Fetches the item with the specific item id from the database,  with reviews from other users, etc``
  - /merchant/add-items - ``This endpoint can be used to Publish products with, Product's Title, Product's Description, and its price, as well as the image of the product``
  - /cart - ``This endpoint fetches all the items which are being sold on the app, that has been add to the users cart``
  - /checkout - ``This endpoint is for the final payment for all the cumulative items which are stored in the user's cart``
  - /purchase - ``This endpoint fetches all the successfull payment which has been purchased and displays it in a structured table with the date of purchase, invoice id etc``

  
**This project is my first project hence it is very scrappy**
# Playing around
## You can explore the app very easily, you just have to login via email and password, or via Google Login, even if you use your real password it will be hashed and will not be visible to me.
## For the ``/checkout`` endpoint you can put any credentials in it for all of them except the card number and cvv they have to be 16 digits and 3 digits number respectively, your data will not be stored in database. The payment form is just for visual appearance.
**-------------------------------------------------------------------------------------------------------------------------**
