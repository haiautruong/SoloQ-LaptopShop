class ProductController{

    detail(req,res){
        let product = res.app.productModel;
        let category = res.app.categoryModel;
        let vm = null;

        let item = product.getOneProduct(req.query.id);
        let allCategories = category.getAllCategories();

        Promise.all([item, allCategories]).then(([pro, listCate]) => {
            console.log("product", pro);
            vm = {
                product: pro,
                listAllCategories: listCate
            }
            
            res.render("product/detail", vm);
        });
       
    }

    gamer(req,res){
        let product = res.app.productModel;
        let category = res.app.categoryModel;
        let vm = null;

        let allCategories = category.getAllCategories();
        Promise.all([allCategories]).then(([listCate]) => {
            vm = {
                listAllCategories: listCate
            }
            res.render("product/gamer", vm);
        });

        
    }
}

module.exports = ProductController;