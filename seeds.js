var mongoose 	= require('mongoose');
	Camp		= require('./models/camp.js');	
	Comment		= require('./models/comment.js');

var data = [
				{
					name: 'Camp Rock',
					image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-0.3.5&s=b2ff98e46a093cc975556c9e95d6e182&auto=format&fit=crop&w=750&q=80',
					description: 'Random description of camp'
				},
				{
					name: 'Jack Rock',
					image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-0.3.5&s=b2ff98e46a093cc975556c9e95d6e182&auto=format&fit=crop&w=750&q=80',
					description: 'Random description of jack rock camp'
				},
				{
					name: 'Red Crystal',
					image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-0.3.5&s=b2ff98e46a093cc975556c9e95d6e182&auto=format&fit=crop&w=750&q=80',
					description: 'Random description of red crystal camp'
				}
			]

function seedDB() {

	Camp.deleteMany({}, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			data.forEach(function(data) {
				Camp.create(data, function(err, camp) {
					if(err) {
						console.log(err);
					} else {
						Comment.create(
							{
								text: 'Random comment',
								author: 'Matt'
							}, function(err, comment) {
								if(err) {
									console.log(err);
								} else {
									camp.comments.push(comment);
									camp.save(function(err, camp) {
										if(err) {
											console.log(err);
										} else {
											console.log(camp);
										}
									});
								}
						});
					}				 
				});
			});
			
		}
	});

}

module.exports = seedDB;