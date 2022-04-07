require('../models/database');
const Category = require('../models/Category');
const Details = require('../models/Details');



/**
 * GET/
 * Homepage
 */
exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Details.find({}).sort({_id: -1}).limit(limitNumber);

        const products = {latest};

        res.render('index', { title: 'Bat Dong San - Trang Chu', categories, products });
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * GET/categories
 * Categories
 */
 exports.exploreCategories = async(req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Bat Dong San - Phan loai khu vuc', categories });
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * GET/categories/:id
 * Categories By ID
 */
 exports.exploreCategoriesByID = async(req, res) => {
    try {
        let catogoryID = req.params.id;
        const limitNumber = 5;
        const categoryByID = await Details.find({'category': catogoryID}).limit(limitNumber);
        res.render('categories', { title: 'Bat Dong San - Phan loai khu vuc', categoryByID });
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * GET/details/:id
 * Details
 */
 exports.exploreDetails = async(req, res) => {
    try {
        let detailsID = req.params.id;
        const details = await Details.findById(detailsID);

        res.render('details', { title: 'Bat Dong San - Khu vuc', details});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * POST/search
 * Search
 */
 exports.searchRealEstate = async(req, res) => {

    //searchTerm
    try {
        let searchTerm = req.body.searchTerm;
        let details = await Details.find( { $text: { $search: searchTerm, $diacriticSensitive: true} });
        res.render('search', { title: 'Bat Dong San - Tim kiem', details} );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }  
  }


  /**
 * GET/ submit-details
 * Submit
 */
exports.submitDetails = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-details', { title: 'Bat Dong San - Cung cap thong tin', infoErrorsObj, infoSubmitObj} );
}

  /**
 * POST/ submit-details
 * Submit
 */
exports.submitDetailsOnPost = async(req, res) => { 

    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0) {
            console.log('No Files where uploaded');
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.satus(500).send(err);
            })
        }




        const newDetails = new Details({
            name : req.body.name,
            description: req.body.description,
            phone: req.body.phone,
            category: req.body.category,
            image: newImageName
        });
        await newDetails.save();

        req.flash('infoSubmit', 'Infomation has been added.');
        res.redirect('/submit-details');
    } catch (error) {
        //res.json(error);
        req.flash('infoErrors', error);
        res.redirect('/submit-details');
    }
}

async function deleteDetails() {
    try {
      await Details.deleteOne({name: 'New Details From Form'});
    } catch (error) {
        console.log(error);
    }
}
deleteDetails(); 

async function updateDetails() {
    try {
        const res = await Details.updateOne({ name: 'New Details'}, {name: 'New Details Updated'});
        res.n;
        res.nModified;
    } catch (error) {
        console.log(error);
    }
}
updateDetails(); 





















































































/*async function insertDymmyDetailsData() {
    try {
        await Details.insertMany([
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 2",
                "image": "quan2.png"
            },
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 3",
                "image": "quan3.jpg"
            },
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 4",
                "image": "quan4.jpg"
            },
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 5",
                "image": "quan5.jpg"
            },
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 6",
                "image": "quan6.jpg"
            },
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 2",
                "image": "quan7.jpg"
            },
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 5",
                "image": "quan3.jpg"
            },
            {
                "name": "Khu du lich sinh thai",
                "description": "Dien tich 300*400m2 - Gan khu can Sai Gon - Ke khu trung tam mua sam",
                "phone": "0909718532",
                "category": "Quan 2",
                "image": "quan6.jpg"
            },
           
        ]);
    } catch (error) {
        console.log('err', + error)
    }
}

insertDymmyDetailsData(); */

/*async function insertDymmyCategoryData() {
    
    try {
        await Category.insertMany([
            {
                "name": "Quan 2",
                "image": "quan2.png"
            },
            {
                "name": "Quan 3",
                "image": "quan7.jpg"
            },
            {
                "name": "Quan 4",
                "image": "quan2.png"
            },
            {
                "name": "Quan 5",
                "image": "quan7.jpg"
            },
            {
                "name": "Quan 6",
                "image": "quan2.png"
            },
            {
                "name": "Quan 7",
                "image": "quan7.jpg"
            }
        ]);
    } catch (error) {
        console.log('err', + error)
    }
}

insertDymmyCategoryData(); */