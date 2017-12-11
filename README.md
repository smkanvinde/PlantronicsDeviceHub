# Plantronics Device Hub: Setup Instructions

## Client Application:

(write instructions for Client application here. Include installing Electron, changing the public DNS address of the server in the application, then rebuilding the executable.)
1. Install Electron by....
2. Go through the code in Client/Software and change all instances of ```ec2-18-221-169-223.us-east-2.compute.amazonaws.com``` to the public DNS address of your server.
3. Generate an executable by...
4. Launch the program by...

## Server Application:
1. Secure an online server. We used an Amazon Web Services virtual machine running Ubuntu 16.04 Server.
2. On your virtual machine, install MySQL, MongoDB, npm, nodejs, and nodemon.
3. Set up a MySQL database named "devicehub" with a table named "hub". Create a MySQL user and a password, and grant the user full permissions over "devicehub". 
4. In the ```scripts/``` folder, in ```reset-sql.py```, change 'ubuntu' to your MySQL username and 'utsd4' to your MySQL password, then run the script.
5. On your virtual machine, start a Cron job that runs once per minute that runs the script ```scripts/mongo-export.sh```.
6. cd to NodeREST/ and run ```nodemon server.js```.
7. In another terminal, cd to server-ui/ and run ```npm start```.
8. In a browser, navigate to ```[your-server's-public-dns-address]:3000/api/products``` to see the contents of your products collection.
9. In a browser, navigate to ```[your-server's-public-dns-address]:3000/userApi/users``` to see your user database.
10. In a browser, navigate to ```[your-server's-public-dns-address]:5000``` to see the server UI. It has links to take you to the Device List and Edit pages for individual devices.
