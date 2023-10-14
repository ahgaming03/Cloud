const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Dashboard" });
});

router.get("/blank", (req, res) => {
    res.render("blank", { title: "Blank page" });
});

router.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});


module.exports = router;