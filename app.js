const cors = require("cors")
const express = require("express")
const { middleware } = require("supertokens-node/framework/express")

const supertokens = require("supertokens-node")
const Session = require("supertokens-node/recipe/session")
const Dashboard = require("supertokens-node/recipe/dashboard")
const UserRoles = require("supertokens-node/recipe/userroles")
const EmailPassword = require("supertokens-node/recipe/emailpassword")

const app = express()
const port = 3000

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://try.supertokens.com",
    apiKey: "98xVKqofZ7JjV4nCTRf7Lg7pddY4r73N9Y66X854",
  },
  appInfo: {
    appName: "Test App",
    apiDomain: "http://localhost:8000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init(), Dashboard.init(), UserRoles.init()],
})

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
)

app.use(middleware())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
