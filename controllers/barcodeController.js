const {models} = require('../database/db')

exports.getProducts = async (req, res, next) =>{
    try {
        const barcodeNumber = req.params.barcodeNumber
        if (!barcodeNumber){
            return next(new Error('No barcode'))
        }
        const products = await models.products.findAll({
            include: [{
                model: models.barcode, as: 'barcodes', required: true, where: {
                    barcodeNumber
                }
            }]
        })
        return res.status(200).json({success: true, message:'Querry successfull', data: {products}})
    }
    catch (e){
        console.log(e)
        next(new Error(e))
    }
}

exports.postProduct = async (req, res, next) => {
    try{
        console.log(req.body)
        if (!req.body.productName || !req.body.barcodeNumber){
            return next(new Error("Couldn't find productName or barcodeNumber"))
        }
        const productName = req.body.productName.trim()
        const barcodeNumber = req.body.barcodeNumber.trim()

        if (!productName || !barcodeNumber){
            return next(new Error("Couldn't find product information"))
        }

        let product = await models.products.findOne({productName})
        if (!product) {
            product = await models.products.create({productName}) 
        }

        const barcode = await models.barcode.create({idProduct: product.idProduct, barcodeNumber})

        return res.status(200).json({success: true, message:'Insert successfull', data: {barcode}})

    } catch (e) {
        console.log(e)
        return next(new Error(e))
    }

}