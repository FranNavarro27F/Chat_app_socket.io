import express from "express";

const router= express.Router();

router.get('/', (req, res) => {
    let testUser= {
        name: "Francisco",
        last_name: "Navarro"
    }
    try {
        res.render('index', testUser);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.get('/foods', (req, res) => {

    const foods= [
        {name: 'Manzana', price: 15},
        {name: 'carne', price: 10},
        {name: 'pollo', price: 25},
        {name: 'banana', price: 35},
        {name: 'lechuga', price: 5}
    ];

    const user= {
        firstName: 'María',
        LastName: 'Doe',
        role: 'admin'
    };

    // const isAdmin= {
    //     isAdmin: user.role === 'admin'
    // }

    res.render('foods', {
        foods,
        user,
        isAdmin: user.role === 'admin',
        style: "index.css"
})
});

export default router;