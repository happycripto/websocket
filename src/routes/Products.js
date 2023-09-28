import {Router} from "express";
import {productsModel} from "../models/ProductsModel.js";

const router = Router();

router.get('/', async (req ,res) =>{
    try {
        let users = await userModel.find();
        res.send({result: 'succes' , payload: users});
        } catch(error) {
            console.log('Error en conexion');
        }
});

router.post('/', async (req, res) => {
    let { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return res.send({ status: "error", error: "Incomplete values" });
    }
    let result = await productsModel.create({
        first_name,
        last_name,
        email
    });
    res.send({ status: "success", payload: result });
})



export default router;