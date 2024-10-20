const express = require('express')
const router = express.Router()
const MenuItem = require('../models/menuItem'); 
router.post('/menu', async (req, res) => {
    try {
        const data = req.body;  // Get the data from request body
        const newMenu = new MenuItem(data);  // Create a new person object

        // Save the new person to the database
        const response = await newMenu.save();
        console.log('Data Saved ');
        res.status(200).json(response);  // Send back the saved person data
    } catch (err) {
        console.log(err);  // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });  // Send error response
    }
});

router.get('/menu', async (req,res) =>{
    try{
        const data = await MenuItem.find()
        console.log('data fetched');
        res.status(200).json(data)
    }catch(err){
        console.log(err);  // Log the error for debugging
        res.status(500).json
    }
})



router.get('/menu/:tasteType', async(req,res) =>{
    try {
        const tasteType = req.params.tasteType //extract the work type from the url parameter
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){

            const response = await MenuItem.find({taste: tasteType})
            //work because we defined work in opur person schema
            console.log('response fetched')
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid Taste type '})
        }
    } catch (error) {
        console.log(err);  // Log the error for debugging
        res.status(500).json
    }
})


//update the menu
router.put('/menu/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const updatedMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(response);

    } catch (err) {
        console.error('Update Error:', err);  // Log detailed error information
        res.status(500).json({ error: 'An error occurred while updating the person', 
            details: err.message });
    }
});


module.exports = router