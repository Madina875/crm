const {
  add,
  getAll,
  getById,
  remove,
  update,
} = require("../controllers/lid.controller");

const router = require("express").Router();

router.post("/", add);
router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id", remove);
router.post("/:id", update);

module.exports = router;
