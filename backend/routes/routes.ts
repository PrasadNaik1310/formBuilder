import { Router } from "express";
import { listBases, listTables, listFields } from "../handlers/airTable";

const router = Router();

router.get("/airtable/bases", listBases);
router.get("/airtable/tables", listTables); // expects ?baseId=
router.get("/airtable/fields", listFields); // expects ?baseId=&tableId=

export default router;
