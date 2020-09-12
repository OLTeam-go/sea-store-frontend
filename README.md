
# Simple Marketplace

  

A project in the form of a simple marketplace to implement microservices, CI/CD, and Docker. Three types of users are in this marketplace:

- Customer: the user who buys something from merchants

- Merchant: the user who sells something

- Admin: the user who controls the whole activities in the marketplace

  

The production site is available here: https://sea-store-frontend-production.herokuapp.com

  

To run this app locally:

- Navigate to the `sea-store-frontend` folder

- Run `npm install`

- Navigate to the `client` (`/sea-store-frontend/client`) folder

- Run `npm install`

- Run `npm run start`

- Go to `localhost:3000` on a browser

You will see this screen:

![Login Screen](https://i.imgur.com/4QRGO5T.png)

  

## Customer

![Customer Profile Update Screen](https://i.imgur.com/Gae28jM.png)

Customers in this app can do the following:

  

### Register and Login

  

To register, a customer needs to choose the user type "Customer" and supply the following information: username, email, name, gender, and password. To log in, a customer needs to supply only a username and password. Upon registering, the customer's profile will be filled out with the information provided in the register form.

  

### Add a Product to the Cart

  

To add a product to cart, a customer can click on the "add to cart" button visible on the home page and the merchant profile page; both pages show a list of products. The list of products shows information related to the product for sale.


### View Merchant's Profile

To view a merchant's profile, a customer can click on the merchant's name on the home screen visible when they are selling a product. When the customer click on the merchant's name, the customer will be redirected to the merchant's profile screen where he/she can see all the products the merchant is selling.

  

### Update the Profile's Information

  

To update the profile information, a customer can simply go to the profile page and supply the updated information.

  

### View the Cart

  

To view the cart, a customer can redirect to the cart page. When viewing a cart, a customer can also opt to remove the item previously added to the cart.

  

### Make a Payment

  

To make a payment, a customer must have a cart with at least one product. Then, on the cart page, a customer can make payment by supplying the bank name and the bank account number.

  

### View Transactions

  

After making a payment, a customer will receive a new transaction record. The transaction record is visible on the transaction page. Transactions for customers have three statuses:

* Pending: awaiting transaction approval from the admin

* Accepted: transaction has been approved by the admin

* Rejected: transaction has been rejected by the admin

  

### Logout

  

A customer can logout.

  

## Merchant

![Merchant's Home Screen](https://i.imgur.com/RsZGv2k.png)

Merchants in this app can do the following:

  

### Register and Login

  

Registering and logging in as a merchant is [the same as registering and logging in as a customer](#register-and-login). The only differences are:

- A merchant needs to choose the user type "Merchant".

- A merchant needs registration approval from the admin before he/she is able to log in

  

#Add, Edit, and Delete a Product

  

A merchant can add, edit, and delete a product from the home screen. To add or edit a product, a merchant needs to supply the following information: name, price, quantity, description, and category. When a product's quantity reaches 0, "out of stock" will be displayed as that product's quantity.

  
  

### Update the Profile's Information

  

Updating the profile's information as a merchant works [the same way as updating the profile's information as a customer](#update-the-profiles-information).

  

### View Wallet

  

Merchants can see their wallet balance on the wallet screen. Additionally, when the transfers to their wallets happen is also visible on the same screen.

  

### View Request

  

Merchants can view the order requests from customers after receiving transaction approval from the admin.

  

### Logout

  

A merchant can logout.

  

## Admin

![Admin's Home Screen](https://imgur.com/esF9J43.png)

Admins in this app can do the following:

  

### Register and Login

  

To register and login, the admin needs to supply [the same information as a customer or a merchant](#register-and-login). However, there are two differences:

- The admin has to provide the admin token that is valid in the database

- The admin has to choose the user type "Admin"

  

### Accept or Reject Merchants' Registration Requests

  

An admin can either accept or reject a merchant's registration request. When the admin accepts the registration request, the merchant will be able to log in to his/her account. However, when the admin rejects the registration request, the account of the merchant will be deleted.

  

### Accept or Reject Transactions

  

An admin can either accept or reject a transaction made by the customer as he/she deems fit. Upon accepting a transaction, the transaction status visible on the customer side will be changed to "Accepted"; at the same time, a new order request and a new wallet transfer record will be visible on the merchant side. Upon rejecting a transaction, the transaction status visible on the customer side will be changed to "Rejected"; on the other hand, the merchant will not receive any notification.

  

### Logout

  

An admin can logout
