var express = require('express');
	app = express();
	request = require('request');
	bodyParser = require('body-parser');
	sanitizer = require('express-sanitizer');
	mongoose = require('mongoose');
	methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(sanitizer());
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/yelpcamp', {useNewUrlParser: true});

var campSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Camp = mongoose.model('Camp', campSchema);

// Root route
app.get('/', function(req, res) {
	res.render('home');
});

// Show all campgrounds
app.get('/campgrounds', function(req, res) {

	Camp.find({}, function(err, camps) {
		if(err) {
			console.log('Error');
			console.log(err);
		} else {
			res.render('index', {campgrounds: camps});
		}
	});
	
});

// Show form to create new campgrounds
app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

// Show form to update campgrounds
app.get('/campgrounds/:campId/edit', function(req, res) {
	var campId = req.params.campId;
	Camp.findOne({_id: campId}, function(err, camp) {

		if(err) {
			console.log(err);
		} else {
			res.render('edit', {campground: camp});
		}

	});
	
});

// Show individual campground information
app.get('/campgrounds/:id', function(req, res) {
	var campId = req.params.id;

	Camp.findOne({_id: campId}, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.render('show', {campground: camp});
		}
	});
});

// Add new campground
app.post('/campgrounds', function(req, res) {
	var campName = req.body.name;
		campImage = req.body.image;
		campDesc = req.sanitize(req.body.desc);

	Camp.create({
		name: campName,
		image: campImage,
		description: campDesc 
	}, function(err, camp) {
		if(err) {
			console.log('Error');
			console.log(err);
		} 
	});

	res.redirect('/campgrounds');
});

//Update existing campground
app.put('/campgrounds/:id', function(req, res) {
	var campId = req.params.id;
		campName = req.body.name;
		campImage = req.body.image;
		campDesc = req.sanitize(req.body.desc);

	Camp.findOneAndUpdate({_id: campId}, {$set: {
		name: campName, image: campImage, description: campDesc
	}}, function(err, camp) {

		if(err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

// Delete campground
app.delete('/campgrounds/:id', function(req, res) {
	var campId = req.params.id;

	Camp.findOneAndDelete({_id: campId}, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

// Start server
app.listen(3000, function() {
	console.log('Server started');
});