const express = require('express');
const { getPlaylistDataAPI, getPlaylistInfoAPI, getVideoDurationAPI } = require('../services/api');
const router = express.Router();

router.get('/',(req,res) => {
        res.render("index",{duration : null,error : 0});

});
router.post('/',async (req,res) => {
    var search_string = req.body.search_string.split('?list=')[1];
    if (!search_string){
        res.render("index",
        {duration : null,error : 1}
        )
    }
    else{
    var videos_Ids = await getPlaylistDataAPI(search_string);
    var duration = await getVideoDurationAPI(videos_Ids);
    res.render("index",
        {duration : duration,error : 0}
        )}
});

module.exports = router;