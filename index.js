const { request, response } = require("express");
const express = require("express");

const OurAPP = express();

OurAPP.get("/", (request, response) => {
   response.json({ message: "Request Served!!!!!!"});
});

OurAPP.listen(4000, () => console.log("Server is running "));
