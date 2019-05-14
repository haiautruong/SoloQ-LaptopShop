class ProductController{

    detail(req,res){
        let product = res.app.productModel;
        let vm = null;

        let item = product.getOneProduct(req.query.id);
        console.log('product', item);
        Promise.all([item]).then(([pro]) => {
            console.log("promise", pro);
            vm = {
                product: pro
            }

            
            res.render("product/detail", vm);
        });
       
    }

    gamer(req,res){
        res.render("product/gamer");
    }
}

module.exports = ProductController;