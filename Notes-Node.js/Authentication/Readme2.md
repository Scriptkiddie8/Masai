Authorization
Live Coding Notes
🔍 Learning Objectives
Understand the difference between Authentication and Authorization
Learn about Role-Based Access Control (RBAC) and how to implement it
Explore how Third-Party Authentication (OAuth) works and is integrated
Understand the Access & Refresh Token mechanism for improved security and user experience
🔐 Authentication vs. Authorization
Feature Authentication Authorization
What it does Verifies who the user is Determines what the user can do
When it happens First step After authentication
Example Login with username & password Checking if the user is an admin before allowing access to delete a resource
🎭 Why Authorization is Needed
Imagine an LMS like Masai:

Everyone is a "user" — but not all users can perform the same actions.
Student Role: Can attend lectures, submit assignments
Admin Role: Can create lectures, assign homework, manage users
RBAC helps define who can do what and limits access based on roles, not individuals.
Benefits of RBAC:

🔐 Enhanced security
🧹 Cleaner permission management
⚖️ Easily scalable for growing systems
🔧 Basic RBAC Implementation in Node.js

1. Store role information with the user:

// When registering user
{
email: 'user@example.com',
password: 'hashed_password',
role: 'student' // or 'admin'
} 2. Include role in the JWT token during login:

const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
expiresIn: "20m",
}); 3. Middleware to authorize roles:

const authorizeRoles = (...roles) => {
return (req, res, next) => {
if (!roles.includes(req.user.role)) {
return res.status(403).json({ msg: "Access Denied" });
}
next();
};
};

// Usage in routes:
router.post(
"/create-lecture",
authenticate,
authorizeRoles("admin"),
createLectureHandler
);
⏰ Token Expiry (Why and How?)
Why expire tokens? To ensure that if a token is stolen, it can’t be used forever.

Used in:

Banking apps
Government portals
Secure web services
jwt.sign(payload, secret, { expiresIn: "10m" });
🔁 Downside: Repeated login prompts — which leads to the need for refresh tokens (covered later if time permits).

🌐 Third-Party Authentication (OAuth)
OAuth

What Is Third-Party Authentication?
Instead of building and managing your own login system, you integrate authentication APIs provided by major platforms like:

Google
Facebook
GitHub
Twitter, and others
These companies act as Identity Providers.

Your system redirects the user to the provider.
The provider authenticates the user.
Upon success, the provider sends your system a token (usually via OAuth or OpenID Connect) confirming the user's identity.
You then allow access based on that confirmation.
Why Use It?
🌟 Better UX — users can sign in using Google, GitHub, Facebook
🔒 Improved security — no password storage in your DB
🧹 Simplified backend — rely on providers like Google/GitHub to verify identity
💡 How OAuth Works
OAuth Flow

Flow:

User clicks "Login with GitHub"

Redirected to GitHub login

GitHub verifies credentials

Redirects back to your app with a temporary token

You use that token to:

Get user’s basic profile (name, email)
Create a local session or your own JWT
🛠️ GitHub OAuth Implementation (Using Passport.js)
Steps:
Install Dependencies:
npm install passport passport-github2 express-session
Register App on GitHub:
Go to GitHub Developer Settings
Get Client ID and Client Secret
Configure Passport:
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
new GitHubStrategy(
{
clientID: GITHUB_CLIENT_ID,
clientSecret: GITHUB_CLIENT_SECRET,
callbackURL: "/auth/github/callback",
},
(accessToken, refreshToken, profile, done) => {
// Save or find user in your DB
return done(null, profile);
}
)
);
Auth Routes:
app.get(
"/auth/github",
passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
"/auth/github/callback",
passport.authenticate("github", { failureRedirect: "/" }),
(req, res) => {
// Successful login
res.redirect("/dashboard");
}
);
🔁 Access Token vs Refresh Token (If Covered)
Used to keep users logged in securely without asking them to re-authenticate frequently.

Token Type Validity Purpose
Access Token Short (e.g., 10 mins) Grants access to protected routes
Refresh Token Long (e.g., 30–40 mins) Used to get a new access token without login
🔄 Example Flow:
User logs in

Server sends:

Access Token (10 mins)
Refresh Token (40 mins)
After 10 mins, frontend silently sends refresh token to get a new access token.

After 40 mins, refresh token expires → login required again.

Access vs Refresh

🔐 Key Concepts Recap
Authentication = Who are you?
Authorization = What are you allowed to do?
RBAC = Manage what users can do based on roles
OAuth = Login using third-party providers (GitHub, Google)
Access & Refresh Tokens = Maintain session security while improving user experience
⚠️ Common Pitfalls
🔁 Forgetting that RBAC should come after token validation
🔐 Misconfiguring OAuth callback or missing clientSecret
🤯 Confusing why we need two tokens (Access + Refresh)
Conclusion
In any secure application:

Authentication verifies who the user is
Authorization checks what that user is allowed to do
RBAC allows for scalable and maintainable permission control
Third-party OAuth enhances user experience and reduces security risks
Access & Refresh Tokens balance security and usability for session handling
