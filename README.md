# DevLink

A website where developers can connect to each other, share their profiles, work experience, knowledge and technologies.
Screen reader support enabled.

### Installation:

1. Fork the repository
2. Run the command 'npm i' to install all node modules(server)
3. Run the command 'cd client'
4. Run the command 'npm i' to install all node modules(client)
5. Run the command npm run dev
6. Check it on localhost:3000

### Dependencies:

![image](https://user-images.githubusercontent.com/59798672/146941895-2cde657e-e4a4-41eb-b589-70f7124d0cff.png)

![image](https://user-images.githubusercontent.com/59798672/146942036-a6618db6-df7e-4a6f-90c8-ddbb74a121ff.png)

### Technologies used:

1. We have the MERN architecture for developing the website.
2. MongoDB Atlas is used as a cloud database for the website.
3. App level state management is done by making use of redux which reduces complexity of state management.
4. For authentication, we have made use of jwt tokens which expire after a certain time.
5. githubclientId and githubSecret are used as a part of authorizing imports of github repositories in our website.

### Features:

1. Users can register, login on our website.
2. Users can add profile, edit profile, add/delete experience, add/delete education details.
3. Users (even if not signed in) can view other developers' profiles, their skill set, education and experience.
4. Users (if signed in) can view all other developers' posts and like/unlike them and also comment on them(discussion thread, most recent comment at the top).
5. Users can remove only their own posts and comments.

### References:

- Offical documentation for node, react, npm packages, jwt.
- Youtube
- MDN Docs
- Geeksforgeeks
- W3schools
- StackOverflow

### UI Screens:

#### 1. Signup Page:

![image](https://user-images.githubusercontent.com/59798672/146943766-db6ae521-394f-41ad-b7dc-a2495644494c.png)

#### 2. Signin Page:

![image](https://user-images.githubusercontent.com/59798672/146943846-e03a3c2b-d4ff-4f14-b403-e6ef473757e6.png)

#### 3. Create Profile Page:

![image](https://user-images.githubusercontent.com/59798672/146945864-110afc17-2d85-4f44-8ccd-53319a54b417.png)
![image](https://user-images.githubusercontent.com/59798672/146945900-16758cbd-c5c1-404c-8d64-d48e9b3e1518.png)

#### 4. Posts Page(All Posts):

![image](https://user-images.githubusercontent.com/59798672/146945980-bf2e0666-e1c7-4938-84a7-287be150e178.png)
![image](https://user-images.githubusercontent.com/59798672/146946016-05f10c21-fae5-4e8b-a299-8f00e0798a5f.png)

#### 5. Comments Page(Of a particular post):

![image](https://user-images.githubusercontent.com/59798672/146946082-e62b3b08-2db6-41d2-a344-bb94476a5e73.png)
![image](https://user-images.githubusercontent.com/59798672/146946109-7fd87e92-05a9-4076-a78c-f216bd04ad56.png)

#### 6. Add Experience Page(Add Education Page is similar hence not added):

![image](https://user-images.githubusercontent.com/59798672/146946379-b0f15bf7-7803-42ca-9e96-d0b607d8dba6.png)
![image](https://user-images.githubusercontent.com/59798672/146946423-b8bd11ea-8bb5-4fea-925e-ca24a8c67537.png)

#### 7. Dashboard:

![image](https://user-images.githubusercontent.com/59798672/146946865-cd9d80fb-9759-4720-901f-bc4cef2181c4.png)
![image](https://user-images.githubusercontent.com/59798672/146946894-f8a509b9-9458-4797-abc4-86168f6d5bf1.png)
