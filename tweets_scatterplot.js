d3.json("tweets.json", function(error,data) {dataViz(data.tweets)});

function dataViz(incomingData) {
	
	//Create a new attribute based on the number of tweets
	incomingData.forEach(function (el) {
		el.impact = el.favorites.length + el.retweets.length;
		//Transform the ISO date into a data type
		el.tweetTime = new Date(el.timestamp);
	})
	
	//Define max function according to impact
	var maxImpact = d3.max(incomingData, function (el) {
		return el.impact;}
	);

	//Return earliest and latest tweets in an array
	var startEnd = d3.extent(incomingData, function (el) {
		return el.tweetTime;}
	);
	
	//Define time scale / x (for v4)
	var timeRamp = d3.scaleTime().domain(startEnd).range([20,480]);
	
	//Define y scale (for v4)
	var yScale = d3.scaleLinear().domain([0, maxImpact]).range([0,460]);
	
	//Define radius scale (for v4)
	var radiusScale = d3.scaleLinear().domain([0, maxImpact]).range([1,20]);
	
	//Define color scale (for v4) - from white to red
	var colorScale = d3.scaleLinear().domain([0, maxImpact]).range(["white","#990000"]);
	
	//d3.select("svg")
	//	.attr("style", "height: 480px; width: 600px;");
	
	// Tweets are represented as cirles sized by the total number of favs and rts, and 
	// placed on the canvas along the x axis based on the time of the tweet and along the 
	// y axis according to the same impact factor used for the size of the circles
	d3.select("svg")
		.selectAll("circle")
		.data(incomingData)
		.enter()
		.append("circle")
		.attr("r", function (d) {return radiusScale(d.impact);})
		.attr("cx", function (d,i) {return timeRamp(d.tweetTime);})
		.attr("cy", function (d) {return 480 - yScale(d.impact);})
		.style("fill", function (d) {return colorScale(d.impact);})
		.style("stroke", "black")
		.style("stroke-width", "1px");
	
	// SVG Transform Attribute applies a list of transformations to an element and it's children.
	var tweetG = d3.select("svg")
		.selectAll("g")
		.data(incomingData)
		.enter()
		.append("g")
		.attr("transform", function(d) {
			return "translate(" + 
			timeRamp(d.tweetTime) + "," + (480 - yScale(d.impact))
			+ ")"
		});
	
	//This is basically overwitting the filling previous values
	tweetG.append("circle")
		.attr("r", function (d) {return radiusScale(d.impact);})
		.style("fill", "#990000")
		.style("stroke", "black")
		.style("stroke-width", "1px");
	
	tweetG.append("text")
		.text(function (d) {return d.user + "-" + d.tweetTime.getHours();});

}