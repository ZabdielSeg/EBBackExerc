const router = require('express').Router();
const mongoose = require('mongoose');

// const Product = require('route to Model')

router.get('/search', (req, res, next) => {
    const { productToSearch } = req.query;

    //Simulando hacer una consulta 
    Product.find()
        .then(allProducts => allProducts.filter(product => product.name.toLowerCase().includes(productToSearch.toLowerCase())))
        .then(matchedProducts => {
            if (matchedProducts.length >= 1) {
                Product.find({ location: matchedProducts[0].category })
                    .then(suggestions => {
                        let allSuggestions = suggestions;
                        if (suggestions.length >= 3) {
                            allSuggestions = suggestions.slice(0, 2);
                        }
                        res.status(200).json({ products: matchedProducts, suggestions: allSuggestions });
                    })
                    .catch(err => console.log(err));
            } else {
                res.status(404).json({ message: 'Probablemente no tenemos ese producto' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Sorry, something went wrong' });
        });
});

module.exports = router;