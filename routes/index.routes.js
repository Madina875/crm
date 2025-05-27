const stageRouter = require("./stage.routes");
const statusRouter = require("./status.routes");
const branchRouter = require("./branch.routes");
const roleRouter = require("./role.routes");
const reasonRouter = require("./reason.routes");
const groupRouter = require("./group.routes");
const deviceRouter = require("./device.routes");
const lidRouter = require("./lid.routes");
const paymentRouter = require("./payment.routes");
const studentsRouter = require("./students.routes");
const lessonsRouter = require("./lesson.routes");
const students_groupRouter = require("./students_group.routes");
const students_lessonsRouter = require("./students_lesson.routes");
const otpRouter = require("./otp.routes");
const stuffRouter = require("./stuff.routes");
const groupStuffRouter = require("./group_stuff.routes");
const stuffRoleRouter = require("./stuff_role.routes");

const router = require("express").Router();

router.use("/stage", stageRouter);
router.use("/branch", branchRouter);
router.use("/role", roleRouter);
router.use("/reason", reasonRouter);
router.use("/status", statusRouter);
router.use("/group", groupRouter);
router.use("/device", deviceRouter);
router.use("/lid", lidRouter);
router.use("/payment", paymentRouter);
router.use("/students", studentsRouter);
router.use("/studentsl", students_lessonsRouter);
router.use("/studentsg", students_groupRouter);
router.use("/lessons", lessonsRouter);
router.use("/otp", otpRouter);
router.use("/stuff", stuffRouter);
router.use("/stuffr", stuffRoleRouter);
router.use("/gstuff", groupStuffRouter);

module.exports = router;
