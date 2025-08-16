"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStratagems = getAllStratagems;
exports.getStratagemById = getStratagemById;
exports.createStratagem = createStratagem;
exports.updateStratagem = updateStratagem;
exports.deleteStratagem = deleteStratagem;
exports.getDailyStratagem = getDailyStratagem;
const stratagem_service_1 = require("../services/stratagem.service");
async function getAllStratagems(req, res) {
    const stratagems = await stratagem_service_1.stratagemService.getAll();
    res.json(stratagems);
}
async function getStratagemById(req, res) {
    const { id } = req.params;
    const stratagem = await stratagem_service_1.stratagemService.getById(id);
    res.json(stratagem);
}
async function createStratagem(req, res) {
    const { name, code, category, enabled } = req.body;
    const stratagem = await stratagem_service_1.stratagemService.create({
        name,
        code,
        category,
        enabled,
    });
    res.json(stratagem);
}
async function updateStratagem(req, res) {
    const { id } = req.params;
    const { name, code, category, enabled } = req.body;
    const stratagem = await stratagem_service_1.stratagemService.update(id, {
        name,
        code,
        category,
        enabled,
    });
    res.json(stratagem);
}
async function deleteStratagem(req, res) {
    const { id } = req.params;
    await stratagem_service_1.stratagemService.delete(id);
    res.json({ message: 'Stratagem deleted successfully' });
}
async function getDailyStratagem(req, res) {
    const stratagem = await stratagem_service_1.stratagemService.getDaily();
    res.json(stratagem);
}
