d3.json("tweets.json", function(error,data) {dataViz(data.tweets)});

function dataViz(incomingData) {
	
	//Gather tweets under author
	var nestedTweets = d3.nest()
		.key(function (el) {return el.user;})
		.entries(incomingData);				
	
	//Create a new attribute based on the number of tweets
	nestedTweets.forEach(function (el) {
		el.numTweets = el.values.length;
	})
	
	//Define max function
	var MaxTweets = d3.max(nestedTweets, function (el) {
		return el.numTweets;}
	);
	
	//Define scale (for v4)
	var yScale = d3.scaleLinear().domain([0, MaxTweets]).range([0,100]);
	
	d3.select("svg")
		.attr("style", "height: 480px; width: 600px;");
		
	d3.select("svg")
		.selectAll("rect")
		.data(nestedTweets)
		.enter()
		.append("rect")
		.attr("width", 50)
		.attr("height", function (d) {return yScale(d.numTweets);})
		.attr("x", function (d,i) {return i * 60;})
		.attr("y", function (d) {return 480 - yScale(d.numTweets);})
		.style("fill", "blue")
		.style("stroke", "red")
		.style("stroke-width", "1px")
		.style("opacity", .25)
}